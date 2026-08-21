import { Link } from "react-router-dom";

function AdminDashboard() {
  const name =
    localStorage.getItem("userName") || "Administrator";

  return (
    <div style={styles.page}>

      <div style={styles.container}>

        {/* ================= HEADER ================= */}

        <div style={styles.header}>

          <div>
            <p style={styles.label}>
              ADMINISTRATION
            </p>

            <h1 style={styles.title}>
              Admin Dashboard
            </h1>

            <p style={styles.subtitle}>
              Welcome back, {name}. Manage your
              E-Commerce platform from here.
            </p>
          </div>

          <div style={styles.adminBadge}>
            🛡️ Admin
          </div>

        </div>


        {/* ================= STATS ================= */}

        <div style={styles.statsGrid}>

          <StatCard
            icon="👥"
            title="Users"
            value="Manage"
          />

          <StatCard
            icon="📦"
            title="Products"
            value="Manage"
          />

          <StatCard
            icon="🛒"
            title="Orders"
            value="Manage"
          />

          <StatCard
            icon="↩️"
            title="Returns"
            value="Manage"
          />

        </div>


        {/* ================= MANAGEMENT ================= */}

        <div style={styles.sectionHeader}>
          <div>
            <h2>Management</h2>
            <p>
              Choose a section to manage your store.
            </p>
          </div>
        </div>


        <div style={styles.cardGrid}>

          <AdminCard
            icon="👥"
            title="Users"
            description="View and manage registered users."
            link="/admin/users"
            button="Manage Users"
            iconBackground="#dbeafe"
          />

          <AdminCard
            icon="📦"
            title="Products"
            description="Add, update and remove products."
            link="/admin/products"
            button="Manage Products"
            iconBackground="#dcfce7"
          />

          <AdminCard
            icon="🏷️"
            title="Categories"
            description="Create and manage product categories."
            link="/admin/categories"
            button="Manage Categories"
            iconBackground="#fef3c7"
          />

          <AdminCard
            icon="🛒"
            title="Orders"
            description="View orders and update order status."
            link="/admin/orders"
            button="Manage Orders"
            iconBackground="#ede9fe"
          />

          <AdminCard
            icon="🚚"
            title="Shipping"
            description="Manage courier and delivery status."
            link="/admin/shipping"
            button="Manage Shipping"
            iconBackground="#cffafe"
          />

          <AdminCard
            icon="↩️"
            title="Returns"
            description="Review and process customer returns."
            link="/admin/returns"
            button="Manage Returns"
            iconBackground="#fee2e2"
          />

        </div>


        {/* ================= QUICK ACTIONS ================= */}

        <div style={styles.quickCard}>

          <div>
            <h2>Quick Actions</h2>

            <p>
              Frequently used admin operations.
            </p>
          </div>

          <div style={styles.quickActions}>

            <Link
              to="/admin/products"
              style={styles.primaryButton}
            >
              + Add Product
            </Link>

            <Link
              to="/admin/categories"
              style={styles.secondaryButton}
            >
              + Add Category
            </Link>

            <Link
              to="/admin/orders"
              style={styles.secondaryButton}
            >
              View Orders
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}


/* =========================================
   STAT CARD
========================================= */

function StatCard({
  icon,
  title,
  value,
}) {
  return (
    <div style={styles.statCard}>

      <div style={styles.statIcon}>
        {icon}
      </div>

      <div>
        <p style={styles.statTitle}>
          {title}
        </p>

        <strong style={styles.statValue}>
          {value}
        </strong>
      </div>

    </div>
  );
}


/* =========================================
   ADMIN CARD
========================================= */

function AdminCard({
  icon,
  title,
  description,
  link,
  button,
  iconBackground,
}) {
  return (
    <div style={styles.card}>

      <div
        style={{
          ...styles.cardIcon,
          background: iconBackground,
        }}
      >
        {icon}
      </div>

      <h2 style={styles.cardTitle}>
        {title}
      </h2>

      <p style={styles.cardDescription}>
        {description}
      </p>

      <Link
        to={link}
        style={styles.cardButton}
      >
        {button}
        <span>→</span>
      </Link>

    </div>
  );
}


/* =========================================
   STYLES
========================================= */

const styles = {

  page: {
    minHeight: "calc(100vh - 65px)",
    background:
      "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
    padding: "45px 25px",
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
    marginBottom: "35px",
  },

  label: {
    margin: 0,
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1.5px",
  },

  title: {
    margin: "8px 0",
    fontSize: "38px",
  },

  subtitle: {
    margin: 0,
    color: "#64748b",
    lineHeight: 1.5,
  },

  adminBadge: {
    padding: "11px 18px",
    borderRadius: "25px",
    background: "#fef3c7",
    color: "#92400e",
    fontWeight: "800",
    whiteSpace: "nowrap",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",
    gap: "18px",
    marginBottom: "45px",
  },

  statCard: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow:
      "0 7px 25px rgba(15, 23, 42, 0.06)",
  },

  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "#eff6ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
  },

  statTitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "13px",
  },

  statValue: {
    display: "block",
    marginTop: "5px",
    fontSize: "16px",
  },

  sectionHeader: {
    marginBottom: "20px",
  },

  sectionHeaderH2: {
    marginBottom: "5px",
  },

  sectionHeaderP: {
    color: "#64748b",
    margin: 0,
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "22px",
  },

  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow:
      "0 8px 25px rgba(15, 23, 42, 0.06)",
    border:
      "1px solid rgba(226, 232, 240, 0.8)",
  },

  cardIcon: {
    width: "58px",
    height: "58px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    marginBottom: "18px",
  },

  cardTitle: {
    margin: "0 0 8px",
    fontSize: "20px",
  },

  cardDescription: {
    color: "#64748b",
    lineHeight: 1.5,
    minHeight: "48px",
    margin: 0,
  },

  cardButton: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "11px 14px",
    background: "#2563eb",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "700",
  },

  quickCard: {
    marginTop: "30px",
    padding: "25px",
    borderRadius: "16px",
    background: "#0f172a",
    color: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "25px",
  },

  quickActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  primaryButton: {
    padding: "11px 16px",
    background: "#2563eb",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "700",
  },

  secondaryButton: {
    padding: "11px 16px",
    background: "#ffffff",
    color: "#0f172a",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "700",
  },
};

export default AdminDashboard;