import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

const io = new Server({});

export default async function handler(
  req: NextApiRequest,
  res: any
) {

  const receiptId = req.body.receiptId;

  console.log(receiptId);

  if (res.socket.server.io) {
    console.log("Socket is already running");
    res.end();
    return;
  }

  console.log("Socket is initializing");
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("Received new connection");

    socket.on("add-input", (msg) => {
      console.log('server', msg);
      io.emit("update-input", 'updated input fm');
    });
  });

  res.end();
}
