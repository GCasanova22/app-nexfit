"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Zap, Dumbbell, Apple, Crown } from "lucide-react";
import Image from "next/image";

function PlanosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const hasDiscount = searchParams.get("desconto") === "true";

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      // Redireciona DIRETO para o app com o plano selecionado (sem passar pelo login)
      router.push(`/app?plano=${selectedPlan}`);
    }
  };

  const handleSkip = () => {
    setShowDiscountModal(true);
  };

  const handleSkipWithoutDiscount = () => {
    // Acessa o app sem plano (apenas marketplace) - DIRETO
    router.push("/app?plano=free");
  };

  const handleAcceptDiscount = () => {
    setShowDiscountModal(false);
    // Força o desconto a aparecer
    router.push("/auth/planos?desconto=true");
  };

  const plans = [
    {
      id: "treino",
      name: "Treino IA",
      icon: Dumbbell,
      price: hasDiscount ? 14.95 : 29.90,
      originalPrice: hasDiscount ? 29.90 : null,
      description: "Treinos personalizados com inteligência artificial",
      features: [
        "Geração de treino com IA",
        "Calendário de treinos",
        "Acompanhamento de progresso",
        "Acesso ao marketplace de personais",
      ],
      color: "from-blue-500 to-cyan-500",
      badge: null,
    },
    {
      id: "dieta",
      name: "Dieta IA",
      icon: Apple,
      price: hasDiscount ? 19.95 : 39.90,
      originalPrice: hasDiscount ? 39.90 : null,
      description: "Planos alimentares inteligentes e personalizados",
      features: [
        "Geração de dieta com IA",
        "Horários de refeições",
        "Receitas personalizadas",
        "Acesso ao marketplace de personais",
      ],
      color: "from-green-500 to-emerald-500",
      badge: null,
    },
    {
      id: "completo",
      name: "Completo",
      icon: Crown,
      price: hasDiscount ? 29.99 : 59.99,
      originalPrice: hasDiscount ? 59.99 : null,
      description: "Transformação completa: treino + nutrição",
      features: [
        "Tudo do plano Treino IA",
        "Tudo do plano Dieta IA",
        "Suporte prioritário",
        "Acesso ilimitado ao marketplace",
      ],
      color: "from-purple-500 to-pink-500",
      badge: "MAIS POPULAR",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] pb-32" suppressHydrationWarning>
      {/* Header */}
      <div className="sticky top-0 bg-[#0D0D0D]/95 backdrop-blur-lg border-b border-white/10 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-center">
            <Image
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6d775c1b-8d57-4adc-a4c0-1c38f3cb8cc3.webp"
              alt="NexFit Logo"
              width={40}
              height={40}
              className="drop-shadow-[0_0_15px_rgba(0,255,0,0.5)]"
            />
          </div>
        </div>
      </div>

      <div className="px-6 pt-8">
        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Escolha seu plano
          </h1>
          <p className="text-white/60">
            Selecione o plano ideal para seus objetivos
          </p>
          {hasDiscount && (
            <div className="mt-4 inline-block bg-gradient-to-r from-[#00FF00]/20 to-blue-500/20 border border-[#00FF00]/30 rounded-full px-4 py-2">
              <p className="text-[#00FF00] font-bold text-sm">
                🎉 50% OFF nos primeiros 3 meses ativado!
              </p>
            </div>
          )}
        </div>

        {/* Cards de Planos */}
        <div className="space-y-4 mb-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => handleSelectPlan(plan.id)}
                className={`relative bg-[#1A1A1A] rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-[#00FF00] shadow-[0_0_30px_rgba(0,255,0,0.3)]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Ícone */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {plan.name}
                        </h3>
                        <p className="text-sm text-white/60 mt-1">
                          {plan.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-[#00FF00] flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-black" />
                        </div>
                      )}
                    </div>

                    {/* Preço */}
                    <div className="flex items-baseline gap-2 mb-4">
                      {plan.originalPrice && (
                        <span className="text-white/40 line-through text-lg">
                          R$ {plan.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-3xl font-bold text-white">
                        R$ {plan.price.toFixed(2)}
                      </span>
                      <span className="text-white/60">/mês</span>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-[#00FF00] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-white/80">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informação sobre acesso gratuito */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-[#00FF00] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-white/80">
                <span className="font-semibold text-white">
                  Acesso gratuito ao marketplace:
                </span>{" "}
                Mesmo sem escolher um plano, você terá acesso completo ao
                marketplace de personal trainers.
              </p>
            </div>
          </div>
        </div>

        {/* Nota sobre desconto */}
        {hasDiscount && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
            <p className="text-xs text-yellow-200/80 text-center">
              * Oferta válida apenas para novos usuários. Após os 3 primeiros
              meses, o valor volta ao preço normal. Não há reembolso.
            </p>
          </div>
        )}
      </div>

      {/* Botões fixos */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D] border-t border-white/10 p-6 space-y-3">
        <button
          onClick={handleContinue}
          disabled={!selectedPlan}
          className={`w-full font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
            selectedPlan
              ? "bg-[#00FF00] text-black hover:bg-[#00FF00]/90 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]"
              : "bg-white/10 text-white/40 cursor-not-allowed"
          }`}
        >
          {selectedPlan ? "Continuar com plano selecionado" : "Selecione um plano"}
        </button>
        <button
          onClick={handleSkip}
          className="w-full bg-white/5 text-white/60 font-semibold py-3 rounded-xl hover:bg-white/10 transition-colors"
        >
          Pular e acessar apenas o marketplace
        </button>
      </div>

      {/* Modal de Desconto (quando pula sem ter desconto) */}
      {showDiscountModal && !hasDiscount && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-in fade-in duration-300">
          <div className="bg-[#1A1A1A] rounded-2xl p-6 max-w-md w-full border border-white/10 animate-in zoom-in duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#00FF00]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎁</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Oferta Exclusiva!
              </h3>
              <p className="text-white/60">
                Antes de ir, temos algo especial para você
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#00FF00]/20 to-blue-500/20 rounded-xl p-6 mb-6 border border-[#00FF00]/30">
              <div className="text-center">
                <p className="text-[#00FF00] font-bold text-4xl mb-2">
                  50% OFF
                </p>
                <p className="text-white text-lg font-semibold mb-1">
                  nos primeiros 3 meses
                </p>
                <p className="text-white/60 text-sm mb-3">
                  em qualquer plano de assinatura
                </p>
                <p className="text-xs text-white/40">
                  * Não há reembolso após a contratação
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAcceptDiscount}
                className="w-full bg-[#00FF00] text-black font-bold py-4 rounded-xl hover:bg-[#00FF00]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)]"
              >
                Quero aproveitar! 🚀
              </button>
              <button
                onClick={handleSkipWithoutDiscount}
                className="w-full bg-white/5 text-white/60 font-semibold py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                Continuar sem plano
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PlanosPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    }>
      <PlanosContent />
    </Suspense>
  );
}
