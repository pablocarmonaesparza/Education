import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();

    if (!idea || typeof idea !== 'string') {
      return NextResponse.json(
        { valid: false, error: 'Idea is required' },
        { status: 400 }
      );
    }

    // Validar con ChatGPT-4o-mini
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Eres un validador de ideas de proyectos. Tu tarea es evaluar si una idea de proyecto tiene sentido y es coherente. 
          
Responde SOLO con un JSON válido en este formato:
{
  "valid": true/false,
  "reason": "breve explicación en español"
}

Considera que una idea es válida si:
- Describe un proyecto o idea de manera coherente
- Tiene sentido en el contexto de desarrollo de software, automatización o IA
- No es solo caracteres aleatorios o spam
- Tiene al menos una idea básica o propósito

Responde con el JSON sin texto adicional.`,
        },
        {
          role: 'user',
          content: `Evalúa esta idea de proyecto: "${idea}"`,
        },
      ],
      temperature: 0.3,
      max_tokens: 150,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { valid: false, error: 'No response from AI' },
        { status: 500 }
      );
    }

    const validation = JSON.parse(content);
    return NextResponse.json(validation);
  } catch (error: any) {
    console.error('Error validating idea:', error);
    return NextResponse.json(
      { valid: false, error: error.message || 'Error validating idea' },
      { status: 500 }
    );
  }
}


