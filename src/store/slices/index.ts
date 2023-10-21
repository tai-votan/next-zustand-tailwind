import { ActionCreator, AppActions, AppState } from "~/interfaces";
import * as auth from "./auth";

export const state: AppState = {
    ...auth.state,
};

export const actions: ActionCreator<AppActions> = (...arg) => ({
    ...auth.actions(...arg),
});
