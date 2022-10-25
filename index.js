const http = require("http");
const app = require("./src/app");
const env = require("./src/config/env");
const { db } = require("./src/models");
const listenServer = async (err) => {
  if (err) {
    console.log(err, "error");
  }
  console.log(`server listening at ${env.PORT}`);
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log("database connection success");
  } catch (error) {
    console.log(error);
  }
};

const server = http.createServer(app);

server.listen(env.PORT);
server.on("listening", listenServer);
server.on("error", (e) => {
  console.log(e, "eeeeee");
});
