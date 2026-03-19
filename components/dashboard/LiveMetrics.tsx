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
  
  // Define individual hardware safety thresholds
  const getStatus = (label: string, val: number) => {
    switch (label) {
      case 'Voltage':
        if (val > 12.6 || val < 9.0) return 'critical'; // Over/Under voltage
        if (val > 12.4 || val < 9.5) return 'warning';
        return 'normal';
      case 'Current':
        if (val > 2.5) return 'critical'; // MAX_CHARGE_A limit
        if (val > 2.0) return 'warning';
        return 'normal';
      case 'Temperature':
        if (val >= 50.0) return 'critical'; // MAX_TEMP_C limit
        if (val >= 45.0) return 'warning';
        return 'normal';
      case 'Charge':
        if (val < 15) return 'critical';
        if (val < 25) return 'warning';
        return 'normal';
      default:
        return 'normal';
    }
  }

  const getColor = (status: string, defaultColor: string) => {
    if (status === 'critical') return '#ef4444'; // Bright Red
    if (status === 'warning') return '#f59e0b';  // Amber/Orange
    return defaultColor;
  }

  const metrics = [
    { label: 'Voltage', val: voltage.toFixed(2), unit: 'V', icon: <Zap />, baseColor: '#ff9800' },
    { label: 'Current', val: current.toFixed(2), unit: 'A', icon: <Activity />, baseColor: '#9c27b0' },
    { label: 'Temperature', val: temperature.toFixed(1), unit: '°C', icon: <Thermometer />, baseColor: '#3b82f6' },
    { label: 'Charge', val: soc, unit: '%', icon: <Battery />, baseColor: '#00bcd4' },
    { label: 'Health', val: '98', unit: '%', icon: <HeartPulse />, baseColor: '#e91e63' }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      {metrics.map((m, i) => {
        const status = getStatus(m.label, parseFloat(m.val.toString()));
        const activeColor = getColor(status, m.baseColor);
        const isAlert = status !== 'normal';

        return (
          <motion.div
            key={i}
            animate={{ 
              borderColor: isAlert ? activeColor : '#f3f4f6',
              scale: status === 'critical' ? [1, 1.02, 1] : 1
            }}
            transition={{ repeat: status === 'critical' ? Infinity : 0, duration: 1 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-xl border-4 relative overflow-hidden group transition-all duration-500"
          >
            {/* Warning Background Glow */}
            {isAlert && (
              <div 
                className="absolute inset-0 opacity-10 animate-pulse" 
                style={{ backgroundColor: activeColor }}
              />
            )}

            <div className="flex items-center justify-between mb-8 relative z-10">
              <div 
                style={{ color: activeColor, backgroundColor: `${activeColor}15` }} 
                className="p-4 rounded-2xl transition-colors duration-500"
              >
                {status === 'critical' ? <ShieldAlert size={28} /> : m.icon}
              </div>
              
              {isAlert && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ color: activeColor }}
                >
                  <AlertTriangle size={24} className="animate-bounce" />
                </motion.div>
              )}
            </div>

            <div className="relative z-10">
              <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                {m.label} {isAlert && `- ${status.toUpperCase()}`}
              </p>
              
              <div className="flex items-baseline gap-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={m.val}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ color: activeColor }}
                    className="text-5xl font-black transition-colors duration-500"
                  >
                    {m.val}
                  </motion.span>
                </AnimatePresence>
                <span className="text-lg font-bold text-gray-400">{m.unit}</span>
              </div>

              {/* Dynamic Progress Bar */}
              <div className="mt-6 w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full transition-colors duration-500" 
                   style={{ 
                     backgroundColor: activeColor,
                     width: m.label === 'Charge' ? `${soc}%` : '70%' 
                   }}
                   initial={{ width: 0 }}
                   animate={{ width: m.label === 'Charge' ? `${soc}%` : '70%' }}
                 />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  )
}