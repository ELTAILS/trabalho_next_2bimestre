"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import UsuarioForm from "@/src/components/UsuarioForm"
import { IUsuario, buscarUsuario } from "@/src/services/usuarios/usuarios"

export default function EditarUsuario() {
  const { id } = useParams<{ id: string }>()
  const [usuario, setUsuario] = useState<IUsuario | null>(null)

  useEffect(() => {
    buscarUsuario(Number(id))
      .then(setUsuario)
      .catch(() => alert("Usuário não encontrado"))
  }, [id])

  if (!usuario) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-300">
        <p>Carregando usuário...</p>
      </main>
    )
  }

  return <UsuarioForm usuario={usuario} />
}
