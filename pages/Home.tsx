import React from 'react';
import { PageProps } from '../types';
import { ArrowRight, BookOpen, FlaskConical, Search, ClipboardList, Atom } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home: React.FC<PageProps> = ({ onNavigate }) => {
  // Animation variants for smooth entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col bg-brand-50">
      <motion.div 
        className="flex-grow w-full max-w-5xl mx-auto px-4 py-8 md:py-16 space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Header Section */}
        <motion.section variants={itemVariants} className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-block p-4 bg-orange-100 rounded-2xl mb-2 rotate-3 hover:rotate-6 transition-transform duration-300">
            <Atom size={48} className="text-brand-600" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
              Petualangan <span className="text-brand-600 inline-block transform hover:scale-105 transition-transform cursor-default">Reaksi Redoks</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Mengapa apel berubah warna menjadi cokelat? Bagaimana baterai HP-mu bekerja? 
              Temukan rahasia perpindahan elektron yang mengubah dunia di sekitarmu!
            </p>
          </div>

          <div className="pt-4">
            <button 
              onClick={() => onNavigate('INTRODUCTION')}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white text-lg font-bold rounded-2xl shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              aria-label="Mulai belajar tentang Reaksi Redoks"
            >
              <span className="relative z-10 flex items-center gap-2">
                Apa itu Reaksi Redoks?
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </motion.section>

        {/* Modules Navigation Section */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ModuleCard 
            title="Teori Reaksi Redoks"
            icon={<BookOpen size={28} className="text-blue-500" />}
            onClick={() => onNavigate('INTRODUCTION')}
            colorClass="bg-blue-50 hover:border-blue-200 hover:shadow-blue-100"
          />
          <ModuleCard 
            title="Simulasi"
            icon={<FlaskConical size={28} className="text-purple-500" />}
            onClick={() => onNavigate('SIMULATION')}
            colorClass="bg-purple-50 hover:border-purple-200 hover:shadow-purple-100"
          />
          <ModuleCard 
            title="Studi Kasus"
            icon={<Search size={28} className="text-emerald-500" />}
            onClick={() => onNavigate('OXIDATION_NUMBER')}
            colorClass="bg-emerald-50 hover:border-emerald-200 hover:shadow-emerald-100"
          />
          <ModuleCard 
            title="Latihan & Evaluasi"
            icon={<ClipboardList size={28} className="text-rose-500" />}
            onClick={() => onNavigate('QUIZ')}
            colorClass="bg-rose-50 hover:border-rose-200 hover:shadow-rose-100"
          />
        </motion.section>

      </motion.div>

      {/* Footer specifically for the Landing Page */}
      <footer className="mt-auto py-12 bg-white border-t border-brand-100">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-2">
          <p className="font-bold text-slate-700">Alisha Danastri Putri Utomo | 230331604046 | Offering B</p>
          <p className="text-slate-500 text-sm font-medium">Mata Kuliah Pengembangan Material Pembelajaran Berbasis Website</p>
        </div>
      </footer>
    </div>
  );
};

// Helper Component for Cards to keep code clean
interface ModuleCardProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  colorClass: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, icon, onClick, colorClass }) => (
  <button 
    onClick={onClick}
    className={`
      ${colorClass}
      relative p-6 rounded-3xl border border-transparent 
      transition-all duration-300 text-left w-full group 
      hover:bg-white hover:shadow-xl hover:-translate-y-1
    `}
  >
    <div className="flex items-start justify-between mb-6">
      <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-slate-300">
        <ArrowRight size={24} />
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="text-xl font-bold text-slate-800 group-hover:text-brand-600 transition-colors">{title}</h3>
    </div>
  </button>
);