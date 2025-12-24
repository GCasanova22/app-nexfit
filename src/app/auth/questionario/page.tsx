"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

type Step = 1 | 2 | 3 | 4 | 5;

export default function QuestionarioPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [showDiscountModal, setShowDiscountModal] = useState(false);

  // Dados do questionário
  const [formData, setFormData] = useState({
    nivel: "",
    genero: "",
    altura: "",
    peso: "",
    objetivo: "",
    dataNascimento: "",
    partesFoco: [] as string[],
    nivelAtividade: "",
    refeicoesdia: "",
    familiaridadeNutricao: "",
  });

  const handleExit = () => {
    setShowDiscountModal(true);
  };

  const handleContinueSemDesconto = () => {
    router.push("/auth");
  };

  const handleAceitarDesconto = () => {
    router.push("/auth/planos?desconto=true");
  };

  const toggleParteFoco = (parte: string) => {
    setFormData(prev => ({
      ...prev,
      partesFoco: prev.partesFoco.includes(parte)
        ? prev.partesFoco.filter(p => p !== parte)
        : [...prev.partesFoco, parte]
    }));
  };

  const nextStep = () => {
    if (step < 5) setStep((step + 1) as Step);
    else router.push("/auth/planos");
  };

  const prevStep = () => {
    if (step > 1) setStep((step - 1) as Step);
  };

  const progress = (step / 5) * 100;

  return (
    <div className="min-h-screen bg-[#0D0D0D] relative" suppressHydrationWarning>
      {/* Botão de Sair */}
      <button
        onClick={handleExit}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors z-50"
      >
        <X className="w-5 h-5 text-white/60" />
      </button>

      {/* Logo */}
      <div className="flex justify-center pt-8 mb-6">
        <Image
          src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6d775c1b-8d57-4adc-a4c0-1c38f3cb8cc3.webp"
          alt="NexFit Logo"
          width={60}
          height={60}
          className="drop-shadow-[0_0_15px_rgba(0,255,0,0.5)]"
        />
      </div>

      {/* Barra de Progresso */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/60">Passo {step} de 5</span>
          <span className="text-sm text-[#00FF00] font-semibold">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00FF00] transition-all duration-500 shadow-[0_0_10px_rgba(0,255,0,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="px-6 pb-24" suppressHydrationWarning>
        {/* STEP 1 - Nível, Gênero, Medidas */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Vamos começar!</h2>
              <p className="text-white/60">Conte-nos um pouco sobre você</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">
                Qual seu nível de experiência?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["iniciante", "intermediario", "avancado"].map((nivel) => (
                  <button
                    key={nivel}
                    onClick={() => setFormData({ ...formData, nivel })}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all capitalize ${
                      formData.nivel === nivel
                        ? "bg-[#00FF00] text-black shadow-[0_0_15px_rgba(0,255,0,0.4)]"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    {nivel === "intermediario" ? "Inter." : nivel}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">
                Gênero
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["masculino", "feminino", "outro"].map((genero) => (
                  <button
                    key={genero}
                    onClick={() => setFormData({ ...formData, genero })}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all capitalize ${
                      formData.genero === genero
                        ? "bg-[#00FF00] text-black shadow-[0_0_15px_rgba(0,255,0,0.4)]"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    {genero}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Altura (cm)
                </label>
                <input
                  type="number"
                  value={formData.altura}
                  onChange={(e) => setFormData({ ...formData, altura: e.target.value })}
                  placeholder="170"
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF00] transition-colors"
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  value={formData.peso}
                  onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                  placeholder="70"
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF00] transition-colors"
                  suppressHydrationWarning
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Data de Nascimento
              </label>
              <input
                type="date"
                value={formData.dataNascimento}
                onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00FF00] transition-colors"
                suppressHydrationWarning
              />
            </div>
          </div>
        )}

        {/* STEP 2 - Objetivo */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Qual seu objetivo?</h2>
              <p className="text-white/60">Escolha o que mais se aproxima do seu objetivo principal</p>
            </div>

            <div className="space-y-3">
              {[
                { value: "perder_peso", label: "Perder Peso", emoji: "🔥" },
                { value: "ganhar_musculo", label: "Ganhar Músculo", emoji: "💪" },
                { value: "ficar_forte", label: "Ficar Muito Forte", emoji: "🏋️" },
                { value: "definir", label: "Definir o Corpo", emoji: "✨" },
              ].map((obj) => (
                <button
                  key={obj.value}
                  onClick={() => setFormData({ ...formData, objetivo: obj.value })}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all text-left flex items-center gap-3 ${
                    formData.objetivo === obj.value
                      ? "bg-[#00FF00] text-black shadow-[0_0_20px_rgba(0,255,0,0.4)]"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <span className="text-2xl">{obj.emoji}</span>
                  <span>{obj.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 - Partes do Corpo */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Áreas de foco</h2>
              <p className="text-white/60">Selecione as partes do corpo que quer focar (pode escolher várias)</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                "Peito", "Costas", "Ombros", "Braços",
                "Abdômen", "Pernas", "Glúteos", "Panturrilhas"
              ].map((parte) => (
                <button
                  key={parte}
                  onClick={() => toggleParteFoco(parte)}
                  className={`py-4 px-4 rounded-xl font-semibold transition-all ${
                    formData.partesFoco.includes(parte)
                      ? "bg-[#00FF00] text-black shadow-[0_0_15px_rgba(0,255,0,0.4)]"
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  {parte}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4 - Nível de Atividade */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Nível de atividade</h2>
              <p className="text-white/60">Como você descreveria seu dia a dia?</p>
            </div>

            <div className="space-y-3">
              {[
                { value: "sedentario", label: "Sedentário", desc: "Pouco ou nenhum exercício" },
                { value: "levemente_ativo", label: "Levemente Ativo", desc: "Exercício leve 1-3 dias/semana" },
                { value: "moderadamente_ativo", label: "Moderadamente Ativo", desc: "Exercício moderado 3-5 dias/semana" },
                { value: "altamente_ativo", label: "Altamente Ativo", desc: "Exercício intenso 6-7 dias/semana" },
                { value: "extremamente_ativo", label: "Extremamente Ativo", desc: "Exercício muito intenso diariamente" },
              ].map((nivel) => (
                <button
                  key={nivel.value}
                  onClick={() => setFormData({ ...formData, nivelAtividade: nivel.value })}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all text-left ${
                    formData.nivelAtividade === nivel.value
                      ? "bg-[#00FF00] text-black shadow-[0_0_20px_rgba(0,255,0,0.4)]"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <div className="font-semibold">{nivel.label}</div>
                  <div className={`text-sm mt-1 ${formData.nivelAtividade === nivel.value ? "text-black/70" : "text-white/50"}`}>
                    {nivel.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5 - Nutrição */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Hábitos alimentares</h2>
              <p className="text-white/60">Últimas perguntas sobre sua alimentação</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">
                Quantas refeições você faz por dia?
              </label>
              <div className="grid grid-cols-4 gap-3">
                {["2", "3", "4", "5+"].map((num) => (
                  <button
                    key={num}
                    onClick={() => setFormData({ ...formData, refeicoesdia: num })}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                      formData.refeicoesdia === num
                        ? "bg-[#00FF00] text-black shadow-[0_0_15px_rgba(0,255,0,0.4)]"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">
                Familiaridade com nutrição
              </label>
              <div className="space-y-3">
                {[
                  { value: "nao_sabe", label: "Não sei nada", emoji: "🤷" },
                  { value: "sabe_algo", label: "Sei alguma coisa", emoji: "📚" },
                  { value: "sabe_muito", label: "Sei muito", emoji: "🎓" },
                ].map((nivel) => (
                  <button
                    key={nivel.value}
                    onClick={() => setFormData({ ...formData, familiaridadeNutricao: nivel.value })}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all text-left flex items-center gap-3 ${
                      formData.familiaridadeNutricao === nivel.value
                        ? "bg-[#00FF00] text-black shadow-[0_0_20px_rgba(0,255,0,0.4)]"
                        : "bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    <span className="text-2xl">{nivel.emoji}</span>
                    <span>{nivel.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botões de Navegação */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D] border-t border-white/10 p-6">
        <div className="flex gap-3">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}
          <button
            onClick={nextStep}
            className="flex-1 bg-[#00FF00] text-black font-bold py-4 rounded-xl hover:bg-[#00FF00]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] flex items-center justify-center gap-2"
          >
            {step === 5 ? "Ver Planos" : "Continuar"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modal de Desconto */}
      {showDiscountModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-in fade-in duration-300">
          <div className="bg-[#1A1A1A] rounded-2xl p-6 max-w-md w-full border border-white/10 animate-in zoom-in duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#00FF00]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎉</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Espere!</h3>
              <p className="text-white/60">
                Temos uma oferta especial para você
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#00FF00]/20 to-blue-500/20 rounded-xl p-6 mb-6 border border-[#00FF00]/30">
              <div className="text-center">
                <p className="text-[#00FF00] font-bold text-3xl mb-2">50% OFF</p>
                <p className="text-white text-lg font-semibold mb-1">nos primeiros 3 meses</p>
                <p className="text-white/60 text-sm">em qualquer plano de assinatura</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAceitarDesconto}
                className="w-full bg-[#00FF00] text-black font-bold py-4 rounded-xl hover:bg-[#00FF00]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)]"
              >
                Quero o desconto! 🚀
              </button>
              <button
                onClick={handleContinueSemDesconto}
                className="w-full bg-white/5 text-white/60 font-semibold py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                Não, obrigado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
