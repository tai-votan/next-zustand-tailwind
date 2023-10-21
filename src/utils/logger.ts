import ENV from "~/configs/env";

interface Logger {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    str?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any;
    type?: "success" | "warning" | "error" | "info";
    text?: string;
}

const logger = (params: Logger) => {
    if (ENV.NODE_ENV !== "production") {
        const { str, type = "success", value = "", text } = params;
        const message = {
            error: `\x1b[31m${str || text}\x1b[0m`,
            success: `\x1b[32m${str || text}\x1b[0m`,
            warning: `\x1b[33m${str || text}\x1b[0m`,
            info: `\x1b[36m${str || text}\x1b[0m`,
        }[type];
        console.log(message, value);
    }
};

export default logger;
