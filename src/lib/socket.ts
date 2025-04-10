import { io } from "socket.io-client";

import { API_URL } from "@/constants/global";

export const socket = io(API_URL, {
  autoConnect: true,
  transports: ["websocket"],
});
