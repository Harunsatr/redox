import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RefreshCcw, 
  Award, 
  Lightbulb, 
  ArrowLeft,
  Zap,
  HelpCircle,
  Star
} from 'lucide-react';

// --- DATA SOAL ---
const questions = [
  {
    id: 1,
    type: 'choice',
    question: "Dalam jembatan keledai 'OIL RIG', apa arti dari OIL?",
    options: [
      "Oxidation Is Life",
      "Oxygen Is Liquid",
      "Oxidation Is Loss (of electrons)",
      "Oxygen Is Light"
    ],
    correct: 2,
    explanation: "Tepat! OIL RIG berarti: Oxidation Is Loss (Oksidasi adalah pelepasan elektron) dan Reduction Is Gain (Reduksi adalah pengikatan elektron)."
  },
  {
    id: 2,
    type: 'bool',
    question: "Benar atau Salah: Pada reaksi perkaratan besi, logam besi (Fe) bertindak sebagai Oksidator.",
    options: ["Benar", "Salah"],
    correct: 1,
    explanation: "Salah. Besi (Fe) mengalami oksidasi (melepas elektron), jadi ia adalah Reduktor (Pereduksi). Oksigen-lah yang bertindak sebagai Oksidator."
  },
  {
    id: 3,
    type: 'choice',
    question: "Jika sebuah atom Natrium (Na) berubah menjadi ion Na⁺, apa yang sebenarnya terjadi?",
    options: [
      "Na menerima 1 elektron (Reduksi)",
      "Na melepas 1 elektron (Oksidasi)",
      "Na melepas 1 proton",
      "Tidak terjadi perubahan elektron"
    ],
    correct: 1,
    explanation: "Na menjadi Na⁺ artinya muatan positifnya bertambah (naik) karena ia kehilangan (melepas) 1 elektron negatif."
  },
  {
    id: 4,
    type: 'choice',
    question: "Di dalam sel Galvani (seperti baterai), elektron mengalir dari mana ke mana?",
    options: [
      "Dari Katoda (+) ke Anoda (-)",
      "Dari Anoda (-) ke Katoda (+)",
      "Dari larutan ke kawat",
      "Elektron diam saja"
    ],
    correct: 1,
    explanation: "Elektron selalu mengalir dari kutub negatif (Anoda, tempat oksidasi) menuju kutub positif (Katoda, tempat reduksi)."
  },
  {
    id: 5,
    type: 'choice',
    question: "Manakah zat di bawah ini yang bilangan oksidasinya NOL?",
    options: [
      "H₂O",
      "Fe³⁺",
      "O₂ (Gas Oksigen)",
      "NaCl"
    ],
    correct: 2,
    explanation: "Unsur bebas yang berdiri sendiri (tidak berikatan dengan unsur lain) seperti O₂, N₂, atau Fe (logam murni) selalu memiliki biloks 0."
  }
];

const RedoxQuiz = ({ onNavigate }) => {
  // --- STATE ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  // --- HANDLERS ---
  const handleOptionClick = (index) => {
    if (!isChecked) {
      setSelectedOption(index);
    }
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    
    setIsChecked(true);
    if (selectedOption === currentQuestion.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResult(true);
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsChecked(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
    setScore(0);
    setShowResult(false);
  };

  // --- RESULT CALCULATION ---
  const percentage = Math.round((score / questions.length) * 100);
  let feedbackMessage = "";
  let feedbackColor = "";

  if (percentage === 100) {
    feedbackMessage = "Luar Biasa! Kamu Ahli Redoks Sejati! 🌟";
    feedbackColor = "text-orange-600";
  } else if (percentage >= 60) {
    feedbackMessage = "Hebat! Kamu sudah paham konsep dasarnya. 👍";
    feedbackColor = "text-blue-600";
  } else {
    feedbackMessage = "Tetap Semangat! Coba pelajari materinya lagi ya. 💪";
    feedbackColor = "text-slate-600";
  }

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-brand-50 flex flex-col font-sans">
      <div className="max-w-3xl mx-auto w-full px-4 py-8 flex-grow space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-auto flex justify-start">
            <button onClick={() => onNavigate('HOME')} className="text-brand-600 font-medium flex items-center gap-1 hover:underline">
              <ArrowLeft size={16} /> Kembali
            </button>
          </div>
          <div className="text-center md:text-right">
            <h1 className="text-3xl font-extrabold text-slate-800 flex items-center justify-center md:justify-end gap-2">
              <BrainCircuit className="text-brand-500" /> Uji Pemahaman Redoks
            </h1>
            <p className="text-slate-600 text-sm flex items-center justify-center md:justify-end gap-1">
              Yuk, cek sejauh mana kamu memahami petualangan redoks! <Star size={14} className="text-yellow-500 fill-yellow-500"/>
            </p>
          </div>
        </div>

        {/* Content Area */}
        {!showResult ? (
          <div className="bg-white rounded-3xl shadow-xl shadow-orange-100/50 border border-slate-100 overflow-hidden relative">
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-100">
              <div 
                className="h-full bg-brand-500 transition-all duration-500 ease-out"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {/* Question Header */}
              <div className="flex justify-between items-center text-sm font-bold text-slate-400 uppercase tracking-wider">
                <span>Soal {currentIndex + 1} dari {questions.length}</span>
                <span className="flex items-center gap-1"><HelpCircle size={16}/> Quiz</span>
              </div>

              {/* Question Text */}
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  // Determine visuals based on state
                  let containerClass = "border-slate-200 hover:border-brand-300 hover:bg-brand-50";
                  let icon = <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>;

                  if (isChecked) {
                    if (index === currentQuestion.correct) {
                      // Correct Answer
                      containerClass = "bg-green-50 border-green-500 text-green-800";
                      icon = <CheckCircle className="text-green-600 w-5 h-5" />;
                    } else if (index === selectedOption && index !== currentQuestion.correct) {
                      // Wrong Selection
                      containerClass = "bg-red-50 border-red-500 text-red-800 opacity-80";
                      icon = <XCircle className="text-red-600 w-5 h-5" />;
                    } else {
                      // Other options
                      containerClass = "border-slate-100 text-slate-400 opacity-50";
                    }
                  } else if (selectedOption === index) {
                    // Selected state before checking
                    containerClass = "border-brand-500 bg-brand-50 text-brand-900 shadow-md shadow-brand-100 ring-1 ring-brand-500";
                    icon = <div className="w-5 h-5 rounded-full border-4 border-brand-500 bg-white"></div>;
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(index)}
                      disabled={isChecked}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${containerClass}`}
                    >
                      <div className="shrink-0">{icon}</div>
                      <span className="font-medium text-lg">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Section (Animated) */}
              {isChecked && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300 bg-slate-50 border-l-4 border-brand-500 p-4 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="text-brand-500 shrink-0 mt-1" />
                    <div>
                      <p className={`font-bold mb-1 ${selectedOption === currentQuestion.correct ? 'text-green-600' : 'text-orange-600'}`}>
                        {selectedOption === currentQuestion.correct ? "Jawaban Benar!" : "Kurang Tepat..."}
                      </p>
                      <p className="text-slate-700 leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-4">
                {!isChecked ? (
                  <button
                    onClick={handleCheck}
                    disabled={selectedOption === null}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2
                      ${selectedOption !== null 
                        ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-200 translate-y-0' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                    `}
                  >
                    Cek Jawaban <Zap size={20} className={selectedOption !== null ? "fill-white" : ""} />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    {isLastQuestion ? "Lihat Hasil" : "Pertanyaan Selanjutnya"} <ArrowRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          // --- RESULT SCREEN ---
          <div className="bg-white rounded-3xl shadow-xl shadow-orange-100/50 border border-slate-100 p-8 text-center space-y-8 animate-in zoom-in duration-300">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <Award size={80} className="text-brand-500 relative z-10" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-800">Selesai!</h2>
              <p className="text-slate-500">Skor Akhir Kamu</p>
              <div className="text-6xl font-black text-brand-600 tracking-tight my-4">
                {percentage}%
              </div>
              <p className={`text-lg font-medium ${feedbackColor}`}>
                {feedbackMessage}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="text-center">
                <div className="text-sm text-slate-400 uppercase font-bold">Benar</div>
                <div className="text-2xl font-bold text-green-600">{score}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-400 uppercase font-bold">Salah</div>
                <div className="text-2xl font-bold text-red-500">{questions.length - score}</div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleRestart}
                className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-brand-200 flex items-center justify-center gap-2"
              >
                <RefreshCcw size={20} /> Ulangi Asesmen
              </button>
            </div>
          </div>
        )}

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

export default RedoxQuiz;