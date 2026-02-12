#!/usr/bin/env node
import { honoTakibi } from './cli/index.js'

honoTakibi().then((result) => {
  if (result.ok) {
    console.log(result.value)
    process.exit(0)
  } else {
    console.error(result.error)
    process.exit(1)
  }
})
