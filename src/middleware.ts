import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside


//public path vs protected path 
export function middleware(request: NextRequest) {
    // return NextResponse.redirect(new URL('/home', request.url))

    const path = request.nextUrl.pathname

    const publicPath = path === '/login' || path === '/signup'

    const token = request.cookies.get('token')?.value || ''

    if (publicPath && token) {
        return NextResponse.redirect(new URL("/profile", request.nextUrl))
    }

    if (!publicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    //   matcher: '/about/:path*',
    matcher: [
        "/",
        "/profile",
        "/login",
        "/signup",

    ]
}