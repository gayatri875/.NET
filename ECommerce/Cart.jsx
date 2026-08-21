import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [removingId, setRemovingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  // ==========================================
  // LOAD CART
  // ==========================================
  async function loadCart() {
    try {
      setLoading(true);
      setMessage("");
      setMessageType("");

      const customerId = localStorage.getItem("customerId");

      if (!customerId) {
        throw new Error(
          "Customer ID not found. Please login again."
        );
      }

      const data = await apiRequest(
        `/api/Cart/customer/${customerId}`
      );

      setCart(data);
    } catch (error) {
      console.error("Load cart error:", error);

      setMessageType("error");
      setMessage(
        error.message || "Failed to load cart."
      );

      setCart({
        id: 0,
        customerId: 0,
        items: [],
        totalAmount: 0,
      });
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // UPDATE QUANTITY
  // ==========================================
  async function updateQuantity(item, quantity) {
    if (quantity < 1) {
      return;
    }

    const cartItemId = item.id;

    if (!cartItemId) {
      setMessageType("error");
      setMessage("Invalid cart item ID.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setMessageType("");

      await apiRequest(
        `/api/Cart/${cartItemId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            quantity: quantity,
          }),
        }
      );

      await loadCart();
    } catch (error) {
      console.error("Update quantity error:", error);

      setMessageType("error");
      setMessage(
        error.message || "Failed to update quantity."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // REMOVE CART ITEM
  // ==========================================
  async function removeItem(item) {
    const cartItemId = item.id;

    if (!cartItemId) {
      setMessageType("error");
      setMessage("Invalid cart item ID.");
      return;
    }

    const productName =
      item.productName ||
      item.product?.name ||
      `Product #${item.productId}`;

    const confirmed = window.confirm(
      `Remove "${productName}" from cart?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setRemovingId(cartItemId);
      setMessage("");
      setMessageType("");

      await apiRequest(
        `/api/Cart/${cartItemId}`,
        {
          method: "DELETE",
        }
      );

      setMessageType("success");
      setMessage(
        `"${productName}" removed from cart.`
      );

      await loadCart();

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (error) {
      console.error("Remove item error:", error);

      setMessageType("error");
      setMessage(
        error.message || "Failed to remove item."
      );
    } finally {
      setRemovingId(null);
    }
  }

  // ==========================================
  // CLEAR CART
  // ==========================================
  async function clearCart() {
    const customerId =
      localStorage.getItem("customerId");

    if (!customerId) {
      setMessageType("error");
      setMessage(
        "Customer ID not found. Please login again."
      );
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to clear your cart?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setMessageType("");

      await apiRequest(
        `/api/Cart/customer/${customerId}`,
        {
          method: "DELETE",
        }
      );

      setCart({
        id: 0,
        customerId: Number(customerId),
        items: [],
        totalAmount: 0,
      });

      setMessageType("success");
      setMessage("Cart cleared successfully.");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (error) {
      console.error("Clear cart error:", error);

      setMessageType("error");
      setMessage(
        error.message || "Failed to clear cart."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // COUPON
  // ==========================================
  function applyCoupon() {
    const code = couponCode.trim().toLowerCase();

    if (!code) {
      setMessageType("error");
      setMessage("Please enter a coupon code.");
      return;
    }

    if (code === "save10") {
      setDiscount(10);
      setMessageType("success");
      setMessage(
        "🎉 Coupon applied! 10% discount."
      );
    } else if (code === "save20") {
      setDiscount(20);
      setMessageType("success");
      setMessage(
        "🎉 Coupon applied! 20% discount."
      );
    } else {
      setDiscount(0);
      setMessageType("error");
      setMessage(
        "Invalid coupon code. Try SAVE10 or SAVE20."
      );
    }

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  }

  // ==========================================
  // LOADING
  // ==========================================
  if (loading && !cart) {
    return (
      <div style={styles.loaderContainer}>
        <div style={styles.loader}>
          <div style={styles.loaderSpinner}></div>
          <p style={styles.loaderText}>
            Loading your cart...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ITEMS
  // ==========================================
  const items = cart?.items || [];

  const subtotal = items.reduce(
    (total, item) =>
      total + Number(item.totalPrice || 0),
    0
  );

  const totalAmount =
    Number(cart?.totalAmount || 0) || subtotal;

  const discountedTotal =
    discount > 0
      ? totalAmount * (1 - discount / 100)
      : totalAmount;

  const deliveryCharge =
    totalAmount > 500 ? 0 : 40;

  const finalTotal =
    discountedTotal + deliveryCharge;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <Link to="/" style={styles.logo}>
            <span style={styles.logoIcon}>🛒</span>
            <span style={styles.logoText}>ShopVerse</span>
          </Link>

          <Link
            to="/products"
            style={styles.continueBtn}
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>

      <div style={styles.container}>
        {/* Breadcrumb */}
        <div style={styles.breadcrumb}>
          <Link to="/" style={styles.breadcrumbLink}>
            Home
          </Link>
          <span>›</span>
          <span style={styles.breadcrumbCurrent}>
            Cart
          </span>
        </div>

        {/* Message */}
        {message && (
          <div
            style={{
              ...styles.message,
              ...(messageType === "success"
                ? styles.successMessage
                : {}),
              ...(messageType === "error"
                ? styles.errorMessage
                : {}),
            }}
          >
            <span style={styles.messageIcon}>
              {messageType === "success" ? "✓" : "✕"}
            </span>
            {message}
          </div>
        )}

        {/* Empty Cart */}
        {items.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>🛒</div>

            <h2 style={styles.emptyTitle}>
              Your cart is empty
            </h2>

            <p style={styles.emptyText}>
              Looks like you haven't added any items
              to your cart yet.
            </p>

            <Link
              to="/products"
              style={styles.shopButton}
            >
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div style={styles.content}>
            {/* Cart Items */}
            <div style={styles.itemsCard}>
              <div style={styles.itemsHeader}>
                <div>
                  <h2 style={styles.itemsTitle}>
                    My Cart
                  </h2>

                  <p style={styles.itemsCount}>
                    {items.length} items
                  </p>
                </div>

                <button
                  onClick={clearCart}
                  style={styles.clearButton}
                >
                  🗑️ Clear Cart
                </button>
              </div>

              {items.map((item) => {
                const cartItemId = item.id;
                const quantity =
                  Number(item.quantity) || 1;

                const unitPrice =
                  Number(item.unitPrice) || 0;

                const totalPrice =
                  Number(item.totalPrice) ||
                  unitPrice * quantity;

                const productName =
                  item.productName ||
                  item.product?.name ||
                  `Product #${item.productId}`;

                const isRemoving =
                  removingId === cartItemId;

                return (
                  <div
                    key={cartItemId}
                    style={{
                      ...styles.item,
                      ...(isRemoving
                        ? styles.itemRemoving
                        : {}),
                    }}
                  >
                    {/* Product Image */}
                    <div style={styles.imageBox}>
                      {item.product?.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={productName}
                          style={styles.image}
                        />
                      ) : (
                        <span style={styles.placeholder}>
                          🛍️
                        </span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div style={styles.itemDetails}>
                      <p style={styles.category}>
                        Product
                      </p>

                      <h3 style={styles.itemName}>
                        {productName}
                      </h3>

                      <strong style={styles.currentPrice}>
                        ₹
                        {unitPrice.toLocaleString(
                          "en-IN"
                        )}
                      </strong>
                    </div>

                    {/* Quantity */}
                    <div style={styles.quantityBox}>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item,
                            quantity - 1
                          )
                        }
                        disabled={
                          quantity <= 1 ||
                          isRemoving
                        }
                        style={{
                          ...styles.quantityButton,
                          ...(quantity <= 1 ||
                          isRemoving
                            ? styles.quantityButtonDisabled
                            : {}),
                        }}
                      >
                        −
                      </button>

                      <span style={styles.quantityNumber}>
                        {quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item,
                            quantity + 1
                          )
                        }
                        disabled={isRemoving}
                        style={{
                          ...styles.quantityButton,
                          ...(isRemoving
                            ? styles.quantityButtonDisabled
                            : {}),
                        }}
                      >
                        +
                      </button>
                    </div>

                    {/* Total + Remove */}
                    <div style={styles.itemTotal}>
                      <strong style={styles.totalPrice}>
                        ₹
                        {totalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                      <button
                        onClick={() =>
                          removeItem(item)
                        }
                        disabled={isRemoving}
                        style={{
                          ...styles.removeButton,
                          ...(isRemoving
                            ? styles.removeButtonDisabled
                            : {}),
                        }}
                      >
                        {isRemoving
                          ? "Removing..."
                          : "Remove"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div style={styles.summaryCard}>
              <h2 style={styles.summaryTitle}>
                Order Summary
              </h2>

              <div style={styles.summaryRow}>
                <span>
                  Subtotal ({items.length} items)
                </span>

                <strong>
                  ₹
                  {subtotal.toLocaleString("en-IN")}
                </strong>
              </div>

              {discount > 0 && (
                <div
                  style={{
                    ...styles.summaryRow,
                    color: "#388e3c",
                  }}
                >
                  <span>
                    Discount ({discount}%)
                  </span>

                  <strong>
                    -₹
                    {(
                      (subtotal * discount) /
                      100
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>
              )}

              <div style={styles.summaryRow}>
                <span>Delivery Charges</span>

                <strong>
                  {deliveryCharge === 0
                    ? "Free"
                    : `₹${deliveryCharge}`}
                </strong>
              </div>

              <div style={styles.divider} />

              <div
                style={{
                  ...styles.summaryRow,
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                <span>Total</span>

                <strong>
                  ₹
                  {finalTotal.toLocaleString("en-IN")}
                </strong>
              </div>

              <div style={styles.couponSection}>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) =>
                    setCouponCode(e.target.value)
                  }
                  style={styles.couponInput}
                />

                <button
                  onClick={applyCoupon}
                  style={styles.couponButton}
                >
                  Apply
                </button>
              </div>

              <p style={styles.couponHint}>
                Try: SAVE10 or SAVE20
              </p>

              <button
                onClick={() => navigate("/checkout")}
                style={styles.checkoutButton}
              >
                Proceed to Checkout →
              </button>

              <div style={styles.secureBadge}>
                🔒 Secure Checkout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f3f6",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  header: {
    background: "#2874f0",
    padding: "12px 0",
  },

  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    color: "#fff",
    textDecoration: "none",
    display: "flex",
    gap: "6px",
    alignItems: "center",
  },

  logoIcon: {
    fontSize: "24px",
  },

  logoText: {
    fontSize: "20px",
    fontWeight: "700",
  },

  continueBtn: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "600",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },

  breadcrumb: {
    display: "flex",
    gap: "8px",
    marginBottom: "20px",
    color: "#878787",
  },

  breadcrumbLink: {
    color: "#2874f0",
    textDecoration: "none",
  },

  breadcrumbCurrent: {
    color: "#212121",
    fontWeight: "600",
  },

  message: {
    padding: "14px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
    display: "flex",
    gap: "10px",
  },

  successMessage: {
    background: "#e8f5e9",
    color: "#2e7d32",
  },

  errorMessage: {
    background: "#ffebee",
    color: "#c62828",
  },

  messageIcon: {
    fontWeight: "700",
  },

  empty: {
    background: "#fff",
    padding: "80px 20px",
    textAlign: "center",
    borderRadius: "12px",
  },

  emptyIcon: {
    fontSize: "80px",
  },

  emptyTitle: {
    fontSize: "24px",
  },

  emptyText: {
    color: "#878787",
    marginBottom: "24px",
  },

  shopButton: {
    display: "inline-block",
    padding: "12px 32px",
    background: "#fb641b",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "700",
  },

  content: {
    display: "grid",
    gridTemplateColumns: "1fr 340px",
    gap: "20px",
    alignItems: "start",
  },

  itemsCard: {
    background: "#fff",
    padding: "20px 24px",
    borderRadius: "12px",
  },

  itemsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "16px",
    borderBottom: "1px solid #f0f0f0",
  },

  itemsTitle: {
    fontSize: "20px",
    margin: 0,
  },

  itemsCount: {
    color: "#878787",
  },

  clearButton: {
    padding: "8px 16px",
    background: "#ffebee",
    color: "#c62828",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },

  item: {
    display: "grid",
    gridTemplateColumns:
      "120px 1fr auto auto",
    gap: "20px",
    alignItems: "center",
    padding: "16px 0",
    borderBottom: "1px solid #f0f0f0",
  },

  itemRemoving: {
    opacity: 0.5,
    pointerEvents: "none",
  },

  imageBox: {
    width: "120px",
    height: "120px",
    background: "#f8f8f8",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  placeholder: {
    fontSize: "40px",
  },

  itemDetails: {
    minWidth: 0,
  },

  category: {
    color: "#878787",
    fontSize: "12px",
  },

  itemName: {
    fontSize: "16px",
    margin: "0 0 8px",
  },

  currentPrice: {
    fontSize: "18px",
  },

  quantityBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "4px",
  },

  quantityButton: {
    width: "32px",
    height: "32px",
    border: "none",
    cursor: "pointer",
  },

  quantityButtonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  quantityNumber: {
    minWidth: "24px",
    textAlign: "center",
    fontWeight: "600",
  },

  itemTotal: {
    textAlign: "right",
  },

  totalPrice: {
    fontSize: "18px",
    display: "block",
  },

  removeButton: {
    marginTop: "6px",
    border: "none",
    background: "transparent",
    color: "#ff6161",
    cursor: "pointer",
    fontWeight: "600",
  },

  removeButtonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  summaryCard: {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    position: "sticky",
    top: "20px",
  },

  summaryTitle: {
    fontSize: "18px",
    marginBottom: "20px",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
  },

  divider: {
    borderTop: "1px solid #f0f0f0",
    margin: "12px 0",
  },

  couponSection: {
    display: "flex",
    gap: "8px",
    marginTop: "16px",
  },

  couponInput: {
    flex: 1,
    padding: "10px",
  },

  couponButton: {
    padding: "10px 20px",
    background: "#2874f0",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  couponHint: {
    fontSize: "12px",
    color: "#878787",
  },

  checkoutButton: {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    background: "#fb641b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "700",
    cursor: "pointer",
  },

  secureBadge: {
    textAlign: "center",
    marginTop: "12px",
    color: "#878787",
    fontSize: "13px",
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
  },
};

const styleSheet =
  document.createElement("style");

styleSheet.textContent = `
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

document.head.appendChild(styleSheet);

export default Cart;