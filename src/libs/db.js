import * as mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

/**
 * DB: Object Database for mysql
 */
export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});
