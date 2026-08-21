import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest } from "../services/api";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadOrder();
  }, [id]);

  // ==========================================
  // LOAD ORDER
  // ==========================================
  async function loadOrder() {
    try {
      setLoading(true);
      setMessage("");

      const data = await apiRequest(
        `/api/Order/${id}`
      );

      console.log("ORDER DETAILS:", data);

      setOrder(data);
    } catch (error) {
      console.error(
        "ORDER DETAILS ERROR:",
        error
      );

      setMessage(
        error.message ||
          "Unable to load order."
      );

      setOrder(null);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div style={styles.center}>
        <div>
          <h2>Loading order...</h2>
          <p>Please wait.</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ORDER NOT FOUND
  // ==========================================
  if (!order) {
    return (
      <div style={styles.center}>
        <h2>
          {message || "Order not found."}
        </h2>

        <Link
          to="/orders"
          style={styles.backButton}
        >
          ← Back to Orders
        </Link>
      </div>
    );
  }

  // ==========================================
  // ORDER ITEMS
  // ==========================================
  const orderItems =
    Array.isArray(order.orderItems)
      ? order.orderItems
      : [];

  // ==========================================
  // TOTAL ITEMS
  // ==========================================
  const totalItems =
    orderItems.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );

  // ==========================================
  // STATUS
  // ==========================================
  const status =
    order.status || "Pending";

  const isDelivered =
    status.toLowerCase() ===
    "delivered";

  const isCancelled =
    status.toLowerCase() ===
    "cancelled";

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* =====================================
            BACK
        ===================================== */}

        <Link
          to="/orders"
          style={styles.back}
        >
          ← Back to Orders
        </Link>


        {/* =====================================
            HEADER
        ===================================== */}

        <div style={styles.header}>

          <div>

            <p style={styles.label}>
              ORDER DETAILS
            </p>

            <h1>
              Order #{order.id}
            </h1>

            <span
              style={{
                ...styles.statusBadge,
                ...(isDelivered
                  ? styles.deliveredStatus
                  : isCancelled
                  ? styles.cancelledStatus
                  : styles.pendingStatus),
              }}
            >
              {status}
            </span>

          </div>

          <div style={styles.headerTotal}>
            <span style={styles.smallLabel}>
              Total
            </span>

            <h2>
              ₹
              {Number(
                order.totalAmount || 0
              ).toLocaleString(
                "en-IN"
              )}
            </h2>
          </div>

        </div>


        {/* =====================================
            ORDER INFO
        ===================================== */}

        <div style={styles.infoGrid}>

          <div style={styles.infoCard}>
            <span style={styles.caption}>
              Order Date
            </span>

            <strong>
              {order.orderDate
                ? new Date(
                    order.orderDate
                  ).toLocaleString(
                    "en-IN"
                  )
                : "N/A"}
            </strong>
          </div>


          <div style={styles.infoCard}>
            <span style={styles.caption}>
              Customer ID
            </span>

            <strong>
              {order.customerId}
            </strong>
          </div>


          <div style={styles.infoCard}>
            <span style={styles.caption}>
              Total Items
            </span>

            <strong>
              {totalItems}
            </strong>
          </div>

        </div>


        {/* =====================================
            DELIVERY ADDRESS
        ===================================== */}

        <div style={styles.card}>

          <h2>
            🚚 Delivery Address
          </h2>

          <div style={styles.addressBox}>

            <span style={styles.addressIcon}>
              📍
            </span>

            <p>
              {order.shippingAddress ||
                "Address not available."}
            </p>

          </div>

        </div>


        {/* =====================================
            ORDER ITEMS
        ===================================== */}

        <div style={styles.card}>

          <div style={styles.cardHeader}>

            <h2>
              Order Items
            </h2>

            <span style={styles.itemCount}>
              {totalItems} item
              {totalItems !== 1
                ? "s"
                : ""}
            </span>

          </div>


          {orderItems.length === 0 ? (
            <div style={styles.noItems}>
              No order items found.
            </div>
          ) : (
            orderItems.map(
              (item) => {

                const product =
                  item.product || {};

                const unitPrice =
                  Number(
                    item.unitPrice || 0
                  );

                const quantity =
                  Number(
                    item.quantity || 0
                  );

                const totalPrice =
                  Number(
                    item.totalPrice ??
                      unitPrice *
                        quantity
                  );

                return (
                  <div
                    key={item.id}
                    style={styles.item}
                  >

                    <div
                      style={styles.itemInfo}
                    >

                      <div
                        style={
                          styles.productImage
                        }
                      >
                        {product.imageUrl ? (
                          <img
                            src={
                              product.imageUrl
                            }
                            alt={
                              product.name ||
                              "Product"
                            }
                            style={
                              styles.image
                            }
                          />
                        ) : (
                          <span
                            style={
                              styles.placeholder
                            }
                          >
                            🛍️
                          </span>
                        )}
                      </div>


                      <div>
                        <h3>
                          {product.name ||
                            `Product #${item.productId}`}
                        </h3>

                        <p
                          style={
                            styles.muted
                          }
                        >
                          Quantity:{" "}
                          {quantity}
                        </p>

                        <p
                          style={
                            styles.muted
                          }
                        >
                          Unit Price: ₹
                          {unitPrice.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>

                    </div>


                    <strong
                      style={
                        styles.itemPrice
                      }
                    >
                      ₹
                      {totalPrice.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>
                );
              }
            )
          )}

        </div>


        {/* =====================================
            TOTAL
        ===================================== */}

        <div style={styles.totalCard}>

          <span>
            Total Amount
          </span>

          <strong>
            ₹
            {Number(
              order.totalAmount || 0
            ).toLocaleString(
              "en-IN"
            )}
          </strong>

        </div>


        {/* =====================================
            ACTIONS
        ===================================== */}

        <div style={styles.actionCard}>

          {!isCancelled && (
            <Link
              to={`/shipping/${order.id}`}
              style={styles.trackButton}
            >
              🚚 Track Shipment
            </Link>
          )}

          {isDelivered && (
            <Link
              to={`/return/${order.id}`}
              style={styles.returnButton}
            >
              ↩ Return Product
            </Link>
          )}

          <Link
            to="/products"
            style={styles.shopButton}
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  );
}


// ==============================================
// STYLES
// ==============================================

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f6f7fb",
    padding: "40px 20px",
    fontFamily:
      "Arial, Helvetica, sans-serif",
  },

  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },

  back: {
    display: "inline-block",
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: "700",
    marginBottom: "20px",
  },

  backButton: {
    display: "inline-block",
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: "700",
    marginTop: "10px",
  },

  header: {
    marginBottom: "25px",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    gap: "20px",
  },

  label: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    marginBottom: "7px",
  },

  statusBadge: {
    display: "inline-block",
    padding: "7px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "700",
    marginTop: "8px",
  },

  pendingStatus: {
    background: "#fef3c7",
    color: "#92400e",
  },

  deliveredStatus: {
    background: "#dcfce7",
    color: "#166534",
  },

  cancelledStatus: {
    background: "#fee2e2",
    color: "#991b1b",
  },

  headerTotal: {
    textAlign: "right",
  },

  smallLabel: {
    color: "#64748b",
    fontSize: "13px",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, 1fr)",
    gap: "15px",
    marginBottom: "20px",
  },

  infoCard: {
    background: "#fff",
    padding: "18px",
    borderRadius: "12px",
    boxShadow:
      "0 5px 18px rgba(0,0,0,0.05)",
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    marginBottom: "20px",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.06)",
  },

  cardHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    gap: "10px",
  },

  itemCount: {
    color: "#64748b",
    fontSize: "13px",
  },

  caption: {
    display: "block",
    color: "#64748b",
    fontSize: "13px",
    marginBottom: "6px",
  },

  addressBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
    marginTop: "15px",
  },

  addressIcon: {
    fontSize: "24px",
  },

  item: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "18px 0",
    borderBottom:
      "1px solid #e5e7eb",
  },

  itemInfo: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  productImage: {
    width: "65px",
    height: "65px",
    background: "#f1f5f9",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  placeholder: {
    fontSize: "28px",
  },

  muted: {
    color: "#64748b",
    margin: "5px 0",
  },

  itemPrice: {
    whiteSpace: "nowrap",
  },

  noItems: {
    padding: "25px 0",
    color: "#64748b",
  },

  totalCard: {
    background: "#111827",
    color: "#fff",
    padding: "20px",
    borderRadius: "14px",
    display: "flex",
    justifyContent:
      "space-between",
    fontSize: "20px",
  },

  actionCard: {
    marginTop: "20px",
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  trackButton: {
    display: "inline-block",
    padding: "13px 20px",
    background: "#2563eb",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "700",
  },

  returnButton: {
    display: "inline-block",
    padding: "13px 20px",
    background: "#dc2626",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "700",
  },

  shopButton: {
    display: "inline-block",
    padding: "13px 20px",
    background: "#fff",
    color: "#2563eb",
    textDecoration: "none",
    border:
      "1px solid #2563eb",
    borderRadius: "8px",
    fontWeight: "700",
  },

  center: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    textAlign: "center",
  },
};

export default OrderDetails;