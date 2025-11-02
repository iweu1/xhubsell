'use client'

import React, { useState } from 'react'
import { Header } from './header'
import { Sidebar } from './sidebar'
import { Footer } from './footer'
import { cn } from '@/lib/utils'

interface AppShellProps {
  children: React.ReactNode
  className?: string
  showSidebar?: boolean
  showFooter?: boolean
}

export function AppShell({ 
  children, 
  className,
  showSidebar = true,
  showFooter = true 
}: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleSidebarClose = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onMenuToggle={handleMenuToggle}
        isSidebarOpen={isSidebarOpen}
      />
      
      <div className="flex flex-1">
        {showSidebar && (
          <Sidebar 
            isOpen={isSidebarOpen}
            onClose={handleSidebarClose}
          />
        )}
        
        <main className={cn(
          "flex-1",
          showSidebar && "md:ml-0",
          className
        )}>
          {children}
        </main>
      </div>
      
      {showFooter && <Footer />}
    </div>
  )
}