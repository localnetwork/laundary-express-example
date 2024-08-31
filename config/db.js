require("dotenv").config();

const connection = require("serverless-mysql")({
  config: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // port: process.env.NODE_DB_PORT,
    connectTimeout: 60000, // 1 minute
  },
  backoff: "exponential",
  base: 5,
  cap: 200,
});

async function query(sql, params) {
  try {
    await connection.connect();
    const results = await connection.query(sql, params);
    await connection.end();
    return results;
  } catch (error) {
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("Reconnecting...");
      return query(sql, params);
    } else {
      throw error;
    }
  }
}

module.exports = {
  connection,
  query,
};
