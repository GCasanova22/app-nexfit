import { NextRequest, NextResponse } from 'next/server';
import { generateWorkoutPlan } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { age, weight, height, goal, experience, frequency, restrictions } = body;

    // Validação básica
    if (!age || !weight || !height || !goal || !experience || !frequency) {
      return NextResponse.json(
        { error: 'Dados incompletos. Preencha todos os campos obrigatórios.' },
        { status: 400 }
      );
    }

    // Gerar plano de treino usando OpenAI
    const workoutPlan = await generateWorkoutPlan({
      age,
      weight,
      height,
      goal,
      experience,
      frequency,
      restrictions,
    });

    return NextResponse.json({
      success: true,
      data: workoutPlan,
    });
  } catch (error) {
    console.error('Erro ao gerar plano de treino:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar plano de treino. Tente novamente.' },
      { status: 500 }
    );
  }
}
