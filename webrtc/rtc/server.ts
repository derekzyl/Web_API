import express, { Express } from "express";
import path from "path";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import {
  ClientToServerEvents,
  dataI,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  spdProcessI,
} from "./io";
const app: Express = express();
const httpServer = createServer(app);
const port: number = 3000;
httpServer.listen(port, function () {
  console.log(`this dude is connected to ${port}`);
});
app.use(express.static(path.join(__dirname, "")));
// app.use(
//   cors({
//     origin: ["http://127.0.0.1:5173/"],
//   })
// );
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5173/",
    allowedHeaders: "http://127.0.0.1:5173/",

    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userConnections: any[] = [];
let f = 1;
io.on("connection", (socket) => {
  socket.on("userConnect", (data: dataI) => {
    console.log(userConnections, f++);

    const other_user = userConnections.filter((p) => {
      // console.log(p.meetingID, "testing", data.meetingID);

      return p.meetingID === data.meetingID;
    });
    userConnections.push({
      connectionID: socket.id,
      userID: data.displayName,
      meetingID: data.meetingID,
    });

    other_user.forEach((e) => {
      socket.to(e.connectionID).emit("the", {
        other_user_id: data.displayName,
        connectionID: socket.id,
      });
    });

    socket.emit("inform_me_about_others", other_user);
  });

  socket.on("sdpProcess", (data: spdProcessI) => {
    socket.to(data.to_connid).emit("sdpProcess", {
      message: data.message,
      from_connid: socket.id,
    });
    console.log("love");
  });
});
