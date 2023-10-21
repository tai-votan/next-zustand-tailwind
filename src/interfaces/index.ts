import { StateCreator } from "zustand";
import Auth from "./auth";

export type AppState = Auth.State;

export type AppActions = Auth.Actions;

export type ActionCreator<T> = StateCreator<AppActions & AppState, [["zustand/devtools", never]], [], T>;
