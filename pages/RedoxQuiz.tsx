import React, { useState } from 'react';
import { BrainCircuit, CheckCircle, XCircle, ArrowRight, RefreshCcw, Award, Lightbulb, ArrowLeft, Zap, HelpCircle, Star } from 'lucide-react';
import { PageProps } from '../types';

const questions = [
  {
    id: 1,
    type: 'choice',
    question: "Dalam jembatan keledai 'OIL RIG', apa arti dari OIL?",
    options: ["Oxidation Is Life", "Oxygen Is Liquid", "Oxidation Is Loss (of electrons)", "Oxygen Is Light"],
    correct: 2,
    explanation: "Tepat! OIL RIG berarti: Oxidation Is Loss (Oksidasi adalah pelepasan elektron)."
  },
  {
    id: 2,
    type: 'bool',
    question: "Benar atau Salah: Pada reaksi perkaratan besi, logam besi (Fe) bertindak sebagai Oksidator.",
    options: ["Benar", "Salah"],
    correct: 1,
    explanation: "Salah. Besi (Fe) mengalami oksidasi, jadi ia adalah Reduktor (Pereduksi)."
  },
  {
    id: 3,
    type: 'choice',
    question: "Jika sebuah atom Natrium (Na) berubah menjadi ion Na⁺, apa yang sebenarnya terjadi?",
    options: ["Na menerima 1 elektron", "Na melepas 1 elektron", "Na melepas 1 proton", "Tidak ada perubahan"],
    correct: 1,
    explanation: "Na menjadi Na⁺ artinya muatan positifnya bertambah karena ia kehilangan 1 elektron negatif."
  },
  {
    id: 4,
    type: 'choice',
    question: "Di dalam sel Galvani, elektron mengalir dari mana ke mana?",
    options: ["Dari Katoda (+) ke Anoda (-)", "Dari Anoda (-) ke Katoda (+)", "Diam saja", "Dari larutan ke kawat"],
    correct: 1,
    explanation: "Elektron selalu mengalir dari kutub negatif (Anoda) menuju kutub positif (Katoda)."
  },
  {
    id: 5,
    type: 'choice',
    question: "Manakah zat di bawah ini yang bilangan oksidasinya NOL?",
    options: ["H₂O", "Fe³⁺", "O₂ (Gas Oksigen)", "NaCl"],
    correct: 2,
    explanation: "Unsur bebas yang berdiri sendiri seperti O₂ memiliki biloks 0."
  }
];

const RedoxQuiz: React.FC<PageProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleOptionClick = (index: number) => {
    if (!isChecked) setSelectedOption(index);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setIsChecked(true);
    if (selectedOption === currentQuestion.correct) setScore(score + 1);
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

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col font-sans">
      <div className="max-w-3xl mx-auto w-full px-4 py-8 flex-grow space-y-8">
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
          </div>
        </div>

        {!showResult ? (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative">
            <div className="w-full h-2 bg-slate-100">
              <div 
                className="h-full bg-brand-500 transition-all duration-500 ease-out"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">{currentQuestion.question}</h2>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  let containerClass = "border-slate-200 hover:border-brand-300 hover:bg-brand-50";
                  let icon = <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>;

                  if (isChecked) {
                    if (index === currentQuestion.correct) {
                      containerClass = "bg-green-50 border-green-500 text-green-800";
                      icon = <CheckCircle className="text-green-600 w-5 h-5" />;
                    } else if (index === selectedOption && index !== currentQuestion.correct) {
                      containerClass = "bg-red-50 border-red-500 text-red-800 opacity-80";
                      icon = <XCircle className="text-red-600 w-5 h-5" />;
                    } else {
                      containerClass = "border-slate-100 text-slate-400 opacity-50";
                    }
                  } else if (selectedOption === index) {
                    containerClass = "border-brand-500 bg-brand-50 text-brand-900 shadow-md ring-1 ring-brand-500";
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

              {isChecked && (
                <div className="bg-slate-50 border-l-4 border-brand-500 p-4 rounded-r-xl flex items-start gap-3">
                  <Lightbulb className="text-brand-500 shrink-0 mt-1" />
                  <div>
                    <p className={`font-bold mb-1 ${selectedOption === currentQuestion.correct ? 'text-green-600' : 'text-orange-600'}`}>
                      {selectedOption === currentQuestion.correct ? "Jawaban Benar!" : "Kurang Tepat..."}
                    </p>
                    <p className="text-slate-700 leading-relaxed">{currentQuestion.explanation}</p>
                  </div>
                </div>
              )}

              <div className="pt-4">
                {!isChecked ? (
                  <button
                    onClick={handleCheck}
                    disabled={selectedOption === null}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2
                      ${selectedOption !== null ? 'bg-brand-600 hover:bg-brand-700 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
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
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center space-y-8">
            <div className="flex justify-center">
              <Award size={80} className="text-brand-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-800">Selesai!</h2>
              <p className="text-slate-500">Skor Akhir Kamu: {percentage}%</p>
            </div>
            <button
              onClick={handleRestart}
              className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2"
            >
              <RefreshCcw size={20} /> Ulangi Asesmen
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RedoxQuiz;