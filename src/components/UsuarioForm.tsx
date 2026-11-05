"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  FormUsuario, IUsuario, criarUsuario, atualizarUsuario,
} from "@/src/services/usuarios/usuarios"
import { maskCPF, maskCEP, maskData, maskTelefone, validarCPF, validarData } from "@/src/utils/masks"

const vazio: FormUsuario = {
  nome: "", email: "", cpf: "", telefone: "", dataNascimento: "", senha: "",
  cep: "", rua: "", numero: "", bairro: "", cidade: "", estado: "",
}

const mascaras: Partial<Record<keyof FormUsuario, (v: string) => string>> = {
  cpf: maskCPF,
  telefone: maskTelefone,
  cep: maskCEP,
  dataNascimento: maskData,
}

type Erros = Partial<Record<keyof FormUsuario, string>>

function validar(f: FormUsuario): Erros {
  const e: Erros = {}
  if (f.nome.trim().length < 3) e.nome = "Informe o nome completo"
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "E-mail inválido"
  if (!validarCPF(f.cpf)) e.cpf = "CPF inválido"
  if (f.telefone.replace(/\D/g, "").length < 10) e.telefone = "Telefone inválido"
  if (!validarData(f.dataNascimento)) e.dataNascimento = "Data inválida (dd/mm/aaaa)"
  if (f.senha.length < 6) e.senha = "A senha deve ter ao menos 6 caracteres"
  if (f.cep.replace(/\D/g, "").length !== 8) e.cep = "CEP inválido"
  if (!f.rua.trim()) e.rua = "Informe a rua"
  if (!f.numero.trim()) e.numero = "Informe o número"
  if (!f.bairro.trim()) e.bairro = "Informe o bairro"
  if (!f.cidade.trim()) e.cidade = "Informe a cidade"
  if (f.estado.trim().length !== 2) e.estado = "Use a sigla (ex: PR)"
  return e
}

function Campo(props: {
  label: string
  name: keyof FormUsuario
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  erro?: string
  type?: string
  placeholder?: string
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.name} className="mb-2 text-sm font-medium text-slate-200">{props.label}</label>
      <input
        id={props.name}
        name={props.name}
        type={props.type ?? "text"}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
      />
      {props.erro && <span className="mt-1 text-sm text-red-300">{props.erro}</span>}
    </div>
  )
}

export default function UsuarioForm({ usuario }: { usuario?: IUsuario }) {
  const router = useRouter()
  const [form, setForm] = useState<FormUsuario>(usuario ?? vazio)
  const [erros, setErros] = useState<Erros>({})
  const [salvando, setSalvando] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const mascara = mascaras[name as keyof FormUsuario]
    setForm((f) => ({ ...f, [name]: mascara ? mascara(value) : value }))
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    const e2 = validar(form)
    setErros(e2)
    if (Object.keys(e2).length > 0) return

    setSalvando(true)
    try {
      if (usuario?.id) await atualizarUsuario(usuario.id, form)
      else await criarUsuario(form)
      router.push("/usuarios")
    } catch {
      alert("Erro ao salvar usuário")
      setSalvando(false)
    }
  }

  const c = { onChange: handleChange }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
        {usuario ? "Atualização de cadastro" : "Novo cadastro"}
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">
        {usuario ? "Editar usuário" : "Novo usuário"}
      </h1>
      <p className="mt-2 text-slate-400">Preencha os dados abaixo para continuar.</p>

      <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-5 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-950/20 sm:p-8 md:grid-cols-2">
        <h2 className="border-b border-white/10 pb-3 text-lg font-semibold text-cyan-200 md:col-span-2">Dados pessoais</h2>
        <Campo label="Nome" name="nome" value={form.nome} erro={erros.nome} {...c} />
        <Campo label="E-mail" name="email" type="email" value={form.email} erro={erros.email} {...c} />
        <Campo label="CPF" name="cpf" value={form.cpf} erro={erros.cpf} placeholder="000.000.000-00" {...c} />
        <Campo label="Telefone" name="telefone" value={form.telefone} erro={erros.telefone} placeholder="(00) 00000-0000" {...c} />
        <Campo label="Data de nascimento" name="dataNascimento" value={form.dataNascimento} erro={erros.dataNascimento} placeholder="dd/mm/aaaa" {...c} />
        <Campo label="Senha" name="senha" type="password" value={form.senha} erro={erros.senha} {...c} />

        <h2 className="mt-3 border-b border-white/10 pb-3 text-lg font-semibold text-cyan-200 md:col-span-2">Endereço</h2>
        <Campo label="CEP" name="cep" value={form.cep} erro={erros.cep} placeholder="00000-000" {...c} />
        <Campo label="Rua" name="rua" value={form.rua} erro={erros.rua} {...c} />
        <Campo label="Número" name="numero" value={form.numero} erro={erros.numero} {...c} />
        <Campo label="Bairro" name="bairro" value={form.bairro} erro={erros.bairro} {...c} />
        <Campo label="Cidade" name="cidade" value={form.cidade} erro={erros.cidade} {...c} />
        <Campo label="Estado (UF)" name="estado" value={form.estado} erro={erros.estado} {...c} />

        <div className="mt-4 flex gap-3 md:col-span-2">
          <button type="submit" disabled={salvando} className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50">
            {salvando ? "Salvando..." : "Salvar"}
          </button>
          <button type="button" onClick={() => router.push("/usuarios")} className="rounded-xl border border-white/15 px-5 py-3 font-semibold text-slate-200 transition hover:bg-white/10">
            Cancelar
          </button>
        </div>
      </form>
      </section>
    </main>
  )
}
