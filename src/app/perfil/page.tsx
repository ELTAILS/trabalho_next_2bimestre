// Pagina de perfil do usuário, acessível apenas para usuários autenticados
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import LogoutButton from "@/src/components/LogoutButton"
import { verifyAccessToken } from "@/src/lib/auth"

export default async function PerfilPage() {
  const token = (await cookies()).get("access_token")?.value
  const user = verifyAccessToken(token)

  if (!user) redirect("/login")

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12 text-slate-900">
      <section className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700">Área segura</p>
            <h1 className="mt-2 text-4xl font-bold">Olá, {user.nome}!</h1>
          </div>
          <LogoutButton />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/usuarios"
            className="rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700"
          >
            Painel admin
          </a>
          <a
            href="/"
            className="rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-white"
          >
            Voltar para home
          </a>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">Meu perfil</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Info label="E-mail" value={user.email} />
            <Info label="CPF" value={user.cpf} />
            <Info label="Telefone" value={user.telefone} />
            <Info label="Localização" value={`${user.cidade} - ${user.estado}`} />
          </div>
        </div>
      </section>
    </main>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 font-medium">{value || "Não informado"}</p>
    </div>
  )
}