import { NextRequest, NextResponse } from 'next/server';
import { generateDietPlan } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { age, weight, height, goal, activityLevel, restrictions, preferences } = body;

    // Validação básica
    if (!age || !weight || !height || !goal || !activityLevel) {
      return NextResponse.json(
        { error: 'Dados incompletos. Preencha todos os campos obrigatórios.' },
        { status: 400 }
      );
    }

    // Gerar plano alimentar usando OpenAI
    const dietPlan = await generateDietPlan({
      age,
      weight,
      height,
      goal,
      activityLevel,
      restrictions,
      preferences,
    });

    return NextResponse.json({
      success: true,
      data: dietPlan,
    });
  } catch (error) {
    console.error('Erro ao gerar plano alimentar:', error);
    
    // Verificar se é erro de API key
    if (error instanceof Error && error.message.includes('OPENAI_API_KEY')) {
      return NextResponse.json(
        { 
          error: 'API Key da OpenAI não configurada. Configure a variável de ambiente OPENAI_API_KEY para usar a geração de dietas com IA.',
          needsApiKey: true
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erro ao gerar plano alimentar. Tente novamente.' },
      { status: 500 }
    );
  }
}
