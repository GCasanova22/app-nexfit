import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para as tabelas
export interface Cliente {
  id: string;
  email: string;
  nome: string;
  data_nascimento: string;
  genero: 'masculino' | 'feminino' | 'outro';
  altura: number;
  peso: number;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  objetivo: 'perder_peso' | 'ganhar_musculo' | 'ficar_forte' | 'definir';
  partes_foco: string[]; // Array de partes do corpo
  nivel_atividade: 'sedentario' | 'levemente_ativo' | 'moderadamente_ativo' | 'altamente_ativo' | 'extremamente_ativo';
  refeicoes_dia: number;
  familiaridade_nutricao: 'nao_sabe' | 'sabe_algo' | 'sabe_muito';
  plano_assinatura: 'basico' | 'premium' | 'elite';
  desconto_aplicado: boolean;
  created_at: string;
}

export interface Profissional {
  id: string;
  email: string;
  nome: string;
  tipo: 'personal' | 'nutricionista';
  cref_crn: string; // Registro profissional
  telefone: string;
  especialidades: string[];
  created_at: string;
}
