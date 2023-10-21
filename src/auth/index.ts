import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions as NextAuthConfig } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import authServices from "~/services/auth";
import ENV from "~/configs/env";
import Auth from "~/interfaces/auth";

export const config = () => {
    return {
        secret: ENV.NEXTAUTH_SECRET,
        // https://next-auth.js.org/configuration/providers/oauth
        providers: [
            CredentialsProvider({
                type: "credentials",
                name: "Credentials",
                credentials: {},
                async authorize(credentials) {
                    try {
                        const authValue = "dau3@gmail.com";
                        const { email = authValue, password = authValue } = credentials as Auth.Login.Request;
                        const {
                            data: { data },
                        } = await authServices.logIn({
                            email,
                            password,
                            device_id: "7bd19973-652a-485f-8399-06bd79933ff8",
                        });

                        if (data.user) {
                            return {
                                ...data.user,
                                token: data.token,
                                refreshToken: data.refresh_token,
                                expires_in: data.expires_in,
                            };
                        }

                        return null;
                    } catch (e) {
                        throw new Error(e as string);
                    }
                },
            }),
        ],
        callbacks: {
            async jwt({ token, user }) {
                if (user) {
                    token.email = user.email;
                    token.image = user.avatar_url || "";
                    token.name = user.name;
                    token.accessToken = user.token;
                    token.refreshToken = user.refreshToken;
                }
                return token;
            },
            session({ session, token }) {
                if (token) {
                    session.user.email = token.email;
                    session.user.name = token.name;
                    session.user.image = token.avatar_url || token.image || token.picture || "";
                    session.user.accessToken = token.accessToken || "";
                    session.user.refreshToken = token.refreshToken || "";
                }
                return session;
            },
        },
    } satisfies NextAuthConfig;
};

// Helper function to get session without passing config every time
// https://next-auth.js.org/configuration/nextjs#getserversession

export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, config());
}
