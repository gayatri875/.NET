import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      setLoading(true);

      const data = await apiRequest(
        `/api/Product/${id}`
      );

      setProduct(data);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function increaseQuantity() {
    if (!product) return;

    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  async function addToCart() {
    const customerId =
      localStorage.getItem("customerId");

    if (!customerId) {
      setMessage(
        "Customer ID not found. Please login again."
      );
      return;
    }

    if (!product) {
      return;
    }

    if (product.stock <= 0) {
      setMessage("Product is out of stock.");
      return;
    }

    if (quantity > product.stock) {
      setMessage(
        "Selected quantity is greater than available stock."
      );
      return;
    }

    try {
      setAdding(true);
      setMessage("");

      const cartData = {
        customerId: Number(customerId),
        productId: product.id,
        quantity: quantity,
      };

      await apiRequest("/api/Cart", {
        method: "POST",
        body: JSON.stringify(cartData),
      });

      setMessage(
        "Product added to cart successfully."
      );

    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setAdding(false);
    }
  }

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={styles.center}>
        <h2>
          {message || "Product not found."}
        </h2>

        <Link to="/products">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <Link
          to="/products"
          style={styles.backButton}
        >
          ← Back to Products
        </Link>

        <div style={styles.productCard}>

          {/* IMAGE */}
          <div style={styles.imageSection}>
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                style={styles.image}
              />
            ) : (
              <div style={styles.placeholder}>
                🛍️
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div style={styles.detailsSection}>

            <p style={styles.category}>
              {product.categoryName ||
                "Product"}
            </p>

            <h1 style={styles.title}>
              {product.name}
            </h1>

            <p style={styles.description}>
              {product.description ||
                "No description available."}
            </p>

            <div style={styles.price}>
              ₹
              {Number(
                product.price || 0
              ).toLocaleString("en-IN")}
            </div>

            <div style={styles.stock}>
              {product.stock > 0
                ? `✓ ${product.stock} items available`
                : "✕ Out of stock"}
            </div>

            {product.stock > 0 && (
              <>
                {/* QUANTITY */}
                <div style={styles.quantitySection}>

                  <span style={styles.quantityLabel}>
                    Quantity
                  </span>

                  <div style={styles.quantityBox}>

                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      style={styles.quantityButton}
                    >
                      −
                    </button>

                    <span style={styles.quantityValue}>
                      {quantity}
                    </span>

                    <button
                      onClick={increaseQuantity}
                      disabled={
                        quantity >= product.stock
                      }
                      style={styles.quantityButton}
                    >
                      +
                    </button>

                  </div>
                </div>

                {/* ADD TO CART */}
                <button
                  onClick={addToCart}
                  disabled={adding}
                  style={{
                    ...styles.cartButton,
                    opacity: adding ? 0.7 : 1,
                  }}
                >
                  {adding
                    ? "Adding..."
                    : "🛒 Add to Cart"}
                </button>

                {/* GO TO CART */}
                <button
                  onClick={() =>
                    navigate("/cart")
                  }
                  style={styles.viewCartButton}
                >
                  View Cart
                </button>
              </>
            )}

            {message && (
              <div style={styles.message}>
                {message}
              </div>
            )}

          </div>
        </div>

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
    maxWidth: "1100px",
    margin: "0 auto",
  },

  backButton: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "700",
  },

  productCard: {
    marginTop: "25px",
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    boxShadow:
      "0 10px 30px rgba(15, 23, 42, 0.08)",
  },

  imageSection: {
    minHeight: "520px",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    maxHeight: "520px",
    objectFit: "cover",
  },

  placeholder: {
    fontSize: "90px",
  },

  detailsSection: {
    padding: "45px",
  },

  category: {
    color: "#2563eb",
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  title: {
    fontSize: "38px",
    margin: "12px 0",
  },

  description: {
    color: "#64748b",
    lineHeight: "1.7",
    fontSize: "16px",
  },

  price: {
    fontSize: "32px",
    fontWeight: "800",
    marginTop: "25px",
  },

  stock: {
    marginTop: "12px",
    color: "#16a34a",
    fontWeight: "700",
  },

  quantitySection: {
    marginTop: "30px",
  },

  quantityLabel: {
    display: "block",
    fontWeight: "700",
    marginBottom: "10px",
  },

  quantityBox: {
    width: "140px",
    display: "flex",
    alignItems: "center",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    overflow: "hidden",
  },

  quantityButton: {
    width: "42px",
    height: "42px",
    border: "none",
    background: "#f8fafc",
    fontSize: "20px",
    cursor: "pointer",
  },

  quantityValue: {
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
  },

  cartButton: {
    width: "100%",
    marginTop: "25px",
    padding: "14px",
    border: "none",
    borderRadius: "9px",
    background: "#2563eb",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "800",
    cursor: "pointer",
  },

  viewCartButton: {
    width: "100%",
    marginTop: "12px",
    padding: "13px",
    border: "1px solid #2563eb",
    borderRadius: "9px",
    background: "#fff",
    color: "#2563eb",
    fontWeight: "800",
    cursor: "pointer",
  },

  message: {
    marginTop: "18px",
    padding: "12px 14px",
    borderRadius: "8px",
    background: "#eff6ff",
    color: "#1e40af",
    fontWeight: "600",
  },

  center: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "15px",
  },
};

export default ProductDetails;