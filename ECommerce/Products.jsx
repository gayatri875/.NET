import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [cartCount, setCartCount] = useState(0);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadProductsAndCategories();
    loadCartCount();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [searchTerm, selectedCategory, priceRange, sortBy, products]);

  async function loadProductsAndCategories() {
    try {
      setLoading(true);
      const [productData, categoryData] = await Promise.all([
        apiRequest("/api/Product"),
        apiRequest("/api/Category"),
      ]);
      setProducts(productData || []);
      setFilteredProducts(productData || []);
      setCategories(categoryData || []);

      // Set max price for filter
      if (productData && productData.length > 0) {
        const maxPrice = Math.max(...productData.map((p) => p.price || 0));
        setPriceRange((prev) => ({ ...prev, max: maxPrice }));
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // LOAD CART COUNT FROM BACKEND
  // ==========================================
  async function loadCartCount() {
    try {
      const customerId = localStorage.getItem("customerId");
      if (!customerId) return;

      const cart = await apiRequest(`/api/Cart/customer/${customerId}`);
      setCartCount(cart?.items?.length || 0);
    } catch (err) {
      console.error("Load cart count error:", err);
    }
  }

  function filterAndSortProducts() {
    let filtered = [...products];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term) ||
          product.categoryName?.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.categoryId === parseInt(selectedCategory)
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) => product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // popular
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    setFilteredProducts(filtered);
  }

  // ==========================================
  // ADD TO CART - CALLS BACKEND API
  // (previously this only wrote to localStorage,
  // so items never reached the real cart used by
  // the Cart page / backend database)
  // ==========================================
  async function addToCart(product) {
    const customerId = localStorage.getItem("customerId");

    if (!customerId) {
      setMessageType("error");
      setMessage("Please login again to add items to cart.");
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
      return;
    }

    if (product.stock <= 0) {
      setMessageType("error");
      setMessage("This product is out of stock.");
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
      return;
    }

    try {
      await apiRequest("/api/Cart", {
        method: "POST",
        body: JSON.stringify({
          customerId: Number(customerId),
          productId: product.id,
          quantity: 1,
        }),
      });

      setCartCount((prev) => prev + 1);
      setMessageType("success");
      setMessage(`🛒 ${product.name} added to cart!`);
    } catch (err) {
      console.error("Add to cart error:", err);
      setMessageType("error");
      setMessage(err.message || "Failed to add item to cart.");
    } finally {
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    }
  }

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange({ min: 0, max: 10000 });
    setSortBy("popular");
  }

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

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <span style={styles.errorIcon}>⚠️</span>
        <h2 style={styles.errorTitle}>Unable to load products</h2>
        <p style={styles.errorText}>{error}</p>
        <button onClick={() => window.location.reload()} style={styles.retryBtn}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* ===== HEADER ===== */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <Link to="/" style={styles.logo}>
            <span style={styles.logoIcon}>🛒</span>
            <span style={styles.logoText}>ShopVerse</span>
          </Link>

          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} style={styles.clearBtn}>
                ✕
              </button>
            )}
          </div>

          <Link to="/cart" style={styles.cartLink}>
            🛒
            {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
            <span style={styles.cartText}>Cart</span>
          </Link>
        </div>
      </header>

      <div style={styles.container}>
        {/* ===== MESSAGE ===== */}
        {message && (
          <div
            style={{
              ...styles.message,
              ...(messageType === "success" && styles.successMessage),
              ...(messageType === "error" && styles.errorMessageBox),
            }}
          >
            <span style={styles.messageIcon}>
              {messageType === "success" ? "✓" : "✕"}
            </span>
            {message}
          </div>
        )}

        <div style={styles.layout}>
          {/* ===== SIDEBAR FILTERS ===== */}
          <aside style={styles.sidebar}>
            <div style={styles.sidebarCard}>
              <h3 style={styles.sidebarTitle}>Filters</h3>

              {/* Categories */}
              <div style={styles.filterSection}>
                <h4 style={styles.filterLabel}>Categories</h4>
                <button
                  onClick={() => setSelectedCategory("all")}
                  style={{
                    ...styles.filterOption,
                    ...(selectedCategory === "all" && styles.filterOptionActive),
                  }}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(String(category.id))}
                    style={{
                      ...styles.filterOption,
                      ...(selectedCategory === String(category.id) &&
                        styles.filterOptionActive),
                    }}
                  >
                    {getCategoryIcon(category.name)} {category.name}
                  </button>
                ))}
              </div>

              {/* Price Range */}
              <div style={styles.filterSection}>
                <h4 style={styles.filterLabel}>Price Range</h4>
                <div style={styles.priceRange}>
                  <div style={styles.priceInputs}>
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: Number(e.target.value) })
                      }
                      style={styles.priceInput}
                    />
                    <span style={styles.priceDash}>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: Number(e.target.value) })
                      }
                      style={styles.priceInput}
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={Math.max(...products.map((p) => p.price || 0), 1000)}
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: Number(e.target.value) })
                    }
                    style={styles.priceSlider}
                  />
                </div>
              </div>

              {/* Sort By */}
              <div style={styles.filterSection}>
                <h4 style={styles.filterLabel}>Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={styles.sortSelect}
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {(searchTerm ||
                selectedCategory !== "all" ||
                priceRange.min > 0 ||
                priceRange.max < 10000) && (
                <button onClick={clearFilters} style={styles.clearFiltersBtn}>
                  Clear All Filters ✕
                </button>
              )}

              <div style={styles.resultCount}>
                {filteredProducts.length} products found
              </div>
            </div>
          </aside>

          {/* ===== PRODUCTS GRID ===== */}
          <main style={styles.mainContent}>
            <div style={styles.toolbar}>
              <div style={styles.toolbarLeft}>
                <h2 style={styles.toolbarTitle}>
                  {searchTerm ? `Results for "${searchTerm}"` : "All Products"}
                </h2>
              </div>
              <div style={styles.toolbarRight}>
                <button
                  onClick={() => setViewMode("grid")}
                  style={{
                    ...styles.viewBtn,
                    ...(viewMode === "grid" && styles.viewBtnActive),
                  }}
                >
                  ⊞ Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  style={{
                    ...styles.viewBtn,
                    ...(viewMode === "list" && styles.viewBtnActive),
                  }}
                >
                  ☰ List
                </button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div style={styles.emptyState}>
                <span style={styles.emptyIcon}>🔍</span>
                <h3 style={styles.emptyTitle}>No products found</h3>
                <p style={styles.emptyText}>Try adjusting your filters or search terms</p>
                <button onClick={clearFilters} style={styles.resetBtn}>
                  Clear all filters
                </button>
              </div>
            ) : (
              <div style={viewMode === "grid" ? styles.productGrid : styles.productList}>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    style={viewMode === "grid" ? styles.productCard : styles.productCardList}
                  >
                    <div style={styles.productImage}>
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} style={styles.productImg} />
                      ) : (
                        <div style={styles.productPlaceholder}>🛍️</div>
                      )}
                      {product.stock < 5 && product.stock > 0 && (
                        <span style={styles.stockBadge}>🔥 Limited</span>
                      )}
                      {product.stock === 0 && (
                        <span style={styles.outOfStockBadge}>Out of Stock</span>
                      )}
                      {product.discount && (
                        <span style={styles.discountBadge}>{product.discount}% OFF</span>
                      )}
                    </div>

                    <div style={styles.productInfo}>
                      <p style={styles.productCategory}>
                        {product.categoryName || "General"}
                      </p>
                      <Link to={`/product/${product.id}`} style={styles.productNameLink}>
                        <h3 style={styles.productName}>{product.name}</h3>
                      </Link>
                      <p style={styles.productDescription}>
                        {product.description?.slice(0, 60) || "No description available"}
                        {product.description?.length > 60 && "..."}
                      </p>
                      <div style={styles.productRating}>
                        <span style={styles.ratingStars}>⭐⭐⭐⭐☆</span>
                        <span style={styles.ratingCount}>
                          ({Math.floor(Math.random() * 100) + 10})
                        </span>
                      </div>
                      <div style={styles.productPrice}>
                        <span style={styles.priceAmount}>
                          ₹{Number(product.price || 0).toLocaleString("en-IN")}
                        </span>
                        {product.originalPrice && (
                          <span style={styles.originalPrice}>
                            ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                          </span>
                        )}
                        {product.originalPrice && (
                          <span style={styles.discount}>
                            {Math.round(
                              ((product.originalPrice - product.price) /
                                product.originalPrice) *
                                100
                            )}
                            % off
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        style={{
                          ...styles.addToCartBtn,
                          ...(product.stock === 0 && styles.addToCartBtnDisabled),
                        }}
                        disabled={product.stock === 0}
                      >
                        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function getCategoryIcon(name) {
  const value = name?.toLowerCase() || "";
  if (value.includes("electronic")) return "💻";
  if (value.includes("mobile") || value.includes("phone")) return "📱";
  if (value.includes("fashion") || value.includes("cloth") || value.includes("apparel"))
    return "👕";
  if (value.includes("home") || value.includes("furniture")) return "🏠";
  if (value.includes("book")) return "📚";
  if (value.includes("food") || value.includes("grocery")) return "🍕";
  if (value.includes("beauty") || value.includes("cosmetic")) return "💄";
  if (value.includes("sports") || value.includes("fitness")) return "⚽";
  if (value.includes("toy")) return "🧸";
  if (value.includes("auto") || value.includes("car")) return "🚗";
  if (value.includes("health")) return "💊";
  return "🛍️";
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f3f6",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  header: {
    background: "#2874f0",
    padding: "12px 0",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
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
    fontSize: "24px",
  },

  logoText: {
    fontSize: "20px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
  },

  searchWrapper: {
    flex: 1,
    maxWidth: "500px",
    display: "flex",
    alignItems: "center",
    background: "#fff",
    borderRadius: "4px",
    overflow: "hidden",
  },

  searchIcon: {
    padding: "0 12px",
    fontSize: "16px",
    color: "#717171",
  },

  searchInput: {
    flex: 1,
    padding: "10px 0",
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "transparent",
  },

  clearBtn: {
    padding: "8px 12px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "14px",
    color: "#999",
  },

  cartLink: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    position: "relative",
    fontWeight: "600",
    flexShrink: 0,
  },

  cartBadge: {
    position: "absolute",
    top: "-8px",
    right: "-12px",
    background: "#fb641b",
    color: "#fff",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "11px",
    fontWeight: "700",
    minWidth: "18px",
    textAlign: "center",
  },

  cartText: {
    fontSize: "14px",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },

  message: {
    padding: "12px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "500",
    fontSize: "14px",
    animation: "slideDown 0.3s ease",
  },

  successMessage: {
    background: "#e8f5e9",
    color: "#2e7d32",
    border: "1px solid #c8e6c9",
  },

  errorMessageBox: {
    background: "#ffebee",
    color: "#c62828",
    border: "1px solid #ffcdd2",
  },

  messageIcon: {
    fontSize: "16px",
    fontWeight: "700",
  },

  layout: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
  },

  sidebar: {
    width: "260px",
    flexShrink: 0,
  },

  sidebarCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    position: "sticky",
    top: "90px",
  },

  sidebarTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#212121",
    margin: "0 0 20px 0",
  },

  filterSection: {
    marginBottom: "20px",
  },

  filterLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#878787",
    margin: "0 0 10px 0",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  filterOption: {
    display: "block",
    width: "100%",
    padding: "8px 12px",
    textAlign: "left",
    background: "transparent",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#212121",
    cursor: "pointer",
    transition: "all 0.2s",
    marginBottom: "4px",
  },

  filterOptionActive: {
    background: "#e3f2fd",
    color: "#2874f0",
    fontWeight: "600",
  },

  priceRange: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  priceInputs: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },

  priceInput: {
    flex: 1,
    padding: "8px 10px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    fontSize: "14px",
    width: "70px",
    outline: "none",
  },

  priceDash: {
    color: "#878787",
  },

  priceSlider: {
    width: "100%",
    accentColor: "#2874f0",
  },

  sortSelect: {
    width: "100%",
    padding: "10px",
    border: "1px solid #e0e0e0",
    borderRadius: "6px",
    fontSize: "14px",
    background: "#fff",
    outline: "none",
  },

  clearFiltersBtn: {
    width: "100%",
    padding: "10px",
    background: "#ffebee",
    color: "#c62828",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.2s",
    marginBottom: "12px",
  },

  resultCount: {
    fontSize: "13px",
    color: "#878787",
    textAlign: "center",
    paddingTop: "12px",
    borderTop: "1px solid #f0f0f0",
  },

  mainContent: {
    flex: 1,
    minWidth: 0,
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "12px",
  },

  toolbarLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  toolbarTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#212121",
    margin: 0,
  },

  toolbarRight: {
    display: "flex",
    gap: "8px",
  },

  viewBtn: {
    padding: "6px 12px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    background: "#fff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    color: "#878787",
    transition: "all 0.2s",
  },

  viewBtnActive: {
    background: "#2874f0",
    color: "#fff",
    borderColor: "#2874f0",
  },

  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px",
  },

  productList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  productCard: {
    background: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    transition: "all 0.2s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    border: "1px solid #e0e0e0",
  },

  productCardList: {
    background: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    transition: "all 0.2s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    border: "1px solid #e0e0e0",
    display: "flex",
    gap: "20px",
    padding: "16px",
  },

  productImage: {
    height: "200px",
    background: "#f1f3f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: "16px",
  },

  productImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  productPlaceholder: {
    fontSize: "60px",
  },

  stockBadge: {
    position: "absolute",
    top: "8px",
    left: "8px",
    padding: "4px 10px",
    background: "#fb641b",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "10px",
    fontWeight: "700",
  },

  outOfStockBadge: {
    position: "absolute",
    top: "8px",
    left: "8px",
    padding: "4px 10px",
    background: "#ff6161",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "10px",
    fontWeight: "700",
  },

  discountBadge: {
    position: "absolute",
    top: "8px",
    right: "8px",
    padding: "4px 10px",
    background: "#388e3c",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "10px",
    fontWeight: "700",
  },

  productInfo: {
    padding: "12px 16px 16px",
  },

  productCategory: {
    fontSize: "12px",
    color: "#878787",
    margin: "0 0 4px 0",
  },

  productNameLink: {
    textDecoration: "none",
  },

  productName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#212121",
    margin: "0 0 4px 0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  productDescription: {
    color: "#878787",
    fontSize: "13px",
    margin: "0 0 8px 0",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  productRating: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "6px",
  },

  ratingStars: {
    fontSize: "14px",
  },

  ratingCount: {
    fontSize: "12px",
    color: "#878787",
  },

  productPrice: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
    flexWrap: "wrap",
  },

  priceAmount: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#212121",
  },

  originalPrice: {
    fontSize: "14px",
    color: "#878787",
    textDecoration: "line-through",
  },

  discount: {
    fontSize: "14px",
    color: "#388e3c",
    fontWeight: "600",
  },

  addToCartBtn: {
    width: "100%",
    padding: "10px",
    background: "#fb641b",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background 0.2s",
  },

  addToCartBtnDisabled: {
    background: "#878787",
    cursor: "not-allowed",
  },

  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    background: "#fff",
    borderRadius: "8px",
  },

  emptyIcon: {
    fontSize: "48px",
    display: "block",
    marginBottom: "16px",
  },

  emptyTitle: {
    fontSize: "20px",
    color: "#212121",
    marginBottom: "8px",
  },

  emptyText: {
    color: "#878787",
    marginBottom: "16px",
  },

  resetBtn: {
    padding: "10px 24px",
    background: "#2874f0",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background 0.2s",
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

  errorContainer: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    textAlign: "center",
  },

  errorIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },

  errorTitle: {
    fontSize: "24px",
    color: "#212121",
    marginBottom: "8px",
  },

  errorText: {
    color: "#878787",
    marginBottom: "20px",
  },

  retryBtn: {
    padding: "10px 32px",
    background: "#2874f0",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }

  .product-card-list:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }

  .add-to-cart-btn:hover:not(:disabled) {
    background: #e65a0a;
  }

  .filter-option:hover {
    background: #f5f5f5;
  }

  .filter-option-active:hover {
    background: #e3f2fd;
  }

  .clear-filters-btn:hover {
    background: #ffcdd2;
  }

  .reset-btn:hover {
    background: #1a5bbf;
  }

  .view-btn:hover {
    background: #f5f5f5;
  }

  .view-btn-active:hover {
    background: #1a5bbf;
  }

  .retry-btn:hover {
    background: #1a5bbf;
  }

  .clear-btn:hover {
    color: #212121;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;
document.head.appendChild(styleSheet);

export default Products;