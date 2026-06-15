# Nakita628 FizzBuzz

A FizzBuzz API on [Hono](https://hono.dev/) + Cloudflare Workers. Routes are generated from `main.tsp` (TypeSpec) by [hono-takibi](https://github.com/nakita628/hono-takibi).

## Setup

```bash
pnpm install
```

## Generate routes

Regenerate `src/routes/index.ts` from `main.tsp`:

```bash
pnpm exec hono-takibi
```

## Develop

```bash
pnpm dev      # start local server
pnpm test     # run tests
pnpm deploy   # deploy to Cloudflare Workers
```

## Endpoint

```
GET /fizzBuzz?number=15
```

| Query     | Type   | Required | Description                                   |
| --------- | ------ | -------- | --------------------------------------------- |
| `number`  | number | yes      | Target number (min `1`)                       |
| `details` | string | no       | Include the original `number` in the response |

```bash
curl 'http://localhost:8787/fizzBuzz?number=15'
# {"result":"FizzBuzz"}

curl 'http://localhost:8787/fizzBuzz?number=15&details=true'
# {"result":"FizzBuzz","number":15}
```
