import { Card } from '@/components/ui/card'
import { Check, X } from 'lucide-react'

export default function ComparisonTable() {
  const features = [
    'Multi-parameter monitoring',
    'Real-time data logging',
    'Hybrid charging logic',
    'Temperature safety alerts',
    'IoT cloud integration',
    'Historical data analytics',
    'Remote monitoring',
    'Automatic relay switching',
    'Cost-effective solution',
    'Scalable architecture',
  ]

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8" style={{ color: '#122b43' }}>
        System Comparison
      </h2>

      <Card className="shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: '#122b43' }}>
                <th className="px-6 py-4 text-left text-white font-semibold">Feature</th>
                <th className="px-6 py-4 text-center text-white font-semibold">
                  Proposed System
                </th>
                <th className="px-6 py-4 text-center text-white font-semibold">
                  Existing Systems
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                  }}
                  className="border-b border-gray-200"
                >
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {feature}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check
                      size={24}
                      style={{ color: '#01bb88', margin: '0 auto' }}
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <X
                      size={24}
                      style={{ color: '#ef4444', margin: '0 auto' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Summary */}
      <Card className="mt-8 p-6 shadow-sm" style={{ backgroundColor: '#f0fdf4' }}>
        <h3 className="font-semibold mb-2" style={{ color: '#15803d' }}>
          ✓ Key Advantages
        </h3>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>• Comprehensive monitoring of voltage, current, and temperature</li>
          <li>• Intelligent hybrid charging that prioritizes solar energy</li>
          <li>• Cloud-based data storage for long-term analysis</li>
          <li>• Early warning system for temperature anomalies</li>
          <li>• Designed for future scalability to fleet-level management</li>
        </ul>
      </Card>
    </div>
  )
}
