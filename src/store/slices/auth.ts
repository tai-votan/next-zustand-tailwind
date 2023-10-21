import { ActionCreator } from "~/interfaces";
import Auth from "~/interfaces/auth";
import authServices from "~/services/auth";

export const state: Auth.State = {
    auth: {},
};

export const actions: ActionCreator<Auth.Actions> = (set) => ({
    logIn: async (data) => {
        await authServices.logIn(data);
    },
    logOut: async () => {
        await authServices.logOut();
    },
    reset() {
        set({ auth: state.auth });
    },
});
