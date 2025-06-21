import dotenv from "dotenv";
dotenv.config();

const config = {
    JWT_SECRET : process.env.JWT_SECRET,
    PORT : process.env.PORT,
    DATABASE_URL : process.env.DATABASE_URL,
    NEON_DB : process.env.NEON_DB,
    PORTWS : process.env.PORTWS
}

export default config;


