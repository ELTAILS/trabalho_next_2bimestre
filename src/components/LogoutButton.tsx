"use client"

import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" })
    localStorage.removeItem("access_token")
    router.push("/login")
  }

  return (
    <button onClick={logout} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50">
      Sair
    </button>
  )
}
