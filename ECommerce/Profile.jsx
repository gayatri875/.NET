import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../services/api";

function Profile() {
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  // ==========================================
  // LOAD PROFILE
  // ==========================================
  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setMessage("");
      setMessageType("");

      const data = await apiRequest(
        "/api/Customer/me"
      );

      console.log("CUSTOMER PROFILE:", data);

      setProfile(data);

      setForm({
        fullName: data?.fullName || "",
        phone: data?.phone || "",
        address: data?.address || "",
      });

      // Save Customer ID for Cart / Orders
      if (data?.id) {
        localStorage.setItem(
          "customerId",
          String(data.id)
        );
      }

      setEditing(false);
    } catch (error) {
      console.error("PROFILE LOAD ERROR:", error);

      const errorMessage =
        error?.message?.toLowerCase() || "";

      /*
        If profile doesn't exist yet,
        show Create Profile form.
      */
      if (
        errorMessage.includes("404") ||
        errorMessage.includes(
          "customer profile not found"
        )
      ) {
        setProfile(null);

        setForm({
          fullName:
            localStorage.getItem("userName") || "",
          phone: "",
          address: "",
        });

        setEditing(true);

        setMessage(
          "Create your customer profile first."
        );

        setMessageType("info");
      } else {
        setMessage(
          error.message ||
            "Unable to load customer profile."
        );

        setMessageType("error");
      }
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // FORM CHANGE
  // ==========================================
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  // ==========================================
  // VALIDATION
  // ==========================================
  function validateForm() {
    if (!form.fullName.trim()) {
      setMessage("Full name is required.");
      setMessageType("error");
      return false;
    }

    if (!form.phone.trim()) {
      setMessage("Phone number is required.");
      setMessageType("error");
      return false;
    }

    if (!form.address.trim()) {
      setMessage("Address is required.");
      setMessageType("error");
      return false;
    }

    return true;
  }

  // ==========================================
  // CREATE / UPDATE PROFILE
  // ==========================================
  async function saveProfile(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setMessageType("");

      const body = {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
      };

      let data;

      // ========================================
      // CREATE PROFILE
      // ========================================
      if (!profile) {
        data = await apiRequest(
          "/api/Customer/me",
          {
            method: "POST",
            body: JSON.stringify(body),
          }
        );

        console.log(
          "CUSTOMER PROFILE CREATED:",
          data
        );

        setMessage(
          "Customer profile created successfully."
        );

        setMessageType("success");
      }

      // ========================================
      // UPDATE PROFILE
      // ========================================
      else {
        data = await apiRequest(
          "/api/Customer/me",
          {
            method: "PUT",
            body: JSON.stringify(body),
          }
        );

        console.log(
          "CUSTOMER PROFILE UPDATED:",
          data
        );

        setMessage(
          "Profile updated successfully."
        );

        setMessageType("success");
      }

      // ========================================
      // UPDATE LOCAL STATE
      // ========================================
      setProfile(data);

      setForm({
        fullName: data?.fullName || "",
        phone: data?.phone || "",
        address: data?.address || "",
      });

      // ========================================
      // SAVE CUSTOMER ID
      // ========================================
      if (data?.id) {
        localStorage.setItem(
          "customerId",
          String(data.id)
        );
      }

      // Exit edit mode
      setEditing(false);

    } catch (error) {
      console.error(
        "PROFILE SAVE ERROR:",
        error
      );

      setMessage(
        error.message ||
          "Unable to save customer profile."
      );

      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  // ==========================================
  // CANCEL EDIT
  // ==========================================
  function cancelEdit() {
    if (!profile) {
      return;
    }

    setForm({
      fullName: profile.fullName || "",
      phone: profile.phone || "",
      address: profile.address || "",
    });

    setEditing(false);
    setMessage("");
    setMessageType("");
  }

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div style={styles.center}>
        <div style={styles.loaderCard}>
          <div style={styles.spinner}></div>
          <h2>Loading profile...</h2>
          <p>
            Please wait while we load your details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* =====================================
            BACK
        ===================================== */}

        <Link
          to="/home"
          style={styles.back}
        >
          ← Back to Home
        </Link>


        {/* =====================================
            HEADER
        ===================================== */}

        <div style={styles.header}>

          <div>
            <p style={styles.label}>
              MY ACCOUNT
            </p>

            <h1 style={styles.title}>
              {profile
                ? "My Profile"
                : "Create Your Profile"}
            </h1>

            <p style={styles.subtitle}>
              {profile
                ? "Manage your personal and delivery information."
                : "Create your customer profile before shopping and ordering."}
            </p>
          </div>


          {/* EDIT BUTTON */}
          {profile && !editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(true);
                setMessage("");
                setMessageType("");
              }}
              style={styles.editButton}
            >
              ✏️ Edit Profile
            </button>
          )}

        </div>


        {/* =====================================
            MESSAGE
        ===================================== */}

        {message && (
          <div
            style={{
              ...styles.message,
              ...(messageType === "success"
                ? styles.successMessage
                : messageType === "info"
                ? styles.infoMessage
                : styles.errorMessage),
            }}
          >
            {message}
          </div>
        )}


        {/* =====================================
            CREATE / EDIT FORM
        ===================================== */}

        {(!profile || editing) && (
          <div style={styles.formCard}>

            <div style={styles.formHeader}>
              <div>
                <p style={styles.formLabel}>
                  {profile
                    ? "UPDATE PROFILE"
                    : "NEW CUSTOMER PROFILE"}
                </p>

                <h2>
                  {profile
                    ? "Edit Your Details"
                    : "Enter Your Details"}
                </h2>
              </div>
            </div>

            <form onSubmit={saveProfile}>

              <div style={styles.formGrid}>

                {/* FULL NAME */}
                <div>
                  <label style={styles.labelText}>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    maxLength={100}
                    style={styles.input}
                  />
                </div>


                {/* PHONE */}
                <div>
                  <label style={styles.labelText}>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    style={styles.input}
                  />
                </div>


                {/* ADDRESS */}
                <div
                  style={styles.fullWidth}
                >
                  <label style={styles.labelText}>
                    Delivery Address
                  </label>

                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House no, street, area, city..."
                    rows="5"
                    required
                    maxLength={250}
                    style={styles.textarea}
                  />
                </div>

              </div>


              {/* ACTIONS */}

              <div style={styles.formActions}>

                {profile && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    disabled={saving}
                    style={styles.cancelButton}
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    ...styles.saveButton,
                    opacity: saving ? 0.7 : 1,
                  }}
                >
                  {saving
                    ? "Saving..."
                    : profile
                    ? "Update Profile"
                    : "Create Profile"}
                </button>

              </div>

            </form>
          </div>
        )}


        {/* =====================================
            PROFILE VIEW
        ===================================== */}

        {profile && !editing && (
          <>

            <div style={styles.grid}>

              {/* PERSONAL */}
              <div style={styles.card}>

                <div style={styles.profileTop}>

                  <div style={styles.profileAvatar}>
                    {profile.fullName
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </div>

                  <div>
                    <h2 style={styles.profileName}>
                      {profile.fullName}
                    </h2>

                    <p style={styles.customerId}>
                      Customer ID: #{profile.id}
                    </p>
                  </div>

                </div>


                <div style={styles.infoRow}>
                  <span>Phone</span>

                  <strong>
                    {profile.phone ||
                      "Not available"}
                  </strong>
                </div>


                <div style={styles.infoRow}>
                  <span>User ID</span>

                  <strong>
                    {profile.userId}
                  </strong>
                </div>

              </div>


              {/* DELIVERY */}
              <div style={styles.card}>

                <h2>
                  🚚 Delivery Information
                </h2>

                <div style={styles.addressBox}>

                  <span style={styles.addressIcon}>
                    📍
                  </span>

                  <p style={styles.address}>
                    {profile.address ||
                      "No delivery address added."}
                  </p>

                </div>

                <div style={styles.readyBox}>
                  ✅ Your profile is ready for
                  shopping and delivery.
                </div>

              </div>

            </div>


            {/* =================================
                QUICK ACTIONS
            ================================= */}

            <div style={styles.quickCard}>

              <div>
                <p style={styles.quickLabel}>
                  CUSTOMER ACCOUNT
                </p>

                <h2>
                  Ready to shop?
                </h2>

                <p style={styles.quickText}>
                  Customer ID #{profile.id} is
                  linked with your cart and orders.
                </p>
              </div>


              <div style={styles.quickActions}>

                <Link
                  to="/products"
                  style={styles.primaryButton}
                >
                  🛍️ Shop Products
                </Link>

                <Link
                  to="/cart"
                  style={styles.secondaryButton}
                >
                  🛒 My Cart
                </Link>

                <Link
                  to="/orders"
                  style={styles.secondaryButton}
                >
                  📦 My Orders
                </Link>

              </div>

            </div>

          </>
        )}

      </div>
    </div>
  );
}


// =====================================================
// STYLES
// =====================================================

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
    padding: "40px 20px",
    fontFamily:
      "Arial, Helvetica, sans-serif",
  },

  container: {
    maxWidth: "1050px",
    margin: "0 auto",
  },

  back: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "14px",
  },

  header: {
    marginTop: "25px",
    marginBottom: "25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  label: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    marginBottom: "6px",
  },

  title: {
    margin: "0",
    fontSize: "34px",
    color: "#0f172a",
  },

  subtitle: {
    color: "#64748b",
    lineHeight: "1.5",
    marginTop: "8px",
  },

  editButton: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "9px",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  message: {
    padding: "14px 16px",
    marginBottom: "20px",
    borderRadius: "10px",
    fontWeight: "600",
  },

  successMessage: {
    background: "#dcfce7",
    color: "#166534",
  },

  errorMessage: {
    background: "#fee2e2",
    color: "#991b1b",
  },

  infoMessage: {
    background: "#eff6ff",
    color: "#1e40af",
  },

  formCard: {
    background: "#fff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow:
      "0 10px 30px rgba(15,23,42,0.07)",
    border:
      "1px solid #e5e7eb",
  },

  formHeader: {
    marginBottom: "25px",
  },

  formLabel: {
    color: "#2563eb",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1.2px",
    marginBottom: "6px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: "20px",
  },

  fullWidth: {
    gridColumn: "1 / -1",
  },

  labelText: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "700",
    color: "#334155",
  },

  input: {
    width: "100%",
    padding: "13px 14px",
    border:
      "1px solid #cbd5e1",
    borderRadius: "9px",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
  },

  textarea: {
    width: "100%",
    padding: "13px 14px",
    border:
      "1px solid #cbd5e1",
    borderRadius: "9px",
    fontSize: "15px",
    resize: "vertical",
    boxSizing: "border-box",
    outline: "none",
  },

  formActions: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },

  cancelButton: {
    padding: "12px 18px",
    border:
      "1px solid #cbd5e1",
    borderRadius: "9px",
    background: "#fff",
    color: "#334155",
    fontWeight: "700",
    cursor: "pointer",
  },

  saveButton: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "9px",
    background: "#16a34a",
    color: "#fff",
    fontWeight: "800",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "28px",
    borderRadius: "18px",
    boxShadow:
      "0 10px 30px rgba(15,23,42,0.07)",
    border:
      "1px solid #e5e7eb",
  },

  profileTop: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },

  profileAvatar: {
    width: "70px",
    height: "70px",
    minWidth: "70px",
    borderRadius: "50%",
    background: "#dbeafe",
    color: "#1e40af",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    fontWeight: "800",
  },

  profileName: {
    margin: 0,
    color: "#0f172a",
  },

  customerId: {
    marginTop: "5px",
    color: "#64748b",
    fontSize: "13px",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "15px 0",
    borderTop:
      "1px solid #e5e7eb",
  },

  addressBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
    marginTop: "20px",
    minHeight: "100px",
  },

  addressIcon: {
    fontSize: "25px",
  },

  address: {
    margin: 0,
    color: "#475569",
    lineHeight: "1.7",
  },

  readyBox: {
    marginTop: "15px",
    padding: "12px 14px",
    background: "#f0fdf4",
    color: "#166534",
    borderRadius: "9px",
    fontSize: "14px",
  },

  quickCard: {
    marginTop: "20px",
    padding: "25px",
    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "#fff",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  quickLabel: {
    color: "#93c5fd",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1.2px",
  },

  quickText: {
    color: "#cbd5e1",
    marginBottom: 0,
  },

  quickActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  primaryButton: {
    display: "inline-block",
    padding: "11px 16px",
    background: "#2563eb",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "700",
  },

  secondaryButton: {
    display: "inline-block",
    padding: "11px 16px",
    background: "#fff",
    color: "#0f172a",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "700",
  },

  center: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  loaderCard: {
    textAlign: "center",
    padding: "40px",
  },

  spinner: {
    width: "35px",
    height: "35px",
    border:
      "4px solid #dbeafe",
    borderTop:
      "4px solid #2563eb",
    borderRadius: "50%",
    margin: "0 auto 15px",
  },
};

export default Profile;