const server = require("./app");
const PORT = 3001;
const { conn } = require("./DB_connection");

conn.sync({ force: false });

server.listen(PORT, () => {
  console.log(`Server raise in port: ${PORT}`);
});
