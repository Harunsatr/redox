import React, { useState } from 'react';
import { PageProps } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Zap, Search, RefreshCw, ChevronRight, CheckCircle, AlertCircle, Atom, ArrowLeft, ArrowRight } from 'lucide-react';

export const Introduction: React.FC<PageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState<string | null>(null);

  const tabs = [
    { id: 0, title: "1. Konsep Dasar", icon: <BookOpen size={18} /> },
    { id: 1, title: "2. Reaksi Redoks", icon: <Zap size={18} /> },
    { id: 2, title: "3. Bilangan Oksidasi", icon: <Search size={18} /> },
    { id: 3, title: "4. Penyetaraan", icon: <RefreshCw size={18} /> },
  ];

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple didactic logic for demonstration
    const db: Record<string, string> = {
      'H2O': 'H (+1), O (-2)', 'NACL': 'Na (+1), Cl (-1)', 'O2': 'O (0) [Unsur Bebas]',
      'CO2': 'C (+4), O (-2)', 'H2SO4': 'H (+1), S (+6), O (-2)', 'MN': 'Mn (0)',
      'FE2O3': 'Fe (+3), O (-2)'
    };
    setCalcResult(db[calcInput.toUpperCase()] || "Coba contoh: H2O, NaCl, O2, CO2, H2SO4, Fe2O3");
  };

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col font-sans">
      <div className="max-w-5xl mx-auto w-full px-4 py-8 flex-grow space-y-8">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button onClick={() => onNavigate('HOME')} className="text-brand-600 font-medium flex items-center gap-1 hover:underline mb-2">
              <ArrowLeft size={16} /> Kembali ke Menu
            </button>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">Teori Reaksi Redoks</h1>
            <p className="text-slate-600">Jelajahi konsep perpindahan elektron yang menakjubkan!</p>
          </div>
          <div className="flex bg-white p-1 rounded-xl shadow-sm overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all
                  ${activeTab === tab.id ? 'bg-brand-500 text-white shadow-md' : 'text-slate-500 hover:bg-brand-50 hover:text-brand-600'}`}
              >
                {tab.icon} {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-brand-100/50 border border-slate-100 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* SUB-MODUL 1: DEFINISI */}
              {activeTab === 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-brand-600 flex items-center gap-2">
                    <Atom /> Oksidasi & Reduksi
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                      <h3 className="font-bold text-orange-700 mb-2">Oksidasi (Pelepasan)</h3>
                      <p className="text-slate-600 text-sm mb-4">Atom melepaskan elektron, bilangan oksidasi naik.</p>
                      <div className="bg-white p-3 rounded-xl text-center font-mono text-orange-600 border border-orange-200">
                        Na → Na⁺ + e⁻
                      </div>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                      <h3 className="font-bold text-blue-700 mb-2">Reduksi (Penerimaan)</h3>
                      <p className="text-slate-600 text-sm mb-4">Atom menerima elektron, bilangan oksidasi turun.</p>
                      <div className="bg-white p-3 rounded-xl text-center font-mono text-blue-600 border border-blue-200">
                        Cl₂ + 2e⁻ → 2Cl⁻
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800 text-white p-6 rounded-2xl text-center">
                    <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">Ingat Mnemonic!</p>
                    <h3 className="text-4xl font-black text-brand-400 tracking-wider">OIL RIG</h3>
                    <div className="flex justify-center gap-8 mt-4 text-sm font-medium">
                      <span><span className="text-brand-400">O</span>xidation <span className="text-brand-400">I</span>s <span className="text-brand-400">L</span>oss</span>
                      <span><span className="text-blue-400">R</span>eduction <span className="text-blue-400">I</span>s <span className="text-blue-400">G</span>ain</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-MODUL 2: REAKSI REDOKS */}
              {activeTab === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-brand-600">Reaksi Redoks Sehari-hari</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { title: 'Perkaratan Besi', desc: 'Besi bereaksi dengan oksigen membentuk karat (Fe₂O₃).', color: 'bg-red-50 text-red-700' },
                      { title: 'Fotosintesis', desc: 'Reduksi CO₂ menjadi glukosa oleh tumbuhan.', color: 'bg-green-50 text-green-700' },
                      { title: 'Baterai', desc: 'Perubahan energi kimia menjadi listrik via transfer elektron.', color: 'bg-yellow-50 text-yellow-700' }
                    ].map((item, idx) => (
                      <div key={idx} className={`${item.color} p-5 rounded-2xl`}>
                        <h3 className="font-bold mb-2">{item.title}</h3>
                        <p className="text-sm opacity-90">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-800 mb-4">Simulasi Sederhana: Zn + Cu²⁺</h3>
                    <div className="flex items-center justify-center gap-4 text-lg font-mono">
                      <span className="p-2 bg-gray-300 rounded text-gray-800">Zn (s)</span>
                      <span>+</span>
                      <span className="p-2 bg-blue-100 rounded text-blue-600">Cu²⁺ (aq)</span>
                      <ArrowRight />
                      <span className="p-2 bg-gray-100 rounded text-gray-600 border border-gray-300">Zn²⁺ (aq)</span>
                      <span>+</span>
                      <span className="p-2 bg-orange-200 rounded text-orange-800">Cu (s)</span>
                    </div>
                    <p className="text-center text-sm text-slate-500 mt-4">
                      Seng (Zn) teroksidasi, Tembaga (Cu) tereduksi. Larutan biru memudar, endapan merah muncul.
                    </p>
                  </div>
                </div>
              )}

              {/* SUB-MODUL 3: BILOKS */}
              {activeTab === 2 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-2xl font-bold text-brand-600 mb-4">Aturan Biloks Utama</h2>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {[
                          'Unsur bebas (O₂, Fe) = 0',
                          'Ion monoatomik (Na⁺) = muatannya (+1)',
                          'Fluorin (F) selalu -1',
                          'Golongan IA = +1, IIA = +2',
                          'Hidrogen (H) umumnya +1 (kecuali hidrida logam)',
                          'Oksigen (O) umumnya -2 (kecuali peroksida)',
                          'Jumlah biloks senyawa netral = 0'
                        ].map((rule, i) => (
                          <li key={i} className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg">
                            <span className="bg-brand-200 text-brand-800 text-xs font-bold px-2 py-0.5 rounded-full mt-0.5">{i+1}</span>
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100">
                      <h3 className="font-bold text-brand-800 mb-4 flex items-center gap-2">
                        <Search size={20} /> Cek Biloks Cepat
                      </h3>
                      <form onSubmit={handleCalc} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-brand-600 uppercase mb-1">Rumus Kimia</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={calcInput}
                              onChange={(e) => setCalcInput(e.target.value)}
                              placeholder="Contoh: H2O, H2SO4"
                              className="flex-1 px-4 py-2 rounded-xl border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                            <button type="submit" className="bg-brand-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-brand-600">
                              Cek
                            </button>
                          </div>
                        </div>
                        {calcResult && (
                          <div className="bg-white p-4 rounded-xl border border-brand-200 shadow-sm">
                            <p className="font-mono text-brand-700 font-bold">{calcResult}</p>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-MODUL 4: PENYETARAAN */}
              {activeTab === 3 && (
                <div className="space-y-6">
                   <h2 className="text-2xl font-bold text-brand-600 mb-4">Metode Setengah Reaksi</h2>
                   <div className="space-y-4">
                    {[
                      { step: 1, text: 'Pisahkan reaksi menjadi dua setengah reaksi (Oksidasi & Reduksi).' },
                      { step: 2, text: 'Setarakan atom selain O dan H.' },
                      { step: 3, text: 'Setarakan O dengan menambahkan H₂O.' },
                      { step: 4, text: 'Setarakan H dengan menambahkan H⁺ (suasana asam).' },
                      { step: 5, text: 'Setarakan muatan dengan menambahkan elektron (e⁻).' }
                    ].map((s) => (
                      <div key={s.step} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold shrink-0">
                          {s.step}
                        </div>
                        <p className="text-slate-700 font-medium">{s.text}</p>
                      </div>
                    ))}
                   </div>
                   <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      <strong>Tips:</strong> Untuk suasana basa, tambahkan OH⁻ sejumlah H⁺ pada kedua ruas setelah langkah 4.
                    </p>
                   </div>
                   <div className="mt-4 text-center">
                    <button 
                      onClick={() => onNavigate('BALANCING')} 
                      className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-full font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200"
                    >
                      Coba Simulasi Penyetaraan <ChevronRight size={18} />
                    </button>
                   </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Footer specifically for this component */}
      <footer className="mt-auto py-8 bg-white border-t border-brand-100">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-1">
          <p className="font-bold text-slate-700 text-sm">Alisha Danastri Putri Utomo | 230331604046 | Offering B</p>
          <p className="text-slate-400 text-xs">Mata Kuliah Pengembangan Material Pembelajaran Berbasis Website</p>
        </div>
      </footer>
    </div>
  );
};