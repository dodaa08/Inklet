import dotenv from "dotenv";
import path from "path";

// Load .env from the root directory of the workspace
dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });

interface Config {
    JWT_SECRET: string | undefined;
    PORT: string | undefined;
    PORTWS: string | undefined;
}

const config: Config = {
    JWT_SECRET : process.env.JWT_SECRET,
    PORT : process.env.PORT,
    PORTWS : process.env.PORTWS
}

export default config;


