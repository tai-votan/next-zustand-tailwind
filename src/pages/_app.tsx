import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { Inter } from "next/font/google";

import { StoreProvider } from "~/store";
import { AppState } from "~/interfaces";
import "~/styles/globals.css";
import Main from "~/layouts/main";

const inter = Inter({ subsets: ["latin"] });

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{ session: Session; initialZustandState: AppState }>) {
    return (
        <>
            <style jsx global>
                {`
                    html {
                        font-family: ${inter.style.fontFamily};
                    }
                `}
            </style>
            <SessionProvider session={session}>
                <StoreProvider {...pageProps.initialZustandState}>
                    <ThemeProvider attribute="class">
                        <Main>
                            <Component {...pageProps} />
                        </Main>
                    </ThemeProvider>
                </StoreProvider>
            </SessionProvider>
        </>
    );
}
