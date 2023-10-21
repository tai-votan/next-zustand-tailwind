import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { config } from "~/auth";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, config());
}
