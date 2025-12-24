"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Target, Activity, Calendar, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Question = {
  id: string;
  question: string;
  options: string[];
  icon: React.ReactNode;
};

const questions: Question[] = [
  {
    id: "objetivo",
    question: "Qual é o seu principal objetivo?",
    options: ["Ganhar massa muscular", "Perder peso", "Melhorar condicionamento", "Manter a forma"],
    icon: <Target className="w-6 h-6" />
  },
  {
    id: "nivel",
    question: "Qual é o seu nível de experiência?",
    options: ["Iniciante", "Intermediário", "Avançado", "Atleta"],
    icon: <Activity className="w-6 h-6" />
  },
  {
    id: "frequencia",
    question: "Quantos dias por semana você pode treinar?",
    options: ["2-3 dias", "4-5 dias", "6-7 dias", "Todos os dias"],
    icon: <Calendar className="w-6 h-6" />
  },
  {
    id: "foco",
    question: "Onde você prefere treinar?",
    options: ["Academia", "Em casa", "Ao ar livre", "Híbrido"],
    icon: <TrendingUp className="w-6 h-6" />
  }
];

export default function QuestionarioPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      setAnswers({ ...answers, [questions[currentQuestion].id]: selectedOption });
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption("");
      } else {
        // Questionário concluído - redireciona para seleção de planos
        router.push("/auth/planos");
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[questions[currentQuestion - 1].id] || "");
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6d775c1b-8d57-4adc-a4c0-1c38f3cb8cc3.webp"
            alt="NexFit Logo"
            width={60}
            height={60}
            className="drop-shadow-[0_0_20px_rgba(0,255,0,0.6)]"
            priority
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="text-[#00FF00] text-sm font-semibold">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00FF00] to-green-400 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-white/10 shadow-xl mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#00FF00]/10 border border-[#00FF00]/30 flex items-center justify-center text-[#00FF00]">
              {questions[currentQuestion].icon}
            </div>
            <h2 className="text-2xl font-bold text-white">
              {questions[currentQuestion].question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(option)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedOption === option
                    ? "bg-[#00FF00]/10 border-[#00FF00] shadow-[0_0_20px_rgba(0,255,0,0.2)]"
                    : "bg-[#0D0D0D] border-white/10 hover:border-white/30 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{option}</span>
                  {selectedOption === option && (
                    <div className="w-6 h-6 rounded-full bg-[#00FF00] flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-black" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {currentQuestion > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
              Voltar
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all duration-300 ${
              selectedOption
                ? "bg-[#00FF00] text-black hover:bg-[#00FF00]/90 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]"
                : "bg-white/5 text-white/40 cursor-not-allowed"
            }`}
          >
            {currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Info */}
        <p className="text-center text-white/40 text-sm mt-6">
          Suas respostas nos ajudam a personalizar sua experiência
        </p>
      </div>
    </div>
  );
}
