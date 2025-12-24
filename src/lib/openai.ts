import OpenAI from 'openai';

// Função helper para obter o cliente OpenAI
const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY não configurada. Configure a variável de ambiente para usar a geração de treinos e dietas com IA.');
  }
  
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

export const generateWorkoutPlan = async (userProfile: {
  age: number;
  weight: number;
  height: number;
  goal: string;
  experience: string;
  frequency: number;
  restrictions?: string;
}) => {
  const openai = getOpenAIClient();
  
  const prompt = `Você é um personal trainer experiente. Crie um plano de treino personalizado em formato JSON com base nas seguintes informações:

Idade: ${userProfile.age} anos
Peso: ${userProfile.weight} kg
Altura: ${userProfile.height} cm
Objetivo: ${userProfile.goal}
Experiência: ${userProfile.experience}
Frequência semanal: ${userProfile.frequency}x por semana
Restrições: ${userProfile.restrictions || 'Nenhuma'}

Retorne um JSON com a seguinte estrutura:
{
  "workoutDays": [
    {
      "id": "A",
      "name": "Treino A",
      "muscle": "Grupo muscular",
      "duration": 45,
      "exercises": [
        {
          "name": "Nome do exercício",
          "sets": "4x12",
          "rest": "90s",
          "notes": "Observações importantes"
        }
      ]
    }
  ],
  "recommendations": "Recomendações gerais do treino"
}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'Você é um personal trainer experiente especializado em criar planos de treino personalizados. Sempre retorne respostas em formato JSON válido.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  });

  const content = completion.choices[0].message.content;
  if (!content) throw new Error('Resposta vazia da OpenAI');
  
  return JSON.parse(content);
};

export const generateDietPlan = async (userProfile: {
  age: number;
  weight: number;
  height: number;
  goal: string;
  activityLevel: string;
  restrictions?: string;
  preferences?: string;
}) => {
  const openai = getOpenAIClient();
  
  const prompt = `Você é um nutricionista experiente. Crie um plano alimentar personalizado em formato JSON com base nas seguintes informações:

Idade: ${userProfile.age} anos
Peso: ${userProfile.weight} kg
Altura: ${userProfile.height} cm
Objetivo: ${userProfile.goal}
Nível de atividade: ${userProfile.activityLevel}
Restrições alimentares: ${userProfile.restrictions || 'Nenhuma'}
Preferências: ${userProfile.preferences || 'Nenhuma'}

Retorne um JSON com a seguinte estrutura:
{
  "dailyCalories": 2500,
  "macros": {
    "protein": 200,
    "carbs": 280,
    "fats": 70
  },
  "meals": [
    {
      "name": "Café da Manhã",
      "time": "07:00 - 08:00",
      "calories": 450,
      "foods": [
        {
          "name": "Ovos mexidos",
          "quantity": "3 unidades",
          "calories": 210
        }
      ]
    }
  ],
  "waterIntake": 3.0,
  "recommendations": "Recomendações gerais da dieta"
}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'Você é um nutricionista experiente especializado em criar planos alimentares personalizados. Sempre retorne respostas em formato JSON válido.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  });

  const content = completion.choices[0].message.content;
  if (!content) throw new Error('Resposta vazia da OpenAI');
  
  return JSON.parse(content);
};
