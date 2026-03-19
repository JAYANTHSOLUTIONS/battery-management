'use client'

import { useState, useEffect } from 'react'
import HeroSection from './dashboard/HeroSection'
import LiveMetrics from './dashboard/LiveMetrics'
import ChargingStatus from './dashboard/ChargingStatus'
import LiveConsole from './dashboard/LiveConsole'

/**
 * HARDWARE CONNECTION CONFIG
 * Auth Token: LEetF1FDQbcR7A5pAR9Hlbb1i-ijz5xc
 * Template: hybrid BMS
 */
const BLYNK_AUTH_TOKEN = "LEetF1FDQbcR7A5pAR9Hlbb1i-ijz5xc"; 
const BLYNK_API_URL = `https://blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}`;

export default function Dashboard() {
  const [telemetry, setTelemetry] = useState({
    voltage: 0,
    current: 0,
    temperature: 0,
    soc: 0,
    charging: false,
    fault: false,
    online: false
  })

  useEffect(() => {
    /**
     * REAL-TIME HARDWARE SYNC
     * This effect fetches the virtual pins exactly as defined in the ESP32 code:
     * V0: Voltage | V1: Current | V2: Temp | V3: SoC | V4: Relay | V5: Fault
     */
    const syncHardware = async () => {
      try {
        const res = await fetch(`${BLYNK_API_URL}&V0&V1&V2&V3&V4&V5`);
        if (!res.ok) throw new Error('Blynk Cloud Unreachable');
        
        const data = await res.json();

        setTelemetry({
          voltage: parseFloat(data.V0) || 0,      //
          current: parseFloat(data.V1) || 0,      //
          temperature: parseFloat(data.V2) || 0,  //
          soc: Math.round(parseFloat(data.V3)) || 0, //
          charging: data.V4 === "1",              // Relay Source
          fault: data.V5 === "1",                 // Safety Status
          online: true
        });
      } catch (err) {
        setTelemetry(prev => ({ ...prev, online: false }));
        console.error("Hardware Stream Offline:", err);
      }
    };

    // 1-second pulse to match the ESP32 BlynkTimer
    const stream = setInterval(syncHardware, 1000);
    return () => clearInterval(stream);
  }, []);

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#efefef' }}>
      <HeroSection />

      <div className="max-w-7xl mx-auto px-6">
        {/* Requirement-Driven Metrics Grid */}
        <div className="-mt-12 mb-8 relative z-10">
          <LiveMetrics 
            voltage={telemetry.voltage} 
            current={telemetry.current} 
            temperature={telemetry.temperature} 
            soc={telemetry.soc} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Relay Control Status based on V4 */}
          <div className="md:col-span-1">
            <ChargingStatus 
              source={telemetry.charging ? 'solar' : 'grid'} 
              isFault={telemetry.fault} 
            />
          </div>

          {/* Real-time Hardware Console */}
          <div className="md:col-span-2">
            <LiveConsole 
              voltage={telemetry.voltage} 
              temperature={telemetry.temperature} 
              current={telemetry.current}
              source={telemetry.charging ? 'solar' : 'grid'}
            />
          </div>
        </div>

        {/* Connection Footer */}
        <div className="flex items-center justify-between py-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div 
              className={`w-2 h-2 rounded-full ${telemetry.online ? 'bg-[#01bb88] animate-pulse' : 'bg-red-500'}`} 
            />
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              {telemetry.online ? 'ESP32 Stream Live' : 'Hardware Disconnected'}
            </p>
          </div>
          <p className="text-[10px] font-mono text-gray-400">
            Node: ESP32_BMS_CONTROLLER // Auth: LEetF1FD...ijz5xc
          </p>
        </div>
      </div>
    </div>
  )
}