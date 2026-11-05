# Painel de usuários

Aplicação web para cadastro, login e gerenciamento de usuários. O projeto usa Next.js, TypeScript, Tailwind CSS e um JSON Server como API local.

## Funcionalidades

- Cadastro de usuários.
- Login com e-mail e senha.
- Autenticação usando token JWT.
- Perfil protegido para usuários autenticados.
- Painel administrativo com listagem, edição e exclusão de usuários.
- Redirecionamento automático para o login quando o acesso não está autenticado.

## Pré-requisitos

Antes de instalar o projeto, tenha instalado:

- [Node.js](https://nodejs.org/) 20.9 ou superior.
- npm, instalado junto com o Node.js.
- Git, caso queira clonar o projeto.

## Instalação

Clone o projeto e entre na pasta:

```bash
git clone <url-do-repositorio>
cd trabalho_next
```

Instale as dependências:

```bash
npm install
```

## Configuração

Crie um arquivo `.env.local` na raiz do projeto:

```env
AUTH_SECRET=uma-chave-secreta-e-segura
```

Essa chave é usada para assinar os tokens de autenticação. Em um projeto real, use uma chave longa e não compartilhe esse arquivo.

## Como executar

É necessário executar o JSON Server e o Next.js em terminais separados.

### Terminal 1: API local

```bash
npm run server
```

A API ficará disponível em `http://localhost:3001`.

### Terminal 2: aplicação

```bash
npm run dev
```

Depois, acesse [http://localhost:3000](http://localhost:3000).

## Outros comandos

```bash
npm run build
npm start
npm run lint
```

- `npm run build`: cria a versão de produção e verifica os tipos TypeScript.
- `npm start`: inicia a aplicação em modo de produção depois do build.
- `npm run lint`: executa a verificação de código.

## Usuário de teste

O arquivo `jsonserver/db.json` possui um usuário inicial para testes. Consulte esse arquivo para usar o e-mail e a senha cadastrados.

## Estrutura principal

```text
src/
├── app/                  # Páginas, rotas e API do Next.js
├── components/           # Componentes reutilizáveis
├── lib/                  # Autenticação e regras compartilhadas
├── services/             # Comunicação com a API
└── utils/                # Máscaras e validações

jsonserver/
└── db.json                # Dados da API local
```
