'use client'

import { Battery } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavbarProps {
  activeTab: 'dashboard' | 'admin'
  onTabChange: (tab: 'dashboard' | 'admin') => void
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 shadow-sm"
      style={{ backgroundColor: '#122b43' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Battery
            size={28}
            style={{ color: '#01bb88' }}
          />
          <h1 className="text-xl font-bold text-white">EV Battery Management</h1>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => onTabChange('dashboard')}
            variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
            className={`${
              activeTab === 'dashboard'
                ? 'bg-[#01bb88] text-white hover:bg-[#01bb88]'
                : 'text-white hover:bg-white/10'
            }`}
          >
            Dashboard
          </Button>
          <Button
            onClick={() => onTabChange('admin')}
            variant={activeTab === 'admin' ? 'default' : 'ghost'}
            className={`${
              activeTab === 'admin'
                ? 'bg-[#01bb88] text-white hover:bg-[#01bb88]'
                : 'text-white hover:bg-white/10'
            }`}
          >
            Admin
          </Button>
        </div>
      </div>
    </nav>
  )
}
