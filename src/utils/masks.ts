const soNumeros = (v: string) => v.replace(/\D/g, "")

function aplicarMascara(valor: string, padrao: string) {
  const nums = soNumeros(valor)
  let i = 0
  let saida = ""
  for (const c of padrao) {
    if (i >= nums.length) break
    saida += c === "#" ? nums[i++] : c
  }
  return saida
}

export const maskCPF = (v: string) => aplicarMascara(v, "###.###.###-##")
export const maskCEP = (v: string) => aplicarMascara(v, "#####-###")
export const maskData = (v: string) => aplicarMascara(v, "##/##/####")
export const maskTelefone = (v: string) =>
  soNumeros(v).length > 10
    ? aplicarMascara(v, "(##) #####-####") // celular
    : aplicarMascara(v, "(##) ####-####")  // fixo

export function validarCPF(cpf: string) {
  const n = soNumeros(cpf)
  if (n.length !== 11 || /^(\d)\1+$/.test(n)) return false // rejeita 111.111.111-11

  const digito = (tamanho: number) => {
    let soma = 0
    for (let i = 0; i < tamanho; i++) soma += Number(n[i]) * (tamanho + 1 - i)
    const resto = (soma * 10) % 11
    return resto === 10 ? 0 : resto
  }
  return digito(9) === Number(n[9]) && digito(10) === Number(n[10])
}

export function validarData(data: string) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(data)
  if (!m) return false
  const [, dia, mes, ano] = m.map(Number)
  const d = new Date(ano, mes - 1, dia)
  return (
    d.getFullYear() === ano &&
    d.getMonth() === mes - 1 &&
    d.getDate() === dia &&
    d <= new Date()
  )
}
