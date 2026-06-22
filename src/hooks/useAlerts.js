import { useEffect, useState } from "react";
import socket from "../services/socketService";

export function useAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const handleAlert = (newAlert) => {
      console.log(
        "Alert received:",
        newAlert
      );

      setAlerts((prev) =>
        [newAlert, ...prev].slice(0, 10)
      );
    };

    socket.on("alert", handleAlert);

    return () => {
      socket.off("alert", handleAlert);
    };
  }, []);

  return alerts;
}