import { useEffect, useState } from "react";
import socket from "../services/socketService";

const MAX_POINTS = 300;

export function usePrices() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const handlePriceUpdate = (tick) => {
      const { symbol, price, timestamp } = tick;

      if (
        !symbol ||
        price === undefined ||
        !timestamp
      ) {
        console.error(
          "Invalid tick payload:",
          tick
        );
        return;
      }

      const newPoint = {
        time: Math.floor(
          new Date(timestamp).getTime() / 1000
        ),
        value: Number(price),
      };

      setPrices((prev) => {
        const existing = prev[symbol] || [];

        const updated = [
          ...existing,
          newPoint,
        ].slice(-MAX_POINTS);

        return {
          ...prev,
          [symbol]: updated,
        };
      });
    };

    socket.on(
      "price-update",
      handlePriceUpdate
    );

    return () => {
      socket.off(
        "price-update",
        handlePriceUpdate
      );
    };
  }, []);

  return prices;
}