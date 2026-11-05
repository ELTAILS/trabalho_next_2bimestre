"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { IUsuario, listarUsuarios, excluirUsuario } from "@/src/services/usuarios/usuarios"

export default function UsuariosTable() {
  const [usuarios, setUsuarios] = useState<IUsuario[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    listarUsuarios()
      .then(setUsuarios)
      .catch(() => alert("Erro ao carregar usuários. O json-server está rodando?"))
      .finally(() => setCarregando(false))
  }, [])

  async function handleExcluir(id: number) {
    if (!confirm("Deseja realmente excluir este usuário?")) return
    await excluirUsuario(id)
    setUsuarios((lista) => lista.filter((u) => u.id !== id))
  }

  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl shadow-cyan-950/20">
      {carregando ? (
        <div className="p-10 text-center text-slate-300">Carregando usuários...</div>
      ) : usuarios.length === 0 ? (
        <div className="p-10 text-center">
          <p className="text-lg font-semibold">Nenhum usuário cadastrado.</p>
          <p className="mt-2 text-slate-400">Comece adicionando o primeiro usuário.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-190 border-collapse text-left">
            <thead className="bg-cyan-400/10 text-xs uppercase tracking-wider text-cyan-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Nome</th>
                <th className="px-6 py-4 font-semibold">E-mail</th>
                <th className="px-6 py-4 font-semibold">CPF</th>
                <th className="px-6 py-4 font-semibold">Telefone</th>
                <th className="px-6 py-4 font-semibold">Cidade/UF</th>
                <th className="px-6 py-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {usuarios.map((u) => (
                <tr key={u.id} className="transition hover:bg-white/5">
                  <td className="px-6 py-5 font-medium">{u.nome}</td>
                  <td className="px-6 py-5 text-slate-300">{u.email}</td>
                  <td className="px-6 py-5 text-slate-300">{u.cpf}</td>
                  <td className="px-6 py-5 text-slate-300">{u.telefone}</td>
                  <td className="px-6 py-5 text-slate-300">{u.cidade}/{u.estado}</td>
                  <td className="px-6 py-5">
                    <div className="flex gap-4">
                      <Link href={`/usuarios/${u.id}/editar`} className="font-semibold text-cyan-300 hover:text-cyan-200">
                        Editar
                      </Link>
                      <button onClick={() => handleExcluir(u.id!)} className="font-semibold text-red-300 hover:text-red-200">
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
