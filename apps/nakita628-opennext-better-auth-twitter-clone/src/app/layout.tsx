import '@/app/globals.css'
import { Providers } from '@/app/_providers'
import { MainLayout } from '@/components/templates/MainLayout'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  )
}
