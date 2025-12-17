import React, { useState } from 'react';
import { Scroll, Star, BookOpen, MessageCircle, ArrowLeft, CheckCircle2, XCircle, Feather, Flame, Shield } from 'lucide-react';

const RedoxStory = ({ onNavigate }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const toggleExplanation = () => setShowExplanation(!showExplanation);

  const handleAnswer = (questionId, option) => {
    const isCorrect = option.isCorrect;
    setAnswers({ ...answers, [questionId]: option.id });
    setFeedback({ ...feedback, [questionId]: isCorrect });
  };

  const questions = [
    {
      id: 'q1',
      text: "Dalam cerita di atas, siapa yang berperan sebagai zat yang mengalami Oksidasi?",
      options: [
        { id: 'a', text: "Penyihir Oksigen", isCorrect: false },
        { id: 'b', text: "Pangeran Besi", isCorrect: true },
        { id: 'c', text: "Permata Elektron", isCorrect: false }
      ]
    },
    {
      id: 'q2',
      text: "Apa yang terjadi pada 'Permata Elektron' milik Pangeran Besi?",
      options: [
        { id: 'a', text: "Disimpan dalam brankas", isCorrect: false },
        { id: 'b', text: "Dilepaskan / Diberikan", isCorrect: true },
        { id: 'c', text: "Diterima dari Oksigen", isCorrect: false }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col font-sans">
      <div className="max-w-4xl mx-auto w-full px-4 py-8 flex-grow space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <button onClick={() => onNavigate('HOME')} className="text-brand-600 font-medium flex items-center gap-1 hover:underline">
            <ArrowLeft size={16} /> Kembali
          </button>
          <div className="text-center md:text-right">
            <h1 className="text-3xl font-extrabold text-slate-800 flex items-center justify-center md:justify-end gap-2">
              <Scroll className="text-brand-500" /> Dongeng Redoks
            </h1>
            <p className="text-slate-600 text-sm">Petualangan Si Elektron di Dunia Nyata</p>
          </div>
        </div>

        {/* Story Section */}
        <div className="relative bg-white rounded-3xl p-8 shadow-xl shadow-orange-100/50 border-2 border-orange-100 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl font-bold text-center text-orange-800 font-serif">
              "Kisah Pangeran Besi dan Penyihir Oksigen"
            </h2>
            
            <div className="prose prose-orange max-w-none text-slate-700 leading-relaxed text-lg font-serif">
              <p>
                Di sebuah kerajaan logam yang kokoh, hiduplah <strong>Pangeran Besi (Fe)</strong>. Ia gagah perkasa, berkilau, dan memiliki banyak harta berharga berupa <em>Permata Elektron</em>. Pangeran Besi sangat dermawan, ia rela memberikan apa saja demi melindungi kerajaannya.
              </p>
              <p>
                Suatu hari, datanglah <strong>Penyihir Oksigen (O₂)</strong> bersama pasukannya dari Negeri Udara Lembab. Penyihir Oksigen sangat menyukai <em>Permata Elektron</em>. Dengan sihirnya yang kuat, ia membujuk Pangeran Besi.
              </p>
              <p>
                "Wahai Pangeran," kata Penyihir Oksigen, "Berikanlah permatamu, dan kau akan bersatu denganku." Karena sifat alaminya, Pangeran Besi pun <strong>melepaskan</strong> permata elektronnya kepada Oksigen. 
              </p>
              <p>
                Namun, ada harga yang harus dibayar. Setelah kehilangan elektronnya, Pangeran Besi tidak lagi berkilau. Tubuhnya berubah menjadi kemerahan dan rapuh. Ia telah berubah menjadi sosok baru: <strong>Karat (Fe₂O₃)</strong>.
              </p>
            </div>

            <div className="flex justify-center pt-4">
              <button 
                onClick={toggleExplanation}
                className="flex items-center gap-2 px-6 py-3 bg-orange-100 text-orange-700 rounded-full font-bold hover:bg-orange-200 transition-colors"
              >
                {showExplanation ? "Sembunyikan Rahasia Kimia" : "Lihat Rahasia Kimia"} 
                {showExplanation ? <BookOpen size={18} /> : <Star size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Concept Reveal */}
        {showExplanation && (
          <div className="bg-slate-800 text-white rounded-3xl p-6 md:p-8 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
              <Flame size={20} /> Apa yang Terjadi Secara Kimia?
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="bg-orange-500/20 p-2 rounded-lg h-fit"><Shield size={18} className="text-orange-400"/></div>
                <div>
                  <strong className="block text-orange-200">Oksidasi (Pangeran Besi)</strong>
                  <p className="text-slate-300 text-sm">Pangeran Besi (Fe) melepaskan elektron. Bilangan oksidasinya naik dari 0 menjadi +3.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg h-fit"><Feather size={18} className="text-blue-400"/></div>
                <div>
                  <strong className="block text-blue-200">Reduksi (Penyihir Oksigen)</strong>
                  <p className="text-slate-300 text-sm">Oksigen (O₂) menerima elektron dari Besi. Bilangan oksidasinya turun dari 0 menjadi -2.</p>
                </div>
              </li>
              <li className="bg-white/10 p-3 rounded-xl text-center font-mono text-sm md:text-base mt-2">
                4Fe(s) + 3O₂(g) → 2Fe₂O₃(s) (Karat)
              </li>
            </ul>
          </div>
        )}

        {/* Case Study Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xl font-bold text-slate-800 border-b border-brand-200 pb-2">
            <MessageCircle className="text-brand-600" /> Studi Kasus: Jembatan Tua
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-slate-600 mb-4 leading-relaxed">
                Bayangkan sebuah jembatan besi di dekat pantai. Setelah bertahun-tahun terkena udara laut dan hujan, jembatan itu mulai berwarna coklat kemerahan dan keropos. Ini adalah kejadian nyata dari kisah Pangeran Besi tadi!
              </p>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                <h4 className="font-bold text-orange-800 text-sm mb-1">Tantangan Analisis</h4>
                <p className="text-xs text-orange-700">Jawab pertanyaan di samping untuk menguji pemahamanmu.</p>
              </div>
            </div>

            <div className="space-y-4">
              {questions.map((q) => (
                <div key={q.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <p className="font-bold text-slate-800 mb-3 text-sm">{q.text}</p>
                  <div className="space-y-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleAnswer(q.id, opt)}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all border
                          ${answers[q.id] === opt.id 
                            ? (opt.isCorrect 
                                ? 'bg-green-50 border-green-200 text-green-800' 
                                : 'bg-red-50 border-red-200 text-red-800')
                            : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-brand-50 hover:border-brand-200'
                          }
                        `}
                      >
                        <div className="flex justify-between items-center">
                          {opt.text}
                          {answers[q.id] === opt.id && (
                            opt.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  {feedback[q.id] !== undefined && (
                    <p className={`text-xs mt-2 font-medium ${feedback[q.id] ? 'text-green-600' : 'text-red-500'}`}>
                      {feedback[q.id] ? "Benar! Besi melepaskan elektron." : "Kurang tepat, coba ingat lagi siapa yang memberi 'permata'."}
                    </p>
                  )}
                </div>
              ))}
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

export default RedoxStory;