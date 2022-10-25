import env from "dotenv";

export const environment = env.config({ debug: true })?.parsed || {};
