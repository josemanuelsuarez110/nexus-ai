import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    // Si estamos en el servidor (SSR) y faltan las variables, devolvemos un objeto vacío
    // para que el renderizado no falle. El cliente real solo se usa en el navegador.
    if (typeof window === 'undefined') {
      console.warn('[client.ts] Supabase vars missing during SSR, returning dummy client')
      return null as any
    }
    throw new Error('Missing Supabase environment variables')
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}
