"use client";

import { BottomNav } from "@/components/custom/bottom-nav";
import { PremiumCard } from "@/components/custom/premium-card";
import { Play, Check, Clock, Dumbbell, ChevronRight, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Exercise {
  name: string;
  sets: string;
  rest: string;
  notes?: string;
  completed?: boolean;
}

interface WorkoutDay {
  id: string;
  name: string;
  muscle: string;
  duration?: number;
  exercises: Exercise[];
  completed?: boolean;
}

export default function TreinoPage() {
  const [activeDay, setActiveDay] = useState("A");
  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasGeneratedPlan, setHasGeneratedPlan] = useState(false);

  // Dados de exemplo (serão substituídos pela IA)
  const defaultWorkoutDays: WorkoutDay[] = [
    { 
      id: "A", 
      name: "Treino A", 
      muscle: "Peito e Tríceps", 
      completed: false,
      duration: 45,
      exercises: [
        { name: "Supino Reto", sets: "4x12", rest: "90s", completed: false },
        { name: "Supino Inclinado", sets: "4x12", rest: "90s", completed: false },
        { name: "Crucifixo", sets: "3x15", rest: "60s", completed: false },
        { name: "Tríceps Testa", sets: "3x12", rest: "60s", completed: false },
        { name: "Tríceps Corda", sets: "3x15", rest: "60s", completed: false },
      ]
    },
    { 
      id: "B", 
      name: "Treino B", 
      muscle: "Costas e Bíceps", 
      completed: false,
      duration: 45,
      exercises: []
    },
    { 
      id: "C", 
      name: "Treino C", 
      muscle: "Pernas", 
      completed: false,
      duration: 50,
      exercises: []
    },
  ];

  useEffect(() => {
    // Carregar treino salvo do localStorage
    const savedWorkout = localStorage.getItem('nexfit_workout');
    if (savedWorkout) {
      setWorkoutDays(JSON.parse(savedWorkout));
      setHasGeneratedPlan(true);
    } else {
      setWorkoutDays(defaultWorkoutDays);
    }
  }, []);

  const handleGenerateWorkout = async () => {
    setLoading(true);
    try {
      // Dados de exemplo - em produção viriam do questionário
      const userProfile = {
        age: 25,
        weight: 75,
        height: 175,
        goal: "Hipertrofia",
        experience: "Intermediário",
        frequency: 4,
        restrictions: "Nenhuma"
      };

      const response = await fetch('/api/generate-workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar treino');
      }

      const result = await response.json();
      
      if (result.success && result.data.workoutDays) {
        setWorkoutDays(result.data.workoutDays);
        localStorage.setItem('nexfit_workout', JSON.stringify(result.data.workoutDays));
        setHasGeneratedPlan(true);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao gerar treino. Verifique se a API key está configurada.');
    } finally {
      setLoading(false);
    }
  };

  const currentWorkout = workoutDays.find(day => day.id === activeDay);

  return (
    <div className="min-h-screen pb-24 bg-[#0D0D0D]">
      {/* Header */}
      <header className="px-6 pt-8 pb-6 bg-gradient-to-b from-[#0D0D0D] to-transparent">
        <h1 className="text-3xl font-bold text-white mb-2">Meus Treinos</h1>
        <p className="text-white/60">Plano personalizado por IA</p>
      </header>

      {/* Generate Workout Button */}
      {!hasGeneratedPlan && (
        <section className="px-6 mb-6">
          <PremiumCard glow>
            <div className="text-center py-4">
              <Sparkles className="w-12 h-12 text-[#00FF00] mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">
                Gere seu Treino Personalizado
              </h2>
              <p className="text-white/60 mb-6">
                Nossa IA criará um plano de treino exclusivo para você
              </p>
              <button
                onClick={handleGenerateWorkout}
                disabled={loading}
                className="w-full bg-[#00FF00] text-black font-bold py-4 rounded-xl hover:bg-[#00FF00]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Gerando treino...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Gerar Treino com IA
                  </>
                )}
              </button>
            </div>
          </PremiumCard>
        </section>
      )}

      {/* Workout Days */}
      <section className="px-6 mb-6">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {workoutDays.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className={`flex-shrink-0 px-6 py-4 rounded-xl transition-all duration-300 ${
                activeDay === day.id
                  ? "bg-[#00FF00] text-black shadow-[0_0_20px_rgba(0,255,0,0.3)]"
                  : "bg-[#1A1A1A] text-white border border-[#00FF00]/20"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl font-bold">{day.id}</span>
                {day.completed && (
                  <Check className="w-4 h-4" />
                )}
              </div>
              <p className={`text-xs ${activeDay === day.id ? "text-black/80" : "text-white/60"}`}>
                {day.muscle}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Workout Info */}
      {currentWorkout && currentWorkout.exercises.length > 0 && (
        <>
          <section className="px-6 mb-6">
            <PremiumCard glow>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Treino {activeDay}</h2>
                  <p className="text-white/60">{currentWorkout.muscle}</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#00FF00]">{currentWorkout.duration || 45}</p>
                    <p className="text-xs text-white/60">min</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#00FF00]">{currentWorkout.exercises.length}</p>
                    <p className="text-xs text-white/60">exerc.</p>
                  </div>
                </div>
              </div>
              <button className="w-full bg-[#00FF00] text-black font-bold py-4 rounded-xl hover:bg-[#00FF00]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] flex items-center justify-center gap-2">
                <Play className="w-5 h-5 fill-black" />
                Iniciar Treino
              </button>
            </PremiumCard>
          </section>

          {/* Exercise List */}
          <section className="px-6 mb-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-[#00FF00]" />
              Exercícios
            </h3>
            <div className="space-y-3">
              {currentWorkout.exercises.map((exercise, index) => (
                <PremiumCard key={index} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      exercise.completed 
                        ? "bg-[#00FF00]/20 text-[#00FF00]" 
                        : "bg-white/5 text-white/40"
                    }`}>
                      {exercise.completed ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold mb-1 ${
                        exercise.completed ? "text-white/60 line-through" : "text-white"
                      }`}>
                        {exercise.name}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <Dumbbell className="w-3 h-3" />
                          {exercise.sets}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {exercise.rest}
                        </span>
                      </div>
                      {exercise.notes && (
                        <p className="text-xs text-white/50 mt-1">{exercise.notes}</p>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/40" />
                  </div>
                </PremiumCard>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="px-6 mb-6">
            <h3 className="text-lg font-bold text-white mb-4">Estatísticas</h3>
            <div className="grid grid-cols-3 gap-3">
              <PremiumCard className="p-4 text-center">
                <p className="text-2xl font-bold text-[#00FF00] mb-1">12</p>
                <p className="text-xs text-white/60">Treinos/mês</p>
              </PremiumCard>
              <PremiumCard className="p-4 text-center">
                <p className="text-2xl font-bold text-[#00FF00] mb-1">540</p>
                <p className="text-xs text-white/60">Min totais</p>
              </PremiumCard>
              <PremiumCard className="p-4 text-center">
                <p className="text-2xl font-bold text-[#00FF00] mb-1">85%</p>
                <p className="text-xs text-white/60">Frequência</p>
              </PremiumCard>
            </div>
          </section>
        </>
      )}

      {/* Regenerate Button */}
      {hasGeneratedPlan && (
        <section className="px-6 mb-6">
          <button
            onClick={handleGenerateWorkout}
            disabled={loading}
            className="w-full bg-[#1A1A1A] text-white border border-[#00FF00]/20 font-medium py-3 rounded-xl hover:bg-[#00FF00]/10 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Regenerando...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Regenerar Treino
              </>
            )}
          </button>
        </section>
      )}

      <BottomNav />
    </div>
  );
}
