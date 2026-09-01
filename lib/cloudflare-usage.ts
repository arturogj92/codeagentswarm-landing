const GRAPHQL_URL = 'https://api.cloudflare.com/client/v4/graphql'
const SCRIPT_NAME = 'codeagentswarm-connect'

const DAILY_REQUEST_LIMIT = 90_000
const TEMPORARY_DAILY_REQUEST_LIMIT = 300_000
const TEMPORARY_DAILY_REQUEST_LIMIT_DAY = '2026-09-01'
const MONTHLY_REQUEST_LIMIT = 900_000
const INCLUDED_REQUESTS = 1_000_000
const INCLUDED_DURATION = 400_000
const INCLUDED_ROWS_READ = 25_000_000_000
const INCLUDED_ROWS_WRITTEN = 50_000_000
const INCLUDED_STORAGE_BYTES = 5_000_000_000

type InvocationRow = {
  dimensions: { datetimeHour: string; namespaceId: string; type: string }
  sum: { errors: number | string; requests: number | string }
}

type PeriodicRow = {
  dimensions: { datetimeHour: string }
  sum: {
    duration: number | string
    inboundWebsocketMsgCount: number | string
    rowsRead: number | string
    rowsWritten: number | string
  }
}

type StorageRow = {
  max: { storedBytes: number | string }
}

export type CloudflareUsageSnapshot = {
  generatedAt: string
  cycleStart: string
  cycleEnd: string
  status: 'safe' | 'near' | 'stopped' | 'overage'
  dailyRawRequests: number
  dailyRequestLimit: number
  monthlyBillableRequests: number
  monthlyRequestLimit: number
  includedRequests: number
  rawRequests: number
  durationGbSeconds: number
  includedDurationGbSeconds: number
  rowsRead: number
  includedRowsRead: number
  rowsWritten: number
  includedRowsWritten: number
  storedBytes: number
  includedStorageBytes: number
  errors: number
  estimatedOverageUsd: number
  estimatedTotalUsd: number
  recentBillableRequestsPerHour: number
  hourly: Array<{ hour: string; rawRequests: number; billableRequests: number; errors: number }>
}

function number(value: number | string | undefined): number {
  const parsed = Number(value || 0)
  return Number.isFinite(parsed) ? parsed : 0
}

function roundedOverage(used: number, included: number, unit: number, rate: number): number {
  return used > included ? Math.ceil((used - included) / unit) * rate : 0
}

export function summarizeCloudflareUsage(
  invocations: InvocationRow[],
  periodic: PeriodicRow[],
  storage: StorageRow[],
  now = Date.now(),
): CloudflareUsageSnapshot {
  const date = new Date(now)
  const generatedAt = date.toISOString()
  const cycleStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1)).toISOString()
  const today = generatedAt.slice(0, 10)
  const dailyRequestLimit = today === TEMPORARY_DAILY_REQUEST_LIMIT_DAY
    ? TEMPORARY_DAILY_REQUEST_LIMIT
    : DAILY_REQUEST_LIMIT
  const hours = new Map<string, { rawRequests: number; billableRequests: number; errors: number }>()

  for (const row of invocations) {
    const hour = row.dimensions.datetimeHour
    const current = hours.get(hour) || { rawRequests: 0, billableRequests: 0, errors: 0 }
    const requests = number(row.sum.requests)
    const websocket = row.dimensions.type === 'hibernation'
    current.rawRequests += requests
    current.billableRequests += websocket ? requests / 20 : requests
    current.errors += number(row.sum.errors)
    hours.set(hour, current)
  }

  for (const row of periodic) {
    const messages = number(row.sum.inboundWebsocketMsgCount)
    if (!messages) continue
    const hour = row.dimensions.datetimeHour
    const current = hours.get(hour) || { rawRequests: 0, billableRequests: 0, errors: 0 }
    current.rawRequests += messages
    current.billableRequests += messages / 20
    hours.set(hour, current)
  }

  const hourly = Array.from(hours, ([hour, values]) => ({ hour, ...values }))
    .sort((left, right) => left.hour.localeCompare(right.hour))
  const rawRequests = hourly.reduce((total, hour) => total + hour.rawRequests, 0)
  const monthlyBillableRequests = hourly.reduce((total, hour) => total + hour.billableRequests, 0)
  const dailyRawRequests = hourly
    .filter((hour) => hour.hour.startsWith(today))
    .reduce((total, hour) => total + hour.rawRequests, 0)
  const errors = hourly.reduce((total, hour) => total + hour.errors, 0)
  const durationGbSeconds = periodic.reduce((total, row) => total + number(row.sum.duration), 0)
  const rowsRead = periodic.reduce((total, row) => total + number(row.sum.rowsRead), 0)
  const rowsWritten = periodic.reduce((total, row) => total + number(row.sum.rowsWritten), 0)
  const storedBytes = Math.max(0, ...storage.map((row) => number(row.max.storedBytes)))
  const requestOverage = roundedOverage(monthlyBillableRequests, INCLUDED_REQUESTS, 1_000_000, 0.15)
  const durationOverage = roundedOverage(durationGbSeconds, INCLUDED_DURATION, 1_000_000, 12.5)
  const readOverage = roundedOverage(rowsRead, INCLUDED_ROWS_READ, 1_000_000, 0.001)
  const writeOverage = roundedOverage(rowsWritten, INCLUDED_ROWS_WRITTEN, 1_000_000, 1)
  const storageOverage = storedBytes > INCLUDED_STORAGE_BYTES
    ? ((storedBytes - INCLUDED_STORAGE_BYTES) / 1_000_000_000) * 0.2
    : 0
  const estimatedOverageUsd = requestOverage + durationOverage + readOverage + writeOverage + storageOverage
  const stopped = dailyRawRequests >= dailyRequestLimit || monthlyBillableRequests >= MONTHLY_REQUEST_LIMIT
  const near = dailyRawRequests >= dailyRequestLimit * 0.8
    || monthlyBillableRequests >= MONTHLY_REQUEST_LIMIT * 0.8
  const status = estimatedOverageUsd > 0 ? 'overage' : stopped ? 'stopped' : near ? 'near' : 'safe'

  return {
    generatedAt,
    cycleStart,
    cycleEnd: generatedAt,
    status,
    dailyRawRequests,
    dailyRequestLimit,
    monthlyBillableRequests,
    monthlyRequestLimit: MONTHLY_REQUEST_LIMIT,
    includedRequests: INCLUDED_REQUESTS,
    rawRequests,
    durationGbSeconds,
    includedDurationGbSeconds: INCLUDED_DURATION,
    rowsRead,
    includedRowsRead: INCLUDED_ROWS_READ,
    rowsWritten,
    includedRowsWritten: INCLUDED_ROWS_WRITTEN,
    storedBytes,
    includedStorageBytes: INCLUDED_STORAGE_BYTES,
    errors,
    estimatedOverageUsd,
    estimatedTotalUsd: 5 + estimatedOverageUsd,
    recentBillableRequestsPerHour: hourly.at(-1)?.billableRequests || 0,
    hourly,
  }
}

async function graphql<T>(token: string, query: string, variables: Record<string, unknown>): Promise<T> {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  })
  const payload = await response.json() as { data?: T; errors?: Array<{ message: string }> }
  if (!response.ok || payload.errors?.length || !payload.data) {
    throw new Error(payload.errors?.[0]?.message || `Cloudflare returned ${response.status}`)
  }
  return payload.data
}

export async function fetchCloudflareUsage(): Promise<CloudflareUsageSnapshot> {
  const accountTag = process.env.CLOUDFLARE_ACCOUNT_ID
  const token = process.env.CLOUDFLARE_API_TOKEN
  if (!accountTag || !token) throw new Error('Cloudflare read-only credentials are not configured')

  const now = new Date()
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString()
  const end = now.toISOString()
  const scriptName = process.env.CLOUDFLARE_RELAY_SCRIPT_NAME || SCRIPT_NAME
  const invocationData = await graphql<{
    viewer: { accounts: Array<{ invocations: InvocationRow[] }> }
  }>(token, `
    query RelayInvocations($accountTag: string!, $start: Time!, $end: Time!, $scriptName: string!) {
      viewer {
        accounts(filter: { accountTag: $accountTag }) {
          invocations: durableObjectsInvocationsAdaptiveGroups(
            limit: 10000
            filter: {
              scriptName: $scriptName
              isPreview: 0
              datetime_geq: $start
              datetime_lt: $end
            }
          ) {
            dimensions { datetimeHour namespaceId type }
            sum { errors requests }
          }
        }
      }
    }
  `, { accountTag, start, end, scriptName })
  const invocations = invocationData.viewer.accounts[0]?.invocations || []
  const namespaceIds = Array.from(new Set(invocations.map((row) => row.dimensions.namespaceId).filter(Boolean)))
  if (!namespaceIds.length) return summarizeCloudflareUsage([], [], [], now.getTime())

  const detailData = await graphql<{
    viewer: { accounts: Array<{ periodic: PeriodicRow[]; storage: StorageRow[] }> }
  }>(token, `
    query RelayDetails($accountTag: string!, $start: Time!, $end: Time!, $namespaceIds: [string!]!) {
      viewer {
        accounts(filter: { accountTag: $accountTag }) {
          periodic: durableObjectsPeriodicGroups(
            limit: 10000
            filter: { namespaceId_in: $namespaceIds, datetime_geq: $start, datetime_lt: $end }
          ) {
            dimensions { datetimeHour }
            sum { duration inboundWebsocketMsgCount rowsRead rowsWritten }
          }
          storage: durableObjectsSqlStorageGroups(
            limit: 10000
            filter: { namespaceId_in: $namespaceIds, datetime_geq: $start, datetime_lt: $end }
          ) {
            max { storedBytes }
          }
        }
      }
    }
  `, { accountTag, start, end, namespaceIds })
  const account = detailData.viewer.accounts[0]
  return summarizeCloudflareUsage(invocations, account?.periodic || [], account?.storage || [], now.getTime())
}
