import { NextRequest, NextResponse } from 'next/server';
import { getAllExercicios } from '@/lib/setup-exercicios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { objetivo, nivel, diasPorSemana, gruposMusculares } = body;

    // Buscar todos os exercícios da base de dados
    const todosExercicios = await getAllExercicios();

    if (!todosExercicios || todosExercicios.length === 0) {
      return NextResponse.json(
        { error: 'Base de exercícios não encontrada. Configure o Supabase primeiro.' },
        { status: 500 }
      );
    }

    // Filtrar exercícios pelos grupos musculares solicitados
    const exerciciosFiltrados = gruposMusculares && gruposMusculares.length > 0
      ? todosExercicios.filter(ex => gruposMusculares.includes(ex.grupo_muscular))
      : todosExercicios;

    // Preparar contexto para a IA
    const exerciciosContext = exerciciosFiltrados
      .map(ex => `- ${ex.nome} (${ex.grupo_muscular}, ${ex.equipamento})`)
      .join('\n');

    // Chamar API da OpenAI para gerar treino personalizado
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Você é um personal trainer especializado. Crie um treino personalizado usando APENAS os exercícios da base de dados fornecida. 

IMPORTANTE: Use APENAS exercícios desta lista:
${exerciciosContext}

Retorne um JSON válido com a seguinte estrutura:
{
  "nome": "Nome do Treino",
  "descricao": "Descrição breve",
  "duracao": "45-60 min",
  "exercicios": [
    {
      "nome": "Nome exato do exercício da lista",
      "series": "4",
      "repeticoes": "12",
      "descanso": "60s",
      "observacoes": "Dicas de execução"
    }
  ]
}`
          },
          {
            role: 'user',
            content: `Crie um treino personalizado com as seguintes características:
- Objetivo: ${objetivo || 'Hipertrofia'}
- Nível: ${nivel || 'Intermediário'}
- Dias por semana: ${diasPorSemana || 3}
- Grupos musculares: ${gruposMusculares?.join(', ') || 'Todos'}

Use APENAS exercícios da base de dados fornecida. Selecione os melhores exercícios para este objetivo e nível.`
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.error('Erro da OpenAI:', errorData);
      return NextResponse.json(
        { error: 'Erro ao gerar treino com IA' },
        { status: 500 }
      );
    }

    const openaiData = await openaiResponse.json();
    const treinoGerado = JSON.parse(openaiData.choices[0].message.content);

    return NextResponse.json({
      success: true,
      treino: treinoGerado,
      exerciciosDisponiveis: exerciciosFiltrados.length
    });

  } catch (error) {
    console.error('Erro ao gerar treino:', error);
    return NextResponse.json(
      { error: 'Erro interno ao gerar treino' },
      { status: 500 }
    );
  }
}
