'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Activity, Thermometer, Battery, HeartPulse, AlertTriangle, ShieldAlert } from 'lucide-react'

interface LiveMetricsProps {
  voltage: number
  current: number
  temperature: number
  soc: number
}

export default function LiveMetrics({ voltage, current, temperature, soc }: LiveMetricsProps) {
  
  /**
   * BUG FIX: getStatus now receives raw numbers for accurate comparison.
   * Logic mapped to ESP32 safety thresholds
   */
  const getStatus = (label: string, val: number) => {
    switch (label) {
      case 'Voltage':
        if (val > 12.6 || (val < 9.0 && val > 0)) return 'critical'; 
        if (val > 12.4 || (val < 9.5 && val > 0)) return 'warning';
        return 'normal';
      case 'Current':
        if (val > 2.5) return 'critical'; 
        if (val > 2.0) return 'warning';
        return 'normal';
      case 'Temperature':
        if (val >= 50.0) return 'critical'; 
        if (val >= 45.0) return 'warning';
        return 'normal';
      case 'Charge':
        if (val < 15 && val > 0) return 'critical';
        if (val < 25 && val > 0) return 'warning';
        return 'normal';
      default:
        return 'normal';
    }
  }

  const getColor = (status: string, defaultColor: string) => {
    if (status === 'critical') return '#ef4444'; // Tech Red
    if (status === 'warning') return '#f59e0b';  // Warning Amber
    return defaultColor;
  }

  // UI CONFIG: Expanded sizes and non-standard colors (Orange, Purple, Cyan, Pink)
  const metrics = [
    { label: 'Voltage', val: voltage || 0, unit: 'V', icon: <Zap />, baseColor: '#ff9800', decimals: 2 },
    { label: 'Current', val: current || 0, unit: 'A', icon: <Activity />, baseColor: '#9c27b0', decimals: 2 },
    { label: 'Temperature', val: temperature || 0, unit: '°C', icon: <Thermometer />, baseColor: '#ffeb3b', decimals: 1 },
    { label: 'Charge', val: soc || 0, unit: '%', icon: <Battery />, baseColor: '#00bcd4', decimals: 0 },
    { label: 'Health', val: 98, unit: '%', icon: <HeartPulse />, baseColor: '#e91e63', decimals: 0 }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
      {metrics.map((m, i) => {
        const status = getStatus(m.label, m.val);
        const activeColor = getColor(status, m.baseColor);
        const isAlert = status !== 'normal';
        const displayVal = m.val.toFixed(m.decimals);

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              borderColor: isAlert ? activeColor : '#ffffff',
              scale: status === 'critical' ? [1, 1.03, 1] : 1
            }}
            transition={{ 
              delay: i * 0.1,
              scale: { repeat: status === 'critical' ? Infinity : 0, duration: 1.5 }
            }}
            // LARGER CARDS: p-10 (extra padding) and rounded-[3rem]
            className="bg-white p-10 rounded-[3rem] shadow-2xl border-4 relative overflow-hidden group transition-all duration-700"
          >
            {/* Dynamic Alert Glow */}
            {isAlert && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                className="absolute inset-0 pointer-events-none animate-pulse" 
                style={{ backgroundColor: activeColor }}
              />
            )}

            <div className="flex items-center justify-between mb-10 relative z-10">
              <div 
                style={{ color: activeColor, backgroundColor: `${activeColor}15` }} 
                className="p-5 rounded-3xl transition-colors duration-500 scale-125"
              >
                {status === 'critical' ? <ShieldAlert size={32} /> : m.icon}
              </div>
              
              {isAlert && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ color: activeColor }}
                >
                  <AlertTriangle size={32} className="animate-bounce" />
                </motion.div>
              )}
            </div>

            <div className="relative z-10">
              <p className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] mb-2">
                {m.label}
              </p>
              
              <div className="flex items-baseline gap-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={displayVal}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ color: activeColor }}
                    className="text-6xl font-black tracking-tighter transition-colors duration-500"
                  >
                    {displayVal}
                  </motion.span>
                </AnimatePresence>
                <span className="text-xl font-bold text-gray-300">{m.unit}</span>
              </div>

              {/* THICKER PROGRESS BAR: h-4 */}
              <div className="mt-8 w-full bg-gray-100 h-4 rounded-full overflow-hidden shadow-inner">
                 <motion.div 
                   className="h-full transition-all duration-1000 ease-out" 
                   style={{ 
                     backgroundColor: activeColor,
                     width: m.label === 'Charge' ? `${m.val}%` : '80%' 
                   }}
                   initial={{ width: 0 }}
                   animate={{ width: m.label === 'Charge' ? `${m.val}%` : '80%' }}
                 />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  )
}