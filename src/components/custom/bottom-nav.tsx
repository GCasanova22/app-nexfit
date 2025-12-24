"use client";

import { Home, Dumbbell, Utensils, Store, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { icon: Home, label: "Inicial", href: "/" },
  { icon: Dumbbell, label: "Treino", href: "/treino" },
  { icon: Utensils, label: "Dieta", href: "/dieta" },
  { icon: Store, label: "Marketplace", href: "/marketplace" },
  { icon: User, label: "Perfil", href: "/perfil" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D] border-t border-[#00FF00]/20 backdrop-blur-lg z-50">
      <div className="flex justify-around items-center h-20 max-w-lg mx-auto px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                isActive
                  ? "text-[#00FF00] scale-110"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              <div
                className={`p-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-[#00FF00]/10 shadow-[0_0_20px_rgba(0,255,0,0.3)]"
                    : ""
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
