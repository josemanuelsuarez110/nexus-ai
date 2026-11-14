import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const requestSchema = z.object({
  message: z.string().trim().min(1).max(4000),
});

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > 8192) {
    return NextResponse.json({ error: 'La solicitud es demasiado grande.' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'El cuerpo JSON no es válido.' }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'El mensaje debe tener entre 1 y 4000 caracteres.' },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Failed to verify Copilot API session', error);
    return NextResponse.json({ error: 'No se pudo verificar la sesión.' }, { status: 500 });
  }

  if (!user) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  return NextResponse.json(
    { error: 'El asistente todavía no tiene un proveedor de IA configurado.' },
    { status: 503 }
  );
}
