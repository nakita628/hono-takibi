import app from './app.ts'

// ============================================================
// Verifies — for human eyes — that:
//   1. URL components are sent as strings (the wire reality)
//   2. The server returns 200, NOT 422
//   3. Each value arrives at the handler with the correct runtime
//      type (number / bigint / boolean), not as a string
//
// Both PATH and QUERY parameters are exercised against per-type
// routes so the two tables can be compared side by side.
// ============================================================

type Row = {
  url: string
  wire: string
  status: number
  result: string
  runtimeType: string
}

async function probe(
  url: string,
  wire: string,
  shape: 'id' | 'idBigint' | 'value' | 'flag' | 'mixed',
): Promise<Row> {
  const res = await app.request(url)
  const body = (await res.json()) as Record<string, unknown>
  const status = res.status

  if (shape === 'mixed') {
    return {
      url,
      wire,
      status,
      result: `${body.id} / ${body.flag}`,
      runtimeType: `${body.idType} / ${body.flagType}`,
    }
  }
  const valueKey = shape === 'value' ? 'value' : shape === 'flag' ? 'flag' : 'id'
  const v = body[valueKey]
  // bigint shape: handler stringifies to keep JSON valid; suffix `n` for display
  const display = shape === 'idBigint' ? `${v}n` : String(v)
  return {
    url,
    wire,
    status,
    result: display,
    runtimeType: String(body.type),
  }
}

function table(title: string, rows: Row[]) {
  const W = { url: 35, wire: 22, status: 16, result: 21, type: 20 }
  const sep = `┌${'─'.repeat(W.url)}┬${'─'.repeat(W.wire)}┬${'─'.repeat(W.status)}┬${'─'.repeat(W.result)}┬${'─'.repeat(W.type)}┐`
  const mid = `├${'─'.repeat(W.url)}┼${'─'.repeat(W.wire)}┼${'─'.repeat(W.status)}┼${'─'.repeat(W.result)}┼${'─'.repeat(W.type)}┤`
  const end = `└${'─'.repeat(W.url)}┴${'─'.repeat(W.wire)}┴${'─'.repeat(W.status)}┴${'─'.repeat(W.result)}┴${'─'.repeat(W.type)}┘`
  const pad = (s: string, w: number) => {
    // ASCII-only width; emoji handled by adjusting column width
    const visible = s.replace(/✅/g, '+ ')
    const padding = Math.max(0, w - visible.length)
    return ` ${s}${' '.repeat(padding)} `
  }

  console.log(`\n## ${title}\n`)
  console.log(sep)
  console.log(
    `│${pad('URL', W.url - 2)}│${pad('ワイヤ送信値', W.wire - 8)}│${pad('HTTPステータス', W.status - 8)}│${pad('変換結果', W.result - 6)}│${pad('型', W.type - 2)}│`,
  )
  console.log(mid)
  rows.forEach((r, i) => {
    const status = `${r.status} ${r.status === 200 ? '✅' : '❌'}`
    console.log(
      `│${pad(r.url, W.url - 2)}│${pad(`"${r.wire}"`, W.wire - 2)}│${pad(status, W.status - 2)}│${pad(r.result, W.result - 2)}│${pad(r.runtimeType, W.type - 2)}│`,
    )
    if (i < rows.length - 1) console.log(mid)
  })
  console.log(end)
}

// ── PATH ────────────────────────────────────────────────────
const pathRows: Row[] = [
  await probe('/items/integer/42', '42', 'id'),
  await probe('/items/int32/2147483647', '2147483647', 'id'),
  await probe('/items/int64/9007199254740993', '9007199254740993', 'idBigint'),
  await probe('/items/number/3.14', '3.14', 'value'),
  await probe('/items/boolean/true', 'true', 'flag'),
  await probe('/items/boolean/false', 'false', 'flag'),
  await probe('/items/mixed/7/sub/true', '7 / true', 'mixed'),
]

// ── QUERY ───────────────────────────────────────────────────
const queryRows: Row[] = [
  await probe('/q/integer?v=42', '42', 'id'),
  await probe('/q/int32?v=2147483647', '2147483647', 'id'),
  await probe('/q/int64?v=9007199254740993', '9007199254740993', 'idBigint'),
  await probe('/q/number?v=3.14', '3.14', 'value'),
  await probe('/q/boolean?v=true', 'true', 'flag'),
  await probe('/q/boolean?v=false', 'false', 'flag'),
  await probe('/q/mixed?id=7&flag=true', '7 / true', 'mixed'),
]

table('Path Parameter Coercion', pathRows)
table('Query Parameter Coercion', queryRows)

// ── Constraint enforcement (int vs number distinction) ──────
// In JS `typeof` int and number are both "number". The schema-level
// distinction is enforced by Zod's piped validators (z.int(), z.int32()).
// These rows prove integer-only routes REJECT floats / out-of-range
// values, while number routes accept floats.
type ConstraintRow = {
  schema: string
  url: string
  wire: string
  status: number
  outcome: string
}

async function checkStatus(
  url: string,
  wire: string,
  schema: string,
): Promise<ConstraintRow> {
  const res = await app.request(url)
  const status = res.status
  return {
    schema,
    url,
    wire,
    status,
    outcome: status === 200 ? '✅ 受理' : '❌ 拒否（制約違反）',
  }
}

const constraintRows: ConstraintRow[] = [
  await checkStatus('/items/integer/42', '42', 'z.coerce.number().pipe(z.int())'),
  await checkStatus('/items/integer/3.14', '3.14', 'z.coerce.number().pipe(z.int())'),
  await checkStatus('/items/int32/2147483647', '2147483647', 'z.coerce.number().pipe(z.int32())'),
  await checkStatus(
    '/items/int32/9999999999',
    '9999999999',
    'z.coerce.number().pipe(z.int32())',
  ),
  await checkStatus('/items/number/42', '42', 'z.coerce.number()'),
  await checkStatus('/items/number/3.14', '3.14', 'z.coerce.number()'),
  await checkStatus('/items/number/abc', 'abc', 'z.coerce.number()'),
]

console.log('\n## Constraint Enforcement (int vs number の区別はスキーマ層)\n')
console.log(
  '┌─────────────────────────────────────────┬────────────────────────┬──────────────┬────────────────┬────────────────────┐',
)
console.log(
  '│ 生成 Zod                                │ URL                    │ ワイヤ送信値 │ HTTPステータス │ 判定               │',
)
console.log(
  '├─────────────────────────────────────────┼────────────────────────┼──────────────┼────────────────┼────────────────────┤',
)
const padR = (s: string, w: number) => {
  const visible = s.replace(/✅|❌/g, '+ ')
  return ` ${s}${' '.repeat(Math.max(0, w - visible.length))} `
}
constraintRows.forEach((r, i) => {
  console.log(
    `│${padR(r.schema, 39)}│${padR(r.url, 22)}│${padR(`"${r.wire}"`, 12)}│${padR(`${r.status}`, 14)}│${padR(r.outcome, 18)}│`,
  )
  if (i < constraintRows.length - 1) {
    console.log(
      '├─────────────────────────────────────────┼────────────────────────┼──────────────┼────────────────┼────────────────────┤',
    )
  }
})
console.log(
  '└─────────────────────────────────────────┴────────────────────────┴──────────────┴────────────────┴────────────────────┘',
)
