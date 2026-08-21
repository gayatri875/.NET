import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../services/api";

function AdminReturns() {
  const [returns, setReturns] = useState([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadReturns();
  }, []);

  // ==========================================
  // GET ALL RETURNS
  // ==========================================
  async function loadReturns() {
    try {
      setLoading(true);

      const data = await apiRequest("/api/Return");

      setReturns(data);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // UPDATE RETURN STATUS
  // ==========================================
  async function updateStatus(returnItem, status) {
    try {
      const updatedReturn = {
        orderId: returnItem.orderId,
        productId: returnItem.productId,
        reason: returnItem.reason || "",
        status: status,
      };

      const data = await apiRequest(
        `/api/Return/${returnItem.id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedReturn),
        }
      );

      setReturns((current) =>
        current.map((item) =>
          item.id === returnItem.id
            ? {
                ...item,
                ...data,
                status: data?.status || status,
              }
            : item
        )
      );

      setMessage(
        `Return #${returnItem.id} updated successfully.`
      );
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  }

  // ==========================================
  // DELETE RETURN
  // ==========================================
  async function deleteReturn(id) {
    const confirmed = window.confirm(
      `Are you sure you want to delete Return #${id}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await apiRequest(
        `/api/Return/${id}`,
        {
          method: "DELETE",
        }
      );

      setReturns((current) =>
        current.filter(
          (item) => item.id !== id
        )
      );

      setMessage(
        "Return request deleted successfully."
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

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading return requests...</h2>
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
              Return Management
            </h1>

            <p style={styles.subtitle}>
              Review and manage customer return requests.
            </p>
          </div>

          <Link
            to="/admin"
            style={styles.backButton}
          >
            ← Dashboard
          </Link>

        </div>


        {/* ================= MESSAGE ================= */}

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}


        {/* ================= SUMMARY ================= */}

        <div style={styles.summaryGrid}>

          <div style={styles.summaryCard}>
            <span>Total Returns</span>

            <strong>
              {returns.length}
            </strong>
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


        {/* ================= RETURN LIST ================= */}

        <div style={styles.card}>

          {returns.length === 0 ? (

            <div style={styles.empty}>

              <div style={styles.emptyIcon}>
                ↩️
              </div>

              <h3>
                No return requests found
              </h3>

              <p>
                Customer return requests will appear here.
              </p>

            </div>

          ) : (

            <div style={styles.list}>

              {returns.map((item) => (

                <div
                  key={item.id}
                  style={styles.returnCard}
                >

                  {/* TOP */}

                  <div style={styles.topRow}>

                    <div>
                      <p style={styles.returnId}>
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
                        Requested Date
                      </span>

                      <strong>
                        {item.requestedDate
                          ? new Date(
                              item.requestedDate
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "N/A"}
                      </strong>
                    </div>


                    <div>
                      <span style={styles.caption}>
                        Approved Date
                      </span>

                      <strong>
                        {item.approvedDate
                          ? new Date(
                              item.approvedDate
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "Pending"}
                      </strong>
                    </div>


                    <div>
                      <span style={styles.caption}>
                        Completed Date
                      </span>

                      <strong>
                        {item.completedDate
                          ? new Date(
                              item.completedDate
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "Pending"}
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

                      <option value="Requested">
                        Requested
                      </option>

                      <option value="Approved">
                        Approved
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                      <option value="Rejected">
                        Rejected
                      </option>

                    </select>


                    <button
                      onClick={() =>
                        deleteReturn(item.id)
                      }
                      style={styles.deleteButton}
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

  returnCard: {
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

  returnId: {
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

export default AdminReturns;