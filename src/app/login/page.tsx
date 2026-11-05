// Página de login, acessível apenas para usuários não autenticados
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import LoginForm from "@/src/components/LoginForm"
import { verifyAccessToken } from "@/src/lib/auth"

export default async function LoginPage() {
  const token = (await cookies()).get("access_token")?.value

  if (verifyAccessToken(token)) redirect("/perfil")

  return <LoginForm />
}
