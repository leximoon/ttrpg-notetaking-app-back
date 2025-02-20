import dotenv from "dotenv";

//Load env vars
dotenv.config();

const requiredEnvVars = ["PORT", "CORS_ORIGIN", "NODE_ENV"];

for (const variable of requiredEnvVars) {
    if (!process.env[variable]) {
        throw new Error(`Missing required environment variable: ${variable}`);
    }
}

type NodeEnv = "development" | "production" | "test";

interface Config {
    PORT: number;
    CORS_ORIGIN: string;
    NODE_ENV: string;

    // TODO: Add more config variables
}

const config: Config = {
    PORT: Number(process.env.PORT),
    CORS_ORIGIN: process.env.CORS_ORIGIN as string,
    NODE_ENV: process.env.NODE_ENV as NodeEnv,
};

const configManager = {
    get(key: keyof Config): string | number {
        return config[key];
    },
};

export default configManager;
