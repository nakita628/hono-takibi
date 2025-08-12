#!/usr/bin/env node
import { honoTakibiRpc } from "./cli/rpc.js";

honoTakibiRpc().then((result) => {
  if (result.ok) {
    console.log(result.value)
    process.exit(0)
  } else {
    console.error(result.error)
    process.exit(1)
  }
})
