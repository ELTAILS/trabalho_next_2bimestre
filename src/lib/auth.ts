import jwt, { type JwtPayload } from "jsonwebtoken"

export interface AuthUser {
  id: number
  nome: string
  email: string
  cpf: string
  telefone: string
  cidade: string
  estado: string
}

const TOKEN_EXPIRATION = "2h"
const getSecret = () => process.env.AUTH_SECRET ?? "dev-secret-change-me"

export function createAccessToken(user: AuthUser) {
  return jwt.sign(user, getSecret(), { expiresIn: TOKEN_EXPIRATION })
}

export function verifyAccessToken(token: string | undefined): AuthUser | null {
  if (!token) return null

  try {
    const payload = jwt.verify(token, getSecret()) as JwtPayload & Partial<AuthUser>
    if (
      typeof payload.id !== "number" ||
      typeof payload.email !== "string" ||
      typeof payload.nome !== "string"
    ) {
      return null
    }

    return {
      id: payload.id,
      nome: payload.nome,
      email: payload.email,
      cpf: typeof payload.cpf === "string" ? payload.cpf : "",
      telefone: typeof payload.telefone === "string" ? payload.telefone : "",
      cidade: typeof payload.cidade === "string" ? payload.cidade : "",
      estado: typeof payload.estado === "string" ? payload.estado : "",
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return null
    }
    throw error
  }
}
