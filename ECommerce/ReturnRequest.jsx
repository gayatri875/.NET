import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../services/api";

function ReturnRequest() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  async function loadOrder() {
    try {
      setLoading(true);

      const data = await apiRequest(
        `/api/Order/${orderId}`
      );

      setOrder(data);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function submitReturn(e, productId) {
    e.preventDefault();

    if (!reason.trim()) {
      setMessage("Please enter a return reason.");
      return;
    }

    try {
      setSubmitting(true);
      setMessage("");

      const returnData = {
        orderId: Number(orderId),
        productId: Number(productId),
        reason: reason.trim(),
      };

      await apiRequest("/api/Return", {
        method: "POST",
        body: JSON.stringify(returnData),
      });

      setMessage(
        "Return request submitted successfully."
      );

      setTimeout(() => {
        navigate("/returns");
      }, 800);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading order...</h2>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={styles.center}>
        <h2>
          {message || "Order not found."}
        </h2>

        <Link to="/orders">
          ← Back to Orders
        </Link>
      </div>
    );
  }

  const items = order.orderItems || [];

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
              RETURN REQUEST
            </p>

            <h1>
              Order #{order.id}
            </h1>

            <p style={styles.subtitle}>
              Select a product and provide a reason
              for the return.
            </p>
          </div>
        </div>

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}

        {items.length === 0 ? (
          <div style={styles.empty}>
            <h2>No products found</h2>

            <Link to="/orders">
              Back to Orders
            </Link>
          </div>
        ) : (
          <div style={styles.list}>
            {items.map((item) => (
              <div
                key={item.id}
                style={styles.card}
              >
                <div style={styles.productInfo}>

                  <div style={styles.imageBox}>
                    {item.product?.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        style={styles.image}
                      />
                    ) : (
                      <span style={styles.placeholder}>
                        🛍️
                      </span>
                    )}
                  </div>

                  <div>
                    <p style={styles.category}>
                      Product
                    </p>

                    <h2>
                      {item.product?.name ||
                        `Product #${item.productId}`}
                    </h2>

                    <p style={styles.muted}>
                      Quantity: {item.quantity}
                    </p>

                    <p style={styles.muted}>
                      Unit Price: ₹
                      {Number(
                        item.unitPrice || 0
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>

                </div>

                <form
                  onSubmit={(e) =>
                    submitReturn(
                      e,
                      item.productId
                    )
                  }
                >
                  <label style={styles.labelText}>
                    Return Reason
                  </label>

                  <textarea
                    value={reason}
                    onChange={(e) =>
                      setReason(e.target.value)
                    }
                    placeholder="Example: Damaged product, wrong item, product not as expected..."
                    rows="4"
                    required
                    style={styles.textarea}
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      ...styles.returnButton,
                      opacity: submitting ? 0.7 : 1,
                    }}
                  >
                    {submitting
                      ? "Submitting..."
                      : "↩ Request Return"}
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: "1000px",
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
  },

  label: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1.5px",
  },

  subtitle: {
    color: "#64748b",
    lineHeight: "1.5",
  },

  message: {
    padding: "14px",
    marginBottom: "20px",
    background: "#eff6ff",
    color: "#1e40af",
    borderRadius: "10px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow:
      "0 8px 25px rgba(15,23,42,0.06)",
  },

  productInfo: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    marginBottom: "20px",
  },

  imageBox: {
    width: "110px",
    height: "110px",
    borderRadius: "12px",
    background: "#f1f5f9",
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
    fontSize: "40px",
  },

  category: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "700",
  },

  muted: {
    color: "#64748b",
    margin: "5px 0",
  },

  labelText: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "700",
    color: "#334155",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "9px",
    fontSize: "14px",
    resize: "vertical",
  },

  returnButton: {
    marginTop: "15px",
    padding: "12px 18px",
    border: "none",
    borderRadius: "8px",
    background: "#dc2626",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },

  empty: {
    background: "#fff",
    padding: "60px",
    textAlign: "center",
    borderRadius: "16px",
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

export default ReturnRequest;