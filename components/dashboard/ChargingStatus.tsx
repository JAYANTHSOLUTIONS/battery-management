'use client'

import { Card } from '@/components/ui/card'
import { Sun, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react'

interface ChargingStatusProps {
  source: 'solar' | 'grid'
  isFault?: boolean // Passed from the synchronized Dashboard state
}

export default function ChargingStatus({ source, isFault = false }: ChargingStatusProps) {
  const isSolar = source === 'solar'

  return (
    <Card className="p-6 shadow-2xl border-none rounded-2xl overflow-hidden relative">
      {/* Visual background glow for the active source */}
      <div 
        className="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: isFault ? '#ef4444' : (isSolar ? '#01bb88' : '#3b82f6') }}
      />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
          Relay Status
        </h3>
        {isFault ? (
          <ShieldAlert size={24} className="text-red-500 animate-bounce" />
        ) : isSolar ? (
          <Sun size={24} style={{ color: '#01bb88' }} className="animate-pulse" />
        ) : (
          <Zap size={24} style={{ color: '#3b82f6' }} />
        )}
      </div>

      <div className="mb-6 relative z-10">
        <div
          className="text-4xl font-black mb-1 transition-colors duration-500"
          style={{ color: isFault ? '#ef4444' : (isSolar ? '#01bb88' : '#3b82f6') }}
        >
          {isFault ? 'LOCKED' : (isSolar ? 'SOLAR' : 'GRID')}
        </div>
        <p className="text-xs font-mono text-gray-500 uppercase">
          {isFault 
            ? 'Safety Interlock Triggered' 
            : `Primary Source: ${source === 'solar' ? 'Renewable' : 'Utility'}`}
        </p>
      </div>

      {/* Logic Display - Direct reflection of ESP32 loop */}
      <div 
        className="rounded-xl p-4 mb-6 transition-colors border"
        style={{ 
          backgroundColor: isFault ? '#fef2f2' : '#f9fafb',
          borderColor: isFault ? '#fee2e2' : '#f3f4f6'
        }}
      >
        <p className="text-[10px] font-bold text-gray-400 mb-2 tracking-tighter">HARDWARE LOGIC[cite: 29, 36]:</p>
        <p className="text-xs font-medium text-gray-700 leading-relaxed">
          {isFault 
            ? '❌ Temp > 50°C → Relay disconnected for protection [cite: 85]' 
            : isSolar 
              ? '☀️ Solar Available → PIN_RELAY set to HIGH [cite: 32]' 
              : '☁️ Solar Low → PIN_RELAY set to LOW [cite: 34]'}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-2 relative z-10">
        <CheckCircle2 size={16} style={{ color: isFault ? '#6b7280' : '#01bb88' }} />
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: isFault ? '#6b7280' : '#01bb88' }}
        >
          {isFault ? 'System Halted' : 'Active Stream'}
        </span>
      </div>
    </Card>
  )
}