import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyAccessToken } from "@/src/lib/auth"

const protectedPaths = ["/perfil", "/produtos", "/usuarios"]

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtected = protectedPaths.some(
    (protectedPath) => path === protectedPath || path.startsWith(`${protectedPath}/`),
  )

  if (path === "/usuarios/novo") return NextResponse.next()
  if (!isProtected) return NextResponse.next()

  const token = request.cookies.get("access_token")?.value
  if (!verifyAccessToken(token)) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", path)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/perfil/:path*", "/produtos/:path*", "/usuarios/:path*"],
}
