import io from "socket.io-client";

const SOCKET_URL = "http://localhost:3000/sensors"; // Adjust the URL and namespace as needed

export const socket = io(SOCKET_URL);

// Handle connection errors
socket.on("connect_error", (error) => {
  console.error("WebSocket connection error:", error);
});
