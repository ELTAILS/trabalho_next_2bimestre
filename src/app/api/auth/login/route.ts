import { NextResponse } from "next/server"
import { createAccessToken, type AuthUser } from "@/src/lib/auth"

interface ApiUser extends AuthUser {
  senha: string
}

export async function POST(request: Request) {
  let credentials: { email?: string; senha?: string }

  try {
    credentials = await request.json()
  } catch {
    return NextResponse.json({ message: "Dados de login inválidos." }, { status: 400 })
  }

  if (!credentials.email || !credentials.senha) {
    return NextResponse.json({ message: "Informe e-mail e senha." }, { status: 400 })
  }

  let response: Response
  try {
    response = await fetch(
      `http://localhost:3001/usuarios?email=${encodeURIComponent(credentials.email)}`,
      { cache: "no-store" },
    )
  } catch {
    return NextResponse.json(
      { message: "Não foi possível conectar ao servidor de usuários." },
      { status: 503 },
    )
  }

  if (!response.ok) {
    return NextResponse.json({ message: "Erro ao consultar usuários." }, { status: 502 })
  }

  const users = (await response.json()) as ApiUser[]
  const user = users.find(
    (candidate) => candidate.email.toLowerCase() === credentials.email!.toLowerCase(),
  )

  if (!user || user.senha !== credentials.senha || user.id === undefined) {
    return NextResponse.json({ message: "E-mail ou senha incorretos." }, { status: 401 })
  }

  const authUser: AuthUser = {
    id: user.id,
    nome: user.nome,
    email: user.email,
    cpf: user.cpf,
    telefone: user.telefone,
    cidade: user.cidade,
    estado: user.estado,
  }
  const token = createAccessToken(authUser)
  const result = NextResponse.json({ token, user: authUser })

  result.cookies.set("access_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 2,
    path: "/",
  })

  return result
}
