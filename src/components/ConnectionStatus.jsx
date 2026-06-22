import { useEffect, useState } from "react";
import socket from "../services/socketService";
import "../styles/dashboard.css";

function ConnectionStatus() {
  const [connected, setConnected] =
    useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () =>
      setConnected(true)
    );

    socket.on("disconnect", () =>
      setConnected(false)
    );

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="connection-status">
    {connected
      ? "🟢 Connected"
      : "🔴 Disconnected"}
  </div>
  );
}

export default ConnectionStatus;