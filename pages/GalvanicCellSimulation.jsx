import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, Zap, ArrowLeft, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- CONSTANTS ---
const ELECTRODES = {
  Zn: { name: 'Zinc (Zn)', E0: -0.76, color: '#9ca3af' }, // Gray
  Fe: { name: 'Iron (Fe)', E0: -0.44, color: '#78350f' }, // Rust
  Cu: { name: 'Copper (Cu)', E0: 0.34, color: '#d97706' }, // Bronze/Orange
  Mg: { name: 'Magnesium (Mg)', E0: -2.37, color: '#e5e7eb' }, // White/Silver
};

// Simplified Nernst Equation: E = E0 - (0.059/n) * log(Q)
// Assuming n=2 for all pairs (Zn2+, Cu2+, etc) for simplicity in HS level
const calculateVoltage = (anodeKey, cathodeKey, concAnode, concCathode) => {
  const E_cell_std = ELECTRODES[cathodeKey].E0 - ELECTRODES[anodeKey].E0;
  // Q = [Anode] / [Cathode]
  const Q = concAnode / concCathode;
  const correction = (0.059 / 2) * Math.log10(Q);
  return Math.max(0, (E_cell_std - correction).toFixed(3));
};

const GalvanicCellSimulation = ({ onNavigate }) => {
  // --- STATE ---
  const [pair, setPair] = useState('Zn-Cu'); // "Anode-Cathode"
  const [concAnode, setConcAnode] = useState(1.0);
  const [concCathode, setConcCathode] = useState(1.0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const timerRef = useRef(null);

  // Derived state
  const [anodeKey, cathodeKey] = pair.split('-');
  const voltage = calculateVoltage(anodeKey, cathodeKey, concAnode, concCathode);
  
  // --- EFFECTS ---
  // Timer for graph and simulation time
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prev => {
          const newTime = prev + 1;
          setGraphData(curr => {
            const newData = [...curr, { time: newTime, voltage: parseFloat(voltage) }];
            return newData.slice(-30); // Keep last 30 points for performance
          });
          return newTime;
        });
      }, 500); // Update every 500ms
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, voltage]);

  // Reset graph when configuration changes manually
  useEffect(() => {
    if (!isRunning && time === 0) {
      setGraphData([{ time: 0, voltage: parseFloat(voltage) }]);
    }
  }, [pair, concAnode, concCathode, voltage, isRunning, time]);

  // --- HANDLERS ---
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setGraphData([{ time: 0, voltage: parseFloat(voltage) }]);
    setConcAnode(1.0);
    setConcCathode(1.0);
  };

  // --- VISUALIZATION HELPERS ---
  // CSS Animation state for electrons
  const animState = isRunning ? 'running' : 'paused';

  return (
    <div className="w-full min-h-screen bg-brand-50 flex flex-col font-sans">
      <div className="flex-grow p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-brand-100">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('HOME')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft size={24} className="text-slate-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Simulasi Sel Galvani</h1>
              <p className="text-slate-500 text-sm">Eksplorasi hubungan reaksi redoks dan listrik</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-brand-100 px-4 py-2 rounded-xl">
            <Zap className="text-brand-600 fill-brand-600" size={20} />
            <span className="text-2xl font-mono font-bold text-brand-700">{voltage} V</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 1. LEFT PANEL: CONTROL */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 space-y-6 h-fit">
            <div className="flex items-center gap-2 text-brand-600 font-bold border-b border-slate-100 pb-2">
              <Settings size={20} /> Panel Kontrol
            </div>

            {/* Electrode Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Pasangan Elektroda</label>
              <select 
                value={pair} 
                onChange={(e) => { setIsRunning(false); setPair(e.target.value); }}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-400 outline-none"
              >
                <option value="Zn-Cu">Zn (Anoda) | Cu (Katoda)</option>
                <option value="Fe-Cu">Fe (Anoda) | Cu (Katoda)</option>
                <option value="Mg-Cu">Mg (Anoda) | Cu (Katoda)</option>
              </select>
            </div>

            {/* Concentration Sliders */}
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Konsentrasi Anoda ({anodeKey}²⁺)</span>
                  <span className="font-mono font-bold text-brand-600">{concAnode} M</span>
                </div>
                <input 
                  type="range" min="0.1" max="1.0" step="0.1" 
                  value={concAnode} 
                  onChange={(e) => setConcAnode(parseFloat(e.target.value))}
                  className="w-full accent-brand-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Konsentrasi Katoda ({cathodeKey}²⁺)</span>
                  <span className="font-mono font-bold text-brand-600">{concCathode} M</span>
                </div>
                <input 
                  type="range" min="0.1" max="1.0" step="0.1" 
                  value={concCathode} 
                  onChange={(e) => setConcCathode(parseFloat(e.target.value))}
                  className="w-full accent-brand-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              {!isRunning ? (
                <button 
                  onClick={() => setIsRunning(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white py-3 rounded-xl font-bold transition-all"
                >
                  <Play size={18} fill="currentColor" /> Start
                </button>
              ) : (
                <button 
                  onClick={() => setIsRunning(false)}
                  className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-bold transition-all"
                >
                  <Pause size={18} fill="currentColor" /> Pause
                </button>
              )}
              <button 
                onClick={handleReset}
                className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors"
              >
                <RotateCcw size={20} />
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm space-y-2 text-blue-800">
              <div className="flex items-center gap-2 font-bold"><Info size={16}/> Konsep Penting</div>
              <ul className="list-disc pl-4 space-y-1 opacity-90">
                <li>Oksidasi terjadi di <strong>Anoda (-)</strong>, elektron dilepas.</li>
                <li>Reduksi terjadi di <strong>Katoda (+)</strong>, elektron diterima.</li>
                <li>Elektron mengalir dari Anoda ke Katoda.</li>
                <li>Potensial sel bergantung pada jenis logam dan konsentrasi.</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* 2. VISUALIZATION (SVG) */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-4 relative overflow-hidden min-h-[300px] flex items-center justify-center">
               <svg viewBox="0 0 600 350" className="w-full h-full max-w-lg">
                  {/* Definitions */}
                  <defs>
                    <linearGradient id="gradAnode" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.9"/>
                    </linearGradient>
                    <linearGradient id="gradCathode" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#fed7aa" stopOpacity="0.9"/>
                    </linearGradient>
                  </defs>

                  {/* Wire Path */}
                  <path 
                    d="M 150 120 V 50 H 450 V 120" 
                    fill="none" 
                    stroke="#475569" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                  />
                  
                  {/* Voltmeter */}
                  <circle cx="300" cy="50" r="25" fill="#f8fafc" stroke="#475569" strokeWidth="3" />
                  <text x="300" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">{voltage}V</text>

                  {/* Salt Bridge */}
                  <path 
                    d="M 230 150 V 100 Q 300 60 370 100 V 150" 
                    fill="none" 
                    stroke="#e2e8f0" 
                    strokeWidth="24" 
                    strokeLinecap="round"
                    className="opacity-80"
                  />
                  <path 
                    d="M 230 150 V 100 Q 300 60 370 100 V 150" 
                    fill="none" 
                    stroke="#94a3b8" 
                    strokeWidth="20" 
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                    className="opacity-30"
                  />

                  {/* Beaker Left (Anode) */}
                  <rect x="80" y="150" width="140" height="180" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
                  <rect x="85" y="160" width="130" height="165" rx="5" fill="url(#gradAnode)" />
                  {/* Electrode Left */}
                  <rect x="130" y="120" width="40" height="150" fill={ELECTRODES[anodeKey].color} stroke="#334155" strokeWidth="1" rx="2" />
                  <text x="150" y="300" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">- Anoda ({anodeKey})</text>
                  
                  {/* Beaker Right (Cathode) */}
                  <rect x="380" y="150" width="140" height="180" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
                  <rect x="385" y="160" width="130" height="165" rx="5" fill="url(#gradCathode)" />
                  {/* Electrode Right */}
                  <rect x="430" y="120" width="40" height="150" fill={ELECTRODES[cathodeKey].color} stroke="#334155" strokeWidth="1" rx="2" />
                  <text x="450" y="300" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">+ Katoda ({cathodeKey})</text>

                  {/* Flowing Electrons */}
                  {/* We use circles animating along the wire path */}
                  <circle r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="1">
                    <animateMotion 
                      dur="2s" 
                      repeatCount="indefinite" 
                      path="M 150 120 V 50 H 450 V 120"
                      calcMode="linear"
                      keyPoints="0;1"
                      keyTimes="0;1"
                    />
                    {/* Control animation via style in React is tricky for SMIL, so we use CSS class for opacity/display logic */}
                    <animate attributeName="opacity" values={isRunning ? "1" : "0"} dur="0.1s" fill="freeze" />
                  </circle>
                  
                  <circle r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="1">
                    <animateMotion 
                      dur="2s" 
                      begin="0.6s"
                      repeatCount="indefinite" 
                      path="M 150 120 V 50 H 450 V 120"
                      calcMode="linear"
                    />
                    <animate attributeName="opacity" values={isRunning ? "1" : "0"} dur="0.1s" fill="freeze" />
                  </circle>

                  <circle r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="1">
                    <animateMotion 
                      dur="2s" 
                      begin="1.3s"
                      repeatCount="indefinite" 
                      path="M 150 120 V 50 H 450 V 120"
                      calcMode="linear"
                    />
                     <animate attributeName="opacity" values={isRunning ? "1" : "0"} dur="0.1s" fill="freeze" />
                  </circle>

                  {/* Labels */}
                  <text x="300" y="30" textAnchor="middle" fontSize="12" fill="#64748b">Arah Aliran Elektron</text>
                  <text x="150" y="110" textAnchor="middle" fontSize="12" fill="#64748b">Oksidasi</text>
                  <text x="450" y="110" textAnchor="middle" fontSize="12" fill="#64748b">Reduksi</text>

               </svg>
            </div>

            {/* 3. REAL-TIME GRAPH */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex-grow min-h-[250px] flex flex-col">
              <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                <Zap size={18} className="text-brand-500" /> Grafik Potensial Sel (Real-time)
              </h3>
              <div className="flex-grow w-full h-full">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="time" 
                      label={{ value: 'Waktu (s)', position: 'insideBottomRight', offset: -5 }} 
                      stroke="#94a3b8"
                      tick={{fontSize: 12}}
                    />
                    <YAxis 
                      domain={[0, 'auto']} 
                      label={{ value: 'Volt (V)', angle: -90, position: 'insideLeft' }} 
                      stroke="#94a3b8"
                      tick={{fontSize: 12}}
                    />
                    <Tooltip 
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                      labelStyle={{color: '#64748b'}}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="voltage" 
                      stroke="#f97316" 
                      strokeWidth={3} 
                      dot={false}
                      activeDot={{ r: 6 }}
                      isAnimationActive={false} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-auto py-8 bg-white border-t border-brand-100">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-1">
          <p className="font-bold text-slate-700 text-sm">Alisha Danastri Putri Utomo | 230331604046 | Offering B</p>
          <p className="text-slate-400 text-xs">Mata Kuliah Pengembangan Material Pembelajaran Berbasis Website</p>
        </div>
      </footer>
    </div>
  );
};

export default GalvanicCellSimulation;