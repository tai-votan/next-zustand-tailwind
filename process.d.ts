declare namespace NodeJS {
    export interface ProcessEnv {
        NEXTAUTH_URL: string;
        NEXTAUTH_SECRET: string;
        FACEBOOK_ID: string;
        FACEBOOK_SECRET: string;
    }
}

// We recommend doing your own environment variable validation
declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            NEXTAUTH_SECRET: string;

            AUTH_FACEBOOK_ID: string;
            AUTH_FACEBOOK_SECRET: string;
        }
    }
}
