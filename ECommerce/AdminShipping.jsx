import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../services/api";

function AdminShipping() {
  const [shipping, setShipping] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    orderId: "",
    courierName: "",
    trackingNumber: "",
  });

  useEffect(() => {
    loadShipping();
    loadOrders();
  }, []);

  // ==========================================
  // GET ALL SHIPPING
  // ==========================================
  async function loadShipping() {
    try {
      setLoading(true);

      const data = await apiRequest("/api/Shipping");

      setShipping(data);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // GET ORDERS
  // ==========================================
  async function loadOrders() {
    try {
      const data = await apiRequest("/api/Order");

      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  }

  // ==========================================
  // HANDLE FORM
  // ==========================================
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  // ==========================================
  // CREATE SHIPPING
  // ==========================================
  async function createShipping(e) {
    e.preventDefault();

    setMessage("");

    try {
      const shippingData = {
        orderId: Number(form.orderId),
        courierName: form.courierName.trim(),
        trackingNumber:
          form.trackingNumber.trim(),
      };

      await apiRequest("/api/Shipping", {
        method: "POST",
        body: JSON.stringify(shippingData),
      });

      setMessage(
        "Shipping record created successfully."
      );

      setForm({
        orderId: "",
        courierName: "",
        trackingNumber: "",
      });

      setShowForm(false);

      await loadShipping();
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  }

  // ==========================================
  // UPDATE SHIPPING STATUS
  // ==========================================
  async function updateStatus(item, status) {
    try {
      let shippedDate = item.shippedDate;
      let deliveredDate = item.deliveredDate;

      if (
        status === "Shipped" &&
        !shippedDate
      ) {
        shippedDate =
          new Date().toISOString();
      }

      if (
        status === "Delivered" &&
        !shippedDate
      ) {
        shippedDate =
          new Date().toISOString();
      }

      if (
        status === "Delivered" &&
        !deliveredDate
      ) {
        deliveredDate =
          new Date().toISOString();
      }

      const updatedShipping = {
        orderId: item.orderId,
        courierName: item.courierName,
        trackingNumber: item.trackingNumber,
        status: status,
        shippedDate: shippedDate,
        deliveredDate: deliveredDate,
      };

      const data = await apiRequest(
        `/api/Shipping/${item.id}`,
        {
          method: "PUT",
          body: JSON.stringify(
            updatedShipping
          ),
        }
      );

      setShipping((current) =>
        current.map((shippingItem) =>
          shippingItem.id === item.id
            ? data
            : shippingItem
        )
      );

      setMessage(
        `Shipping #${item.id} updated successfully.`
      );
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  }

  // ==========================================
  // DELETE SHIPPING
  // ==========================================
  async function deleteShipping(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this shipping record?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await apiRequest(
        `/api/Shipping/${id}`,
        {
          method: "DELETE",
        }
      );

      setShipping((current) =>
        current.filter(
          (item) => item.id !== id
        )
      );

      setMessage(
        "Shipping record deleted successfully."
      );
    } catch (error) {
      console.error(error);
      setMessage(error.message);
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
        <h2>Loading shipping...</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* ================= HEADER ================= */}

        <div style={styles.header}>

          <div>
            <p style={styles.label}>
              ADMIN PANEL
            </p>

            <h1 style={styles.title}>
              Shipping Management
            </h1>

            <p style={styles.subtitle}>
              Manage courier and delivery information.
            </p>
          </div>

          <div style={styles.headerActions}>

            <Link
              to="/admin"
              style={styles.backButton}
            >
              ← Dashboard
            </Link>

            <button
              onClick={() =>
                setShowForm(!showForm)
              }
              style={styles.addButton}
            >
              {showForm
                ? "Close"
                : "+ Create Shipping"}
            </button>

          </div>
        </div>


        {/* ================= MESSAGE ================= */}

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}


        {/* ================= CREATE FORM ================= */}

        {showForm && (
          <div style={styles.formCard}>

            <h2>Create Shipping Record</h2>

            <form onSubmit={createShipping}>

              <div style={styles.formGrid}>

                {/* ORDER */}

                <div>
                  <label style={styles.fieldLabel}>
                    Order
                  </label>

                  <select
                    name="orderId"
                    value={form.orderId}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  >
                    <option value="">
                      Select Order
                    </option>

                    {orders.map((order) => (
                      <option
                        key={order.id}
                        value={order.id}
                      >
                        Order #{order.id}
                      </option>
                    ))}

                  </select>
                </div>


                {/* COURIER */}

                <div>
                  <label style={styles.fieldLabel}>
                    Courier Name
                  </label>

                  <input
                    type="text"
                    name="courierName"
                    value={form.courierName}
                    onChange={handleChange}
                    placeholder="e.g. BlueDart"
                    required
                    style={styles.input}
                  />
                </div>


                {/* TRACKING */}

                <div>
                  <label style={styles.fieldLabel}>
                    Tracking Number
                  </label>

                  <input
                    type="text"
                    name="trackingNumber"
                    value={
                      form.trackingNumber
                    }
                    onChange={handleChange}
                    placeholder="Enter tracking number"
                    style={styles.input}
                  />
                </div>

              </div>

              <button
                type="submit"
                style={styles.saveButton}
              >
                Create Shipping
              </button>

            </form>
          </div>
        )}


        {/* ================= SUMMARY ================= */}

        <div style={styles.summaryGrid}>

          <div style={styles.summaryCard}>
            <span>Total</span>
            <strong>{shipping.length}</strong>
          </div>

          <div style={styles.summaryCard}>
            <span>Pending</span>
            <strong>
              {
                shipping.filter(
                  (item) =>
                    item.status?.toLowerCase() ===
                    "pending"
                ).length
              }
            </strong>
          </div>

          <div style={styles.summaryCard}>
            <span>Shipped</span>
            <strong>
              {
                shipping.filter(
                  (item) =>
                    item.status?.toLowerCase() ===
                    "shipped"
                ).length
              }
            </strong>
          </div>

          <div style={styles.summaryCard}>
            <span>Delivered</span>
            <strong>
              {
                shipping.filter(
                  (item) =>
                    item.status?.toLowerCase() ===
                    "delivered"
                ).length
              }
            </strong>
          </div>

        </div>


        {/* ================= SHIPPING LIST ================= */}

        <div style={styles.card}>

          {shipping.length === 0 ? (
            <div style={styles.empty}>

              <div style={styles.emptyIcon}>
                🚚
              </div>

              <h3>
                No shipping records found
              </h3>

              <p>
                Create a shipping record for an order.
              </p>

            </div>
          ) : (

            <div style={styles.list}>

              {shipping.map((item) => (

                <div
                  key={item.id}
                  style={styles.shippingCard}
                >

                  {/* TOP */}

                  <div style={styles.topRow}>

                    <div>
                      <p
                        style={
                          styles.shippingId
                        }
                      >
                        SHIPPING #{item.id}
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
                      <span
                        style={styles.caption}
                      >
                        Courier
                      </span>

                      <strong>
                        {item.courierName ||
                          "Not assigned"}
                      </strong>
                    </div>


                    <div>
                      <span
                        style={styles.caption}
                      >
                        Tracking Number
                      </span>

                      <strong>
                        {item.trackingNumber ||
                          "Not available"}
                      </strong>
                    </div>


                    <div>
                      <span
                        style={styles.caption}
                      >
                        Shipped Date
                      </span>

                      <strong>
                        {item.shippedDate
                          ? new Date(
                              item.shippedDate
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "Not shipped"}
                      </strong>
                    </div>


                    <div>
                      <span
                        style={styles.caption}
                      >
                        Delivered Date
                      </span>

                      <strong>
                        {item.deliveredDate
                          ? new Date(
                              item.deliveredDate
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "Not delivered"}
                      </strong>
                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div style={styles.actions}>

                    <select
                      value={item.status}
                      onChange={(e) =>
                        updateStatus(
                          item,
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
                    </select>


                    <button
                      onClick={() =>
                        deleteShipping(
                          item.id
                        )
                      }
                      style={
                        styles.deleteButton
                      }
                    >
                      🗑 Delete
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

  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  label: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1.5px",
  },

  title: {
    margin: "7px 0",
    fontSize: "34px",
  },

  subtitle: {
    color: "#64748b",
    margin: 0,
  },

  backButton: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "700",
  },

  addButton: {
    padding: "11px 17px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },

  message: {
    padding: "14px 18px",
    background: "#eff6ff",
    color: "#1e40af",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  formCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    marginBottom: "25px",
    boxShadow:
      "0 8px 25px rgba(15, 23, 42, 0.06)",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "18px",
    marginTop: "20px",
  },

  fieldLabel: {
    display: "block",
    marginBottom: "7px",
    fontWeight: "700",
    color: "#334155",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "12px",
    border:
      "1px solid #d1d5db",
    borderRadius: "9px",
    fontSize: "14px",
    background: "#fff",
  },

  saveButton: {
    marginTop: "20px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#16a34a",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
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

  shippingCard: {
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

  shippingId: {
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
      "repeat(auto-fit, minmax(200px, 1fr))",
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

  actions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "20px",
    flexWrap: "wrap",
  },

  select: {
    padding: "10px 12px",
    border:
      "1px solid #cbd5e1",
    borderRadius: "8px",
    background: "#fff",
  },

  deleteButton: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
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

export default AdminShipping;