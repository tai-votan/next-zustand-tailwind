import { NextApiResponse } from "next";
import { setCookie } from "nookies";

import COOKIES from "~/configs/cookie";

interface ISessionCookie {
    token: string;
    maxAge: number;
    res?: NextApiResponse;
}

export const setSessionCookie = (
    { res, token, maxAge }: ISessionCookie,
    options?: Record<string, number | string | boolean>,
) => {
    setCookie({ res }, COOKIES.token, token, {
        maxAge,
        path: "/",
        // secure: true,
        // httpOnly: true,
        ...options,
    });
};
