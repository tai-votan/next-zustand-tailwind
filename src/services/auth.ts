import { AxiosResponse } from "axios";
import API from "~/configs/api";
import Auth from "~/interfaces/auth";
import axios from "~/utils/axios";

const authServices = {
    logIn: async (data: Auth.Login.Request): Promise<AxiosResponse<Auth.Login.Response>> => {
        return await axios(API.auth.login, { method: "POST", data });
    },
    logOut: async () => await axios(API.auth.login, { method: "POST" }),
};

export default authServices;
