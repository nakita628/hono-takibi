import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { client } from '..'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
    const [message, setMessage] = useState('')

  const onSubmit = async () => {
    const res = await client.$get()
    const data = await res.json()
    setMessage(data.message)
  }
  return (
    <>
      <h1>Hono🔥 React</h1>
      <button type='button' onClick={onSubmit}>
        Get Message
      </button>
      <h1>{message}</h1>
    </>
  )
}