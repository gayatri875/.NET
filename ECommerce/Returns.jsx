import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../services/api";

function Returns() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadReturns();
  }, []);

  async function loadReturns() {
    try {
      setLoading(true);

      const customerId =
        localStorage.getItem("customerId");

      if (!customerId) {
        throw new Error(
          "Customer ID not found. Please login again."
        );
      }

      /*
        We get customer orders first and then
        fetch return requests for each order.
      */
      const orders = await apiRequest(
        `/api/Order/customer/${customerId}`
      );

      const allReturns = [];

      for (const order of orders || []) {
        try {
          const orderReturns = await apiRequest(
            `/api/Return/order/${order.id}`
          );

          if (orderReturns?.length) {
            orderReturns.forEach((item) => {
              allReturns.push(item);
            });
          }
        } catch (error) {
          console.error(
            `Return load failed for order ${order.id}`,
            error
          );
        }
      }

      setReturns(allReturns);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function getStatusStyle(status) {
    switch (status?.toLowerCase()) {
      case "requested":
        return {
          background: "#fef3c7",
          color: "#92400e",
        };

      case "approved":
        return {
          background: "#dcfce7",
          color: "#166534",
        };

      case "completed":
        return {
          background: "#dbeafe",
          color: "#1e40af",
        };

      case "rejected":
        return {
          background: "#fee2e2",
          color: "#991b1b",
        };

      default:
        return {
          background: "#f1f5f9",
          color: "#475569",
        };
    }
  }

  function formatDate(date) {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString(
      "en-IN"
    );
  }

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading your returns...</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <p style={styles.label}>
              MY ACCOUNT
            </p>

            <h1>My Returns</h1>

            <p style={styles.subtitle}>
              Track your product return requests.
            </p>
          </div>

          <div style={styles.headerActions}>
            <Link
              to="/orders"
              style={styles.ordersButton}
            >
              My Orders
            </Link>

            <Link
              to="/products"
              style={styles.shopButton}
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}

        {/* SUMMARY */}
        <div style={styles.summaryGrid}>

          <div style={styles.summaryCard}>
            <span>Total Returns</span>
            <strong>{returns.length}</strong>
          </div>

          <div style={styles.summaryCard}>
            <span>Requested</span>
            <strong>
              {
                returns.filter(
                  (item) =>
                    item.status?.toLowerCase() ===
                    "requested"
                ).length
              }
            </strong>
          </div>

          <div style={styles.summaryCard}>
            <span>Approved</span>
            <strong>
              {
                returns.filter(
                  (item) =>
                    item.status?.toLowerCase() ===
                    "approved"
                ).length
              }
            </strong>
          </div>

          <div style={styles.summaryCard}>
            <span>Completed</span>
            <strong>
              {
                returns.filter(
                  (item) =>
                    item.status?.toLowerCase() ===
                    "completed"
                ).length
              }
            </strong>
          </div>

        </div>

        {/* RETURNS */}
        {returns.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>
              ↩️
            </div>

            <h2>No return requests</h2>

            <p>
              Your return requests will appear here.
            </p>

            <Link
              to="/orders"
              style={styles.primaryButton}
            >
              View My Orders
            </Link>
          </div>
        ) : (
          <div style={styles.list}>

            {returns.map((item) => (
              <div
                key={item.id}
                style={styles.card}
              >

                {/* TOP */}
                <div style={styles.topRow}>

                  <div>
                    <p style={styles.returnLabel}>
                      RETURN #{item.id}
                    </p>

                    <h2>
                      Order #{item.orderId}
                    </h2>
                  </div>

                  <span
                    style={{
                      ...styles.statusBadge,
                      ...getStatusStyle(
                        item.status
                      ),
                    }}
                  >
                    {item.status}
                  </span>

                </div>

                {/* DETAILS */}
                <div style={styles.details}>

                  <div>
                    <span style={styles.caption}>
                      Product
                    </span>

                    <strong>
                      {item.product?.name ||
                        `Product #${item.productId}`}
                    </strong>
                  </div>

                  <div>
                    <span style={styles.caption}>
                      Reason
                    </span>

                    <strong>
                      {item.reason ||
                        "No reason provided"}
                    </strong>
                  </div>

                  <div>
                    <span style={styles.caption}>
                      Requested
                    </span>

                    <strong>
                      {formatDate(
                        item.requestedDate
                      )}
                    </strong>
                  </div>

                  <div>
                    <span style={styles.caption}>
                      Approved
                    </span>

                    <strong>
                      {formatDate(
                        item.approvedDate
                      )}
                    </strong>
                  </div>

                  <div>
                    <span style={styles.caption}>
                      Completed
                    </span>

                    <strong>
                      {formatDate(
                        item.completedDate
                      )}
                    </strong>
                  </div>

                </div>

                {/* PROGRESS */}
                <div style={styles.progress}>

                  <ProgressStep
                    title="Requested"
                    active={
                      item.status ===
                        "Requested" ||
                      item.status ===
                        "Approved" ||
                      item.status ===
                        "Completed"
                    }
                  />

                  <div style={styles.progressLine} />

                  <ProgressStep
                    title="Approved"
                    active={
                      item.status ===
                        "Approved" ||
                      item.status ===
                        "Completed"
                    }
                  />

                  <div style={styles.progressLine} />

                  <ProgressStep
                    title="Completed"
                    active={
                      item.status ===
                      "Completed"
                    }
                  />

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

function ProgressStep({
  title,
  active,
}) {
  return (
    <div style={styles.progressStep}>
      <div
        style={{
          ...styles.progressDot,
          ...(active
            ? styles.progressActive
            : {}),
        }}
      >
        {active ? "✓" : ""}
      </div>

      <span
        style={{
          color: active
            ? "#1e293b"
            : "#94a3b8",
          fontWeight: active
            ? "700"
            : "500",
        }}
      >
        {title}
      </span>
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
    maxWidth: "1100px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "25px",
  },

  headerActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  label: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1.5px",
  },

  subtitle: {
    color: "#64748b",
    marginTop: "8px",
  },

  ordersButton: {
    padding: "10px 15px",
    border:
      "1px solid #2563eb",
    borderRadius: "8px",
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "700",
  },

  shopButton: {
    padding: "10px 15px",
    background: "#2563eb",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "700",
  },

  message: {
    padding: "14px",
    marginBottom: "20px",
    background: "#eff6ff",
    color: "#1e40af",
    borderRadius: "10px",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  summaryCard: {
    background: "#fff",
    padding: "18px",
    borderRadius: "12px",
    boxShadow:
      "0 5px 18px rgba(15,23,42,0.05)",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow:
      "0 8px 25px rgba(15,23,42,0.06)",
    border:
      "1px solid #e5e7eb",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  returnLabel: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  statusBadge: {
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "700",
  },

  details: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    marginTop: "20px",
    paddingTop: "18px",
    borderTop:
      "1px solid #e5e7eb",
  },

  caption: {
    display: "block",
    color: "#64748b",
    fontSize: "13px",
    marginBottom: "6px",
  },

  progress: {
    marginTop: "25px",
    paddingTop: "20px",
    borderTop:
      "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  progressStep: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },

  progressDot: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    background: "#e2e8f0",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
  },

  progressActive: {
    background: "#2563eb",
  },

  progressLine: {
    flex: 1,
    height: "2px",
    background: "#cbd5e1",
    margin: "0 10px",
  },

  primaryButton: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 18px",
    background: "#2563eb",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "700",
  },

  empty: {
    background: "#fff",
    padding: "70px 20px",
    textAlign: "center",
    borderRadius: "16px",
    boxShadow:
      "0 8px 25px rgba(15,23,42,0.06)",
  },

  emptyIcon: {
    fontSize: "60px",
    marginBottom: "15px",
  },

  center: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default Returns;