"use client";

import { BottomNav } from "@/components/custom/bottom-nav";
import { PremiumCard } from "@/components/custom/premium-card";
import { TrendingUp, Flame, Target, Clock, Check, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AppPage() {
  const [mounted, setMounted] = useState(false);
  const [weekDays, setWeekDays] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  const stats = [
    { icon: Flame, label: "Calorias", value: "2.450", unit: "kcal", color: "text-orange-500" },
    { icon: Target, label: "Meta", value: "85", unit: "%", color: "text-[#00FF00]" },
    { icon: Clock, label: "Treino", value: "45", unit: "min", color: "text-blue-500" },
    { icon: TrendingUp, label: "Progresso", value: "+12", unit: "%", color: "text-purple-500" },
  ];

  // Gerar 30 dias de calendário dinâmico baseado na data atual
  const generateDays = () => {
    const today = new Date();
    const days = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
    const workouts = ["-", "A", "B", "C", "A", "B", "C"]; // Domingo sem treino
    const result = [];
    
    // Começar 7 dias antes de hoje
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 7);
    
    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dayIndex = currentDate.getDay();
      const date = currentDate.getDate();
      const isToday = currentDate.toDateString() === today.toDateString();
      const isPast = currentDate < today && !isToday;
      
      result.push({
        day: days[dayIndex],
        date: date.toString(),
        fullDate: currentDate,
        isToday,
        isPast,
        completed: isPast && dayIndex !== 0, // Dias passados completos (exceto domingos)
        workout: workouts[dayIndex],
        meal: isPast && dayIndex !== 0, // Refeições nos dias passados (exceto domingos)
      });
    }
    
    return result;
  };

  // Inicializar apenas no cliente
  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    setWeekDays(generateDays());
  }, []);

  // Atualizar hora a cada minuto
  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setWeekDays(generateDays()); // Regenerar dias para manter sincronizado
    }, 60000); // Atualiza a cada 1 minuto

    return () => clearInterval(timer);
  }, [mounted]);

  const toggleWorkout = (index: number) => {
    const day = weekDays[index];
    if (day.isPast || day.workout === "-") return; // Não permite alterar dias passados ou domingos
    
    setWeekDays(prev => prev.map((d, i) => 
      i === index ? { ...d, completed: !d.completed } : d
    ));
  };

  const toggleMeal = (index: number) => {
    const day = weekDays[index];
    if (day.isPast) return; // Não permite alterar dias passados
    
    setWeekDays(prev => prev.map((d, i) => 
      i === index ? { ...d, meal: !d.meal } : d
    ));
  };

  const completedWorkouts = weekDays.filter(d => d.completed).length;

  // Formatar mês e ano atual
  const currentMonth = currentTime ? currentTime.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : '';
  const formattedMonth = currentMonth ? currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1) : '';

  // Renderizar loading state até montar no cliente
  if (!mounted) {
    return (
      <div className="min-h-screen pb-24 bg-[#0D0D0D]">
        <header className="px-6 pt-8 pb-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Olá, Atleta</h1>
              <p className="text-white/60 text-sm">Vamos treinar hoje?</p>
            </div>
            <Image
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6d775c1b-8d57-4adc-a4c0-1c38f3cb8cc3.webp"
              alt="NexFit Logo"
              width={60}
              height={60}
              className="drop-shadow-[0_0_15px_rgba(0,255,0,0.5)]"
            />
          </div>
        </header>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 bg-[#0D0D0D]">
      {/* Header */}
      <header className="px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Olá, Atleta</h1>
            <p className="text-white/60 text-sm">Vamos treinar hoje?</p>
          </div>
          <Image
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6d775c1b-8d57-4adc-a4c0-1c38f3cb8cc3.webp"
            alt="NexFit Logo"
            width={60}
            height={60}
            className="drop-shadow-[0_0_15px_rgba(0,255,0,0.5)]"
          />
        </div>

        {/* Calendário Semanal de Treinos e Refeições - 30 DIAS DINÂMICO */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#00FF00] rounded-full"></span>
            Calendário de 30 Dias
          </h2>
          <PremiumCard>
            <div className="mb-6">
              <p className="text-sm text-white/60">{formattedMonth}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-2xl font-bold text-white">{completedWorkouts}/30</p>
                <p className="text-sm text-white/60">treinos completos</p>
              </div>
            </div>

            {/* Grid Horizontal de Dias - 30 DIAS DINÂMICO */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#00FF00]/20 scrollbar-track-transparent">
              {weekDays.map((item, index) => (
                <div key={index} className="flex flex-col items-center min-w-[80px]">
                  {/* Dia da Semana */}
                  <span className={`text-sm mb-3 font-semibold ${
                    item.isToday ? "text-[#00FF00]" : "text-white/60"
                  }`}>
                    {item.day}
                  </span>
                  
                  {/* Círculo do Treino - MAIOR */}
                  <div
                    onClick={() => toggleWorkout(index)}
                    className={`
                      relative w-20 h-20 rounded-full flex flex-col items-center justify-center
                      transition-all duration-300 mb-3
                      ${
                        item.isToday
                          ? "ring-4 ring-[#00FF00] ring-offset-2 ring-offset-[#0D0D0D]"
                          : ""
                      }
                      ${
                        item.completed
                          ? "bg-[#00FF00] shadow-[0_0_20px_rgba(0,255,0,0.5)]"
                          : item.workout === "-"
                          ? "bg-white/5 border-2 border-white/10"
                          : item.isPast
                          ? "bg-red-500/20 border-2 border-red-500/30"
                          : "bg-[#1A1A1A] border-2 border-[#00FF00]/30 hover:border-[#00FF00]/60 hover:scale-105 cursor-pointer"
                      }
                      ${item.isPast || item.workout === "-" ? "" : "cursor-pointer"}
                    `}
                  >
                    {item.completed ? (
                      <Check className="w-8 h-8 text-black" />
                    ) : (
                      <>
                        <span
                          className={`text-lg font-bold ${
                            item.workout === "-" 
                              ? "text-white/20" 
                              : item.isToday
                              ? "text-[#00FF00]"
                              : "text-white"
                          }`}
                        >
                          {item.date}
                        </span>
                        {item.workout !== "-" && (
                          <span className={`text-sm font-bold mt-1 ${
                            item.isToday ? "text-[#00FF00]" : "text-[#00FF00]"
                          }`}>
                            {item.workout}
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Indicador de Refeição */}
                  <button
                    onClick={() => toggleMeal(index)}
                    disabled={item.isPast}
                    className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      transition-all duration-300
                      ${
                        item.meal
                          ? "bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                          : "bg-white/5 border border-white/10 hover:border-orange-500/40"
                      }
                      ${item.isPast ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    `}
                  >
                    <Utensils className={`w-5 h-5 ${item.meal ? "text-black" : "text-white/40"}`} />
                  </button>
                </div>
              ))}
            </div>

            {/* Legenda */}
            <div className="mt-8 pt-5 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#00FF00]"></div>
                  <span className="text-white/60">Treino Completo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#1A1A1A] border-2 border-[#00FF00]/30"></div>
                  <span className="text-white/60">Treino Pendente</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-lg bg-orange-500 flex items-center justify-center">
                    <Utensils className="w-2.5 h-2.5 text-black" />
                  </div>
                  <span className="text-white/60">Refeição Completa</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full ring-2 ring-[#00FF00] ring-offset-1 ring-offset-[#0D0D0D] bg-[#1A1A1A]"></div>
                  <span className="text-white/60">Hoje</span>
                </div>
              </div>
            </div>
          </PremiumCard>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <PremiumCard key={index} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <span className="text-sm text-white/60">{stat.unit}</span>
                </div>
                <p className="text-xs text-white/60 mt-1">{stat.label}</p>
              </PremiumCard>
            );
          })}
        </div>
      </header>

      {/* Treino do Dia */}
      <section className="px-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-[#00FF00] rounded-full"></span>
          Treino de Hoje
        </h2>
        <PremiumCard glow className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF00]/5 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Treino A - Peito e Tríceps</h3>
                <p className="text-sm text-white/60">8 exercícios - 45-60 min</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#00FF00]/10 flex items-center justify-center">
                <span className="text-[#00FF00] font-bold">A</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-[#00FF00]"></div>
                <span className="text-white/80">Supino Reto - 4x12</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-[#00FF00]"></div>
                <span className="text-white/80">Supino Inclinado - 4x12</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-[#00FF00]"></div>
                <span className="text-white/80">Crucifixo - 3x15</span>
              </div>
            </div>
            <Link href="/treino/1">
              <button className="w-full mt-6 bg-[#00FF00] text-black font-bold py-4 rounded-xl hover:bg-[#00FF00]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] flex items-center justify-center gap-2">
                Iniciar Treino
              </button>
            </Link>
          </div>
        </PremiumCard>
      </section>

      {/* Dieta do Dia */}
      <section className="px-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-[#00FF00] rounded-full"></span>
          Próxima Refeição
        </h2>
        <PremiumCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Almoço</h3>
              <p className="text-sm text-white/60">12:00 - 14:00</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#00FF00]">650</p>
              <p className="text-xs text-white/60">kcal</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/80">Frango grelhado</span>
              <span className="text-white/60">200g</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/80">Arroz integral</span>
              <span className="text-white/60">150g</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/80">Brócolis</span>
              <span className="text-white/60">100g</span>
            </div>
          </div>
        </PremiumCard>
      </section>

      <BottomNav />
    </div>
  );
}
