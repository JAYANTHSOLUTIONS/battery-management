import { Card } from '@/components/ui/card'
import { Cpu, Zap, Thermometer } from 'lucide-react'

export default function HardwareComponents() {
  const components = [
    {
      name: 'ESP32 Microcontroller',
      description: 'Main processing unit for sensor data acquisition and relay control',
      icon: Cpu,
      specs: ['Dual-core processor', 'WiFi & Bluetooth', 'Multiple GPIO pins'],
    },
    {
      name: 'ACS712 Current Sensor',
      description: 'Measures current flow in the charging circuit',
      icon: Zap,
      specs: ['5A to 30A range', 'Analog output', 'Hall effect based'],
    },
    {
      name: 'DS18B20 Temp Sensor',
      description: 'Monitors battery temperature for safety',
      icon: Thermometer,
      specs: ['Digital 1-Wire interface', '-55°C to +125°C range', 'Accurate measurement'],
    },
  ]

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8" style={{ color: '#122b43' }}>
        Hardware Components
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {components.map((component, index) => {
          const IconComponent = component.icon
          return (
            <Card key={index} className="p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: '#01bb88', color: 'white' }}
                >
                  <IconComponent size={24} />
                </div>
                <h3 className="font-semibold" style={{ color: '#122b43' }}>
                  {component.name}
                </h3>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {component.description}
              </p>

              <div className="space-y-2">
                {component.specs.map((spec, specIndex) => (
                  <div key={specIndex} className="flex items-start gap-2">
                    <span
                      className="text-lg font-bold mt-[-2px]"
                      style={{ color: '#01bb88' }}
                    >
                      •
                    </span>
                    <span className="text-sm text-gray-700">{spec}</span>
                  </div>
                ))}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
