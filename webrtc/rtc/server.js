"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const port = 3000;
httpServer.listen(port, function () {
    console.log(`this dude is connected to ${port}`);
});
app.use(express_1.default.static(path_1.default.join(__dirname, "")));
// app.use(
//   cors({
//     origin: ["http://127.0.0.1:5173/"],
//   })
// );
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://127.0.0.1:5173/",
        allowedHeaders: "http://127.0.0.1:5173/",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
const userConnections = [];
let f = 1;
io.on("connection", (socket) => {
    socket.on("userConnect", (data) => {
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
    socket.on("sdpProcess", (data) => {
        socket.to(data.to_connid).emit("sdpProcess", {
            message: data.message,
            from_connid: socket.id,
        });
        console.log("love");
    });
});
