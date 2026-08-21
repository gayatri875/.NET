import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  // Check for remembered email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");
    setLoading(true);

    // Clear previous session data
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("customerId");

    try {
      // =========================================
      // STEP 1: LOGIN
      // =========================================
      const data = await apiRequest(
        "/api/Auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      console.log("LOGIN RESPONSE:", data);

      // =========================================
      // STEP 2: CHECK TOKEN
      // =========================================
      if (!data?.token) {
        throw new Error("Invalid login response. Please try again.");
      }

      // =========================================
      // STEP 3: SAVE LOGIN DATA
      // =========================================
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", String(data.userId));
      localStorage.setItem("userName", data.name || "");
      localStorage.setItem("userEmail", data.email || email);
      localStorage.setItem("userRole", data.role || "");

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("rememberedEmail");
      }

      console.log("LOGIN DATA SAVED:", {
        userId: data.userId,
        role: data.role,
      });

      // =========================================
      // ADMIN
      // =========================================
      if (data.role === "Admin") {
        setMessageType("success");
        setMessage("Welcome back, Admin! Redirecting to dashboard...");

        setTimeout(() => {
          navigate("/admin");
        }, 500);

        return;
      }

      // =========================================
      // CUSTOMER
      // =========================================
      if (data.role === "Customer") {
        try {
          const customer = await apiRequest("/api/Customer/me");

          console.log("CUSTOMER PROFILE:", customer);

          if (customer?.id) {
            localStorage.setItem("customerId", String(customer.id));
            console.log("CUSTOMER ID SAVED:", customer.id);
          }

          setMessageType("success");
          setMessage(`Welcome back, ${data.name || "Customer"}!`);
        } catch (customerError) {
          console.log("Customer profile not created yet.");
          localStorage.removeItem("customerId");
          setMessageType("info");
          setMessage("Login successful! Please complete your profile.");
        }

        setTimeout(() => {
          navigate("/home");
        }, 600);

        return;
      }

      // =========================================
      // OTHER ROLE
      // =========================================
      setMessageType("success");
      setMessage("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/home");
      }, 500);

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      // Clear authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      localStorage.removeItem("customerId");

      setMessageType("error");
      setMessage(error.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      {/* LEFT PANEL */}
      <div style={styles.leftPanel}>

        {/* Decorative Elements */}
        <div style={styles.decorCircle1}></div>
        <div style={styles.decorCircle2}></div>
        <div style={styles.decorCircle3}></div>

        <div style={styles.brand}>

          <Link to="/" style={styles.logoLink}>
            <div style={styles.logo}>
              <span style={styles.logoIcon}>🛒</span>
            </div>
          </Link>

          <h1 style={styles.brandName}>ShopVerse</h1>

          <p style={styles.brandTagline}>
            Your premium destination for quality products, 
            seamless shopping, and exceptional service.
          </p>

        </div>

        <div style={styles.features}>

          <div style={styles.feature}>
            <span style={styles.featureIcon}>🛍️</span>
            <div>
              <strong style={styles.featureTitle}>Curated Collections</strong>
              <p style={styles.featureDesc}>
                Discover handpicked products from premium brands.
              </p>
            </div>
          </div>

          <div style={styles.feature}>
            <span style={styles.featureIcon}>🚚</span>
            <div>
              <strong style={styles.featureTitle}>Lightning Delivery</strong>
              <p style={styles.featureDesc}>
                Real-time tracking with express shipping options.
              </p>
            </div>
          </div>

          <div style={styles.feature}>
            <span style={styles.featureIcon}>🔒</span>
            <div>
              <strong style={styles.featureTitle}>Bank-Grade Security</strong>
              <p style={styles.featureDesc}>
                Your data and transactions are always protected.
              </p>
            </div>
          </div>

          <div style={styles.feature}>
            <span style={styles.featureIcon}>💎</span>
            <div>
              <strong style={styles.featureTitle}>Premium Support</strong>
              <p style={styles.featureDesc}>
                24/7 dedicated team ready to assist you.
              </p>
            </div>
          </div>

        </div>

        <div style={styles.testimonial}>
          <p style={styles.testimonialText}>
            "ShopVerse transformed my online shopping experience. 
            The platform is intuitive, fast, and incredibly reliable."
          </p>
          <div style={styles.testimonialAuthor}>
            <span style={styles.authorAvatar}>👩</span>
            <div>
              <strong style={styles.authorName}>Sarah Johnson</strong>
              <p style={styles.authorRole}>Verified Customer</p>
            </div>
          </div>
        </div>

      </div>


      {/* RIGHT PANEL */}
      <div style={styles.rightPanel}>

        <div style={styles.loginCard}>

          <div style={styles.cardHeader}>
            <span style={styles.welcome}>WELCOME BACK</span>
            <h2 style={styles.cardTitle}>Sign in to your account</h2>
            <p style={styles.subtitle}>
              Enter your credentials to access your dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} style={styles.form}>

            {/* EMAIL */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Email Address
              </label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>📧</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Password
              </label>
              <div style={styles.passwordWrapper}>
                <span style={styles.inputIcon}>🔐</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.passwordInput}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* REMEMBER ME */}
            <div style={styles.rememberWrapper}>
              <label style={styles.rememberLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={styles.checkbox}
                />
                <span style={styles.rememberText}>Remember me</span>
              </label>
              <Link to="/forgot-password" style={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.loginButton,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <span style={styles.loadingText}>
                  <span style={styles.spinner}>⟳</span> Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

          </form>

          {/* MESSAGE */}
          {message && (
            <div
              style={{
                ...styles.message,
                ...(messageType === "success" && styles.successMessage),
                ...(messageType === "error" && styles.errorMessage),
                ...(messageType === "info" && styles.infoMessage),
              }}
            >
              <span style={styles.messageIcon}>
                {messageType === "success" && "✓"}
                {messageType === "error" && "✕"}
                {messageType === "info" && "ℹ"}
              </span>
              {message}
            </div>
          )}

          <div style={styles.divider}>
            <span style={styles.dividerLine}></span>
            <span style={styles.dividerText}>or continue with</span>
            <span style={styles.dividerLine}></span>
          </div>

          <div style={styles.socialButtons}>
            <button style={styles.socialButton}>
              <span style={styles.socialIcon}>G</span>
              <span>Google</span>
            </button>
            <button style={styles.socialButton}>
              <span style={styles.socialIcon}>f</span>
              <span>Facebook</span>
            </button>
          </div>

          <p style={styles.registerText}>
            Don't have an account?{" "}
            <Link to="/register" style={styles.registerLink}>
              Create one now
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    background: "#f8fafc",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    overflow: "hidden",
  },

  // LEFT PANEL
  leftPanel: {
    flex: 1,
    minHeight: "100vh",
    padding: "60px 50px",
    background: "linear-gradient(145deg, #1e3a8a, #1d4ed8, #2563eb)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },

  decorCircle1: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.05)",
    top: "-100px",
    right: "-100px",
  },

  decorCircle2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.03)",
    bottom: "-50px",
    left: "-50px",
  },

  decorCircle3: {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.04)",
    top: "50%",
    right: "10%",
    transform: "translateY(-50%)",
  },

  brand: {
    maxWidth: "500px",
    marginBottom: "40px",
    position: "relative",
    zIndex: 1,
  },

  logoLink: {
    textDecoration: "none",
    display: "inline-block",
  },

  logo: {
    width: "70px",
    height: "70px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    border: "1px solid rgba(255,255,255,0.15)",
    transition: "transform 0.3s ease",
  },

  logoIcon: {
    fontSize: "34px",
  },

  brandName: {
    fontSize: "38px",
    fontWeight: "800",
    margin: "0 0 12px 0",
    letterSpacing: "-0.5px",
    background: "linear-gradient(135deg, #ffffff, #dbeafe)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  brandTagline: {
    fontSize: "16px",
    opacity: "0.9",
    lineHeight: "1.7",
    margin: 0,
  },

  features: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "480px",
    position: "relative",
    zIndex: 1,
  },

  feature: {
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
    padding: "16px 20px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "14px",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.06)",
    transition: "transform 0.3s ease, background 0.3s ease",
  },

  featureIcon: {
    fontSize: "24px",
    flexShrink: 0,
    marginTop: "2px",
  },

  featureTitle: {
    fontSize: "15px",
    display: "block",
    marginBottom: "4px",
  },

  featureDesc: {
    fontSize: "14px",
    opacity: "0.8",
    margin: 0,
    lineHeight: "1.5",
  },

  testimonial: {
    marginTop: "40px",
    padding: "24px 28px",
    background: "rgba(255,255,255,0.06)",
    borderRadius: "16px",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.08)",
    maxWidth: "480px",
    position: "relative",
    zIndex: 1,
  },

  testimonialText: {
    fontSize: "15px",
    lineHeight: "1.7",
    fontStyle: "italic",
    margin: "0 0 16px 0",
    opacity: "0.95",
  },

  testimonialAuthor: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  authorAvatar: {
    fontSize: "36px",
  },

  authorName: {
    fontSize: "14px",
    display: "block",
  },

  authorRole: {
    fontSize: "13px",
    opacity: "0.7",
    margin: "2px 0 0 0",
  },

  // RIGHT PANEL
  rightPanel: {
    flex: 1,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 30px",
    background: "#f8fafc",
  },

  loginCard: {
    width: "100%",
    maxWidth: "440px",
    background: "#ffffff",
    padding: "48px 40px 40px",
    borderRadius: "24px",
    boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(229, 231, 235, 0.5)",
    animation: "slideUp 0.5s ease",
  },

  cardHeader: {
    marginBottom: "32px",
  },

  welcome: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "2px",
    textTransform: "uppercase",
    display: "block",
  },

  cardTitle: {
    fontSize: "28px",
    fontWeight: "800",
    margin: "12px 0 8px 0",
    color: "#0f172a",
    letterSpacing: "-0.5px",
  },

  subtitle: {
    color: "#64748b",
    fontSize: "15px",
    margin: 0,
  },

  form: {
    display: "flex",
    flexDirection: "column",
  },

  formGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: "6px",
  },

  inputWrapper: {
    position: "relative",
  },

  inputIcon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "16px",
    opacity: "0.5",
  },

  input: {
    width: "100%",
    padding: "12px 16px 12px 44px",
    border: "1.5px solid #e2e8f0",
    borderRadius: "12px",
    background: "#f8fafc",
    fontSize: "15px",
    boxSizing: "border-box",
    transition: "all 0.2s",
    outline: "none",
    color: "#0f172a",
  },

  passwordWrapper: {
    position: "relative",
  },

  passwordInput: {
    width: "100%",
    padding: "12px 48px 12px 44px",
    border: "1.5px solid #e2e8f0",
    borderRadius: "12px",
    background: "#f8fafc",
    fontSize: "15px",
    boxSizing: "border-box",
    transition: "all 0.2s",
    outline: "none",
    color: "#0f172a",
  },

  eyeButton: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    padding: "4px 8px",
    cursor: "pointer",
    fontSize: "18px",
    opacity: "0.6",
    transition: "opacity 0.2s",
  },

  rememberWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  rememberLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },

  rememberText: {
    fontSize: "14px",
    color: "#475569",
  },

  checkbox: {
    width: "16px",
    height: "16px",
    accentColor: "#2563eb",
    cursor: "pointer",
  },

  forgotLink: {
    fontSize: "14px",
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.2s",
  },

  loginButton: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 4px 16px rgba(37, 99, 235, 0.3)",
  },

  loadingText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },

  spinner: {
    display: "inline-block",
    animation: "spin 1s linear infinite",
  },

  message: {
    marginTop: "16px",
    padding: "12px 16px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  messageIcon: {
    fontSize: "16px",
    fontWeight: "700",
  },

  successMessage: {
    background: "#f0fdf4",
    color: "#166534",
    border: "1px solid #bbf7d0",
  },

  errorMessage: {
    background: "#fef2f2",
    color: "#991b1b",
    border: "1px solid #fecaca",
  },

  infoMessage: {
    background: "#eff6ff",
    color: "#1e40af",
    border: "1px solid #bfdbfe",
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    margin: "24px 0 20px",
  },

  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#e2e8f0",
  },

  dividerText: {
    fontSize: "13px",
    color: "#94a3b8",
    whiteSpace: "nowrap",
  },

  socialButtons: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
  },

  socialButton: {
    flex: 1,
    padding: "10px 16px",
    border: "1.5px solid #e2e8f0",
    borderRadius: "12px",
    background: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    color: "#0f172a",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },

  socialIcon: {
    fontSize: "16px",
    fontWeight: "700",
  },

  registerText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: "14px",
    margin: "20px 0 0 0",
  },

  registerLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.2s",
  },
};

// Add keyframes for animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Hover effects */
  .social-button:hover {
    background: #f8fafc;
    border-color: #2563eb;
    transform: translateY(-2px);
  }

  .feature:hover {
    transform: translateX(5px);
    background: rgba(255,255,255,0.12);
  }

  .forgot-link:hover {
    color: #1d4ed8;
  }

  .register-link:hover {
    color: #1d4ed8;
    text-decoration: underline;
  }

  .login-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
  }

  .logo:hover {
    transform: scale(1.05);
  }

  .input:focus,
  .password-input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    background: #ffffff;
  }

  .checkbox:checked {
    accent-color: #2563eb;
  }

  .eye-button:hover {
    opacity: 1;
  }

  .social-button:hover {
    background: #f8fafc;
    border-color: #2563eb;
  }
`;
document.head.appendChild(styleSheet);

export default Login;