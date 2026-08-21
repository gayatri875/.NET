import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../services/api";

function AdminCategories() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    loadCategories();
  }, []);

  // ==========================================
  // GET ALL CATEGORIES
  // ==========================================
  async function loadCategories() {
    try {
      setLoading(true);

      const data = await apiRequest("/api/Category");

      setCategories(data);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // HANDLE INPUT
  // ==========================================
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  // ==========================================
  // RESET FORM
  // ==========================================
  function resetForm() {
    setForm({
      name: "",
      description: "",
    });

    setEditingId(null);
  }

  // ==========================================
  // OPEN ADD
  // ==========================================
  function openAddForm() {
    resetForm();

    setShowForm(true);
    setMessage("");
  }

  // ==========================================
  // OPEN EDIT
  // ==========================================
  function openEditForm(category) {
    setEditingId(category.id);

    setForm({
      name: category.name || "",
      description: category.description || "",
    });

    setShowForm(true);
    setMessage("");
  }

  // ==========================================
  // SAVE CATEGORY
  // ADD + UPDATE
  // ==========================================
  async function saveCategory(e) {
    e.preventDefault();

    setMessage("");

    try {
      const categoryData = {
        name: form.name.trim(),
        description: form.description.trim(),
      };

      if (editingId) {
        await apiRequest(
          `/api/Category/${editingId}`,
          {
            method: "PUT",
            body: JSON.stringify(categoryData),
          }
        );

        setMessage(
          "Category updated successfully."
        );
      } else {
        await apiRequest(
          "/api/Category",
          {
            method: "POST",
            body: JSON.stringify(categoryData),
          }
        );

        setMessage(
          "Category added successfully."
        );
      }

      resetForm();
      setShowForm(false);

      await loadCategories();
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  }

  // ==========================================
  // DELETE
  // ==========================================
  async function deleteCategory(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await apiRequest(
        `/api/Category/${id}`,
        {
          method: "DELETE",
        }
      );

      setCategories((current) =>
        current.filter(
          (category) => category.id !== id
        )
      );

      setMessage(
        "Category deleted successfully."
      );
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  }

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading categories...</h2>
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
              Category Management
            </h1>

            <p style={styles.subtitle}>
              Create and manage product categories.
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
              onClick={() => {
                if (showForm) {
                  resetForm();
                  setShowForm(false);
                } else {
                  openAddForm();
                }
              }}
              style={styles.addButton}
            >
              {showForm
                ? "Close"
                : "+ Add Category"}
            </button>

          </div>
        </div>


        {/* MESSAGE */}
        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}


        {/* ADD / EDIT FORM */}
        {showForm && (
          <div style={styles.formCard}>

            <div style={styles.formHeader}>
              <div>
                <p style={styles.formLabel}>
                  {editingId
                    ? "UPDATE CATEGORY"
                    : "NEW CATEGORY"}
                </p>

                <h2>
                  {editingId
                    ? "Edit Category"
                    : "Add Category"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                style={styles.closeButton}
              >
                ×
              </button>
            </div>

            <form onSubmit={saveCategory}>

              <div style={styles.formGrid}>

                <div>
                  <label style={styles.fieldLabel}>
                    Category Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Electronics"
                    required
                    style={styles.input}
                  />
                </div>

                <div>
                  <label style={styles.fieldLabel}>
                    Description
                  </label>

                  <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="e.g. Electronic products"
                    style={styles.input}
                  />
                </div>

              </div>

              <div style={styles.formActions}>

                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={styles.saveButton}
                >
                  {editingId
                    ? "Update Category"
                    : "Add Category"}
                </button>

              </div>

            </form>
          </div>
        )}


        {/* CATEGORY LIST */}
        <div style={styles.card}>

          <div style={styles.topRow}>
            <div>
              <h2>All Categories</h2>

              <p style={styles.smallText}>
                {categories.length} categor
                {categories.length === 1
                  ? "y"
                  : "ies"}
              </p>
            </div>

            <span style={styles.count}>
              {categories.length}
            </span>
          </div>


          {categories.length === 0 ? (

            <div style={styles.empty}>
              <div style={styles.emptyIcon}>
                🏷️
              </div>

              <h3>
                No categories found
              </h3>

              <p>
                Add your first category.
              </p>
            </div>

          ) : (

            <div style={styles.grid}>

              {categories.map((category) => (

                <div
                  key={category.id}
                  style={styles.categoryCard}
                >

                  <div style={styles.icon}>
                    🏷️
                  </div>

                  <p style={styles.categoryId}>
                    Category #{category.id}
                  </p>

                  <h2>
                    {category.name}
                  </h2>

                  <p style={styles.description}>
                    {category.description ||
                      "No description available."}
                  </p>

                  <div style={styles.actions}>

                    <button
                      onClick={() =>
                        openEditForm(category)
                      }
                      style={styles.editButton}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteCategory(category.id)
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
    textDecoration: "none",
    color: "#2563eb",
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
    padding: "14px",
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

  formHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  formLabel: {
    color: "#2563eb",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1.2px",
    margin: 0,
  },

  closeButton: {
    border: "none",
    background: "#f1f5f9",
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    fontSize: "22px",
    cursor: "pointer",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: "18px",
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
  },

  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "22px",
  },

  cancelButton: {
    padding: "11px 18px",
    border:
      "1px solid #cbd5e1",
    borderRadius: "8px",
    background: "#fff",
    color: "#334155",
    fontWeight: "700",
    cursor: "pointer",
  },

  saveButton: {
    padding: "11px 18px",
    border: "none",
    borderRadius: "8px",
    background: "#16a34a",
    color: "#fff",
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

  topRow: {
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

  count: {
    background: "#dbeafe",
    color: "#1e40af",
    padding: "7px 13px",
    borderRadius: "20px",
    fontWeight: "700",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  categoryCard: {
    padding: "22px",
    border:
      "1px solid #e5e7eb",
    borderRadius: "15px",
    background: "#fff",
  },

  icon: {
    width: "58px",
    height: "58px",
    borderRadius: "14px",
    background: "#fef3c7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    marginBottom: "15px",
  },

  categoryId: {
    color: "#94a3b8",
    fontSize: "12px",
    marginBottom: "6px",
  },

  description: {
    color: "#64748b",
    minHeight: "42px",
    lineHeight: "1.5",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "18px",
  },

  editButton: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },

  deleteButton: {
    flex: 1,
    padding: "10px",
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

export default AdminCategories;