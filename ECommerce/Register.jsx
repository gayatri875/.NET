import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const navigate = useNavigate();

  // Password strength validation
  const validatePassword = (pwd) => {
    const errors = [];
    if (pwd.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(pwd)) errors.push("One uppercase letter");
    if (!/[a-z]/.test(pwd)) errors.push("One lowercase letter");
    if (!/[0-9]/.test(pwd)) errors.push("One number");
    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    // Validate name
    if (name.trim().length < 2) {
      setMessageType("error");
      setMessage("Please enter your full name.");
      return;
    }

    // Validate email
    if (!email.includes("@") || !email.includes(".")) {
      setMessageType("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setMessageType("error");
      setMessage("Passwords do not match.");
      return;
    }

    // Validate password strength
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setMessageType("error");
      setMessage(`Password must contain: ${passwordErrors.join(", ")}`);
      return;
    }

    // Validate terms
    if (!acceptedTerms) {
      setMessageType("error");
      setMessage("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const data = await apiRequest(
        "/api/Auth/register",
        {
          method: "POST",
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      console.log("REGISTER RESPONSE:", data);

      setMessageType("success");
      setMessage("🎉 Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("REGISTER ERROR:", error);

      let errorMessage = "Registration failed. Please try again.";
      
      if (error.message?.toLowerCase().includes("email already exists")) {
        errorMessage = "This email is already registered. Please use a different email or login.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      setMessageType("error");
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      {/* LEFT PANEL */}
      <div style={styles.leftPanel}>

        <div style={styles.brand}>

          <Link to="/" style={styles.logoLink}>
            <div style={styles.logo}>🛒</div>
          </Link>

          <h1 style={styles.brandName}>ShopVerse</h1>

          <p style={styles.brandTagline}>
            Join the fastest growing e-commerce platform 
            and discover a world of premium products.
          </p>

        </div>

        <div style={styles.stats}>

          <div style={styles.statItem}>
            <span style={styles.statNumber}>50K+</span>
            <span style={styles.statLabel}>Happy Customers</span>
          </div>

          <div style={styles.statItem}>
            <span style={styles.statNumber}>10K+</span>
            <span style={styles.statLabel}>Products</span>
          </div>

          <div style={styles.statItem}>
            <span style={styles.statNumber}>4.9/5</span>
            <span style={styles.statLabel}>Rating</span>
          </div>

        </div>

        <div style={styles.testimonial}>
          <p style={styles.testimonialText}>
            "Joining ShopVerse was the best decision for my business. 
            The platform is intuitive and the community is amazing."
          </p>
          <div style={styles.testimonialAuthor}>
            <span style={styles.authorAvatar}>👨</span>
            <div>
              <strong style={styles.authorName}>David Chen</strong>
              <p style={styles.authorRole}>Shop Owner</p>
            </div>
          </div>
        </div>

      </div>


      {/* RIGHT PANEL */}
      <div style={styles.rightPanel}>

        <div style={styles.registerCard}>

          <div style={styles.cardHeader}>
            <span style={styles.welcome}>GET STARTED</span>
            <h2 style={styles.cardTitle}>Create your account</h2>
            <p style={styles.subtitle}>
              Join millions of shoppers and start your journey today.
            </p>
          </div>

          <form onSubmit={handleRegister} style={styles.form}>

            {/* FULL NAME */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            {/* EMAIL */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            {/* PASSWORD */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Password
              </label>
              <div style={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
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
              <div style={styles.passwordHints}>
                <span style={password.length >= 8 ? styles.hintValid : styles.hintInvalid}>
                  {password.length >= 8 ? "✓" : "•"} 8+ characters
                </span>
                <span style={/[A-Z]/.test(password) && /[a-z]/.test(password) ? styles.hintValid : styles.hintInvalid}>
                  {/[A-Z]/.test(password) && /[a-z]/.test(password) ? "✓" : "•"} Uppercase & lowercase
                </span>
                <span style={/[0-9]/.test(password) ? styles.hintValid : styles.hintInvalid}>
                  {/[0-9]/.test(password) ? "✓" : "•"} One number
                </span>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Confirm Password
              </label>
              <div style={styles.passwordWrapper}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={styles.passwordInput}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeButton}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p style={styles.passwordMismatch}>✕ Passwords do not match</p>
              )}
              {confirmPassword && password === confirmPassword && password.length > 0 && (
                <p style={styles.passwordMatch}>✓ Passwords match</p>
              )}
            </div>

            {/* TERMS */}
            <div style={styles.termsWrapper}>
              <label style={styles.termsLabel}>
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  style={styles.checkbox}
                />
                I agree to the{" "}
                <Link to="/terms" style={styles.termsLink}>Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" style={styles.termsLink}>Privacy Policy</Link>
              </label>
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.registerButton,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <span style={styles.loadingText}>
                  <span style={styles.spinner}>⟳</span> Creating account...
                </span>
              ) : (
                "Create Account"
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
              {message}
            </div>
          )}

          <div style={styles.divider}>
            <span style={styles.dividerLine}></span>
            <span style={styles.dividerText}>or</span>
            <span style={styles.dividerLine}></span>
          </div>

          <div style={styles.socialButtons}>
            <button style={styles.socialButton}>
              <span>Google</span>
            </button>
            <button style={styles.socialButton}>
              <span>Facebook</span>
            </button>
          </div>

          <p style={styles.loginText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.loginLink}>
              Sign in
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

  brand: {
    maxWidth: "500px",
    marginBottom: "50px",
  },

  logoLink: {
    textDecoration: "none",
    display: "inline-block",
  },

  logo: {
    width: "64px",
    height: "64px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    marginBottom: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  brandName: {
    fontSize: "36px",
    fontWeight: "800",
    margin: "0 0 12px 0",
    letterSpacing: "-0.5px",
  },

  brandTagline: {
    fontSize: "16px",
    opacity: "0.9",
    lineHeight: "1.7",
    margin: 0,
  },

  stats: {
    display: "flex",
    gap: "40px",
    marginBottom: "40px",
    padding: "24px 28px",
    background: "rgba(255,255,255,0.06)",
    borderRadius: "16px",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.08)",
    maxWidth: "480px",
  },

  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },

  statNumber: {
    fontSize: "28px",
    fontWeight: "800",
  },

  statLabel: {
    fontSize: "13px",
    opacity: "0.7",
    marginTop: "4px",
  },

  testimonial: {
    padding: "24px 28px",
    background: "rgba(255,255,255,0.06)",
    borderRadius: "16px",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.08)",
    maxWidth: "480px",
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

  registerCard: {
    width: "100%",
    maxWidth: "460px",
    background: "#ffffff",
    padding: "48px 40px 40px",
    borderRadius: "24px",
    boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(229, 231, 235, 0.5)",
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
    marginBottom: "18px",
  },

  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: "6px",
  },

  input: {
    width: "100%",
    padding: "12px 16px",
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
    padding: "12px 48px 12px 16px",
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

  passwordHints: {
    display: "flex",
    gap: "12px",
    marginTop: "6px",
    flexWrap: "wrap",
  },

  hintValid: {
    fontSize: "12px",
    color: "#16a34a",
  },

  hintInvalid: {
    fontSize: "12px",
    color: "#94a3b8",
  },

  passwordMismatch: {
    fontSize: "13px",
    color: "#dc2626",
    marginTop: "4px",
  },

  passwordMatch: {
    fontSize: "13px",
    color: "#16a34a",
    marginTop: "4px",
  },

  termsWrapper: {
    marginBottom: "20px",
  },

  termsLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#475569",
    cursor: "pointer",
  },

  checkbox: {
    width: "16px",
    height: "16px",
    accentColor: "#2563eb",
    cursor: "pointer",
    flexShrink: 0,
  },

  termsLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "500",
  },

  registerButton: {
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
    padding: "10px",
    border: "1.5px solid #e2e8f0",
    borderRadius: "12px",
    background: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    color: "#0f172a",
    cursor: "pointer",
    transition: "all 0.2s",
  },

  loginText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: "14px",
    margin: "20px 0 0 0",
  },

  loginLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },
};

// Add keyframes for spinner animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default Register;