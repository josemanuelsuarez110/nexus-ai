import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repo = searchParams.get('repo'); // ej. "facebook/react" o "vercel/next.js"

  if (!repo) {
    return NextResponse.json(
      { error: 'El parámetro "repo" (owner/repo) es requerido.' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Nexus-AI-App',
      },
      next: { revalidate: 3600 }, // Caché de 1 hora
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Repositorio de GitHub no encontrado.' }, { status: 404 });
      }
      throw new Error(`GitHub API error: ${response.statusText}`);
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
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error al conectar con la API de GitHub.' },
      { status: 500 }
    );
  }
}
