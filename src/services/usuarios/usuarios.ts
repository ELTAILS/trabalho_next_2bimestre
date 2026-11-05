import { api } from "../api"

export interface IUsuario {
  id?: number
  nome: string
  email: string
  cpf: string
  telefone: string
  dataNascimento: string
  senha: string
  cep: string
  rua: string
  numero: string
  bairro: string
  cidade: string
  estado: string
}

export type FormUsuario = Omit<IUsuario, "id">

export const listarUsuarios = () =>
  api.get<IUsuario[]>("/usuarios").then((r) => r.data)

export const buscarUsuario = (id: number) =>
  api.get<IUsuario>(`/usuarios/${id}`).then((r) => r.data)

export const criarUsuario = (u: FormUsuario) => api.post("/usuarios", u)

export const atualizarUsuario = (id: number, u: FormUsuario) =>
  api.put(`/usuarios/${id}`, u)

export const excluirUsuario = (id: number) => api.delete(`/usuarios/${id}`)
