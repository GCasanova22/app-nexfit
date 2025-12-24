"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Phone, Award, ChevronLeft } from "lucide-react";
import Image from "next/image";

export default function CadastroProfissionalPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    tipo: "personal" as "personal" | "nutricionista",
    crefCrn: "",
    especialidades: [] as string[],
  });

  const especialidadesPersonal = [
    "Musculação",
    "Funcional",
    "CrossFit",
    "Pilates",
    "Yoga",
    "Corrida",
    "Natação",
    "Lutas",
  ];

  const especialidadesNutricionista = [
    "Emagrecimento",
    "Hipertrofia",
    "Esportiva",
    "Clínica",
    "Vegetariana/Vegana",
    "Gestantes",
    "Idosos",
    "Crianças",
  ];

  const toggleEspecialidade = (esp: string) => {
    setFormData(prev => ({
      ...prev,
      especialidades: prev.especialidades.includes(esp)
        ? prev.especialidades.filter(e => e !== esp)
        : [...prev.especialidades, esp]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você salvaria no Supabase
    router.push("/");
  };

  const especialidadesDisponiveis = formData.tipo === "personal" 
    ? especialidadesPersonal 
    : especialidadesNutricionista;

  return (
    <div className="min-h-screen bg-[#0D0D0D] py-8 px-6">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Voltar
      </button>

      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6d775c1b-8d57-4adc-a4c0-1c38f3cb8cc3.webp"
            alt="NexFit Logo"
            width={60}
            height={60}
            className="drop-shadow-[0_0_15px_rgba(0,255,0,0.5)]"
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Cadastro Profissional
          </h1>
          <p className="text-white/60">
            Preencha seus dados para começar a atender clientes
          </p>
        </div>

        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de Profissional */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">
                Tipo de Profissional
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, tipo: "personal", especialidades: [] })}
                  className={`py-4 px-4 rounded-xl font-semibold transition-all ${
                    formData.tipo === "personal"
                      ? "bg-[#00FF00] text-black shadow-[0_0_15px_rgba(0,255,0,0.4)]"
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  Personal Trainer
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, tipo: "nutricionista", especialidades: [] })}
                  className={`py-4 px-4 rounded-xl font-semibold transition-all ${
                    formData.tipo === "nutricionista"
                      ? "bg-[#00FF00] text-black shadow-[0_0_15px_rgba(0,255,0,0.4)]"
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  Nutricionista
                </button>
              </div>
            </div>

            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Nome completo
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Seu nome completo"
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF00] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Email profissional
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF00] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Telefone/WhatsApp
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  placeholder="(00) 00000-0000"
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF00] transition-colors"
                  required
                />
              </div>
            </div>

            {/* CREF/CRN */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                {formData.tipo === "personal" ? "CREF" : "CRN"} (Registro Profissional)
              </label>
              <div className="relative">
                <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={formData.crefCrn}
                  onChange={(e) => setFormData({ ...formData, crefCrn: e.target.value })}
                  placeholder={formData.tipo === "personal" ? "000000-G/SP" : "0000000"}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF00] transition-colors"
                  required
                />
              </div>
              <p className="text-xs text-white/40 mt-2">
                Seu registro será validado antes da aprovação
              </p>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="password"
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF00] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Especialidades */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">
                Especialidades (selecione pelo menos uma)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {especialidadesDisponiveis.map((esp) => (
                  <button
                    key={esp}
                    type="button"
                    onClick={() => toggleEspecialidade(esp)}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all text-sm ${
                      formData.especialidades.includes(esp)
                        ? "bg-[#00FF00] text-black shadow-[0_0_15px_rgba(0,255,0,0.4)]"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    {esp}
                  </button>
                ))}
              </div>
            </div>

            {/* Botão Submit */}
            <button
              type="submit"
              className="w-full bg-[#00FF00] text-black font-bold py-4 rounded-xl hover:bg-[#00FF00]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]"
            >
              Criar Conta Profissional
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <p className="text-sm text-blue-400 text-center">
              ⏱️ Seu cadastro será analisado em até 24 horas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
