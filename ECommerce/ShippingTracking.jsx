import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest } from "../services/api";

function ShippingTracking() {
  const { orderId } = useParams();

  const [shipping, setShipping] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadShipping();
  }, [orderId]);

  async function loadShipping() {
    try {
      setLoading(true);

      const data = await apiRequest(
        `/api/Shipping/order/${orderId}`
      );

      setShipping(data);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function getStatusClass(status) {
    switch (status?.toLowerCase()) {
      case "delivered":
        return styles.delivered;

      case "shipped":
        return styles.shipped;

      default:
        return styles.pending;
    }
  }

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading shipment...</h2>
      </div>
    );
  }

  if (!shipping) {
    return (
      <div style={styles.center}>
        <h2>
          {message || "Shipment not found."}
        </h2>

        <Link to={`/orders/${orderId}`}>
          ← Back to Order
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <Link
          to={`/orders/${orderId}`}
          style={styles.back}
        >
          ← Back to Order
        </Link>

        <div style={styles.header}>
          <div>
            <p style={styles.label}>
              DELIVERY TRACKING
            </p>

            <h1>
              Order #{orderId}
            </h1>

            <p style={styles.subtitle}>
              Track your shipment and delivery status.
            </p>
          </div>

          <span
            style={{
              ...styles.status,
              ...getStatusClass(
                shipping.status
              ),
            }}
          >
            {shipping.status}
          </span>
        </div>

        <div style={styles.card}>

          <div style={styles.topInfo}>

            <div>
              <span style={styles.caption}>
                Courier
              </span>

              <strong>
                {shipping.courierName ||
                  "Not assigned"}
              </strong>
            </div>

            <div>
              <span style={styles.caption}>
                Tracking Number
              </span>

              <strong>
                {shipping.trackingNumber ||
                  "Not available"}
              </strong>
            </div>

          </div>

          <div style={styles.timeline}>

            {/* Pending */}
            <div style={styles.step}>
              <div
                style={{
                  ...styles.dot,
                  ...styles.dotDone,
                }}
              >
                ✓
              </div>

              <div>
                <h3>Order Processing</h3>
                <p>
                  Your order has been received.
                </p>
              </div>
            </div>

            <div style={styles.line} />

            {/* Shipped */}
            <div style={styles.step}>
              <div
                style={{
                  ...styles.dot,
                  ...(shipping.shippedDate
                    ? styles.dotDone
                    : styles.dotPending),
                }}
              >
                {shipping.shippedDate
                  ? "✓"
                  : "2"}
              </div>

              <div>
                <h3>Shipped</h3>

                <p>
                  {shipping.shippedDate
                    ? `Shipped on ${new Date(
                        shipping.shippedDate
                      ).toLocaleDateString(
                        "en-IN"
                      )}`
                    : "Shipment not dispatched yet."}
                </p>
              </div>
            </div>

            <div style={styles.line} />

            {/* Delivered */}
            <div style={styles.step}>
              <div
                style={{
                  ...styles.dot,
                  ...(shipping.deliveredDate
                    ? styles.dotDone
                    : styles.dotPending),
                }}
              >
                {shipping.deliveredDate
                  ? "✓"
                  : "3"}
              </div>

              <div>
                <h3>Delivered</h3>

                <p>
                  {shipping.deliveredDate
                    ? `Delivered on ${new Date(
                        shipping.deliveredDate
                      ).toLocaleDateString(
                        "en-IN"
                      )}`
                    : "Waiting for delivery."}
                </p>
              </div>
            </div>

          </div>

        </div>

        <div style={styles.infoCard}>
          <span style={styles.infoIcon}>
            🚚
          </span>

          <div>
            <h3>Shipment Information</h3>

            <p>
              Keep your tracking number safe.
              You can use it to identify your shipment
              with the courier.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "40px 20px",
    fontFamily:
      "Arial, Helvetica, sans-serif",
  },

  container: {
    maxWidth: "950px",
    margin: "0 auto",
  },

  back: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "700",
  },

  header: {
    marginTop: "25px",
    marginBottom: "25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  label: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1.5px",
  },

  subtitle: {
    color: "#64748b",
  },

  status: {
    padding: "9px 16px",
    borderRadius: "20px",
    fontWeight: "700",
  },

  pending: {
    background: "#fef3c7",
    color: "#92400e",
  },

  shipped: {
    background: "#dbeafe",
    color: "#1e40af",
  },

  delivered: {
    background: "#dcfce7",
    color: "#166534",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow:
      "0 8px 25px rgba(15,23,42,0.06)",
  },

  topInfo: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, 1fr)",
    gap: "20px",
    paddingBottom: "25px",
    borderBottom:
      "1px solid #e5e7eb",
  },

  caption: {
    display: "block",
    color: "#64748b",
    fontSize: "13px",
    marginBottom: "7px",
  },

  timeline: {
    marginTop: "30px",
  },

  step: {
    display: "flex",
    alignItems: "flex-start",
    gap: "15px",
  },

  dot: {
    width: "40px",
    height: "40px",
    minWidth: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
  },

  dotDone: {
    background: "#2563eb",
    color: "#fff",
  },

  dotPending: {
    background: "#e2e8f0",
    color: "#64748b",
  },

  line: {
    width: "2px",
    height: "45px",
    background: "#cbd5e1",
    marginLeft: "19px",
  },

  infoCard: {
    marginTop: "20px",
    padding: "20px",
    background: "#eff6ff",
    borderRadius: "12px",
    display: "flex",
    gap: "15px",
    alignItems: "flex-start",
  },

  infoIcon: {
    fontSize: "26px",
  },

  center: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
  },
};

export default ShippingTracking;