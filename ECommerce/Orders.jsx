import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  // ==========================================
  // LOAD CUSTOMER ORDERS
  // ==========================================
  async function loadOrders() {
    try {
      setLoading(true);
      setMessage("");

      const customerId =
        localStorage.getItem("customerId");

      if (!customerId) {
        throw new Error(
          "Customer ID not found. Please login again."
        );
      }

      const data = await apiRequest(
        `/api/Order/customer/${customerId}`
      );

      console.log("Orders:", data);

      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Load orders error:", error);

      setMessage(
        error.message ||
          "Failed to load orders."
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // STATUS STYLE
  // ==========================================
  function getStatusStyle(status) {
    switch (status?.toLowerCase()) {
      case "pending":
        return {
          background: "#fef3c7",
          color: "#92400e",
        };

      case "processing":
        return {
          background: "#ede9fe",
          color: "#6d28d9",
        };

      case "shipped":
        return {
          background: "#dbeafe",
          color: "#1e40af",
        };

      case "delivered":
        return {
          background: "#dcfce7",
          color: "#166534",
        };

      case "cancelled":
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

  // ==========================================
  // FORMAT DATE
  // ==========================================
  function formatDate(date) {
    if (!date) {
      return "N/A";
    }

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
      return "N/A";
    }

    return value.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div style={styles.center}>
        <div style={styles.loader}>
          <div style={styles.spinner}></div>
          <h2>Loading your orders...</h2>
          <p>Please wait.</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================
  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* =====================================
            HEADER
        ===================================== */}
        <div style={styles.header}>
          <div>
            <p style={styles.label}>
              MY ACCOUNT
            </p>

            <h1 style={styles.title}>
              My Orders
            </h1>

            <p style={styles.subtitle}>
              View and track all your orders.
            </p>
          </div>

          <Link
            to="/products"
            style={styles.shopLink}
          >
            Continue Shopping
          </Link>
        </div>

        {/* =====================================
            ERROR MESSAGE
        ===================================== */}
        {message && (
          <div style={styles.errorMessage}>
            <span>⚠️</span>
            <span>{message}</span>
          </div>
        )}

        {/* =====================================
            NO ORDERS
        ===================================== */}
        {!message && orders.length === 0 ? (
          <div style={styles.emptyCard}>
            <div style={styles.emptyIcon}>
              📦
            </div>

            <h2 style={styles.emptyTitle}>
              No orders yet
            </h2>

            <p style={styles.emptyText}>
              Your placed orders will appear here.
            </p>

            <Link
              to="/products"
              style={styles.primaryButton}
            >
              Start Shopping →
            </Link>
          </div>
        ) : (
          /* ===================================
             ORDER LIST
          =================================== */
          <div style={styles.orderList}>
            {orders.map((order) => {
              const status =
                order.status || "Pending";

              const orderItems =
                Array.isArray(order.orderItems)
                  ? order.orderItems
                  : [];

              const totalItems =
                orderItems.reduce(
                  (total, item) =>
                    total +
                    Number(item.quantity || 0),
                  0
                );

              const isCancelled =
                status.toLowerCase() ===
                "cancelled";

              return (
                <div
                  key={order.id}
                  style={styles.orderCard}
                >
                  {/* =================================
                      TOP ROW
                  ================================= */}
                  <div style={styles.topRow}>
                    <div>
                      <p style={styles.orderLabel}>
                        ORDER #{order.id}
                      </p>

                      <h2 style={styles.amount}>
                        ₹
                        {Number(
                          order.totalAmount || 0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </h2>
                    </div>

                    <span
                      style={{
                        ...styles.statusBadge,
                        ...getStatusStyle(
                          status
                        ),
                      }}
                    >
                      {status}
                    </span>
                  </div>

                  {/* =================================
                      ORDER INFO
                  ================================= */}
                  <div style={styles.detailsGrid}>

                    <div style={styles.detailBox}>
                      <span
                        style={styles.caption}
                      >
                        Order Date
                      </span>

                      <strong>
                        {formatDate(
                          order.orderDate
                        )}
                      </strong>
                    </div>

                    <div style={styles.detailBox}>
                      <span
                        style={styles.caption}
                      >
                        Items
                      </span>

                      <strong>
                        {totalItems}
                      </strong>
                    </div>

                    <div style={styles.detailBox}>
                      <span
                        style={styles.caption}
                      >
                        Delivery Address
                      </span>

                      <strong
                        style={
                          styles.addressText
                        }
                      >
                        {order.shippingAddress ||
                          "Not available"}
                      </strong>
                    </div>

                  </div>

                  {/* =================================
                      ORDER ITEMS PREVIEW
                  ================================= */}
                  {orderItems.length > 0 && (
                    <div style={styles.itemsPreview}>
                      <div style={styles.previewHeader}>
                        <strong>
                          Order Items
                        </strong>

                        <span>
                          {orderItems.length}{" "}
                          product
                          {orderItems.length !== 1
                            ? "s"
                            : ""}
                        </span>
                      </div>

                      {orderItems
                        .slice(0, 3)
                        .map((item) => (
                          <div
                            key={item.id}
                            style={styles.previewItem}
                          >
                            <div>
                              <strong>
                                {item.product
                                  ?.name ||
                                  `Product #${item.productId}`}
                              </strong>

                              <p
                                style={
                                  styles.itemMeta
                                }
                              >
                                Qty:{" "}
                                {item.quantity}
                                {" • "}
                                ₹
                                {Number(
                                  item.unitPrice ||
                                    0
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </p>
                            </div>

                            <strong>
                              ₹
                              {Number(
                                item.totalPrice ??
                                  (
                                    Number(
                                      item.unitPrice ||
                                        0
                                    ) *
                                    Number(
                                      item.quantity ||
                                        0
                                    )
                                  )
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </strong>
                          </div>
                        ))}

                      {orderItems.length > 3 && (
                        <p
                          style={
                            styles.moreItems
                          }
                        >
                          +{" "}
                          {orderItems.length - 3}{" "}
                          more item
                          {orderItems.length - 3 !== 1
                            ? "s"
                            : ""}
                        </p>
                      )}
                    </div>
                  )}

                  {/* =================================
                      ACTIONS
                  ================================= */}
                  <div style={styles.actions}>

                    <Link
                      to={`/orders/${order.id}`}
                      style={styles.viewButton}
                    >
                      View Order Details
                    </Link>

                    {!isCancelled && (
                      <Link
                        to={`/shipping/${order.id}`}
                        style={styles.trackButton}
                      >
                        🚚 Track Shipment
                      </Link>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

// ==========================================
// STYLES
// ==========================================
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
    justifyContent:
      "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
  },

  label: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    marginBottom: "8px",
  },

  title: {
    margin: 0,
    fontSize: "34px",
    color: "#111827",
  },

  subtitle: {
    marginTop: "8px",
    color: "#64748b",
  },

  shopLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "700",
    padding: "10px 16px",
    border:
      "1px solid #2563eb",
    borderRadius: "8px",
  },

  errorMessage: {
    display: "flex",
    gap: "10px",
    padding: "14px 16px",
    marginBottom: "20px",
    background: "#fee2e2",
    color: "#991b1b",
    borderRadius: "10px",
    border:
      "1px solid #fecaca",
    fontWeight: "600",
  },

  orderList: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  orderCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    border:
      "1px solid #e5e7eb",
    boxShadow:
      "0 8px 25px rgba(15,23,42,0.06)",
  },

  topRow: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    gap: "20px",
  },

  orderLabel: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1px",
    margin: 0,
  },

  amount: {
    margin:
      "6px 0 0 0",
    fontSize: "26px",
    color: "#111827",
  },

  statusBadge: {
    padding: "8px 15px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },

  detailsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "20px",
    paddingTop: "20px",
    borderTop:
      "1px solid #e5e7eb",
  },

  detailBox: {
    minWidth: 0,
  },

  caption: {
    display: "block",
    color: "#64748b",
    fontSize: "13px",
    marginBottom: "6px",
  },

  addressText: {
    display: "block",
    overflowWrap: "anywhere",
    lineHeight: "1.4",
  },

  itemsPreview: {
    marginTop: "20px",
    paddingTop: "18px",
    borderTop:
      "1px solid #e5e7eb",
  },

  previewHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },

  previewItem: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "12px 0",
    borderBottom:
      "1px solid #f1f5f9",
  },

  itemMeta: {
    margin: "4px 0 0 0",
    color: "#64748b",
    fontSize: "13px",
  },

  moreItems: {
    color: "#2563eb",
    fontSize: "13px",
    fontWeight: "600",
    marginTop: "10px",
  },

  actions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "20px",
    paddingTop: "18px",
    borderTop:
      "1px solid #e5e7eb",
  },

  viewButton: {
    display: "inline-block",
    padding: "11px 17px",
    background: "#2563eb",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "700",
  },

  trackButton: {
    display: "inline-block",
    padding: "11px 17px",
    background: "#fff",
    color: "#2563eb",
    textDecoration: "none",
    border:
      "1px solid #2563eb",
    borderRadius: "8px",
    fontWeight: "700",
  },

  emptyCard: {
    background: "#fff",
    padding: "80px 20px",
    textAlign: "center",
    borderRadius: "16px",
    boxShadow:
      "0 8px 25px rgba(15,23,42,0.06)",
  },

  emptyIcon: {
    fontSize: "65px",
    marginBottom: "15px",
  },

  emptyTitle: {
    margin: "0 0 8px 0",
    color: "#111827",
  },

  emptyText: {
    color: "#64748b",
    marginBottom: "20px",
  },

  primaryButton: {
    display: "inline-block",
    padding: "12px 22px",
    background: "#2563eb",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "700",
  },

  center: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  loader: {
    textAlign: "center",
  },

  spinner: {
    width: "42px",
    height: "42px",
    margin: "0 auto 15px",
    border:
      "4px solid #e5e7eb",
    borderTop:
      "4px solid #2563eb",
    borderRadius: "50%",
    animation:
      "spin 1s linear infinite",
  },
};

const styleSheet =
  document.createElement("style");

styleSheet.textContent = `
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

document.head.appendChild(styleSheet);

export default Orders;