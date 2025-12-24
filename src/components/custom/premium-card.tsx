import { ReactNode } from "react";

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function PremiumCard({ children, className = "", glow = false }: PremiumCardProps) {
  return (
    <div
      className={`bg-[#1A1A1A] rounded-2xl p-6 border border-[#00FF00]/20 transition-all duration-300 hover:border-[#00FF00]/40 ${
        glow ? "shadow-[0_0_30px_rgba(0,255,0,0.15)]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
