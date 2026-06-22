import "../styles/dashboard.css";

function AlertFeed({
  alerts,
  isHistorical,
}) {
  return (
    <div className="alert-section">
      <h4 className="alert-title">
        {isHistorical
          ? "Last 10 Alerts"
          : "Live Alerts"}
      </h4>

      <div className="alert-feed">
        {alerts.length === 0 ? (
          <div className="no-alerts">
            {isHistorical
              ? "No historical alerts found"
              : "No live alerts detected yet"}
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.alertRef}
              className="alert-item"
            >
              <div className="alert-ref">
                {alert.alertRef}
              </div>

              <div className="alert-symbol">
                {alert.symbol}
              </div>

              <div className="alert-reason">
                {alert.reason}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AlertFeed;