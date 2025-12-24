import { supabase } from './supabase';
import type { Cliente, Profissional } from './supabase';

// Tipos para autenticação
export interface SignUpClienteData {
  email: string;
  senha: string;
  nome: string;
  dataNascimento: string;
  genero: 'masculino' | 'feminino' | 'outro';
  altura: number;
  peso: number;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  objetivo: 'perder_peso' | 'ganhar_musculo' | 'ficar_forte' | 'definir';
  partesFoco: string[];
  nivelAtividade: 'sedentario' | 'levemente_ativo' | 'moderadamente_ativo' | 'altamente_ativo' | 'extremamente_ativo';
  refeicoesdia: number;
  familiaridadeNutricao: 'nao_sabe' | 'sabe_algo' | 'sabe_muito';
  planoAssinatura: 'basico' | 'premium' | 'elite';
  descontoAplicado: boolean;
}

export interface SignUpProfissionalData {
  email: string;
  senha: string;
  nome: string;
  tipo: 'personal' | 'nutricionista';
  crefCrn: string;
  telefone: string;
  especialidades: string[];
}

// Cadastrar cliente
export async function signUpCliente(data: SignUpClienteData) {
  try {
    // 1. Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.senha,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Erro ao criar usuário');

    // 2. Inserir dados do cliente na tabela
    const { data: clienteData, error: clienteError } = await supabase
      .from('clientes')
      .insert({
        id: authData.user.id,
        email: data.email,
        nome: data.nome,
        data_nascimento: data.dataNascimento,
        genero: data.genero,
        altura: data.altura,
        peso: data.peso,
        nivel: data.nivel,
        objetivo: data.objetivo,
        partes_foco: data.partesFoco,
        nivel_atividade: data.nivelAtividade,
        refeicoes_dia: data.refeicoesdia,
        familiaridade_nutricao: data.familiaridadeNutricao,
        plano_assinatura: data.planoAssinatura,
        desconto_aplicado: data.descontoAplicado,
      })
      .select()
      .single();

    if (clienteError) throw clienteError;

    return { success: true, data: clienteData };
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    return { success: false, error };
  }
}

// Cadastrar profissional
export async function signUpProfissional(data: SignUpProfissionalData) {
  try {
    // 1. Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.senha,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Erro ao criar usuário');

    // 2. Inserir dados do profissional na tabela
    const { data: profissionalData, error: profissionalError } = await supabase
      .from('profissionais')
      .insert({
        id: authData.user.id,
        email: data.email,
        nome: data.nome,
        tipo: data.tipo,
        cref_crn: data.crefCrn,
        telefone: data.telefone,
        especialidades: data.especialidades,
        aprovado: false, // Precisa ser aprovado manualmente
      })
      .select()
      .single();

    if (profissionalError) throw profissionalError;

    return { success: true, data: profissionalData };
  } catch (error) {
    console.error('Erro ao cadastrar profissional:', error);
    return { success: false, error };
  }
}

// Login
export async function signIn(email: string, senha: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return { success: false, error };
  }
}

// Logout
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return { success: false, error };
  }
}

// Obter usuário atual
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { success: true, user };
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    return { success: false, error };
  }
}

// Obter dados do cliente
export async function getClienteData(userId: string): Promise<Cliente | null> {
  try {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao obter dados do cliente:', error);
    return null;
  }
}

// Obter dados do profissional
export async function getProfissionalData(userId: string): Promise<Profissional | null> {
  try {
    const { data, error } = await supabase
      .from('profissionais')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao obter dados do profissional:', error);
    return null;
  }
}

// Verificar tipo de usuário
export async function getUserType(userId: string): Promise<'cliente' | 'profissional' | null> {
  try {
    // Tentar buscar como cliente
    const cliente = await getClienteData(userId);
    if (cliente) return 'cliente';

    // Tentar buscar como profissional
    const profissional = await getProfissionalData(userId);
    if (profissional) return 'profissional';

    return null;
  } catch (error) {
    console.error('Erro ao verificar tipo de usuário:', error);
    return null;
  }
}
