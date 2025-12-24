"use client";

import { useState } from "react";
import { PremiumCard } from "./premium-card";
import { Sparkles, Loader2, Dumbbell } from "lucide-react";

interface TreinoGerado {
  nome: string;
  descricao: string;
  duracao: string;
  exercicios: {
    nome: string;
    series: string;
    repeticoes: string;
    descanso: string;
    observacoes?: string;
  }[];
}

export function GerarTreinoIA() {
  const [loading, setLoading] = useState(false);
  const [treino, setTreino] = useState<TreinoGerado | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const handleGerarTreino = async () => {
    setLoading(true);
    setErro(null);
    setTreino(null);

    try {
      const response = await fetch('/api/gerar-treino', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          objetivo: 'Hipertrofia',
          nivel: 'Intermediário',
          diasPorSemana: 3,
          gruposMusculares: ['Peito', 'Costas', 'Ombro', 'Bíceps', 'Tríceps']
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar treino');
      }

      const data = await response.json();
      
      if (data.success) {
        setTreino(data.treino);
      } else {
        setErro(data.error || 'Erro ao gerar treino');
      }
    } catch (error) {
      console.error('Erro:', error);
      setErro('Erro ao conectar com o servidor. Verifique se o Supabase está configurado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Botão Gerar Treino */}
      <button
        onClick={handleGerarTreino}
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-black font-bold py-4 rounded-xl hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Gerando treino com IA...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Gerar Treino com IA
          </>
        )}
      </button>

      {/* Erro */}
      {erro && (
        <PremiumCard className="border-red-500/20">
          <div className="text-center">
            <p className="text-red-500 font-semibold mb-2">⚠️ Erro</p>
            <p className="text-white/60 text-sm">{erro}</p>
          </div>
        </PremiumCard>
      )}

      {/* Treino Gerado */}
      {treino && (
        <PremiumCard glow className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF00]/5 rounded-full blur-3xl"></div>
          <div className="relative">
            {/* Header do Treino */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{treino.nome}</h3>
                <p className="text-sm text-white/60">{treino.descricao}</p>
                <p className="text-xs text-[#00FF00] mt-1">⏱️ {treino.duracao}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#00FF00]/10 flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-[#00FF00]" />
              </div>
            </div>

            {/* Lista de Exercícios */}
            <div className="space-y-3 mb-6">
              {treino.exercicios.map((exercicio, index) => (
                <div
                  key={index}
                  className="bg-[#1A1A1A] rounded-lg p-4 border border-[#00FF00]/10 hover:border-[#00FF00]/30 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#00FF00]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#00FF00] font-bold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2">{exercicio.nome}</h4>
                      <div className="flex flex-wrap gap-3 text-xs text-white/60">
                        <span>📊 {exercicio.series} séries</span>
                        <span>🔢 {exercicio.repeticoes} reps</span>
                        <span>⏸️ {exercicio.descanso}</span>
                      </div>
                      {exercicio.observacoes && (
                        <p className="text-xs text-white/40 mt-2 italic">
                          💡 {exercicio.observacoes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão Iniciar */}
            <button className="w-full bg-[#00FF00] text-black font-bold py-3 rounded-xl hover:bg-[#00FF00]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]">
              Iniciar Treino
            </button>
          </div>
        </PremiumCard>
      )}
    </div>
  );
}
