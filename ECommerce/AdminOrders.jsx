import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  // ==========================================
  // GET ALL ORDERS
  // ==========================================
  async function loadOrders() {
    try {
      setLoading(true);

      const data = await apiRequest("/api/Order");

      setOrders(data);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================
  async function updateStatus(order, status) {
    try {
      const updatedOrder = {
        customerId: order.customerId,
        shippingAddress: order.shippingAddress,
        status: status,
      };

      const data = await apiRequest(
        `/api/Order/${order.id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedOrder),
        }
      );

      setOrders((current) =>
        current.map((item) =>
          item.id === order.id
            ? {
                ...item,
                ...data,
                status: data?.status || status,
              }
            : item
        )
      );

      setMessage(
        `Order #${order.id} status updated.`
      );
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  }

  // ==========================================
  // DELETE ORDER
  // ==========================================
  async function deleteOrder(id) {
    const confirmed = window.confirm(
      `Are you sure you want to delete Order #${id}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await apiRequest(
        `/api/Order/${id}`,
        {
          method: "DELETE",
        }
      );

      setOrders((current) =>
        current.filter(
          (order) => order.id !== id
        )
      );

      setMessage(
        `Order #${id} deleted successfully.`
      );
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  }

  function getStatusStyle(status) {
    switch (status?.toLowerCase()) {
      case "pending":
        return {
          background: "#fef3c7",
          color: "#92400e",
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
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading orders...</h2>
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
              ADMIN PANEL
            </p>

            <h1>Order Management</h1>

            <p style={styles.subtitle}>
              View and manage customer orders.
            </p>
          </div>

          <Link
            to="/admin"
            style={styles.backButton}
          >
            ← Dashboard
          </Link>

        </div>


        {/* MESSAGE */}
        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}


        {/* ORDER SUMMARY */}
        <div style={styles.summaryGrid}>

          <div style={styles.summaryCard}>
            <span>Total Orders</span>
            <strong>{orders.length}</strong>
          </div>

          <div style={styles.summaryCard}>
            <span>Pending</span>
            <strong>
              {
                orders.filter(
                  (o) =>
                    o.status?.toLowerCase() ===
                    "pending"
                ).length
              }
            </strong>
          </div>

          <div style={styles.summaryCard}>
            <span>Shipped</span>
            <strong>
              {
                orders.filter(
                  (o) =>
                    o.status?.toLowerCase() ===
                    "shipped"
                ).length
              }
            </strong>
          </div>

          <div style={styles.summaryCard}>
            <span>Delivered</span>
            <strong>
              {
                orders.filter(
                  (o) =>
                    o.status?.toLowerCase() ===
                    "delivered"
                ).length
              }
            </strong>
          </div>

        </div>


        {/* ORDERS */}
        <div style={styles.card}>

          {orders.length === 0 ? (
            <div style={styles.empty}>
              <div style={styles.emptyIcon}>
                🛒
              </div>

              <h3>No orders found</h3>

              <p>
                Customer orders will appear here.
              </p>
            </div>
          ) : (
            <div style={styles.list}>

              {orders.map((order) => (

                <div
                  key={order.id}
                  style={styles.orderCard}
                >

                  {/* TOP */}
                  <div style={styles.topRow}>

                    <div>
                      <p style={styles.orderId}>
                        ORDER #{order.id}
                      </p>

                      <h2>
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
                          order.status
                        ),
                      }}
                    >
                      {order.status}
                    </span>

                  </div>


                  {/* DETAILS */}
                  <div style={styles.details}>

                    <div>
                      <span style={styles.caption}>
                        Customer ID
                      </span>

                      <strong>
                        {order.customerId}
                      </strong>
                    </div>

                    <div>
                      <span style={styles.caption}>
                        Order Date
                      </span>

                      <strong>
                        {order.orderDate
                          ? new Date(
                              order.orderDate
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "N/A"}
                      </strong>
                    </div>

                    <div>
                      <span style={styles.caption}>
                        Shipping Address
                      </span>

                      <strong>
                        {order.shippingAddress ||
                          "Not available"}
                      </strong>
                    </div>

                  </div>


                  {/* ITEMS */}
                  <div style={styles.itemsSection}>

                    <p style={styles.itemsTitle}>
                      Order Items
                    </p>

                    <div style={styles.itemList}>

                      {order.orderItems?.map(
                        (item) => (
                          <div
                            key={item.id}
                            style={styles.item}
                          >
                            <span>
                              {item.product?.name ||
                                `Product #${item.productId}`}
                            </span>

                            <span>
                              × {item.quantity}
                            </span>

                            <strong>
                              ₹
                              {Number(
                                item.totalPrice || 0
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </strong>
                          </div>
                        )
                      )}

                    </div>

                  </div>


                  {/* ACTIONS */}
                  <div style={styles.actions}>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order,
                          e.target.value
                        )
                      }
                      style={styles.select}
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>


                    <Link
                      to={`/orders/${order.id}`}
                      style={styles.viewButton}
                    >
                      View Details
                    </Link>


                    <button
                      onClick={() =>
                        deleteOrder(order.id)
                      }
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 65px)",
    background:
      "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
    padding: "40px 20px",
    fontFamily:
      "Arial, Helvetica, sans-serif",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "25px",
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

  backButton: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "700",
  },

  message: {
    padding: "14px 18px",
    background: "#eff6ff",
    color: "#1e40af",
    borderRadius: "10px",
    marginBottom: "20px",
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
      "0 5px 18px rgba(15, 23, 42, 0.05)",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow:
      "0 8px 25px rgba(15, 23, 42, 0.06)",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  orderCard: {
    border:
      "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "20px",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  orderId: {
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
      "repeat(3, minmax(0, 1fr))",
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

  itemsSection: {
    marginTop: "20px",
  },

  itemsTitle: {
    fontWeight: "700",
    marginBottom: "10px",
  },

  itemList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  item: {
    display: "grid",
    gridTemplateColumns:
      "1fr auto auto",
    gap: "15px",
    padding: "10px",
    background: "#f8fafc",
    borderRadius: "8px",
  },

  actions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "20px",
  },

  select: {
    padding: "9px 11px",
    border:
      "1px solid #cbd5e1",
    borderRadius: "7px",
    background: "#fff",
  },

  viewButton: {
    padding: "9px 14px",
    background: "#2563eb",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "7px",
    fontWeight: "700",
  },

  deleteButton: {
    padding: "9px 14px",
    border: "none",
    borderRadius: "7px",
    background: "#dc2626",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },

  empty: {
    padding: "60px",
    textAlign: "center",
    color: "#64748b",
  },

  emptyIcon: {
    fontSize: "50px",
    marginBottom: "10px",
  },

  center: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default AdminOrders;