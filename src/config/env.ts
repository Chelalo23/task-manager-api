import dotenv from "dotenv";

dotenv.config();

class Config {
    private static instance: Config;

    readonly port: number;
    readonly dbHost: string;
    readonly dbPort: number;
    readonly dbName: string;
    readonly dbUser: string;
    readonly dbPassword: string;
    readonly jwtSecret: string;
    readonly jwtExpiresIn: string;
    readonly nodeEnv: string;

    private constructor() {
        this.port = Number(process.env.PORT ?? 3000);
        this.dbHost = process.env.DB_HOST ?? "localhost";
        this.dbPort = Number(process.env.DB_PORT ?? 5432);
        this.dbName = process.env.DB_NAME ?? "";
        this.dbUser = process.env.DB_USER ?? "";
        this.dbPassword = process.env.DB_PASSWORD ?? "";
        this.jwtSecret = process.env.JWT_SECRET ?? "";
        this.jwtExpiresIn = process.env.JWT_SECRET ?? "1h";
        this.nodeEnv = process.env.NODE_ENV ?? "development"; 
    }

    static getIstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }

        return Config.instance;
    }

}

export const config = Config.getIstance();