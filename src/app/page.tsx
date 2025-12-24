"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar automaticamente para a página de autenticação
    router.push("/auth");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
      <div className="text-center">
        <Image
          src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6d775c1b-8d57-4adc-a4c0-1c38f3cb8cc3.webp"
          alt="NexFit Logo"
          width={100}
          height={100}
          className="drop-shadow-[0_0_30px_rgba(0,255,0,0.6)] mx-auto mb-6 animate-pulse"
          priority
        />
        <p className="text-white/60 text-lg">Redirecionando...</p>
      </div>
    </div>
  );
}
