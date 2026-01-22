import { useState } from 'react'
import { client } from './lib'

const App = () => {
  const [message, setMessage] = useState('')

  const onSubmit = async () => {
    const res = await client.index.$get()
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

export default App
