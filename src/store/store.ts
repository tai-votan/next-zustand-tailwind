import { createContext, useContext } from "react";
import { createStore, useStore as useZustandStore } from "zustand";
import { devtools } from "zustand/middleware";
import { state, actions } from "./slices";
import { AppState, AppActions } from "~/interfaces";
import ENV from "~/configs/env";

export type StoreType = ReturnType<typeof initializeStore>;

const zustandContext = createContext<StoreType | null>(null);

export const Provider = zustandContext.Provider;

export const useStore = <T>(selector: (state: AppState & AppActions) => T) => {
    const store = useContext(zustandContext);

    if (!store) throw new Error("Store is missing the provider");

    return useZustandStore(store, selector);
};

export const initializeStore = (preloadedState: Partial<AppState & AppActions> = {}) => {
    return createStore<AppState & AppActions>()(
        devtools(
            (...arg) => ({
                ...state,
                ...preloadedState,
                ...actions(...arg),
            }),
            { enabled: ENV.NODE_ENV !== "production" },
        ),
    );
};
