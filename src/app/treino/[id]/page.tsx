"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Play, Pause, Check, ChevronRight, Timer } from "lucide-react";
import Image from "next/image";

// Exercícios de exemplo (depois virá do banco de dados)
const treinoExemplo = {
  nome: "Treino A - Peito e Tríceps",
  exercicios: [
    {
      id: 1,
      nome: "Supino reto barra livre",
      series: 4,
      repeticoes: 12,
      descanso: 90,
      imagem: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop",
      grupoMuscular: "Peito",
    },
    {
      id: 2,
      nome: "Supino inclinado com halteres",
      series: 4,
      repeticoes: 12,
      descanso: 90,
      imagem: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop",
      grupoMuscular: "Peito",
    },
    {
      id: 3,
      nome: "Crucifixo reto com halteres",
      series: 3,
      repeticoes: 15,
      descanso: 60,
      imagem: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      grupoMuscular: "Peito",
    },
    {
      id: 4,
      nome: "Tríceps corda no cross",
      series: 3,
      repeticoes: 15,
      descanso: 60,
      imagem: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&h=600&fit=crop",
      grupoMuscular: "Tríceps",
    },
    {
      id: 5,
      nome: "Tríceps testa banco reto no cross",
      series: 3,
      repeticoes: 12,
      descanso: 60,
      imagem: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop",
      grupoMuscular: "Tríceps",
    },
  ],
};

export default function TreinoExecucao() {
  const router = useRouter();
  const [exercicioAtual, setExercicioAtual] = useState(0);
  const [serieAtual, setSerieAtual] = useState(1);
  const [emDescanso, setEmDescanso] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [treinoConcluido, setTreinoConcluido] = useState(false);

  const exercicio = treinoExemplo.exercicios[exercicioAtual];
  const totalExercicios = treinoExemplo.exercicios.length;
  const progresso = ((exercicioAtual + 1) / totalExercicios) * 100;

  // Timer de descanso
  useEffect(() => {
    if (emDescanso && tempoRestante > 0 && !pausado) {
      const timer = setInterval(() => {
        setTempoRestante((prev) => {
          if (prev <= 1) {
            setEmDescanso(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [emDescanso, tempoRestante, pausado]);

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const concluirSerie = () => {
    if (serieAtual < exercicio.series) {
      // Iniciar descanso
      setEmDescanso(true);
      setTempoRestante(exercicio.descanso);
      setSerieAtual(serieAtual + 1);
    } else {
      // Próximo exercício
      proximoExercicio();
    }
  };

  const proximoExercicio = () => {
    if (exercicioAtual < totalExercicios - 1) {
      setExercicioAtual(exercicioAtual + 1);
      setSerieAtual(1);
      setEmDescanso(false);
      setTempoRestante(0);
    } else {
      // Treino concluído
      setTreinoConcluido(true);
    }
  };

  const pularDescanso = () => {
    setEmDescanso(false);
    setTempoRestante(0);
  };

  if (treinoConcluido) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#00FF00]/10 flex items-center justify-center">
            <Check className="w-12 h-12 text-[#00FF00]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Treino Concluído.</h1>
          <p className="text-white/60 mb-8">
            Parabéns. Você completou {totalExercicios} exercícios.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-[#00FF00] text-black font-bold py-4 px-8 rounded-xl hover:bg-[#00FF00]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)]"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] pb-8">
      {/* Header */}
      <header className="px-6 pt-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push("/")}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center flex-1">
            <h1 className="text-lg font-bold text-white">{treinoExemplo.nome}</h1>
            <p className="text-xs text-white/60">
              Exercício {exercicioAtual + 1} de {totalExercicios}
            </p>
          </div>
          <div className="w-10" />
        </div>

        {/* Barra de Progresso */}
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </header>

      {/* Imagem do Exercício */}
      <div className="px-6 mb-6">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#1A1A1A] border border-[#00FF00]/20">
          <Image
            src={exercicio.imagem}
            alt={exercicio.nome}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className="text-xs font-bold text-[#00FF00]">{exercicio.grupoMuscular}</span>
          </div>
        </div>
      </div>

      {/* Informações do Exercício */}
      <div className="px-6 mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{exercicio.nome}</h2>
        <div className="flex items-center gap-4 text-sm text-white/60">
          <span>{exercicio.series} séries</span>
          <span>{exercicio.repeticoes} repetições</span>
          <span>{exercicio.descanso}s descanso</span>
        </div>
      </div>

      {/* Status Atual */}
      {emDescanso ? (
        // Tela de Descanso
        <div className="px-6 mb-6">
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-8 border border-[#00FF00]/20 text-center">
            <Timer className="w-12 h-12 text-[#00FF00] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Tempo de Descanso</h3>
            <div className="text-6xl font-bold text-[#00FF00] mb-6 font-mono">
              {formatarTempo(tempoRestante)}
            </div>
            <p className="text-white/60 mb-6">
              Próxima série: {serieAtual}/{exercicio.series}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setPausado(!pausado)}
                className="flex-1 bg-white/5 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {pausado ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                {pausado ? "Retomar" : "Pausar"}
              </button>
              <button
                onClick={pularDescanso}
                className="flex-1 bg-[#00FF00] text-black font-bold py-3 rounded-xl hover:bg-[#00FF00]/90 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Pular
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Tela de Execução
        <div className="px-6 mb-6">
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-8 border border-[#00FF00]/20 text-center">
            <div className="mb-6">
              <p className="text-white/60 text-sm mb-2">Série Atual</p>
              <div className="text-5xl font-bold text-white mb-4">
                {serieAtual}/{exercicio.series}
              </div>
              <div className="flex justify-center gap-2">
                {Array.from({ length: exercicio.series }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i < serieAtual ? "bg-[#00FF00]" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-white/60 text-sm mb-2">Repetições</p>
              <div className="text-3xl font-bold text-[#00FF00]">{exercicio.repeticoes}x</div>
            </div>

            <button
              onClick={concluirSerie}
              className="w-full bg-[#00FF00] text-black font-bold py-4 rounded-xl hover:bg-[#00FF00]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              Concluir Série
            </button>
          </div>
        </div>
      )}

      {/* Próximo Exercício */}
      {exercicioAtual < totalExercicios - 1 && (
        <div className="px-6">
          <h3 className="text-sm font-bold text-white/60 mb-3">Próximo Exercício</h3>
          <div className="bg-[#1A1A1A] rounded-xl p-4 border border-white/10 flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
              <Image
                src={treinoExemplo.exercicios[exercicioAtual + 1].imagem}
                alt={treinoExemplo.exercicios[exercicioAtual + 1].nome}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-sm mb-1">
                {treinoExemplo.exercicios[exercicioAtual + 1].nome}
              </h4>
              <p className="text-white/60 text-xs">
                {treinoExemplo.exercicios[exercicioAtual + 1].series}x
                {treinoExemplo.exercicios[exercicioAtual + 1].repeticoes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
