import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse } from "axios";
import ENV from "~/configs/env";
import logger from "./logger";

const codeMessage: { [status: number]: string } = {
    200: "The server successfully returned the requested data. Validating response data...",
    201: "Create or modify data successfully",
    202: "A request has entered the background queue (asynchronous task)",
    204: "The data was deleted successfully",
    400: "The request was sent with an error. The server did not perform any operations to create or modify data",
    401: "The user does not have permission (token, username, password is incorrect)",
    403: "User is authorized, but access is forbidden",
    404: "The request sent is for a record that does not exist and the server is not operating",
    406: "Not Acceptable",
    410: "The requested resource is permanently deleted and will not be obtained again",
    422: "When creating an object, a validation error occurred",
    500: "The server has an error. Please check the server",
    502: "Gateway error",
    503: "The service is unavailable, the server is temporarily overloaded or maintained",
    504: "The gateway timed out",
};

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const { method, url } = config;
    // Set Headers Here
    // Check Authentication Here
    // Set Loading Start Here
    logger({ str: `[${method?.toUpperCase()}] ${url}`, type: "info" });
    return { ...config, baseURL: ENV.API_URL };
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    const { method, url } = response.config;
    // Set Loading End Here
    // Handle Response Data Here
    // Error Handling When Return Success with Error Code Here
    logger({ str: `[${method?.toUpperCase()}] ${url}`, type: "success" });

    return response;
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
    if (axios.isAxiosError(error)) {
        const { message } = error;
        const { method, url } = error.config as AxiosRequestConfig;
        const { status } = (error.response as AxiosResponse) ?? {};
        const errorText = message || codeMessage[status];

        logger({ str: `[${method?.toUpperCase()}] ${url} | ${errorText}`, type: "error" });

        switch (status) {
            case 401: {
                // "Login required"
                break;
            }
            case 403: {
                // "Permission denied"
                break;
            }
            case 404: {
                // "Invalid request"
                break;
            }
            case 500: {
                // "Server error"
                break;
            }
            default: {
                // "Unknown error occurred"
                break;
            }
        }

        if (status === 401) {
            // Delete Token & Go To Login Page if you required.
        }
    } else {
        logger({ str: `🚨 [API] | Error ${error.message}`, type: "error" });
    }

    return Promise.reject(error);
};

const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
    instance.interceptors.request.use(onRequest, onErrorResponse);
    instance.interceptors.response.use(onResponse, onErrorResponse);

    return instance;
};

// const request = <T>(cfg: AxiosRequestConfig) => {
//     return setupInterceptors(axios).request<any, T>(cfg);
// };

export default setupInterceptors(axios);
