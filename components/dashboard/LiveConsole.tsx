'use client'

import { Card } from '@/components/ui/card'
import { useEffect, useState, useRef } from 'react'

interface LiveConsoleProps {
  voltage: number
  temperature: number
  current: number
  source: string
}

export default function LiveConsole({ voltage, temperature, current, source }: LiveConsoleProps) {
  const [logs, setLogs] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString()
    const isFault = temperature >= 50.0
    
    // Mimics the Serial.print logic from the hardware
    const newLog = `[${timestamp}] V: ${voltage.toFixed(2)}V | I: ${current.toFixed(2)}A | T: ${temperature.toFixed(1)}°C | SRC: ${source.toUpperCase()} | FAULT: ${isFault ? 'YES' : 'NO'}`
    
    setLogs(prev => [...prev.slice(-14), newLog]) // Keep the last 15 lines for performance
  }, [voltage, temperature, current, source])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold" style={{ color: '#122b43' }}>Hardware Stream</h2>
        <span className="flex items-center gap-2 text-xs font-mono text-gray-500">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          ESP32_LINK_ACTIVE
        </span>
      </div>

      <Card className="shadow-2xl border-none overflow-hidden rounded-2xl">
        <div
          className="p-8 font-mono text-xs leading-relaxed h-[400px] overflow-y-auto"
          style={{ backgroundColor: '#191d27', color: '#01bb88' }}
          ref={scrollRef}
        >
          <div className="opacity-50 mb-4">-- INITIALIZING HYBRID BMS PROTOCOL --</div>
          <div className="space-y-1">
            {logs.map((log, index) => (
              <div key={index} className="border-l-2 border-[#01bb88] border-opacity-20 pl-4 hover:bg-white hover:bg-opacity-5 transition-colors">
                {log}
              </div>
            ))}
            <div className="flex items-center gap-2">
               <span className="animate-pulse">▌</span>
               <span className="text-[10px] text-gray-500 italic">Waiting for hardware interrupt...</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}