import http from "http";
import app from "./src/app";
import {environment} from "./src/config/env";
import { db } from "./src/models";
db.sequelize
  .authenticate()
  .then(async () => {
    console.log("connection to db established");
    await db.sequelize.sync();
  })
  .catch((err: any) => {
    console.log("db connection error", err);
  });
const listenServer = (err: any) => {
  if (err) {
    console.log(err, "error");
  }
  console.log(`server listening at ${environment.PORT}`);
};

const server = http.createServer(app);

server.listen(environment.PORT);
server.on('listening',listenServer)
server.on("error", (e) => {
  console.log(e, "eeeeee");
});
