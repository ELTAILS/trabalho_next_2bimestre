// Página de gerenciamento de usuários, acessível apenas para usuarios autenticados
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import UsuariosTable from "@/src/components/UsuariosTable"
import { verifyAccessToken } from "@/src/lib/auth"

export default async function Usuarios() {
  const token = (await cookies()).get("access_token")?.value

  if (!verifyAccessToken(token)) redirect("/login?redirect=/usuarios")

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Painel administrativo
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">Usuários</h1>
            <p className="mt-2 text-slate-400">Gerencie os usuários cadastrados no sistema.</p>
          </div>
          <a
            href="/usuarios/novo"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            + Novo usuário
          </a>
        </div>
        <UsuariosTable />
      </section>
    </main>
  )
}
