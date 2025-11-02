'use client'

import React from 'react'
import Image from 'next/image'
import { Search, Menu, X, User, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LanguageSwitcher } from '@/components/language-switcher'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
  onMenuToggle?: () => void
  isSidebarOpen?: boolean
}

export function Header({ className, onMenuToggle, isSidebarOpen }: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false)

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="md:hidden"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="flex items-center gap-2">
            <Image 
              src="/brand/icons/icon-primary.svg" 
              alt="XHubSell" 
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="font-display text-xl font-bold">XHubSell</span>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, sellers..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <User className="h-5 w-5" />
            </Button>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md border bg-popover p-1 shadow-md">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md">
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <hr className="my-1" />
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md text-destructive">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}