import assert from 'node:assert/strict'
import test from 'node:test'

import { summarizeCloudflareUsage } from './cloudflare-usage.ts'

test('applies Cloudflare WebSocket billing and both relay safety limits', () => {
  const snapshot = summarizeCloudflareUsage([
    {
      dimensions: { datetimeHour: '2026-09-01T12:00:00Z', namespaceId: 'relay', type: 'http' },
      sum: { requests: 80_000, errors: 2 },
    },
    {
      dimensions: { datetimeHour: '2026-09-01T12:00:00Z', namespaceId: 'relay', type: 'hibernation' },
      sum: { requests: 120_000, errors: 0 },
    },
  ], [{
    dimensions: { datetimeHour: '2026-09-01T12:00:00Z' },
    sum: { duration: 393, inboundWebsocketMsgCount: 0, rowsRead: 79_375, rowsWritten: 9 },
  }], [{ max: { storedBytes: 4_608_000 } }], Date.UTC(2026, 8, 1, 13))

  assert.equal(snapshot.dailyRawRequests, 200_000)
  assert.equal(snapshot.dailyBillableRequests, 86_000)
  assert.equal(snapshot.dailyRequestLimit, 300_000)
  assert.equal(snapshot.monthlyBillableRequests, 86_000)
  assert.equal(snapshot.status, 'safe')
  assert.equal(snapshot.estimatedTotalUsd, 5)
  assert.equal(snapshot.durationGbSeconds, 393)

  const tomorrow = summarizeCloudflareUsage([
    {
      dimensions: { datetimeHour: '2026-09-02T00:00:00Z', namespaceId: 'relay', type: 'http' },
      sum: { requests: 200_000, errors: 0 },
    },
  ], [], [], Date.UTC(2026, 8, 2))
  assert.equal(tomorrow.dailyRequestLimit, 90_000)
  assert.equal(tomorrow.dailyBillableRequests, 200_000)
  assert.equal(tomorrow.status, 'stopped')
})
