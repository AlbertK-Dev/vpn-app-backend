export interface IEnvVars {
    nodeEnv: "prod" | "dev";
    databaseURI: string;
    port: number;
}

function getEnvVar(key: string, errorMessage: string): string {
    const value = process.env[key];
    if (!value) {
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    return value;
}

export function useEnvVars(): IEnvVars {
    const env: IEnvVars = {
        nodeEnv: process.env.NODE_ENV === "prod" || process.env.NODE_ENV === "dev" 
            ? process.env.NODE_ENV 
            : (() => {
                console.error("Invalid or missing NODE_ENV, please use 'dev' or 'prod'");
                throw new Error("Invalid NODE_ENV variable");
            })(),
        databaseURI: "",
        port: Number(process.env.PORT) || 3000,
    };

    env.databaseURI = env.nodeEnv === "prod" 
        ? getEnvVar("REMOTE_DATABASE_URI", "Missing REMOTE_DATABASE_URI for production environment")
        : getEnvVar("LOCAL_DATABASE_URI", "Missing LOCAL_DATABASE_URI for development environment");

    return env;
}
