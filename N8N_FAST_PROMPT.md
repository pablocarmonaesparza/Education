# 🚀 Prompt Optimizado para Respuesta Rápida (<30 segundos)

## Problema Actual
- El AI Agent está tardando >100 segundos
- Cloudflare corta la conexión con error 524
- Necesitamos reducir el tiempo de procesamiento

## Solución: Prompt Simplificado

Reemplaza el prompt completo del AI Agent con esta versión optimizada:

```
Eres un experto en educación de IA. Genera un plan de aprendizaje personalizado RÁPIDO.

PROYECTO DEL USUARIO:
{{$json.body.project_idea}}

INSTRUCCIONES:
1. Analiza la idea en 1 frase
2. Selecciona 50-60 videos del syllabus (usa Vector Store con 3-4 queries máximo)
3. Organiza en 8-10 fases lógicas
4. Numera videos del 1-60 secuencialmente

FORMATO JSON (devuelve SOLO esto):
{
  "success": true,
  "course": {
    "user_project": "Resumen en 1 frase",
    "total_videos": 58,
    "estimated_hours": "14-16 horas",
    "phases": [
      {
        "phase_number": 1,
        "phase_name": "FUNDAMENTOS",
        "phase_duration": "2-3 horas",
        "description": "Breve descripción",
        "videos": [
          {
            "order": 1,
            "section": "Introducción",
            "subsection": "Stack",
            "description": "Descripción del syllabus",
            "duration": "2:30",
            "why_relevant": "Razón específica"
          }
        ]
      }
    ],
    "learning_path_summary": ["Paso 1", "Paso 2", "Paso 3"],
    "recommendations": ["Tip 1", "Tip 2", "Tip 3"],
    "next_steps": ["Acción 1", "Acción 2", "Acción 3"]
  }
}

REGLAS PARA VELOCIDAD:
❌ NO hagas más de 4 búsquedas en Vector Store
❌ NO generes explicaciones largas
❌ NO agregues texto antes o después del JSON
✅ SÍ devuelve SOLO el JSON puro
✅ SÍ usa descripciones concisas
✅ SÍ selecciona videos relevantes rápidamente

TIEMPO MÁXIMO: 30 segundos
```

## Alternativa: Si sigue siendo lento

Si el prompt optimizado aún es lento, prueba esta versión **ULTRA RÁPIDA** (sin Vector Store):

```
Eres un experto en educación de IA. Genera un plan de aprendizaje personalizado RÁPIDO.

PROYECTO DEL USUARIO:
{{$json.body.project_idea}}

IMPORTANTE: NO uses Vector Store. Usa tu conocimiento del syllabus.

El syllabus tiene estas secciones principales:
1. Introducción (25 videos)
2. IA & LLMs (40 videos)
3. APIs (35 videos)
4. Automatización con n8n (50 videos)
5. Data & Analytics (30 videos)
6. Vibe-Coding con Claude (45 videos)
7. Productos & Deployment (40 videos)
8. Finanzas & Métricas (25 videos)

TAREA:
1. Lee la idea del usuario
2. Identifica qué secciones necesita (ej: para chatbot → IA, APIs, Automatización)
3. Selecciona 50-60 videos estimados de esas secciones
4. Organiza en 8-10 fases lógicas

FORMATO JSON (devuelve SOLO esto, sin explicaciones):
{
  "success": true,
  "course": {
    "user_project": "Resumen en 1 frase del proyecto",
    "total_videos": 58,
    "estimated_hours": "14-16 horas",
    "phases": [
      {
        "phase_number": 1,
        "phase_name": "FUNDAMENTOS",
        "phase_duration": "2-3 horas",
        "description": "Por qué esta fase es importante",
        "videos": [
          {
            "order": 1,
            "section": "Introducción",
            "subsection": "Stack",
            "description": "Panorama de LLMs disponibles",
            "duration": "2:30",
            "why_relevant": "Para elegir el LLM correcto para tu proyecto"
          }
        ]
      }
    ],
    "learning_path_summary": [
      "Primero aprenderás X",
      "Luego implementarás Y",
      "Finalmente desplegarás Z"
    ],
    "recommendations": [
      "Dedica 2-3 horas diarias",
      "Practica cada módulo",
      "Usa tu proyecto real"
    ],
    "next_steps": [
      "Comenzar con video #1",
      "Configurar ambiente (video #10)",
      "Crear prototipo (video #25)"
    ]
  }
}

REGLAS:
❌ NO uses Vector Store (muy lento)
❌ NO agregues texto explicativo
❌ NO inventes videos que no existan
✅ SÍ devuelve solo JSON
✅ SÍ usa tu conocimiento del syllabus
✅ SÍ sé específico al proyecto del usuario

TIEMPO MÁXIMO: 20 segundos. Responde YA.
```

## Configuración del AI Agent

Para la versión ULTRA RÁPIDA (sin Vector Store):

1. **Tools**: Desconecta temporalmente el Vector Store tool
2. **Model**: `claude-3-5-sonnet-20241022` (más rápido que otros)
3. **Max Tokens**: `4096` (suficiente para la respuesta)
4. **Temperature**: `0.3`
5. **System Message**: Usa el prompt ULTRA RÁPIDO de arriba

## Testing

Después de cambiar el prompt, prueba con:

```bash
curl -X POST https://pblcrmn.app.n8n.cloud/webhook/20992951-81ea-4d52-88e4-17b887bd8b5e \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "test-123",
    "user_email": "test@example.com",
    "user_name": "Test",
    "project_idea": "Chatbot para Shopify",
    "timestamp": "2025-01-12T10:30:00.000Z"
  }'
```

**Tiempo esperado**: 15-30 segundos (vs. 100+ segundos actual)

---

## Explicación del Trade-off

**Con Vector Store (actual):**
- ✅ MÁS preciso (busca videos exactos)
- ❌ LENTO (100+ segundos)
- ❌ Error 524 timeout

**Sin Vector Store (propuesto):**
- ✅ RÁPIDO (15-30 segundos)
- ✅ Sin timeouts
- ⚠️ Menos preciso, pero sigue siendo muy bueno

El modelo Claude 3.5 Sonnet tiene suficiente conocimiento del syllabus para generar buenos planes sin necesidad de buscar en Vector Store cada vez. Puedes mejorar la precisión más adelante implementando un sistema asíncrono.
