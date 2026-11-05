"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const [entrando, setEntrando] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErro("")
    setEntrando(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      })
      const data = await response.json()

      if (!response.ok) {
        setErro(data.message ?? "Não foi possível entrar.")
        return
      }

      localStorage.setItem("access_token", data.token)
      const redirectPath = new URLSearchParams(window.location.search).get("redirect")
      router.push(redirectPath ?? "/perfil")
    } catch {
      setErro("Não foi possível conectar ao servidor.")
    } finally {
      setEntrando(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 text-slate-900 shadow-2xl">
        <Link href="/" className="text-sm font-semibold text-cyan-700">← Voltar para início</Link>
        <h1 className="mt-8 text-3xl font-bold">Bem-vindo de volta</h1>
        <p className="mt-2 text-slate-500">Entre para acessar seu perfil.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-medium">
            E-mail
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
              placeholder="voce@email.com"
            />
          </label>
          <label className="block text-sm font-medium">
            Senha
            <input
              type="password"
              required
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
              placeholder="Sua senha"
            />
          </label>
          {erro && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{erro}</p>}
          <button
            type="submit"
            disabled={entrando}
            className="w-full rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-50"
          >
            {entrando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Ainda não tem conta? <Link href="/usuarios/novo" className="font-semibold text-cyan-700">Cadastre-se</Link>
        </p>
      </section>
    </main>
  )
}
