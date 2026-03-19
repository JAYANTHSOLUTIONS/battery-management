import { Card } from '@/components/ui/card'
import { Zap } from 'lucide-react'

interface VoltageGaugeProps {
  value: number
}

export default function VoltageGauge({ value }: VoltageGaugeProps) {
  const percentage = ((value - 9.0) / (12.6 - 9.0)) * 100
  const clampedPercentage = Math.min(100, Math.max(0, percentage))

  return (
    <Card className="p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: '#122b43' }}>
          Battery Voltage
        </h3>
        <Zap size={24} style={{ color: '#01bb88' }} />
      </div>

      <div className="mb-6">
        <div className="text-4xl font-bold mb-2" style={{ color: '#01bb88' }}>
          {value.toFixed(2)} V
        </div>
        <div className="text-sm text-gray-600">Range: 9.0V - 12.6V</div>
      </div>

      {/* Gauge Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${clampedPercentage}%`,
            backgroundColor: '#01bb88',
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>9.0V</span>
        <span>12.6V</span>
      </div>

      {/* Status */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <span className="text-sm font-medium" style={{ color: '#01bb88' }}>
          ✓ Safe
        </span>
      </div>
    </Card>
  )
}
