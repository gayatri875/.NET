import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userName = localStorage.getItem("userName") || "Customer";
  const role = localStorage.getItem("userRole");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("customerId");
    navigate("/login");
  }

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <div onClick={toggleSidebar} style={styles.hamburger} className="hamburger">
            <span style={styles.hamburgerLine}></span>
            <span style={styles.hamburgerLine}></span>
            <span style={styles.hamburgerLine}></span>
          </div>

          <Link to="/home" style={styles.logo}>
            <span style={styles.logoIcon}>🛒</span>
            <span style={styles.logoText}>ShopVerse</span>
          </Link>

          <div style={styles.rightActions}>
            <Link to="/cart" style={styles.cartLink} className="cart-link">
              🛒
              <span style={styles.cartText}>Cart</span>
              <span style={styles.cartBadge}>3</span>
            </Link>

            <div style={styles.userDropdown}>
              <div style={styles.userBox} className="user-box">
                <div style={styles.avatar}>
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span style={styles.userName}>{userName}</span>
                <span style={styles.dropdownArrow}>▼</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className="sidebar"
        style={{
          ...styles.sidebar,
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div style={styles.sidebarUser}>
          <div style={styles.sidebarAvatar}>
            {userName.charAt(0).toUpperCase()}
          </div>
          <div style={styles.sidebarUserInfo}>
            <h3 style={styles.sidebarUserName}>{userName}</h3>
            <p style={styles.sidebarUserRole}>
              {role === "Admin" ? "👑 Administrator" : "👤 Customer"}
            </p>
          </div>
        </div>

        <div style={styles.sidebarLinks}>
          <Link
            to="/home"
            className="sidebar-link"
            style={{
              ...styles.sidebarLink,
              ...(isActive("/home") ? styles.activeLink : {}),
            }}
          >
            <span style={styles.sidebarIcon}>🏠</span>
            <span>Home</span>
          </Link>

          <Link
            to="/products"
            className="sidebar-link"
            style={{
              ...styles.sidebarLink,
              ...(isActive("/products") ? styles.activeLink : {}),
            }}
          >
            <span style={styles.sidebarIcon}>📦</span>
            <span>Products</span>
          </Link>

          <Link
            to="/cart"
            className="sidebar-link"
            style={{
              ...styles.sidebarLink,
              ...(isActive("/cart") ? styles.activeLink : {}),
            }}
          >
            <span style={styles.sidebarIcon}>🛒</span>
            <span>Cart</span>
            <span style={styles.sidebarBadge}>3</span>
          </Link>

          <Link
            to="/orders"
            className="sidebar-link"
            style={{
              ...styles.sidebarLink,
              ...(isActive("/orders") ? styles.activeLink : {}),
            }}
          >
            <span style={styles.sidebarIcon}>📋</span>
            <span>Orders</span>
          </Link>

          <Link
            to="/returns"
            className="sidebar-link"
            style={{
              ...styles.sidebarLink,
              ...(isActive("/returns") ? styles.activeLink : {}),
            }}
          >
            <span style={styles.sidebarIcon}>↩️</span>
            <span>Returns</span>
          </Link>

          <Link
            to="/wishlist"
            className="sidebar-link"
            style={{
              ...styles.sidebarLink,
              ...(isActive("/wishlist") ? styles.activeLink : {}),
            }}
          >
            <span style={styles.sidebarIcon}>❤️</span>
            <span>Wishlist</span>
          </Link>

          <div style={styles.sidebarDivider} />

          {role === "Customer" && (
            <Link
              to="/profile"
              className="sidebar-link"
              style={{
                ...styles.sidebarLink,
                ...(isActive("/profile") ? styles.activeLink : {}),
              }}
            >
              <span style={styles.sidebarIcon}>👤</span>
              <span>My Profile</span>
            </Link>
          )}

          {role === "Admin" && (
            <>
              <Link to="/admin" className="sidebar-link" style={styles.sidebarLink}>
                <span style={styles.sidebarIcon}>⚙️</span>
                <span>Admin Panel</span>
              </Link>
              <Link to="/admin/orders" className="sidebar-link" style={styles.sidebarLink}>
                <span style={styles.sidebarIcon}>📊</span>
                <span>Manage Orders</span>
              </Link>
              <Link to="/admin/products" className="sidebar-link" style={styles.sidebarLink}>
                <span style={styles.sidebarIcon}>📦</span>
                <span>Manage Products</span>
              </Link>
              <Link to="/admin/customers" className="sidebar-link" style={styles.sidebarLink}>
                <span style={styles.sidebarIcon}>👥</span>
                <span>Manage Customers</span>
              </Link>
            </>
          )}

          <div style={styles.sidebarDivider} />

          <button onClick={logout} style={styles.sidebarLogout} className="sidebar-logout">
            <span style={styles.sidebarIcon}>🚪</span>
            <span>Logout</span>
          </button>
        </div>

        <div style={styles.sidebarFooter}>
          <p style={styles.sidebarVersion}>v2.0.0</p>
          <p style={styles.sidebarCopyright}>© 2026 ShopVerse</p>
        </div>
      </div>

      {/* Main Content Wrapper - actual pages render here via Outlet */}
      <div
        style={{
          ...styles.mainWrapper,
          marginLeft: isSidebarOpen ? "280px" : "0",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}

const styles = {
  // ===== NAVBAR =====
  navbar: {
    background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 40%, #ec4899 100%)",
    padding: "8px 0",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: "0 2px 16px rgba(124, 58, 237, 0.3)",
  },

  navContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
  },

  hamburger: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "6px",
    transition: "all 0.3s",
  },

  hamburgerLine: {
    width: "22px",
    height: "2.5px",
    background: "#fff",
    borderRadius: "2px",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#fff",
    gap: "6px",
    flexShrink: 0,
  },

  logoIcon: {
    fontSize: "22px",
  },

  logoText: {
    fontSize: "18px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
  },

  rightActions: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  cartLink: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    padding: "6px 10px",
    borderRadius: "6px",
    transition: "all 0.3s",
  },

  cartText: {
    fontSize: "13px",
  },

  cartBadge: {
    background: "#ff6b6b",
    color: "#fff",
    padding: "1px 7px",
    borderRadius: "50%",
    fontSize: "10px",
    fontWeight: "700",
    marginLeft: "2px",
  },

  userDropdown: {
    position: "relative",
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "6px",
    transition: "all 0.3s",
  },

  avatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "13px",
  },

  userName: {
    fontSize: "13px",
    fontWeight: "600",
  },

  dropdownArrow: {
    fontSize: "9px",
    marginLeft: "2px",
  },

  // ===== SIDEBAR =====
  sidebar: {
    width: "280px",
    background: "#ffffff",
    boxShadow: "4px 0 20px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "52px",
    left: 0,
    height: "calc(100vh - 52px)",
    overflowY: "auto",
    zIndex: 999,
  },

  sidebarUser: {
    padding: "20px 20px",
    background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)",
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  sidebarAvatar: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "700",
    border: "2px solid rgba(255,255,255,0.3)",
  },

  sidebarUserInfo: {
    color: "#fff",
  },

  sidebarUserName: {
    fontSize: "16px",
    fontWeight: "700",
    margin: 0,
  },

  sidebarUserRole: {
    fontSize: "12px",
    opacity: 0.85,
    margin: "2px 0 0 0",
  },

  sidebarLinks: {
    flex: 1,
    padding: "8px 0",
    overflowY: "auto",
  },

  sidebarLink: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 20px",
    color: "#4a4a4a",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.25s",
    position: "relative",
    cursor: "pointer",
  },

  activeLink: {
    background: "linear-gradient(90deg, #7c3aed15 0%, transparent 100%)",
    color: "#7c3aed",
    borderRight: "3px solid #7c3aed",
  },

  sidebarIcon: {
    fontSize: "18px",
    width: "26px",
    textAlign: "center",
  },

  sidebarBadge: {
    marginLeft: "auto",
    background: "linear-gradient(135deg, #7c3aed, #ec4899)",
    color: "#fff",
    padding: "1px 9px",
    borderRadius: "16px",
    fontSize: "10px",
    fontWeight: "700",
  },

  sidebarDivider: {
    height: "1px",
    background: "linear-gradient(to right, transparent, #e0e0e0, transparent)",
    margin: "6px 20px",
  },

  sidebarLogout: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 20px",
    color: "#dc3545",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    background: "none",
    border: "none",
    width: "100%",
    cursor: "pointer",
    transition: "all 0.25s",
  },

  sidebarFooter: {
    padding: "12px 20px",
    borderTop: "1px solid #f0f0f0",
    textAlign: "center",
  },

  sidebarVersion: {
    fontSize: "10px",
    color: "#adb5bd",
    margin: 0,
  },

  sidebarCopyright: {
    fontSize: "10px",
    color: "#adb5bd",
    margin: "2px 0 0 0",
  },

  // ===== OVERLAY =====
  overlay: {
    position: "fixed",
    top: "52px",
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.3)",
    zIndex: 998,
  },

  // ===== MAIN CONTENT =====
  mainWrapper: {
    marginTop: "52px",
    padding: "16px",
    background: "#f8f9fa",
    minHeight: "calc(100vh - 52px)",
    transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

// Inject hover styles once (module scope, runs on import only)
if (!document.getElementById("navbar-hover-styles")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "navbar-hover-styles";
  styleSheet.textContent = `
    .sidebar-link:hover {
      background: linear-gradient(90deg, #7c3aed10 0%, transparent 100%);
      color: #7c3aed;
    }

    .sidebar-logout:hover {
      background: #fff0f0;
    }

    .user-box:hover {
      background: rgba(255,255,255,0.15);
      border-radius: 8px;
    }

    .cart-link:hover {
      background: rgba(255,255,255,0.12);
      border-radius: 6px;
    }

    .hamburger:hover {
      background: rgba(255,255,255,0.12);
      border-radius: 6px;
    }

    .sidebar::-webkit-scrollbar {
      width: 3px;
    }

    .sidebar::-webkit-scrollbar-track {
      background: transparent;
    }

    .sidebar::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #7c3aed, #ec4899);
      border-radius: 3px;
    }

    @media (max-width: 768px) {
      .sidebar-overlay {
        display: block;
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Navbar;