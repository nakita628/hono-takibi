import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'
import api from './api'

const app = new Hono()

app.route('/api', api)

app.get('*', (c) => {
  return c.html(
    renderToString(
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta content='width=device-width, initial-scale=1' name='viewport' />
          <title>Hono🔥 React</title>
          {import.meta.env.PROD ? (
            <script type='module' src='/static/main.js'></script>
          ) : (
            <script type='module' src='/src/main.tsx'></script>
          )}
        </head>
        <body>
          <div id='root' />
        </body>
      </html>,
    ),
  )
})

export default app
