import { cookies } from "next/headers"
import Link from "next/link"
import { verifyAccessToken } from "@/src/lib/auth"

export default async function Home() {
  const token = (await cookies()).get("access_token")?.value
  const user = verifyAccessToken(token)

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Painel de acesso
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Organize seus usuários em um só lugar.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {user
              ? `Olá, ${user.nome}! Acesse seu perfil ou gerencie os usuários com segurança.`
              : "Cadastre seus dados, acesse o perfil e gerencie o sistema com segurança."}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <Link
            href="/usuarios/novo"
            className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-6 transition hover:-translate-y-1 hover:bg-cyan-400/20"
          >
            <span className="text-3xl">+</span>
            <h2 className="mt-4 text-xl font-semibold">Cadastrar usuário</h2>
            <p className="mt-2 text-slate-300">Cadastre seus usuarios aqui!</p>
          </Link>
          <Link
            href={user ? "/perfil" : "/login"}
            className="rounded-2xl border border-white/10 bg-white/10 p-6 transition hover:-translate-y-1 hover:bg-white/15"
          >
            <span className="text-3xl">→</span>
            <h2 className="mt-4 text-xl font-semibold">{user ? "Meu perfil" : "Entrar"}</h2>
            <p className="mt-2 text-slate-300">
              {user ? "Confira seus dados cadastrados." : "Acesse seu perfil para conferir seus dados."}
            </p>
          </Link>
        </div>
      </section>
    </main>
  )
}
