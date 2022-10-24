const http = require("http");
const app = require("./src/app");
const env = require("./src/config/env");
const { db } = require("./src/models");
db.sequelize
  .authenticate()
  .then(async () => {
    console.log("connection to db established");
    await db.sequelize.sync();
  })
  .catch((err) => {
    console.log("db connection error", err);
  });
const listenServer = (err) => {
  if (err) {
    console.log(err, "error");
  }
  console.log(`server listening at ${env.PORT}`);
};

const server = http.createServer(app);

server.listen(env.PORT);
server.on('listening',listenServer)
server.on("error", (e) => {
  console.log(e, "eeeeee");
});
