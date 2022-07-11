const mysql = require("mysql2/promise");
const { config } = require("dotenv");
config();

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  connectionLimit: 10,
  connectTimeout: 5000,
  multipleStatements: true,
});

pool.on("acquire", (connection) => {
  console.log(`Connection ${connection.threadId} is acquired.`);
});

pool.on("enqueue", () => {
  console.log("Waiting for available connection slot.");
});

pool.on("release", (connection) => {
  console.log(`Connection ${connection.threadId} is released.`);
});

pool.on("connection", () => {
  console.log("Connection is created.");
});

const getConnection = async () => {
  try {
    return await pool.getConnection(async (connection) => connection);
  } catch (error) {
    console.error(`Database Connection was failed: ${error}`);
  }
};

module.exports = getConnection;
