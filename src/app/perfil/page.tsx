"use client";

import { BottomNav } from "@/components/custom/bottom-nav";
import { PremiumCard } from "@/components/custom/premium-card";
import { User, Mail, Phone, MapPin, Calendar, TrendingUp, Award, Settings, LogOut, Crown } from "lucide-react";
import Image from "next/image";

export default function PerfilPage() {
  const user = {
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "+55 11 98765-4321",
    location: "São Paulo, SP",
    joinDate: "Janeiro 2024",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop",
    subscription: "Plano Completo",
    subscriptionActive: true,
  };

  const stats = [
    { label: "Treinos", value: "48", icon: TrendingUp, color: "text-orange-500" },
    { label: "Dias ativos", value: "67", icon: Calendar, color: "text-blue-500" },
    { label: "Conquistas", value: "12", icon: Award, color: "text-yellow-500" },
  ];

  const achievements = [
    { name: "Primeira Semana", icon: "🔥", unlocked: true },
    { name: "30 Dias", icon: "💪", unlocked: true },
    { name: "Disciplinado", icon: "⭐", unlocked: true },
    { name: "100 Treinos", icon: "🏆", unlocked: false },
  ];

  return (
    <div className="min-h-screen pb-24 bg-[#0D0D0D]">
      {/* Header */}
      <header className="px-6 pt-8 pb-6 bg-gradient-to-b from-[#0D0D0D] to-transparent">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Perfil</h1>
          <button className="p-2 rounded-xl bg-[#1A1A1A] border border-[#00FF00]/20 hover:border-[#00FF00]/40 transition-all duration-300">
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      {/* User Info */}
      <section className="px-6 mb-6">
        <PremiumCard glow>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#00FF00]"
              />
              {user.subscriptionActive && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#00FF00] rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-black" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
              {user.subscriptionActive && (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#00FF00]/10 border border-[#00FF00]/20 rounded-full">
                  <Crown className="w-3 h-3 text-[#00FF00]" />
                  <span className="text-xs font-medium text-[#00FF00]">{user.subscription}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-white/80">
              <Mail className="w-4 h-4 text-white/40" />
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Phone className="w-4 h-4 text-white/40" />
              <span className="text-sm">{user.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <MapPin className="w-4 h-4 text-white/40" />
              <span className="text-sm">{user.location}</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Calendar className="w-4 h-4 text-white/40" />
              <span className="text-sm">Membro desde {user.joinDate}</span>
            </div>
          </div>
        </PremiumCard>
      </section>

      {/* Stats */}
      <section className="px-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4">Estatísticas</h2>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <PremiumCard key={index} className="p-4 text-center">
                <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-white/60">{stat.label}</p>
              </PremiumCard>
            );
          })}
        </div>
      </section>

      {/* Achievements */}
      <section className="px-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4">Conquistas</h2>
        <div className="grid grid-cols-4 gap-3">
          {achievements.map((achievement, index) => (
            <PremiumCard
              key={index}
              className={`p-4 text-center ${
                !achievement.unlocked ? "opacity-40" : ""
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <p className="text-xs text-white/80">{achievement.name}</p>
            </PremiumCard>
          ))}
        </div>
      </section>

      {/* Subscription */}
      {user.subscriptionActive && (
        <section className="px-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">Assinatura</h2>
          <PremiumCard className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF00]/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{user.subscription}</h3>
                  <p className="text-sm text-white/60">Renovação automática</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#00FF00]">R$ 79,99</p>
                  <p className="text-xs text-white/60">/mês</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-[#00FF00]/10 text-[#00FF00] font-medium py-2 rounded-lg hover:bg-[#00FF00]/20 transition-all duration-300 border border-[#00FF00]/20">
                  Gerenciar
                </button>
                <button className="flex-1 bg-red-500/10 text-red-500 font-medium py-2 rounded-lg hover:bg-red-500/20 transition-all duration-300 border border-red-500/20">
                  Cancelar
                </button>
              </div>
            </div>
          </PremiumCard>
        </section>
      )}

      {/* Menu Options */}
      <section className="px-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4">Configurações</h2>
        <div className="space-y-3">
          <button className="w-full bg-[#1A1A1A] border border-[#00FF00]/20 rounded-xl p-4 flex items-center justify-between hover:border-[#00FF00]/40 transition-all duration-300">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-white/60" />
              <span className="text-white">Editar Perfil</span>
            </div>
            <span className="text-white/40">›</span>
          </button>

          <button className="w-full bg-[#1A1A1A] border border-[#00FF00]/20 rounded-xl p-4 flex items-center justify-between hover:border-[#00FF00]/40 transition-all duration-300">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-white/60" />
              <span className="text-white">Preferências</span>
            </div>
            <span className="text-white/40">›</span>
          </button>

          <button className="w-full bg-[#1A1A1A] border border-red-500/20 rounded-xl p-4 flex items-center justify-between hover:border-red-500/40 transition-all duration-300">
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-red-500" />
              <span className="text-red-500">Sair</span>
            </div>
            <span className="text-red-500/40">›</span>
          </button>
        </div>
      </section>

      {/* Logo Footer */}
      <section className="px-6 mb-6 flex justify-center">
        <Image
          src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6d775c1b-8d57-4adc-a4c0-1c38f3cb8cc3.webp"
          alt="NexFit Logo"
          width={120}
          height={120}
          className="opacity-20"
        />
      </section>

      <BottomNav />
    </div>
  );
}
