import React from 'react';
import { PageName } from '../types';
import { Atom, Home, BookOpen, BrainCircuit } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: PageName) => void;
  currentPage: PageName;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const navItems: { label: string; page: PageName; icon: React.ReactNode }[] = [
    { label: 'Home', page: 'HOME', icon: <Home size={18} /> },
    { label: 'Learn', page: 'INTRODUCTION', icon: <BookOpen size={18} /> },
    { label: 'Quiz', page: 'QUIZ', icon: <BrainCircuit size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-brand-100 shadow-sm transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Area */}
        <button 
          onClick={() => onNavigate('HOME')}
          className="flex items-center gap-2 group"
        >
          <div className="p-2 bg-brand-100 rounded-xl group-hover:bg-brand-200 transition-colors">
            <Atom className="text-brand-600" size={24} />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-800">
            Redox<span className="text-brand-600">Explorer</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${currentPage === item.page 
                  ? 'bg-brand-100 text-brand-700 shadow-inner' 
                  : 'text-slate-500 hover:text-brand-600 hover:bg-brand-50'}
              `}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Icon (Placeholder for simplicity, relying on bottom props or direct logic if needed) */}
        <div className="md:hidden text-xs text-brand-400 font-medium">
          Start Learning
        </div>
      </div>
    </header>
  );
};