import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  useEffect(() => {
    loadUsers();
  }, []);

  // ==========================================
  // GET USERS
  // ==========================================
  async function loadUsers() {
    try {
      setLoading(true);

      const data = await apiRequest("/api/User");

      setUsers(data);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // DELETE USER
  // ==========================================
  async function deleteUser(user) {
    if (user.role === "Admin") {
      setMessage("Admin user cannot be deleted.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await apiRequest(`/api/User/${user.id}`, {
        method: "DELETE",
      });

      setUsers((current) =>
        current.filter(
          (item) => item.id !== user.id
        )
      );

      setMessage(
        `${user.name} deleted successfully.`
      );
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  }

  // ==========================================
  // FILTER USERS
  // ==========================================
  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase().trim();

    const matchesSearch =
      user.name?.toLowerCase().includes(keyword) ||
      user.email?.toLowerCase().includes(keyword);

    const matchesRole =
      roleFilter === "All" ||
      user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const customerCount = users.filter(
    (user) => user.role === "Customer"
  ).length;

  const adminCount = users.filter(
    (user) => user.role === "Admin"
  ).length;

  const activeCount = users.filter(
    (user) => user.isActive
  ).length;

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading users...</h2>
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

            <h1 style={styles.title}>
              User Management
            </h1>

            <p style={styles.subtitle}>
              View and manage registered users.
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

        {/* SUMMARY */}
        <div style={styles.summaryGrid}>

          <SummaryCard
            icon="👥"
            title="Total Users"
            value={users.length}
          />

          <SummaryCard
            icon="🛍️"
            title="Customers"
            value={customerCount}
          />

          <SummaryCard
            icon="🛡️"
            title="Admins"
            value={adminCount}
          />

          <SummaryCard
            icon="✅"
            title="Active"
            value={activeCount}
          />

        </div>

        {/* FILTER */}
        <div style={styles.filterCard}>

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={styles.searchInput}
          />

          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value)
            }
            style={styles.select}
          >
            <option value="All">
              All Roles
            </option>

            <option value="Customer">
              Customer
            </option>

            <option value="Admin">
              Admin
            </option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setRoleFilter("All");
            }}
            style={styles.clearButton}
          >
            Clear
          </button>

        </div>

        {/* USERS */}
        <div style={styles.card}>

          <div style={styles.cardHeader}>
            <div>
              <h2>Registered Users</h2>
              <p style={styles.smallText}>
                {filteredUsers.length} user
                {filteredUsers.length !== 1
                  ? "s"
                  : ""} found
              </p>
            </div>

            <span style={styles.countBadge}>
              {filteredUsers.length}
            </span>
          </div>

          {filteredUsers.length === 0 ? (
            <div style={styles.empty}>
              <div style={styles.emptyIcon}>
                👤
              </div>

              <h3>No users found</h3>

              <p>
                Try another search or filter.
              </p>
            </div>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>

                <thead>
                  <tr>
                    <th style={styles.th}>
                      ID
                    </th>

                    <th style={styles.th}>
                      User
                    </th>

                    <th style={styles.th}>
                      Email
                    </th>

                    <th style={styles.th}>
                      Role
                    </th>

                    <th style={styles.th}>
                      Status
                    </th>

                    <th style={styles.th}>
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>

                      <td style={styles.td}>
                        #{user.id}
                      </td>

                      <td style={styles.td}>
                        <div style={styles.userCell}>
                          <div
                            style={
                              styles.avatar
                            }
                          >
                            {user.name
                              ?.charAt(0)
                              ?.toUpperCase() ||
                              "U"}
                          </div>

                          <strong>
                            {user.name}
                          </strong>
                        </div>
                      </td>

                      <td style={styles.td}>
                        {user.email}
                      </td>

                      <td style={styles.td}>
                        <span
                          style={
                            user.role ===
                            "Admin"
                              ? styles.adminBadge
                              : styles.customerBadge
                          }
                        >
                          {user.role}
                        </span>
                      </td>

                      <td style={styles.td}>
                        <span
                          style={
                            user.isActive
                              ? styles.activeBadge
                              : styles.inactiveBadge
                          }
                        >
                          {user.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      <td style={styles.td}>
                        <button
                          onClick={() =>
                            deleteUser(user)
                          }
                          disabled={
                            user.role === "Admin"
                          }
                          style={{
                            ...styles.deleteButton,
                            opacity:
                              user.role === "Admin"
                                ? 0.5
                                : 1,
                            cursor:
                              user.role === "Admin"
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          🗑 Delete
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}


// ==========================================
// SUMMARY CARD
// ==========================================
function SummaryCard({
  icon,
  title,
  value,
}) {
  return (
    <div style={styles.summaryCard}>

      <div style={styles.summaryIcon}>
        {icon}
      </div>

      <div>
        <p style={styles.summaryTitle}>
          {title}
        </p>

        <strong style={styles.summaryValue}>
          {value}
        </strong>
      </div>

    </div>
  );
}


// ==========================================
// STYLES
// ==========================================
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
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    boxShadow:
      "0 6px 20px rgba(15, 23, 42, 0.05)",
  },

  summaryIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "#eff6ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
  },

  summaryTitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "13px",
  },

  summaryValue: {
    display: "block",
    marginTop: "5px",
    fontSize: "22px",
  },

  filterCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "14px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "20px",
    boxShadow:
      "0 6px 20px rgba(15, 23, 42, 0.05)",
  },

  searchInput: {
    flex: 1,
    minWidth: "250px",
    padding: "11px 12px",
    border:
      "1px solid #d1d5db",
    borderRadius: "8px",
  },

  select: {
    padding: "11px 12px",
    border:
      "1px solid #d1d5db",
    borderRadius: "8px",
    background: "#fff",
  },

  clearButton: {
    padding: "11px 15px",
    border:
      "1px solid #cbd5e1",
    borderRadius: "8px",
    background: "#fff",
    color: "#334155",
    fontWeight: "700",
    cursor: "pointer",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow:
      "0 8px 25px rgba(15, 23, 42, 0.06)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "18px",
    borderBottom:
      "1px solid #e5e7eb",
  },

  smallText: {
    color: "#64748b",
    margin: "5px 0 0",
  },

  countBadge: {
    background: "#dbeafe",
    color: "#1e40af",
    padding: "7px 13px",
    borderRadius: "20px",
    fontWeight: "700",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "12px",
  },

  th: {
    textAlign: "left",
    padding: "14px 12px",
    background: "#f8fafc",
    color: "#475569",
    fontSize: "14px",
  },

  td: {
    padding: "14px 12px",
    borderBottom:
      "1px solid #e5e7eb",
    color: "#334155",
  },

  userCell: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "#dbeafe",
    color: "#1e40af",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
  },

  adminBadge: {
    padding: "6px 10px",
    borderRadius: "20px",
    background: "#fef3c7",
    color: "#92400e",
    fontSize: "12px",
    fontWeight: "700",
  },

  customerBadge: {
    padding: "6px 10px",
    borderRadius: "20px",
    background: "#dbeafe",
    color: "#1e40af",
    fontSize: "12px",
    fontWeight: "700",
  },

  activeBadge: {
    padding: "6px 10px",
    borderRadius: "20px",
    background: "#dcfce7",
    color: "#166534",
    fontSize: "12px",
    fontWeight: "700",
  },

  inactiveBadge: {
    padding: "6px 10px",
    borderRadius: "20px",
    background: "#fee2e2",
    color: "#991b1b",
    fontSize: "12px",
    fontWeight: "700",
  },

  deleteButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "7px",
    background: "#dc2626",
    color: "#fff",
    fontWeight: "700",
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

export default AdminUsers;