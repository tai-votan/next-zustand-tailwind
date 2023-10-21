import { DefaultUser } from "next-auth";
// import "next-auth/jwt";

// // Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
    interface JWT {
        avatar_url: string;
        image: string;
        accessToken: string;
        refreshToken: string;
    }
}

declare module "next-auth" {
    interface Session {
        user: DefaultUser & {
            token: string;
            expires_in: string;
            accessToken: string;
            refreshToken: string;
            image: string;
        };
    }

    interface User extends DefaultUser {
        avatar_url: string;
        token: string;
        refreshToken: string;
    }
}
