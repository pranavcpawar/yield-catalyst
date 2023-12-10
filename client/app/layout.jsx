"use client";
import { ThirdwebProvider, metamaskWallet } from '@thirdweb-dev/react'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider supportedWallets={[metamaskWallet()]} clientId="8d209400afd691877a2e6843d1a65a4d" activeChain="goerli">
          {children}
        </ThirdwebProvider>
        </body>
    </html>
  )
}
