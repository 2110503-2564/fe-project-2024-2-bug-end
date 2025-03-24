import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            _id: string,
            name: string,
            email: string,
            success: boolean,
            token: string,
            iat: number,
            exp: number,
            jti: string
        }
    }
}