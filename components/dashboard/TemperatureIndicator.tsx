import { Card } from '@/components/ui/card'
import { Thermometer } from 'lucide-react'

interface TemperatureIndicatorProps {
  value: number
}

export default function TemperatureIndicator({ value }: TemperatureIndicatorProps) {
  const isDanger = value > 50
  const statusColor = isDanger ? '#dc2626' : '#01bb88'
  const statusText = isDanger ? 'DANGER' : 'SAFE'

  return (
    <Card className="p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: '#122b43' }}>
          Temperature
        </h3>
        <Thermometer size={24} style={{ color: statusColor }} />
      </div>

      <div className="mb-6">
        <div className="text-4xl font-bold mb-2" style={{ color: statusColor }}>
          {value.toFixed(1)}°C
        </div>
        <div className="text-sm text-gray-600">Danger threshold: 50°C</div>
      </div>

      {/* Temperature Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${Math.min(100, (value / 60) * 100)}%`,
            backgroundColor: isDanger ? '#dc2626' : '#01bb88',
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>0°C</span>
        <span>60°C</span>
      </div>

      {/* Status */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <span
          className="text-sm font-bold"
          style={{ color: statusColor }}
        >
          {isDanger ? '⚠ ' : '✓ '}
          {statusText}
        </span>
      </div>
    </Card>
  )
}
