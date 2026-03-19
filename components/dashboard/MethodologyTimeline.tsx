import { Card } from '@/components/ui/card'

const steps = [
  {
    number: 1,
    title: 'Read Sensors',
    description: 'Acquire voltage, current, and temperature data from hardware sensors',
    details: '(V, I, T)',
  },
  {
    number: 2,
    title: 'Check Conditions',
    description: 'Evaluate solar availability and verify temperature safety',
    details: 'Solar & Temp Check',
  },
  {
    number: 3,
    title: 'Execute Relay',
    description: 'Switch charging source based on availability logic',
    details: 'Relay Control',
  },
  {
    number: 4,
    title: 'Push to Cloud',
    description: 'Send processed data to Blynk IoT Cloud for monitoring',
    details: 'Blynk Integration',
  },
]

export default function MethodologyTimeline() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8" style={{ color: '#122b43' }}>
        Next to Next Methodology
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-6">
            {/* Timeline Circle */}
            <div className="flex flex-col items-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md"
                style={{ backgroundColor: '#01bb88' }}
              >
                {step.number}
              </div>
              {index < steps.length - 1 && (
                <div
                  className="w-1 h-20 mt-4"
                  style={{ backgroundColor: '#01bb88', opacity: 0.3 }}
                />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 pt-2 pb-8">
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#122b43' }}>
                {step.title}
              </h3>
              <p className="text-gray-700 mb-3 text-sm">
                {step.description}
              </p>
              <div
                className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: '#122b43' }}
              >
                {step.details}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <Card className="mt-8 p-6 shadow-sm" style={{ backgroundColor: '#f9fafb' }}>
        <h3 className="font-semibold mb-3" style={{ color: '#122b43' }}>
          Process Flow Summary
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          The system continuously cycles through sensor reading, condition evaluation, and relay switching
          to optimize charging source selection. Real-time data is transmitted to the Blynk IoT Cloud,
          enabling remote monitoring and historical data analysis for battery health insights.
        </p>
      </Card>
    </div>
  )
}
