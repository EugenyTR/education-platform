import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import { PointsProvider } from "@/contexts/points-context"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "#go НА ТРЕНЬКУ - Образовательная Платформа",
  description: "Современная образовательная платформа с интерактивными курсами",
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <AuthProvider>
            <PointsProvider>{children}</PointsProvider>
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
