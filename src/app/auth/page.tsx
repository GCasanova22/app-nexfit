"use client";

import { useState } from "react";
import { Mail, Lock, User, Dumbbell, Apple } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type UserType = "cliente" | "profissional";
type AuthMode = "login" | "cadastro";

// Credenciais hardcoded para login direto
const ADMIN_CREDENTIALS = {
  email: "guilhermecasanova001@gmail.com",
  senha: "@GRc07022003"
};

export default function AuthPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>("cliente");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [nome, setNome] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    setSenhaError("");
    
    try {
      // Validar senhas no cadastro
      if (authMode === "cadastro") {
        if (senha !== confirmarSenha) {
          setSenhaError("As senhas não coincidem");
          setIsLoading(false);
          return;
        }
      }
      
      if (authMode === "login") {
        // Verificar credenciais hardcoded
        if (email === ADMIN_CREDENTIALS.email && senha === ADMIN_CREDENTIALS.senha) {
          // Login bem-sucedido - redireciona DIRETO para o app principal
          router.push("/app");
          return;
        } else {
          setLoginError("Email ou senha incorretos");
          setIsLoading(false);
          return;
        }
      }
      
      if (authMode === "cadastro" && userType === "cliente") {
        // Redirecionar para questionário
        router.push("/questionario");
      } else if (authMode === "cadastro" && userType === "profissional") {
        // Redirecionar para cadastro de profissional
        router.push("/auth/cadastro-profissional");
      }
    } catch (error) {
      console.error("Erro no redirecionamento:", error);
      setLoginError("Erro ao processar. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-6" suppressHydrationWarning>
      <div className="w-full max-w-md" suppressHydrationWarning>
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6d775c1b-8d57-4adc-a4c0-1c38f3cb8cc3.webp"
            alt="NexFit Logo"
            width={80}
            height={80}
            className="drop-shadow-[0_0_20px_rgba(0,255,0,0.6)]"
            priority
          />
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          {authMode === "login" ? "Bem-vindo de volta" : "Criar conta"}
        </h1>
        <p className="text-white/60 text-center mb-8">
          {authMode === "login" 
            ? "Entre para continuar seu progresso" 
            : "Comece sua jornada fitness hoje"}
        </p>

        {/* Seletor de Tipo de Usuário */}
        <div className="flex gap-3 mb-6">
          <button
            type="button"
            onClick={() => setUserType("cliente")}
            className={`flex-1 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              userType === "cliente"
                ? "bg-[#00FF00] text-black shadow-[0_0_20px_rgba(0,255,0,0.4)]"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            <Dumbbell className="w-5 h-5" />
            Cliente
          </button>
          <button
            type="button"
            onClick={() => setUserType("profissional")}
            className={`flex-1 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              userType === "profissional"
                ? "bg-[#00FF00] text-black shadow-[0_0_20px_rgba(0,255,0,0.4)]"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            <Apple className="w-5 h-5" />
            Profissional
          </button>
        </div>

        {/* Card de Autenticação */}
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/10 shadow-xl" suppressHydrationWarning>
          <form onSubmit={handleAuth} className="space-y-4" suppressHydrationWarning>
            {authMode === "cadastro" && (
              <div suppressHydrationWarning>
                <label htmlFor="nome-input" className="block text-sm font-medium text-white/80 mb-2">
                  Nome completo
                </label>
                <div className="relative" suppressHydrationWarning>
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    id="nome-input"
                    name="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF00] transition-colors"
                    required
                    autoComplete="name"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            )}

            <div suppressHydrationWarning>
              <label htmlFor="email-input" className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <div className="relative" suppressHydrationWarning>
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="email-input"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (loginError) setLoginError("");
                  }}
                  placeholder="seu@email.com"
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF00] transition-colors"
                  required
                  autoComplete="email"
                  suppressHydrationWarning
                />
              </div>
            </div>

            <div suppressHydrationWarning>
              <label htmlFor="senha-input" className="block text-sm font-medium text-white/80 mb-2">
                Senha
              </label>
              <div className="relative" suppressHydrationWarning>
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="senha-input"
                  name="senha"
                  type="password"
                  value={senha}
                  onChange={(e) => {
                    setSenha(e.target.value);
                    if (senhaError) setSenhaError("");
                    if (loginError) setLoginError("");
                  }}
                  placeholder="••••••••"
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF00] transition-colors"
                  required
                  autoComplete={authMode === "login" ? "current-password" : "new-password"}
                  suppressHydrationWarning
                />
              </div>
            </div>

            {authMode === "cadastro" && (
              <div suppressHydrationWarning>
                <label htmlFor="confirmar-senha-input" className="block text-sm font-medium text-white/80 mb-2">
                  Confirmar Senha
                </label>
                <div className="relative" suppressHydrationWarning>
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    id="confirmar-senha-input"
                    name="confirmar-senha"
                    type="password"
                    value={confirmarSenha}
                    onChange={(e) => {
                      setConfirmarSenha(e.target.value);
                      if (senhaError) setSenhaError("");
                    }}
                    placeholder="••••••••"
                    className={`w-full bg-[#0D0D0D] border rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none transition-colors ${
                      senhaError 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-white/10 focus:border-[#00FF00]"
                    }`}
                    required
                    autoComplete="new-password"
                    suppressHydrationWarning
                  />
                </div>
                {senhaError && (
                  <p className="text-red-500 text-sm mt-2">{senhaError}</p>
                )}
              </div>
            )}

            {loginError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <p className="text-red-400 text-sm text-center">{loginError}</p>
              </div>
            )}

            {authMode === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-[#00FF00] hover:text-[#00FF00]/80 transition-colors"
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00FF00] text-black font-bold py-4 rounded-xl hover:bg-[#00FF00]/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Entrando..." : authMode === "login" ? "Entrar" : "Continuar"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setAuthMode(authMode === "login" ? "cadastro" : "login");
                setLoginError("");
                setSenhaError("");
              }}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {authMode === "login" ? (
                <>
                  Não tem uma conta?{" "}
                  <span className="text-[#00FF00] font-semibold">Cadastre-se</span>
                </>
              ) : (
                <>
                  Já tem uma conta?{" "}
                  <span className="text-[#00FF00] font-semibold">Entrar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Informação adicional para profissionais */}
        {userType === "profissional" && authMode === "cadastro" && (
          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <p className="text-sm text-blue-400 text-center">
              💼 Profissionais precisam fornecer CREF/CRN para validação
            </p>
          </div>
        )}

        {/* Atalho para teste rápido */}
        {authMode === "login" && (
          <div className="mt-4 p-4 bg-[#00FF00]/5 border border-[#00FF00]/20 rounded-xl">
            <p className="text-xs text-[#00FF00]/80 text-center">
              💡 Dica: Use as credenciais pré-configuradas para acesso rápido
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
