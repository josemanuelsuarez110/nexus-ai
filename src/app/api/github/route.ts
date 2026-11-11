import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repo = searchParams.get('repo');

  if (!repo || !/^[A-Za-z0-9_.-]{1,39}\/[A-Za-z0-9_.-]{1,100}$/.test(repo)) {
    return NextResponse.json(
      { error: 'El parámetro "repo" debe tener el formato owner/repo.' },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Failed to verify GitHub API session', error);
    return NextResponse.json({ error: 'No se pudo verificar la sesión.' }, { status: 500 });
  }

  if (!user) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Nexus-AI-App',
      },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 3600 }, // Caché de 1 hora
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Repositorio de GitHub no encontrado.' }, { status: 404 });
      }
      if (response.status === 403 || response.status === 429) {
        return NextResponse.json(
          { error: 'GitHub limitó temporalmente esta consulta. Inténtalo más tarde.' },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: 'No se pudo consultar el repositorio en GitHub.' },
        { status: 502 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      name: data.name,
      fullName: data.full_name,
      description: data.description,
      htmlUrl: data.html_url,
      defaultBranch: data.default_branch,
      stars: data.stargazers_count,
      forks: data.forks_count,
      openIssues: data.open_issues_count,
      language: data.language,
      updatedAt: data.updated_at,
    });
  } catch (error) {
    console.error('GitHub API request failed', error);
    return NextResponse.json(
      { error: 'No se pudo conectar con GitHub. Inténtalo más tarde.' },
      { status: 502 }
    );
  }
}
