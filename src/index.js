require("dotenv").config();
const { PORT } = process.env;
const server = require("./app");
const { conn } = require("./DB_connection");

conn.sync({ force: false });

server.listen(PORT, () => {
  console.log(`Server raise in port: ${PORT}`);
});
