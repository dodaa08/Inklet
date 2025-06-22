import dotenv from "dotenv";
dotenv.config();

const config = {
    JWT_SECRET : process.env.JWT_SECRET,
    PORT : process.env.PORT,
    PORTWS : process.env.PORTWS
}

export default config;


