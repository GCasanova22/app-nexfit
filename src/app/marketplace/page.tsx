"use client";

import { BottomNav } from "@/components/custom/bottom-nav";
import { PremiumCard } from "@/components/custom/premium-card";
import { Search, MapPin, Star, Dumbbell, Utensils, TrendingUp, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function MarketplacePage() {
  const [filter, setFilter] = useState<"all" | "personal" | "nutritionist">("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const professionals = [
    {
      id: 1,
      name: "Carlos Silva",
      specialty: "personal",
      rating: 4.9,
      reviews: 127,
      price: 150.00,
      location: "São Paulo, SP",
      clients: 45,
      bio: "Personal trainer especializado em hipertrofia e emagrecimento",
      avatar: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Ana Costa",
      specialty: "nutritionist",
      rating: 5.0,
      reviews: 89,
      price: 180.00,
      location: "Rio de Janeiro, RJ",
      clients: 38,
      bio: "Nutricionista esportiva com foco em performance",
      avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Pedro Santos",
      specialty: "both",
      rating: 4.8,
      reviews: 156,
      price: 280.00,
      location: "Belo Horizonte, MG",
      clients: 62,
      bio: "Personal e nutricionista - Acompanhamento completo",
      avatar: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      name: "Julia Mendes",
      specialty: "personal",
      rating: 4.7,
      reviews: 94,
      price: 140.00,
      location: "Curitiba, PR",
      clients: 41,
      bio: "Especialista em treinamento funcional e crossfit",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    },
  ];

  const filteredProfessionals = professionals.filter((prof) => {
    if (filter === "all") return true;
    if (filter === "personal") return prof.specialty === "personal" || prof.specialty === "both";
    if (filter === "nutritionist") return prof.specialty === "nutritionist" || prof.specialty === "both";
    return true;
  });

  if (!mounted) {
    return (
      <div className="min-h-screen pb-24 bg-[#0D0D0D] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00FF00]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 bg-[#0D0D0D]">
      {/* Header */}
      <header className="px-6 pt-8 pb-6 bg-gradient-to-b from-[#0D0D0D] to-transparent">
        <h1 className="text-3xl font-bold text-white mb-2">Marketplace</h1>
        <p className="text-white/60">Planos de IA e profissionais reais</p>
      </header>

      {/* Subscription Plans - AI Generated */}
      <section className="px-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#00FF00]" />
          Planos com IA
        </h2>
        <p className="text-sm text-white/60 mb-4">
          Treinos e dietas personalizados gerados por inteligência artificial
        </p>
        <div className="grid grid-cols-1 gap-4">
          <PremiumCard className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-orange-500" />
                  <h3 className="font-bold text-white">Treino IA</h3>
                </div>
                <p className="text-2xl font-bold text-white">
                  R$ 39<span className="text-sm text-white/60">,99/mês</span>
                </p>
              </div>
              <p className="text-sm text-white/60 mb-4">
                Planos de treino personalizados gerados por IA baseados no seu perfil
              </p>
              <button className="w-full bg-orange-500/10 text-orange-500 font-medium py-2 rounded-lg hover:bg-orange-500/20 transition-all duration-300 border border-orange-500/20">
                Assinar Plano
              </button>
            </div>
          </PremiumCard>

          <PremiumCard className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-blue-500" />
                  <h3 className="font-bold text-white">Dieta IA</h3>
                </div>
                <p className="text-2xl font-bold text-white">
                  R$ 49<span className="text-sm text-white/60">,99/mês</span>
                </p>
              </div>
              <p className="text-sm text-white/60 mb-4">
                Planos alimentares personalizados gerados por IA baseados no seu objetivo
              </p>
              <button className="w-full bg-blue-500/10 text-blue-500 font-medium py-2 rounded-lg hover:bg-blue-500/20 transition-all duration-300 border border-blue-500/20">
                Assinar Plano
              </button>
            </div>
          </PremiumCard>

          <PremiumCard glow className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF00]/10 rounded-full blur-3xl"></div>
            <div className="absolute top-2 right-2 bg-[#00FF00] text-black text-xs font-bold px-3 py-1 rounded-full">
              POPULAR
            </div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#00FF00]" />
                  <h3 className="font-bold text-white">Completo IA</h3>
                </div>
                <p className="text-2xl font-bold text-[#00FF00]">
                  R$ 79<span className="text-sm text-white/60">,99/mês</span>
                </p>
              </div>
              <p className="text-sm text-white/60 mb-4">
                Treino + Dieta gerados por IA - Economia de R$10
              </p>
              <button className="w-full bg-[#00FF00] text-black font-bold py-2 rounded-lg hover:bg-[#00FF00]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)]">
                Assinar Plano
              </button>
            </div>
          </PremiumCard>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 mb-8">
        <div className="h-px bg-white/10"></div>
      </div>

      {/* Search */}
      <section className="px-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4">Profissionais Reais</h2>
        <p className="text-sm text-white/60 mb-4">
          Contrate personal trainers e nutricionistas certificados
        </p>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Buscar profissionais..."
            className="w-full bg-[#1A1A1A] border border-[#00FF00]/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF00]/40 transition-all duration-300"
            suppressHydrationWarning
          />
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setFilter("all")}
            className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              filter === "all"
                ? "bg-[#00FF00] text-black"
                : "bg-[#1A1A1A] text-white border border-[#00FF00]/20"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter("personal")}
            className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
              filter === "personal"
                ? "bg-[#00FF00] text-black"
                : "bg-[#1A1A1A] text-white border border-[#00FF00]/20"
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            Personal
          </button>
          <button
            onClick={() => setFilter("nutritionist")}
            className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
              filter === "nutritionist"
                ? "bg-[#00FF00] text-black"
                : "bg-[#1A1A1A] text-white border border-[#00FF00]/20"
            }`}
          >
            <Utensils className="w-4 h-4" />
            Nutricionista
          </button>
        </div>
      </section>

      {/* Professionals */}
      <section className="px-6 mb-6">
        <div className="space-y-4">
          {filteredProfessionals.map((prof) => (
            <PremiumCard key={prof.id}>
              <div className="flex gap-4">
                <img
                  src={prof.avatar}
                  alt={prof.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-white mb-1">{prof.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <MapPin className="w-3 h-3" />
                        {prof.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-bold text-white">{prof.rating}</span>
                      <span className="text-xs text-white/60">({prof.reviews})</span>
                    </div>
                  </div>
                  <p className="text-sm text-white/80 mb-3">{prof.bio}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {(prof.specialty === "personal" || prof.specialty === "both") && (
                        <div className="flex items-center gap-1 text-xs text-orange-500">
                          <Dumbbell className="w-3 h-3" />
                          <span>Personal</span>
                        </div>
                      )}
                      {(prof.specialty === "nutritionist" || prof.specialty === "both") && (
                        <div className="flex items-center gap-1 text-xs text-blue-500">
                          <Utensils className="w-3 h-3" />
                          <span>Nutrição</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#00FF00]">
                        R$ {prof.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-white/60">/mês</p>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-[#00FF00]/10 text-[#00FF00] font-medium py-2 rounded-lg hover:bg-[#00FF00]/20 transition-all duration-300 border border-[#00FF00]/20">
                    Ver Perfil
                  </button>
                </div>
              </div>
            </PremiumCard>
          ))}
        </div>
      </section>

      {/* Professional Registration */}
      <section className="px-6 mb-6">
        <PremiumCard className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D]">
          <h3 className="text-xl font-bold text-white mb-2">É um profissional?</h3>
          <p className="text-white/60 mb-4">
            Cadastre-se e comece a atender clientes hoje mesmo
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white/60">Taxa de matrícula única</span>
            <span className="text-2xl font-bold text-[#00FF00]">R$ 80,00</span>
          </div>
          <button className="w-full bg-[#00FF00] text-black font-bold py-3 rounded-xl hover:bg-[#00FF00]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)]">
            Cadastrar como Profissional
          </button>
        </PremiumCard>
      </section>

      <BottomNav />
    </div>
  );
}
