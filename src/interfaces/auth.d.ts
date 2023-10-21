import User from "./user";

namespace Auth {
    interface State {
        auth: Partial<User.Me>;
    }

    interface Actions {
        logIn: (data: Login.Request) => Promise<void>;
        logOut: () => void;
        reset: () => void;
    }

    namespace Login {
        interface Request {
            email: string;
            password: string;
            device_id: string;
        }

        interface Response {
            message: string;
            data: {
                user: User.Me;
                token: string;
                expires_in: number;
                refresh_token: string;
            };
        }
    }
}

export default Auth;
