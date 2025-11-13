import { NextRequest, NextResponse } from 'next/server';

// Aumentar el timeout a 5 minutos (300 segundos)
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

    if (!N8N_WEBHOOK_URL || N8N_WEBHOOK_URL.includes('tu-webhook-n8n.com')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Webhook not configured. Please set NEXT_PUBLIC_N8N_WEBHOOK_URL in .env.local'
        },
        { status: 500 }
      );
    }

    console.log('Triggering n8n workflow (async):', N8N_WEBHOOK_URL);
    console.log('User ID:', body.user_id);

    // Llamar al webhook de n8n - este ahora responderá inmediatamente
    // y continuará procesando en background
    fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).catch(err => {
      console.error('n8n webhook call failed:', err);
    });

    // Responder inmediatamente al frontend
    console.log('Workflow triggered, returning success');

    return NextResponse.json({
      status: 'processing',
      job_id: body.user_id,
      message: 'Course generation started. This will take ~2-3 minutes.',
      estimated_time: 150
    });

  } catch (error: any) {
    console.error('Error in generate-course API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error'
      },
      { status: 500 }
    );
  }
}
