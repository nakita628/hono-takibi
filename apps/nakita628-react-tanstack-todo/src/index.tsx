import { renderToString } from 'react-dom/server'
import app from '@/api'

app.get('*', (c) => {
  return c.html(
    renderToString(
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta content='width=device-width, initial-scale=1' name='viewport' />
          <title>Takibi TanStack Todo</title>
          {import.meta.env.PROD ? (
            <>
              <link rel='stylesheet' href='/static/main.css' />
              <script type='module' src='/static/main.js' />
            </>
          ) : (
            <>
              <link rel='stylesheet' href='/src/index.css' />
              <script type='module' src='/src/main.tsx' />
            </>
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
