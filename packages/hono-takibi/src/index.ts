#!/usr/bin/env node
import { honoTakibi } from './cli/index.js'

void honoTakibi().then((result) => {
  if (result.ok) {
    // oxlint-disable-next-line no-console -- CLI writes its result to stdout
    console.log(result.value)
    process.exit(0)
  } else {
    // oxlint-disable-next-line no-console -- CLI writes its error to stderr
    console.error(result.error)
    process.exit(1)
  }
})
