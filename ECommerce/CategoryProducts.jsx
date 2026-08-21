import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest } from "../services/api";

function CategoryProducts() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadCategoryProducts();
  }, [id]);

  async function loadCategoryProducts() {
    try {
      setLoading(true);
      setMessage("");

      const [categoryData, productData] =
        await Promise.all([
          apiRequest(`/api/Category/${id}`),
          apiRequest(
            `/api/Product/filter?categoryId=${id}`
          ),
        ]);

      setCategory(categoryData);
      setProducts(
        (productData || []).filter(
          (product) => product.isActive
        )
      );
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <Link
          to="/home"
          style={styles.backButton}
        >
          ← Back to Dashboard
        </Link>

        {/* Category Header */}
        <div style={styles.header}>

          <div>
            <p style={styles.label}>
              CATEGORY
            </p>

            <h1>
              {category?.name || "Products"}
            </h1>

            <p style={styles.description}>
              {category?.description ||
                "Explore products in this category."}
            </p>
          </div>

          <div style={styles.productCount}>
            {products.length} Products
          </div>

        </div>

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}

        {products.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>
              🛍️
            </div>

            <h2>
              No products available
            </h2>

            <p>
              There are currently no active products
              in this category.
            </p>

            <Link
              to="/products"
              style={styles.browseButton}
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div style={styles.grid}>

            {products.map((product) => (
              <div
                key={product.id}
                style={styles.card}
              >

                <div style={styles.imageBox}>

                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={styles.image}
                    />
                  ) : (
                    <div
                      style={styles.placeholder}
                    >
                      🛍️
                    </div>
                  )}

                </div>

                <div style={styles.body}>

                  <p style={styles.category}>
                    {category?.name ||
                      product.categoryName ||
                      "Product"}
                  </p>

                  <h3>
                    {product.name}
                  </h3>

                  <p style={styles.productDescription}>
                    {product.description ||
                      "No description available."}
                  </p>

                  <div style={styles.priceRow}>

                    <strong style={styles.price}>
                      ₹
                      {Number(
                        product.price || 0
                      ).toLocaleString("en-IN")}
                    </strong>

                    <span style={styles.stock}>
                      {product.stock > 0
                        ? `Stock: ${product.stock}`
                        : "Out of stock"}
                    </span>

                  </div>

                  <Link
                    to={`/product/${product.id}`}
                    style={{
                      ...styles.productButton,
                      opacity:
                        product.stock > 0
                          ? 1
                          : 0.5,
                      pointerEvents:
                        product.stock > 0
                          ? "auto"
                          : "none",
                    }}
                  >
                    View Product →
                  </Link>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "40px 20px",
    fontFamily:
      "Arial, Helvetica, sans-serif",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  backButton: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "700",
  },

  header: {
    marginTop: "25px",
    marginBottom: "30px",
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
    marginBottom: "7px",
  },

  description: {
    color: "#64748b",
    maxWidth: "700px",
  },

  productCount: {
    padding: "10px 15px",
    background: "#dbeafe",
    color: "#1e40af",
    borderRadius: "20px",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },

  message: {
    marginBottom: "20px",
    padding: "14px",
    background: "#fff7ed",
    color: "#9a3412",
    borderRadius: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "15px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    boxShadow:
      "0 5px 18px rgba(15, 23, 42, 0.05)",
  },

  imageBox: {
    height: "200px",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  placeholder: {
    fontSize: "55px",
  },

  body: {
    padding: "18px",
  },

  category: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "7px",
  },

  productDescription: {
    color: "#64748b",
    minHeight: "42px",
    lineHeight: "1.5",
  },

  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    marginTop: "15px",
  },

  price: {
    fontSize: "20px",
  },

  stock: {
    fontSize: "13px",
    color: "#64748b",
  },

  productButton: {
    display: "block",
    marginTop: "16px",
    padding: "11px",
    background: "#2563eb",
    color: "#fff",
    textDecoration: "none",
    textAlign: "center",
    borderRadius: "8px",
    fontWeight: "700",
  },

  empty: {
    background: "#fff",
    padding: "70px 20px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow:
      "0 5px 18px rgba(15, 23, 42, 0.05)",
  },

  emptyIcon: {
    fontSize: "55px",
    marginBottom: "15px",
  },

  browseButton: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 18px",
    background: "#2563eb",
    color: "#fff",
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
};

export default CategoryProducts;