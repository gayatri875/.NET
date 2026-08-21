import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    categoryId: "",
    isActive: true,
  });

  // Google Image Search states
  const [imageSearch, setImageSearch] = useState("");
  const [imageResults, setImageResults] = useState([]);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [searchingImages, setSearchingImages] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  // ==========================================
  // GET PRODUCTS
  // ==========================================
  async function loadProducts() {
    try {
      setLoading(true);
      const data = await apiRequest("/api/Product");
      setProducts(data || []);
    } catch (error) {
      console.error(error);
      setMessageType("error");
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // GET CATEGORIES
  // ==========================================
  async function loadCategories() {
    try {
      const data = await apiRequest("/api/Category");
      setCategories(data || []);
    } catch (error) {
      console.error(error);
      setMessageType("error");
      setMessage(error.message);
    }
  }

  // ==========================================
  // FORM CHANGE
  // ==========================================
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // ==========================================
  // RESET FORM
  // ==========================================
  function resetForm() {
    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      imageUrl: "",
      categoryId: "",
      isActive: true,
    });
    setEditingId(null);
    setImageResults([]);
    setImageSearch("");
    setShowImageSearch(false);
  }

  // ==========================================
  // ADD FORM
  // ==========================================
  function openAddForm() {
    resetForm();
    setShowForm(true);
    setMessage("");
    setMessageType("");
  }

  // ==========================================
  // EDIT FORM
  // ==========================================
  function openEditForm(product) {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      imageUrl: product.imageUrl || "",
      categoryId: product.categoryId ?? "",
      isActive: product.isActive ?? true,
    });
    setShowForm(true);
    setMessage("");
    setMessageType("");
  }

  // ==========================================
  // SEARCH GOOGLE IMAGES
  // ==========================================
  async function searchGoogleImages() {
    if (!imageSearch.trim()) {
      setMessageType("error");
      setMessage("Please enter a product name to search images.");
      return;
    }

    setSearchingImages(true);
    setImageResults([]);

    try {
      // Using picsum.photos for free images (no API key needed)
      const images = [];
      for (let i = 0; i < 8; i++) {
        images.push(`https://picsum.photos/seed/${imageSearch.trim()}-${i}/200/200`);
      }
      setImageResults(images);
      
      setMessageType("info");
      setMessage(`Found images for "${imageSearch}"`);
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Image search error:", error);
      setMessageType("error");
      setMessage("Failed to fetch images. Please try again.");
    } finally {
      setSearchingImages(false);
    }
  }

  // ==========================================
  // SELECT IMAGE
  // ==========================================
  function selectImage(url) {
    setForm({ ...form, imageUrl: url });
    setShowImageSearch(false);
    setImageResults([]);
    setImageSearch("");
    setMessageType("success");
    setMessage("Image selected successfully!");
    setTimeout(() => setMessage(""), 2000);
  }

  // ==========================================
  // ADD / UPDATE PRODUCT
  // ==========================================
  async function saveProduct(e) {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!form.name.trim()) {
      setMessageType("error");
      setMessage("Product name is required.");
      return;
    }

    if (!form.categoryId) {
      setMessageType("error");
      setMessage("Please select a category.");
      return;
    }

    if (Number(form.price) <= 0) {
      setMessageType("error");
      setMessage("Price must be greater than 0.");
      return;
    }

    if (Number(form.stock) < 0) {
      setMessageType("error");
      setMessage("Stock cannot be negative.");
      return;
    }

    try {
      const productData = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        imageUrl: form.imageUrl.trim() || null,
        categoryId: Number(form.categoryId),
        isActive: Boolean(form.isActive),
      };

      if (editingId) {
        await apiRequest(`/api/Product/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(productData),
        });
        setMessageType("success");
        setMessage("Product updated successfully!");
      } else {
        await apiRequest("/api/Product", {
          method: "POST",
          body: JSON.stringify(productData),
        });
        setMessageType("success");
        setMessage("Product added successfully!");
      }

      resetForm();
      setShowForm(false);
      await loadProducts();

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setMessageType("error");
      setMessage(error.message || "Something went wrong.");
    }
  }

  // ==========================================
  // DELETE PRODUCT
  // ==========================================
  async function deleteProduct(id) {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await apiRequest(`/api/Product/${id}`, { method: "DELETE" });
      setProducts((current) => current.filter((product) => product.id !== id));
      setMessageType("success");
      setMessage("Product deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setMessageType("error");
      setMessage(error.message || "Delete failed.");
    }
  }

  // ==========================================
  // ACTIVATE / DEACTIVATE
  // ==========================================
  async function toggleActive(product) {
    try {
      const updatedProduct = {
        name: product.name,
        description: product.description || "",
        price: Number(product.price),
        stock: Number(product.stock),
        imageUrl: product.imageUrl || null,
        categoryId: Number(product.categoryId),
        isActive: !product.isActive,
      };

      await apiRequest(`/api/Product/${product.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedProduct),
      });

      setProducts((current) =>
        current.map((item) =>
          item.id === product.id ? { ...item, isActive: !item.isActive } : item
        )
      );

      setMessageType("success");
      setMessage(`Product ${!product.isActive ? "activated" : "deactivated"} successfully!`);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setMessageType("error");
      setMessage(error.message);
    }
  }

  // ==========================================
  // SEARCH / FILTER
  // ==========================================
  async function applyFilters() {
    try {
      setLoading(true);
      let data = [];

      if (search.trim()) {
        data = await apiRequest(
          `/api/Product/search?keyword=${encodeURIComponent(search.trim())}`
        );
      } else if (filterCategory) {
        data = await apiRequest(`/api/Product/filter?categoryId=${filterCategory}`);
      } else {
        data = await apiRequest("/api/Product");
      }

      setProducts(data || []);
    } catch (error) {
      console.error(error);
      setMessageType("error");
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // CLEAR FILTERS
  // ==========================================
  function clearFilters() {
    setSearch("");
    setFilterCategory("");
    loadProducts();
  }

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <div style={styles.loader}>
          <div style={styles.loaderSpinner}></div>
          <p style={styles.loaderText}>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* ======================================
            HEADER
        ====================================== */}
        <div style={styles.header}>
          <div>
            <span style={styles.label}>ADMIN PANEL</span>
            <h1 style={styles.title}>Product Management</h1>
            <p style={styles.subtitle}>Add, edit, search and manage your products.</p>
          </div>
          <div style={styles.headerButtons}>
            <Link to="/admin" style={styles.backButton}>← Dashboard</Link>
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
              {showForm ? "Close" : "+ Add Product"}
            </button>
          </div>
        </div>

        {/* ======================================
            MESSAGE
        ====================================== */}
        {message && (
          <div style={{
            ...styles.message,
            ...(messageType === "success" && styles.successMessage),
            ...(messageType === "error" && styles.errorMessage),
            ...(messageType === "info" && styles.infoMessage),
          }}>
            <span style={styles.messageIcon}>
              {messageType === "success" && "✓"}
              {messageType === "error" && "✕"}
              {messageType === "info" && "ℹ"}
            </span>
            {message}
          </div>
        )}

        {/* ======================================
            ADD / EDIT FORM
        ====================================== */}
        {showForm && (
          <div style={styles.formCard}>
            <div style={styles.formHeader}>
              <div>
                <span style={styles.formLabel}>
                  {editingId ? "UPDATE PRODUCT" : "NEW PRODUCT"}
                </span>
                <h2>{editingId ? "Edit Product" : "Add Product"}</h2>
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

            <form onSubmit={saveProduct}>
              <div style={styles.formGrid}>
                {/* PRODUCT NAME */}
                <div>
                  <label style={styles.fieldLabel}>Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. iPhone 15 Pro Max"
                    required
                    style={styles.input}
                  />
                </div>

                {/* CATEGORY */}
                <div>
                  <label style={styles.fieldLabel}>Category *</label>
                  <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* PRICE */}
                <div>
                  <label style={styles.fieldLabel}>Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    placeholder="50000"
                    required
                    style={styles.input}
                  />
                </div>

                {/* STOCK */}
                <div>
                  <label style={styles.fieldLabel}>Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    min="0"
                    placeholder="10"
                    required
                    style={styles.input}
                  />
                </div>

                {/* IMAGE URL */}
                <div style={styles.fullWidth}>
                  <label style={styles.fieldLabel}>Image URL</label>
                  <div style={styles.imageInputGroup}>
                    <input
                      type="text"
                      name="imageUrl"
                      value={form.imageUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      style={{ ...styles.input, flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowImageSearch(!showImageSearch)}
                      style={styles.imageSearchToggle}
                    >
                      🔍 Search Images
                    </button>
                  </div>
                  <small style={styles.helpText}>
                    Enter a direct image URL or click "Search Images" to find one.
                  </small>
                </div>

                {/* IMAGE SEARCH */}
                {showImageSearch && (
                  <div style={styles.fullWidth}>
                    <div style={styles.imageSearchBox}>
                      <input
                        type="text"
                        value={imageSearch}
                        onChange={(e) => setImageSearch(e.target.value)}
                        placeholder="Search for product images..."
                        style={styles.imageSearchInput}
                      />
                      <button
                        type="button"
                        onClick={searchGoogleImages}
                        disabled={searchingImages}
                        style={styles.imageSearchButton}
                      >
                        {searchingImages ? "Searching..." : "Search"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowImageSearch(false);
                          setImageResults([]);
                          setImageSearch("");
                        }}
                        style={styles.imageSearchClose}
                      >
                        ✕
                      </button>
                    </div>

                    {searchingImages && (
                      <div style={styles.imageSearchLoading}>
                        <div style={styles.smallSpinner}></div>
                        <p>Searching images...</p>
                      </div>
                    )}

                    {imageResults.length > 0 && !searchingImages && (
                      <div style={styles.imageResultsGrid}>
                        {imageResults.map((img, index) => (
                          <div
                            key={index}
                            onClick={() => selectImage(img)}
                            style={styles.imageResultCard}
                          >
                            <img src={img} alt={`Result ${index + 1}`} style={styles.imageResult} />
                            <span style={styles.imageResultSelect}>Select</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* IMAGE PREVIEW */}
                {form.imageUrl && (
                  <div style={styles.fullWidth}>
                    <label style={styles.fieldLabel}>Image Preview</label>
                    <div style={styles.previewBox}>
                      <img
                        src={form.imageUrl}
                        alt="Preview"
                        style={styles.previewImage}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* DESCRIPTION */}
                <div style={styles.fullWidth}>
                  <label style={styles.fieldLabel}>Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Product description"
                    rows="4"
                    style={styles.textarea}
                  />
                </div>

                {/* ACTIVE */}
                <div style={styles.activeContainer}>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                    id="isActive"
                  />
                  <label htmlFor="isActive">Product is Active</label>
                </div>
              </div>

              {/* FORM BUTTONS */}
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
                <button type="submit" style={styles.saveButton}>
                  {editingId ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ======================================
            SEARCH / FILTER
        ====================================== */}
        <div style={styles.filterCard}>
          <div style={styles.searchBox}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product..."
              style={styles.searchInput}
            />
            <button onClick={applyFilters} style={styles.searchButton}>
              🔍 Search
            </button>
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <button onClick={applyFilters} style={styles.filterButton}>
            Filter
          </button>

          <button onClick={clearFilters} style={styles.clearButton}>
            Clear
          </button>
        </div>

        {/* ======================================
            PRODUCTS
        ====================================== */}
        <div style={styles.card}>
          <div style={styles.topRow}>
            <div>
              <h2>All Products</h2>
              <p style={styles.smallText}>
                {products.length} product{products.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <span style={styles.count}>{products.length}</span>
          </div>

          {products.length === 0 ? (
            <div style={styles.empty}>
              <div style={styles.emptyIcon}>🛍️</div>
              <h3>No products found</h3>
              <p>Try another search or add a new product.</p>
            </div>
          ) : (
            <div style={styles.grid}>
              {products.map((product) => (
                <div key={product.id} style={styles.productCard}>
                  {/* IMAGE */}
                  <div style={styles.imageBox}>
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={styles.image}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div style={styles.placeholder}>🛍️</div>
                    )}
                    <span
                      style={
                        product.isActive
                          ? styles.activeBadge
                          : styles.inactiveBadge
                      }
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div style={styles.productBody}>
                    <p style={styles.category}>
                      {product.categoryName || "Category"}
                    </p>
                    <h3>{product.name}</h3>
                    <p style={styles.description}>
                      {product.description || "No description"}
                    </p>
                    <div style={styles.priceRow}>
                      <strong>
                        ₹{Number(product.price || 0).toLocaleString("en-IN")}
                      </strong>
                      <span>Stock: {product.stock}</span>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div style={styles.actionGrid}>
                      <button
                        onClick={() => openEditForm(product)}
                        style={styles.editButton}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => toggleActive(product)}
                        style={styles.statusButton}
                      >
                        {product.isActive ? "Disable" : "Activate"}
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        style={styles.deleteButton}
                      >
                        🗑 Delete
                      </button>
                    </div>
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

// ==========================================
// STYLES
// ==========================================
const styles = {
  page: {
    minHeight: "calc(100vh - 65px)",
    background: "#f1f3f6",
    padding: "40px 20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  container: {
    maxWidth: "1250px",
    margin: "0 auto",
  },

  loaderContainer: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  loader: {
    textAlign: "center",
  },

  loaderSpinner: {
    width: "48px",
    height: "48px",
    border: "4px solid #e0e0e0",
    borderTop: "4px solid #2874f0",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 16px",
  },

  loaderText: {
    color: "#878787",
    fontSize: "16px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },

  headerButtons: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  label: {
    color: "#2874f0",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  },

  title: {
    margin: "7px 0",
    fontSize: "34px",
    fontWeight: "800",
    color: "#212121",
  },

  subtitle: {
    color: "#64748b",
    margin: 0,
    fontSize: "16px",
  },

  backButton: {
    textDecoration: "none",
    color: "#2874f0",
    fontWeight: "700",
    fontSize: "14px",
    padding: "8px 16px",
    borderRadius: "6px",
    transition: "background 0.2s",
  },

  addButton: {
    padding: "11px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#fb641b",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.2s",
  },

  message: {
    padding: "14px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "500",
    fontSize: "14px",
  },

  successMessage: {
    background: "#e8f5e9",
    color: "#2e7d32",
    border: "1px solid #c8e6c9",
  },

  errorMessage: {
    background: "#ffebee",
    color: "#c62828",
    border: "1px solid #ffcdd2",
  },

  infoMessage: {
    background: "#e3f2fd",
    color: "#0d47a1",
    border: "1px solid #bbdefb",
  },

  messageIcon: {
    fontSize: "18px",
    fontWeight: "700",
  },

  formCard: {
    background: "#fff",
    padding: "28px",
    borderRadius: "12px",
    marginBottom: "25px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },

  formHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  formLabel: {
    color: "#2874f0",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1.2px",
    textTransform: "uppercase",
  },

  closeButton: {
    border: "none",
    background: "#f1f5f9",
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    fontSize: "22px",
    cursor: "pointer",
    transition: "background 0.2s",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "18px",
  },

  fullWidth: {
    gridColumn: "1 / -1",
  },

  fieldLabel: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
    color: "#212121",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "10px 14px",
    border: "1.5px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    background: "#fff",
    outline: "none",
    transition: "border 0.2s",
  },

  helpText: {
    display: "block",
    marginTop: "6px",
    color: "#64748b",
    fontSize: "12px",
  },

  imageInputGroup: {
    display: "flex",
    gap: "8px",
  },

  imageSearchToggle: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    background: "#2874f0",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "13px",
    transition: "background 0.2s",
    whiteSpace: "nowrap",
  },

  imageSearchBox: {
    display: "flex",
    gap: "8px",
    marginBottom: "12px",
  },

  imageSearchInput: {
    flex: 1,
    padding: "10px 14px",
    border: "1.5px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
  },

  imageSearchButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#fb641b",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.2s",
  },

  imageSearchClose: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    background: "#ffebee",
    color: "#c62828",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px",
  },

  imageSearchLoading: {
    textAlign: "center",
    padding: "20px",
    color: "#64748b",
  },

  smallSpinner: {
    width: "24px",
    height: "24px",
    border: "3px solid #e0e0e0",
    borderTop: "3px solid #2874f0",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 8px",
  },

  imageResultsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "12px",
    marginTop: "12px",
  },

  imageResultCard: {
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    border: "2px solid #e0e0e0",
    transition: "all 0.2s",
  },

  imageResult: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
  },

  imageResultSelect: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    padding: "6px",
    background: "rgba(0,0,0,0.7)",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "600",
    textAlign: "center",
  },

  previewBox: {
    width: "180px",
    height: "130px",
    background: "#f1f5f9",
    borderRadius: "10px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #e0e0e0",
  },

  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  textarea: {
    width: "100%",
    padding: "10px 14px",
    border: "1.5px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    resize: "vertical",
    outline: "none",
    fontFamily: "inherit",
  },

  activeContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#212121",
    fontWeight: "600",
  },

  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "22px",
    paddingTop: "18px",
    borderTop: "1px solid #f0f0f0",
  },

  cancelButton: {
    padding: "10px 20px",
    border: "1.5px solid #e0e0e0",
    borderRadius: "8px",
    background: "#fff",
    color: "#212121",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s",
  },

  saveButton: {
    padding: "10px 24px",
    border: "none",
    borderRadius: "8px",
    background: "#fb641b",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.2s",
  },

  filterCard: {
    background: "#fff",
    padding: "16px",
    borderRadius: "12px",
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "20px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },

  searchBox: {
    display: "flex",
    flex: "1",
    minWidth: "250px",
    gap: "8px",
  },

  searchInput: {
    flex: "1",
    padding: "10px 14px",
    border: "1.5px solid #e0e0e0",
    borderRadius: "8px",
    outline: "none",
    fontSize: "14px",
  },

  searchButton: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    background: "#2874f0",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.2s",
  },

  filterSelect: {
    padding: "10px",
    border: "1.5px solid #e0e0e0",
    borderRadius: "8px",
    minWidth: "180px",
    fontSize: "14px",
    outline: "none",
  },

  filterButton: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    background: "#0f766e",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.2s",
  },

  clearButton: {
    padding: "10px 16px",
    border: "1.5px solid #e0e0e0",
    borderRadius: "8px",
    background: "#fff",
    color: "#212121",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s",
  },

  card: {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "18px",
    borderBottom: "1px solid #f0f0f0",
  },

  smallText: {
    color: "#64748b",
    margin: "5px 0 0",
    fontSize: "14px",
  },

  count: {
    background: "#e3f2fd",
    color: "#2874f0",
    padding: "6px 14px",
    borderRadius: "20px",
    fontWeight: "700",
    fontSize: "14px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  productCard: {
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "all 0.2s",
  },

  imageBox: {
    height: "200px",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  placeholder: {
    fontSize: "55px",
  },

  activeBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "4px 12px",
    background: "#dcfce7",
    color: "#166534",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "700",
  },

  inactiveBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "4px 12px",
    background: "#fee2e2",
    color: "#991b1b",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "700",
  },

  productBody: {
    padding: "16px",
  },

  category: {
    color: "#2874f0",
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "4px",
    textTransform: "uppercase",
  },

  description: {
    color: "#64748b",
    minHeight: "40px",
    lineHeight: "1.5",
    fontSize: "14px",
  },

  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "12px",
  },

  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
    marginTop: "14px",
  },

  editButton: {
    padding: "8px",
    border: "none",
    borderRadius: "6px",
    background: "#2874f0",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "12px",
    transition: "background 0.2s",
  },

  statusButton: {
    padding: "8px",
    border: "none",
    borderRadius: "6px",
    background: "#7c3aed",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "12px",
    transition: "background 0.2s",
  },

  deleteButton: {
    padding: "8px",
    border: "none",
    borderRadius: "6px",
    background: "#dc2626",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "12px",
    transition: "background 0.2s",
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

// Add keyframes for spinner
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .back-button:hover {
    background: #e3f2fd;
  }

  .add-button:hover {
    background: #e65a0a;
  }

  .close-button:hover {
    background: #e0e0e0;
  }

  .cancel-button:hover {
    background: #f5f5f5;
  }

  .save-button:hover {
    background: #e65a0a;
  }

  .search-button:hover {
    background: #1a5bbf;
  }

  .filter-button:hover {
    background: #0d5f5a;
  }

  .clear-button:hover {
    background: #f5f5f5;
  }

  .edit-button:hover {
    background: #1a5bbf;
  }

  .status-button:hover {
    background: #6b21a8;
  }

  .delete-button:hover {
    background: #b91c1c;
  }

  .image-search-toggle:hover {
    background: #1a5bbf;
  }

  .image-search-button:hover {
    background: #e65a0a;
  }

  .image-search-close:hover {
    background: #ffcdd2;
  }

  .image-result-card:hover {
    border-color: #2874f0;
    transform: scale(1.05);
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }

  .input:focus,
  .search-input:focus,
  .filter-select:focus,
  .textarea:focus,
  .image-search-input:focus {
    border-color: #2874f0;
    box-shadow: 0 0 0 3px rgba(41, 116, 240, 0.1);
  }
`;
document.head.appendChild(styleSheet);

export default AdminProducts;