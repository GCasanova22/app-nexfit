import { supabase } from './supabase';
import { exerciciosData } from './exercicios-data';

export async function setupExerciciosTable() {
  try {
    // Criar tabela se não existir
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS exercicios (
          id SERIAL PRIMARY KEY,
          nome TEXT NOT NULL,
          grupo_muscular TEXT NOT NULL,
          equipamento TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
        );
      `
    });

    if (createError) {
      console.error('Erro ao criar tabela:', createError);
      return { success: false, error: createError };
    }

    // Verificar se já existem exercícios
    const { data: existingData, error: checkError } = await supabase
      .from('exercicios')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Erro ao verificar exercícios:', checkError);
    }

    // Se não existem exercícios, popular a tabela
    if (!existingData || existingData.length === 0) {
      const { error: insertError } = await supabase
        .from('exercicios')
        .insert(exerciciosData);

      if (insertError) {
        console.error('Erro ao inserir exercícios:', insertError);
        return { success: false, error: insertError };
      }

      console.log('✅ Base de exercícios criada e populada com sucesso!');
      return { success: true, message: 'Base de exercícios criada com sucesso!' };
    }

    console.log('✅ Base de exercícios já existe!');
    return { success: true, message: 'Base de exercícios já existe!' };
  } catch (error) {
    console.error('Erro ao configurar base de exercícios:', error);
    return { success: false, error };
  }
}

export async function getExerciciosByGrupo(grupoMuscular: string) {
  const { data, error } = await supabase
    .from('exercicios')
    .select('*')
    .eq('grupo_muscular', grupoMuscular);

  if (error) {
    console.error('Erro ao buscar exercícios:', error);
    return [];
  }

  return data || [];
}

export async function getAllExercicios() {
  const { data, error } = await supabase
    .from('exercicios')
    .select('*')
    .order('grupo_muscular', { ascending: true })
    .order('nome', { ascending: true });

  if (error) {
    console.error('Erro ao buscar exercícios:', error);
    return [];
  }

  return data || [];
}
