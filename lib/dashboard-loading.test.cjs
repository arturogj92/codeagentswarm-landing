// node --test lib/dashboard-loading.test.cjs
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const ts = require('typescript');
function load(relative, mocks) {
  const { outputText } = ts.transpileModule(readFileSync(resolve(__dirname, '..', relative), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const testModule = { exports: {} };
  new Function('require', 'module', 'exports', outputText)(name => {
    assert.ok(name in mocks, `Unexpected import: ${name}`);
    return mocks[name];
  }, testModule, testModule.exports);
  return testModule.exports;
}
test('cached dashboard reads require auth, isolate filters, and invalidate invitations', async () => {
  const calls = [];
  const caches = [];
  const mocks = {
    'next/server': { NextResponse: Response },
    'next/cache': {
      unstable_cache: (fn, keys, options) => {
        assert.equal(options.revalidate, 30);
        const values = new Map();
        caches.push({ values, tags: options.tags || [] });
        return async (...args) => {
          const key = JSON.stringify([keys, args]);
          if (!values.has(key)) values.set(key, await fn(...args));
          return values.get(key);
        };
      },
      revalidateTag: tag => caches.filter(c => c.tags.includes(tag)).forEach(c => c.values.clear()),
    },
    '@/lib/auth': { COOKIE_NAME: 'session', verifyToken: async token => token === 'valid' ? { sub: 'admin' } : null },
    '@/lib/supabase-client': { supabaseRpc: async options => {
      calls.push(options);
      if (options.fn === 'user_activity_global_v3') return { generated_at: 'fixture', window_days: options.args.p_window_days };
      if (options.fn === 'mobile_relay_adoption_v2') return { window_days: 30, requests: [] };
      if (options.fn === 'mobile_relay_mark_invited_v1') return { request_id: options.args.p_request_id };
      return [];
    } },
    '@/app/(dashboard)/dashboard/users/users-activity': load('app/(dashboard)/dashboard/users/users-activity.ts', {}),
  };
  const request = (body = {}, token = 'valid') => ({ cookies: { get: () => ({ value: token }) }, json: async () => body });
  const { GET } = load('app/api/dashboard/users/overview/route.ts', mocks);
  assert.equal((await GET(request({}, 'bad'))).status, 401);
  assert.equal(calls.length, 0);
  const first = await (await GET(request())).json();
  assert.deepEqual(await (await GET(request())).json(), first);
  assert.equal(calls.length, 2);
  assert.equal((await GET(request({}, 'bad'))).status, 401);
  const { POST } = load('app/api/dashboard/users/global/route.ts', mocks);
  const a = '11111111-1111-4111-8111-111111111111';
  const b = '22222222-2222-4222-8222-222222222222';
  const body = { excluded_user_ids: [a, b], window_days: 7, feature_window_days: 30 };
  assert.equal((await POST(request(body, 'bad'))).status, 401);
  assert.equal((await POST(request({ window_days: 999 }))).status, 400);
  assert.equal(calls.length, 2);
  await POST(request(body));
  await POST(request({ ...body, excluded_user_ids: [b, a] }));
  assert.equal(calls.length, 6);
  await POST(request({ ...body, window_days: 30 }));
  await POST(request({ ...body, feature_window_days: 90 }));
  await POST(request({ ...body, excluded_user_ids: [a] }));
  assert.equal(calls.length, 18);
  assert.ok(calls.slice(2).every(c => c.signal instanceof AbortSignal));
  const { PATCH } = load('app/api/dashboard/users/mobile-relay-invitations/route.ts', mocks);
  assert.equal((await PATCH(request({ request_id: a }))).status, 200);
  await POST(request(body));
  assert.equal(calls.length, 23);
});
test('RPC waits are bounded and preserve caller cancellation', async () => {
  const originalFetch = global.fetch;
  const originalTimeout = AbortSignal.timeout;
  const originalUrl = process.env.SUPABASE_URL;
  const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const timeout = new AbortController();
  try {
    process.env.SUPABASE_URL = 'https://fixture.invalid';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'fixture';
    AbortSignal.timeout = ms => { assert.equal(ms, 35_000); return timeout.signal; };
    global.fetch = async (_url, options) => {
      if (options.signal.aborted) throw options.signal.reason;
      return new Promise((_, reject) => options.signal.addEventListener('abort', () => reject(options.signal.reason)));
    };
    const { supabaseRpc } = load('lib/supabase-client.ts', {});
    const caller = new AbortController();
    const cancelled = supabaseRpc({ fn: 'fixture', signal: caller.signal });
    caller.abort(new Error('cancelled'));
    await assert.rejects(cancelled, /cancelled/);
    const timedOut = supabaseRpc({ fn: 'fixture' });
    timeout.abort(new Error('timed out'));
    await assert.rejects(timedOut, /timed out/);
  } finally {
    global.fetch = originalFetch;
    AbortSignal.timeout = originalTimeout;
    if (originalUrl === undefined) delete process.env.SUPABASE_URL;
    else process.env.SUPABASE_URL = originalUrl;
    if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
  }
});
