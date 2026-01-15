import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const { messages, courseContext } = await request.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `Eres el tutor IA de Itera, una plataforma educativa que enseña a emprendedores latinoamericanos a usar IA y automatización para construir sus proyectos.

${courseContext || ''}

IMPORTANTE - YA CONOCES AL ESTUDIANTE:
- NO preguntes su nombre, proyecto, o en qué está trabajando - YA LO SABES (está arriba en el contexto)
- NO hagas preguntas genéricas como "¿en qué puedo ayudarte?" o "¿qué proyecto tienes?"
- USA activamente la información que ya tienes para dar respuestas relevantes
- Si el estudiante saluda, responde con algo específico sobre su proyecto o progreso

TU PERSONALIDAD:
- Eres amigable, directo y motivador
- Vas al grano - no haces preguntas innecesarias
- Celebras los logros del estudiante mencionando su progreso real
- Eres honesto cuando no sabes algo

CÓMO RESPONDER:
- Siempre en español
- Respuestas concisas y útiles (máximo 3-4 párrafos)
- Relaciona SIEMPRE tus explicaciones con el proyecto específico del estudiante
- Si el estudiante solo saluda, menciona algo de su progreso o sugiere el siguiente paso en su aprendizaje
- Usa su nombre de vez en cuando pero no en cada mensaje

TEMAS QUE DOMINAS:
- Inteligencia Artificial y sus aplicaciones prácticas
- Automatización con herramientas no-code (n8n, Make, Zapier)
- APIs y cómo conectar servicios
- Prompting y uso de LLMs
- RAG (Retrieval Augmented Generation)
- Agentes de IA
- MCP (Model Context Protocol)
- Emprendimiento y validación de ideas`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const assistantMessage = response.choices[0]?.message?.content || 'Lo siento, no pude procesar tu pregunta.';

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('Tutor chat error:', error);
    return NextResponse.json(
      { error: 'Error al procesar tu mensaje' },
      { status: 500 }
    );
  }
}
