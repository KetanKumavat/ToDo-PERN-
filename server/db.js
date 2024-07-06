import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "ketan.k004",
  host: "localhost",
  port: 5432,
  database: "todo",
});

export default pool;
