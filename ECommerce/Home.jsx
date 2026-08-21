import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartCount, setCartCount] = useState(0);
  const [userName, setUserName] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
    const name = localStorage.getItem("userName") || "Guest";
    setUserName(name);
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, products]);

  async function loadDashboard() {
    try {
      setLoading(true);
      const [categoryData, productData] = await Promise.all([
        apiRequest("/api/Category"),
        apiRequest("/api/Product"),
      ]);
      setCategories(categoryData || []);
      setProducts((productData || []).filter((product) => product.isActive));
      setFilteredProducts((productData || []).filter((product) => product.isActive));
    } catch (error) {
      console.error(error);
      setMessageType("error");
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function filterProducts() {
    let filtered = [...products];
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term) ||
          product.categoryName?.toLowerCase().includes(term)
      );
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.categoryId === parseInt(selectedCategory)
      );
    }
    setFilteredProducts(filtered);
  }

  function handleSearch(e) {
    e.preventDefault();
  }

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("all");
    setFilteredProducts(products);
  }

  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.length);
    setMessageType("success");
    setMessage(`🛒 ${product.name} added to cart!`);
    setTimeout(() => setMessage(""), 3000);
  }

  const getCategoryCount = (categoryId) => {
    return products.filter((p) => p.categoryId === categoryId).length;
  };

  const displayedCategories = showAllCategories ? categories : categories.slice(0, 6);

  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <div style={styles.loader}>
          <div style={styles.loaderSpinner}></div>
          <p style={styles.loaderText}>Loading your store...</p>
        </div>
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

          <form onSubmit={handleSearch} style={styles.searchForm}>
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
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  style={styles.clearBtn}
                >
                  ✕
                </button>
              )}
              <button type="submit" style={styles.searchBtn}>
                Search
              </button>
            </div>
          </form>

          <div style={styles.headerActions}>
            <Link to="/cart" style={styles.cartLink}>
              🛒
              {cartCount > 0 && (
                <span style={styles.cartBadge}>{cartCount}</span>
              )}
              <span style={styles.cartText}>Cart</span>
            </Link>
            <div style={styles.userInfo}>
              <span style={styles.userIcon}>👤</span>
              <span style={styles.userName}>{userName}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ===== CATEGORY NAV ===== */}
      <nav style={styles.categoryNav}>
        <div style={styles.categoryNavContent}>
          <button
            onClick={() => setSelectedCategory("all")}
            style={{
              ...styles.categoryNavItem,
              ...(selectedCategory === "all" && styles.categoryNavItemActive),
            }}
          >
            <span style={styles.categoryNavIcon}>🏠</span>
            All
          </button>
          {categories.slice(0, 7).map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(String(category.id))}
              style={{
                ...styles.categoryNavItem,
                ...(selectedCategory === String(category.id) && styles.categoryNavItemActive),
              }}
            >
              <span style={styles.categoryNavIcon}>
                {getCategoryIcon(category.name)}
              </span>
              {category.name}
            </button>
          ))}
          <button style={styles.categoryNavItem}>
            <span style={styles.categoryNavIcon}>📱</span>
            More
          </button>
        </div>
      </nav>

      {/* ===== BANNER ===== */}
      <section style={styles.banner}>
        <div style={styles.bannerContent}>
          <div style={styles.bannerText}>
            <span style={styles.bannerBadge}>🔥 HOT DEALS</span>
            <h1 style={styles.bannerTitle}>
              Big Savings on <span style={styles.bannerHighlight}>Electronics</span>
            </h1>
            <p style={styles.bannerDesc}>Up to 70% off on premium gadgets</p>
            <Link to="/products" style={styles.bannerBtn}>
              Shop Now →
            </Link>
          </div>
          <div style={styles.bannerImage}>
            <span style={styles.bannerEmoji}>💻</span>
          </div>
        </div>
      </section>

      {/* ===== MESSAGE ===== */}
      {message && (
        <div style={{
          ...styles.message,
          ...(messageType === "success" && styles.successMessage),
          ...(messageType === "error" && styles.errorMessage),
        }}>
          <span style={styles.messageIcon}>
            {messageType === "success" && "✓"}
            {messageType === "error" && "✕"}
          </span>
          {message}
        </div>
      )}

      {/* ===== CATEGORIES SECTION ===== */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div>
            <span style={styles.sectionLabel}>CATEGORIES</span>
            <h2 style={styles.sectionTitle}>Shop by Category</h2>
          </div>
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            style={styles.viewAllBtn}
          >
            {showAllCategories ? "View Less" : "View All"} →
          </button>
        </div>

        <div style={styles.categoryGrid}>
          {displayedCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(String(category.id))}
              style={styles.categoryCard}
            >
              <div style={styles.categoryIcon}>
                {getCategoryIcon(category.name)}
              </div>
              <h3 style={styles.categoryName}>{category.name}</h3>
              <p style={styles.categoryCount}>{getCategoryCount(category.id)} items</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section style={styles.productSection}>
        <div style={styles.sectionHeader}>
          <div>
            <span style={styles.sectionLabel}>FEATURED</span>
            <h2 style={styles.sectionTitle}>
              {searchTerm || selectedCategory !== "all" ? "Search Results" : "Popular Products"}
            </h2>
            {(searchTerm || selectedCategory !== "all") && (
              <p style={styles.resultText}>
                Found {filteredProducts.length} products
              </p>
            )}
          </div>
          <div style={styles.sectionActions}>
            {(searchTerm || selectedCategory !== "all") && (
              <button onClick={clearFilters} style={styles.clearFilterBtn}>
                Clear Filters ✕
              </button>
            )}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div style={styles.emptyState}>
            <span style={styles.emptyIcon}>🔍</span>
            <h3 style={styles.emptyTitle}>No products found</h3>
            <p style={styles.emptyText}>Try adjusting your search or filters</p>
            <button onClick={clearFilters} style={styles.resetBtn}>
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div style={styles.productGrid}>
              {filteredProducts.slice(0, 8).map((product) => (
                <div key={product.id} style={styles.productCard}>
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
                  </div>

                  <div style={styles.productInfo}>
                    <p style={styles.productCategory}>
                      {product.categoryName || "General"}
                    </p>
                    <Link to={`/product/${product.id}`} style={styles.productNameLink}>
                      <h3 style={styles.productName}>{product.name}</h3>
                    </Link>
                    <div style={styles.productRating}>
                      <span style={styles.ratingStars}>⭐⭐⭐⭐☆</span>
                      <span style={styles.ratingCount}>({Math.floor(Math.random() * 100) + 10})</span>
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
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
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

            {filteredProducts.length > 8 && (
              <div style={styles.viewMoreContainer}>
                <Link to="/products" style={styles.viewMoreBtn}>
                  View All {filteredProducts.length} Products →
                </Link>
              </div>
            )}
          </>
        )}
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerTitle}>About</h4>
            <a href="#" style={styles.footerLink}>Contact Us</a>
            <a href="#" style={styles.footerLink}>About Us</a>
            <a href="#" style={styles.footerLink}>Careers</a>
          </div>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerTitle}>Help</h4>
            <a href="#" style={styles.footerLink}>Payments</a>
            <a href="#" style={styles.footerLink}>Shipping</a>
            <a href="#" style={styles.footerLink}>Returns</a>
          </div>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerTitle}>Policy</h4>
            <a href="#" style={styles.footerLink}>Privacy Policy</a>
            <a href="#" style={styles.footerLink}>Terms of Use</a>
            <a href="#" style={styles.footerLink}>Security</a>
          </div>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerTitle}>Social</h4>
            <a href="#" style={styles.footerLink}>Facebook</a>
            <a href="#" style={styles.footerLink}>Instagram</a>
            <a href="#" style={styles.footerLink}>Twitter</a>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.footerCopyright}>
            © 2026 ShopVerse. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}

function getCategoryIcon(name) {
  const value = name?.toLowerCase() || "";
  if (value.includes("electronic")) return "💻";
  if (value.includes("mobile") || value.includes("phone")) return "📱";
  if (value.includes("fashion") || value.includes("cloth") || value.includes("apparel")) return "👕";
  if (value.includes("home") || value.includes("furniture")) return "🏠";
  if (value.includes("book")) return "📚";
  if (value.includes("food") || value.includes("grocery")) return "🍕";
  if (value.includes("beauty") || value.includes("cosmetic")) return "💄";
  if (value.includes("sports") || value.includes("fitness")) return "⚽";
  if (value.includes("toy")) return "🧸";
  if (value.includes("auto") || value.includes("car")) return "🚗";
  if (value.includes("health")) return "💊";
  if (value.includes("baby") || value.includes("kid")) return "👶";
  return "🛍️";
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f3f6",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  // Header
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
    gap: "20px",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#fff",
    gap: "4px",
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

  searchForm: {
    flex: 1,
    maxWidth: "600px",
  },

  searchWrapper: {
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

  searchBtn: {
    padding: "10px 20px",
    background: "#fb641b",
    color: "#fff",
    border: "none",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background 0.2s",
  },

  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexShrink: 0,
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

  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
  },

  userIcon: {
    fontSize: "18px",
  },

  userName: {
    maxWidth: "80px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  // Category Navigation
  categoryNav: {
    background: "#fff",
    borderBottom: "1px solid #e0e0e0",
    padding: "8px 0",
  },

  categoryNavContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    gap: "12px",
    overflowX: "auto",
    alignItems: "center",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },

  categoryNavItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
    padding: "6px 12px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "500",
    color: "#212121",
    transition: "color 0.2s",
    whiteSpace: "nowrap",
    position: "relative",
    minWidth: "60px",
  },

  categoryNavItemActive: {
    color: "#2874f0",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-9px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "20px",
      height: "2px",
      background: "#2874f0",
    },
  },

  categoryNavIcon: {
    fontSize: "20px",
  },

  // Banner
  banner: {
    maxWidth: "1200px",
    margin: "16px auto",
    padding: "0 20px",
  },

  bannerContent: {
    background: "linear-gradient(135deg, #2874f0, #1a5bbf)",
    borderRadius: "12px",
    padding: "40px 50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "200px",
    position: "relative",
    overflow: "hidden",
  },

  bannerText: {
    color: "#fff",
    zIndex: 1,
  },

  bannerBadge: {
    display: "inline-block",
    padding: "4px 12px",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "700",
    marginBottom: "8px",
  },

  bannerTitle: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "8px",
  },

  bannerHighlight: {
    color: "#ffd700",
  },

  bannerDesc: {
    fontSize: "16px",
    opacity: 0.9,
    marginBottom: "16px",
  },

  bannerBtn: {
    display: "inline-block",
    padding: "10px 24px",
    background: "#fb641b",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "700",
    transition: "transform 0.2s",
  },

  bannerImage: {
    fontSize: "80px",
    opacity: 0.2,
    position: "absolute",
    right: "40px",
    top: "50%",
    transform: "translateY(-50%)",
  },

  bannerEmoji: {
    fontSize: "100px",
  },

  // Message
  message: {
    maxWidth: "1200px",
    margin: "16px auto",
    padding: "12px 20px",
    borderRadius: "8px",
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

  errorMessage: {
    background: "#ffebee",
    color: "#c62828",
    border: "1px solid #ffcdd2",
  },

  messageIcon: {
    fontSize: "16px",
    fontWeight: "700",
  },

  // Sections
  section: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  },

  productSection: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px 40px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "12px",
  },

  sectionLabel: {
    color: "#2874f0",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  },

  sectionTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#212121",
    margin: "4px 0 0 0",
  },

  sectionActions: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  viewAllBtn: {
    background: "none",
    border: "none",
    color: "#2874f0",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    padding: "8px 16px",
    borderRadius: "6px",
    transition: "background 0.2s",
  },

  clearFilterBtn: {
    padding: "8px 16px",
    background: "#ffebee",
    color: "#c62828",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "background 0.2s",
  },

  resultText: {
    fontSize: "14px",
    color: "#878787",
    marginTop: "4px",
  },

  // Categories
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "16px",
  },

  categoryCard: {
    background: "#fff",
    padding: "20px 16px",
    borderRadius: "8px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    border: "1px solid #e0e0e0",
  },

  categoryIcon: {
    fontSize: "36px",
    marginBottom: "8px",
  },

  categoryName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#212121",
    margin: "0 0 4px 0",
  },

  categoryCount: {
    fontSize: "12px",
    color: "#878787",
    margin: 0,
  },

  // Products
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
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

  viewMoreContainer: {
    textAlign: "center",
    marginTop: "32px",
  },

  viewMoreBtn: {
    display: "inline-block",
    padding: "12px 32px",
    background: "#2874f0",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "700",
    transition: "transform 0.2s",
  },

  // Empty State
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

  // Loader
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

  // Footer
  footer: {
    background: "#172337",
    color: "#fff",
    padding: "40px 0 0",
    marginTop: "40px",
  },

  footerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "32px",
  },

  footerColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  footerTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#878787",
    marginBottom: "4px",
  },

  footerLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "13px",
    opacity: 0.8,
    transition: "opacity 0.2s",
  },

  footerBottom: {
    borderTop: "1px solid #454d5e",
    padding: "16px 20px",
    marginTop: "32px",
    textAlign: "center",
  },

  footerCopyright: {
    fontSize: "13px",
    color: "#878787",
    margin: 0,
  },
};

// Add keyframes and styles
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

  /* Hover Effects */
  .category-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }

  .add-to-cart-btn:hover:not(:disabled) {
    background: #e65a0a;
  }

  .search-btn:hover {
    background: #e65a0a;
  }

  .banner-btn:hover {
    transform: scale(1.05);
  }

  .view-more-btn:hover {
    transform: scale(1.02);
  }

  .category-nav-item:hover {
    color: #2874f0;
  }

  .footer-link:hover {
    opacity: 1;
    color: #2874f0;
  }

  .view-all-btn:hover {
    background: #e3f2fd;
  }

  .clear-filter-btn:hover {
    background: #ffcdd2;
  }

  .reset-btn:hover {
    background: #1a5bbf;
  }

  .clear-btn:hover {
    color: #212121;
  }

  /* Scrollbar Hide */
  .category-nav-content::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(styleSheet);

export default Home;