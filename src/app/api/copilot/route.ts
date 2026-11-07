import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'El mensaje es requerido.' },
        { status: 400 }
      );
    }

    // Simulación de respuesta inteligente según palabras clave
    let botResponse = "He analizado tu consulta sobre la arquitectura. El código se encuentra estable, aunque se recomienda monitorear los límites de memoria en llamadas concurrentes.";
    
    const lower = message.toLowerCase();
    if (lower.includes('seguridad') || lower.includes('vulnerabilidad') || lower.includes('security')) {
      botResponse = "🛡️ **Diagnóstico de Seguridad:** No se han detectado fugas de secretos ni credenciales expuestas en los últimos commits. Sin embargo, sugiero revisar las dependencias obsoletas en `package.json`.";
    } else if (lower.includes('calidad') || lower.includes('eslint') || lower.includes('quality')) {
      botResponse = "📊 **Métricas de Calidad:** La cobertura de código actual ronda el 85%. Los componentes principales de React cumplen con la separación de responsabilidades.";
    } else if (lower.includes('error') || lower.includes('bug')) {
      botResponse = "🔍 **Análisis de Error:** Revisa la pila de llamadas (stack trace). El problema suele ser una variable de entorno no inicializada o una promesa no resuelta en los Server Components.";
    }

    // Pequeño retardo simulado para una sensación fluida de respuesta
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({
      role: 'assistant',
      content: botResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno en la API de Copilot.' },
      { status: 500 }
    );
  }
}
