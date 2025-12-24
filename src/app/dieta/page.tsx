"use client";

import { BottomNav } from "@/components/custom/bottom-nav";
import { PremiumCard } from "@/components/custom/premium-card";
import { Utensils, Flame, Apple, Beef, Wheat, Droplet, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface Food {
  name: string;
  quantity: string;
  calories: number;
}

interface Meal {
  name: string;
  time: string;
  calories: number;
  foods: Food[];
  completed?: boolean;
}

interface DietPlan {
  dailyCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  meals: Meal[];
  waterIntake: number;
  recommendations?: string;
}

export default function DietaPage() {
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasGeneratedPlan, setHasGeneratedPlan] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dados de exemplo (serão substituídos pela IA)
  const defaultDietPlan: DietPlan = {
    dailyCalories: 2500,
    macros: {
      protein: 200,
      carbs: 280,
      fats: 70,
    },
    meals: [
      {
        name: "Café da Manhã",
        time: "07:00 - 08:00",
        calories: 450,
        foods: [
          { name: "Ovos mexidos", quantity: "3 unidades", calories: 210 },
          { name: "Pão integral", quantity: "2 fatias", calories: 140 },
          { name: "Abacate", quantity: "1/2 unidade", calories: 100 },
        ],
        completed: false,
      },
      {
        name: "Lanche da Manhã",
        time: "10:00 - 10:30",
        calories: 200,
        foods: [
          { name: "Whey protein", quantity: "30g", calories: 120 },
          { name: "Banana", quantity: "1 unidade", calories: 80 },
        ],
        completed: false,
      },
      {
        name: "Almoço",
        time: "12:00 - 14:00",
        calories: 650,
        foods: [
          { name: "Frango grelhado", quantity: "200g", calories: 330 },
          { name: "Arroz integral", quantity: "150g", calories: 195 },
          { name: "Brócolis", quantity: "100g", calories: 35 },
          { name: "Salada verde", quantity: "100g", calories: 20 },
        ],
        completed: false,
      },
    ],
    waterIntake: 3.0,
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Carregar dieta salva do localStorage apenas no cliente
    try {
      const savedDiet = localStorage.getItem('nexfit_diet');
      if (savedDiet) {
        setDietPlan(JSON.parse(savedDiet));
        setHasGeneratedPlan(true);
      } else {
        setDietPlan(defaultDietPlan);
      }
    } catch (error) {
      console.error('Erro ao carregar dieta do localStorage:', error);
      setDietPlan(defaultDietPlan);
    }
  }, [mounted]);

  const handleGenerateDiet = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Dados de exemplo - em produção viriam do questionário
      const userProfile = {
        age: 25,
        weight: 75,
        height: 175,
        goal: "Hipertrofia",
        activityLevel: "Moderado",
        restrictions: "Nenhuma",
        preferences: "Nenhuma"
      };

      const response = await fetch('/api/generate-diet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao gerar dieta');
      }
      
      if (result.success && result.data) {
        setDietPlan(result.data);
        if (typeof window !== 'undefined') {
          localStorage.setItem('nexfit_diet', JSON.stringify(result.data));
        }
        setHasGeneratedPlan(true);
        setError(null);
      }
    } catch (error) {
      console.error('Erro:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao gerar dieta';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Não renderizar até que o componente esteja montado no cliente
  if (!mounted || !dietPlan) {
    return (
      <div className="min-h-screen pb-24 bg-[#0D0D0D] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#00FF00] animate-spin" />
      </div>
    );
  }

  const macros = [
    { icon: Flame, label: "Calorias", value: dietPlan.dailyCalories.toString(), goal: dietPlan.dailyCalories.toString(), color: "text-orange-500" },
    { icon: Beef, label: "Proteínas", value: `${dietPlan.macros.protein}g`, goal: `${dietPlan.macros.protein}g`, color: "text-red-500" },
    { icon: Wheat, label: "Carboidratos", value: `${dietPlan.macros.carbs}g`, goal: `${dietPlan.macros.carbs}g`, color: "text-yellow-500" },
    { icon: Droplet, label: "Gorduras", value: `${dietPlan.macros.fats}g`, goal: `${dietPlan.macros.fats}g`, color: "text-blue-500" },
  ];

  return (
    <div className="min-h-screen pb-24 bg-[#0D0D0D]">
      {/* Header */}
      <header className="px-6 pt-8 pb-6 bg-gradient-to-b from-[#0D0D0D] to-transparent">
        <h1 className="text-3xl font-bold text-white mb-2">Minha Dieta</h1>
        <p className="text-white/60">Plano nutricional personalizado por IA</p>
      </header>

      {/* Error Message */}
      {error && (
        <section className="px-6 mb-6">
          <PremiumCard className="border-2 border-red-500/30">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-semibold mb-1">Erro ao gerar dieta</h3>
                <p className="text-white/80 text-sm">{error}</p>
                {error.includes('API Key') && (
                  <p className="text-white/60 text-xs mt-2">
                    Configure a variável de ambiente OPENAI_API_KEY para usar a geração de dietas com IA.
                  </p>
                )}
              </div>
            </div>
          </PremiumCard>
        </section>
      )}

      {/* Generate Diet Button */}
      {!hasGeneratedPlan && (
        <section className="px-6 mb-6">
          <PremiumCard glow>
            <div className="text-center py-4">
              <Sparkles className="w-12 h-12 text-[#00FF00] mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">
                Gere sua Dieta Personalizada
              </h2>
              <p className="text-white/60 mb-6">
                Nossa IA criará um plano alimentar exclusivo para você
              </p>
              <button
                onClick={handleGenerateDiet}
                disabled={loading}
                className="w-full bg-[#00FF00] text-black font-bold py-4 rounded-xl hover:bg-[#00FF00]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Gerando dieta...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Gerar Dieta com IA
                  </>
                )}
              </button>
            </div>
          </PremiumCard>
        </section>
      )}

      {/* Macros Overview */}
      <section className="px-6 mb-6">
        <PremiumCard glow>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Apple className="w-5 h-5 text-[#00FF00]" />
            Macros de Hoje
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {macros.map((macro, index) => {
              const Icon = macro.icon;
              const percentage = 70; // Exemplo de progresso
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${macro.color}`} />
                      <span className="text-sm text-white/80">{macro.label}</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-white">{macro.value}</span>
                    <span className="text-sm text-white/60">/ {macro.goal}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${macro.color.replace('text-', 'bg-')}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </PremiumCard>
      </section>

      {/* Meals */}
      <section className="px-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Utensils className="w-5 h-5 text-[#00FF00]" />
          Refeições do Dia
        </h2>
        <div className="space-y-4">
          {dietPlan.meals.map((meal, index) => (
            <PremiumCard key={index} className={meal.completed ? "opacity-60" : ""}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-lg font-bold mb-1 ${
                    meal.completed ? "text-white/60 line-through" : "text-white"
                  }`}>
                    {meal.name}
                  </h3>
                  <p className="text-sm text-white/60">{meal.time}</p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${
                    meal.completed ? "text-white/40" : "text-[#00FF00]"
                  }`}>
                    {meal.calories}
                  </p>
                  <p className="text-xs text-white/60">kcal</p>
                </div>
              </div>
              <div className="space-y-2">
                {meal.foods.map((food, foodIndex) => (
                  <div key={foodIndex} className="flex justify-between items-center text-sm">
                    <span className={meal.completed ? "text-white/40" : "text-white/80"}>
                      {food.name}
                    </span>
                    <span className="text-white/60">{food.quantity}</span>
                  </div>
                ))}
              </div>
              {!meal.completed && (
                <button className="w-full mt-4 bg-[#00FF00]/10 text-[#00FF00] font-medium py-2 rounded-lg hover:bg-[#00FF00]/20 transition-all duration-300 border border-[#00FF00]/20">
                  Marcar como Completo
                </button>
              )}
            </PremiumCard>
          ))}
        </div>
      </section>

      {/* Water Intake */}
      <section className="px-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4">Hidratação</h2>
        <PremiumCard>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Droplet className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">2.1L</p>
                <p className="text-sm text-white/60">de {dietPlan.waterIntake}L</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-500">70%</p>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full w-[70%]"></div>
          </div>
        </PremiumCard>
      </section>

      {/* Regenerate Button */}
      {hasGeneratedPlan && (
        <section className="px-6 mb-6">
          <button
            onClick={handleGenerateDiet}
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
                Regenerar Dieta
              </>
            )}
          </button>
        </section>
      )}

      <BottomNav />
    </div>
  );
}
