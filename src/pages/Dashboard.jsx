import { useState } from "react";

import "../styles/dashboard.css";

import { SYMBOLS } from "../constants/symbols";

import { usePrices } from "../hooks/usePrices";
import { useAlerts } from "../hooks/useAlerts";

import { getRecentAlerts } from "../api/alertsApi";

import ChartCard from "../components/ChartCard";
import AlertFeed from "../components/AlertFeed";
import ConnectionStatus from "../components/ConnectionStatus";

function Dashboard() {
  const prices = usePrices();

  const liveAlerts = useAlerts();

  const [historicalAlerts, setHistoricalAlerts] =
    useState([]);

  const [showHistorical, setShowHistorical] =
    useState(false);

  const handleLoadAlerts =
    async () => {
      try {
        const alerts =
          await getRecentAlerts();

        setHistoricalAlerts(alerts);

        setShowHistorical(true);
      } catch (error) {
        console.error(
          "Failed to load alerts:",
          error
        );
      }
    };

  const handleBackToLive = () => {
    setShowHistorical(false);
  };

  const alerts = showHistorical
    ? historicalAlerts
    : liveAlerts;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          TealVue Market Dashboard
        </h1>

        <ConnectionStatus />
      </div>

      <div className="dashboard-content">
        <div className="charts-grid">
          {SYMBOLS.map((symbol) => (
            <ChartCard
              key={symbol}
              symbol={symbol}
              data={prices[symbol] || []}
            />
          ))}
        </div>

        <div className="alerts-container">
          <div className="alerts-header">
            {!showHistorical ? (
              <button
                className="alerts-btn"
                onClick={handleLoadAlerts}
              >
                Load Last Alerts
              </button>
            ) : (
              <button
                className="back-btn"
                onClick={handleBackToLive}
              >
                ← Back To Live
              </button>
            )}
          </div>

          <AlertFeed
            alerts={alerts}
            isHistorical={showHistorical}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;