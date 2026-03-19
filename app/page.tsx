'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Dashboard from '@/components/Dashboard'
import AdminPanel from '@/components/AdminPanel'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'admin'>('dashboard')

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#efefef' }}>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="pt-20">
        {activeTab === 'dashboard' ? (
          <Dashboard />
        ) : (
          <AdminPanel />
        )}
      </div>
    </main>
  )
}
