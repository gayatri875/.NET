import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [customer, setCustomer] = useState(null);

  const [shippingAddress, setShippingAddress] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] =
    useState(false);

  const [message, setMessage] = useState("");

  // ==========================================
  // LOAD CHECKOUT DATA
  // ==========================================
  useEffect(() => {
    loadCheckoutData();
  }, []);

  async function loadCheckoutData() {
    try {
      setLoading(true);
      setMessage("");

      // ========================================
      // GET CUSTOMER ID
      // ========================================
      let customerId =
        localStorage.getItem("customerId");

      /*
       * If customerId is missing, try to get
       * the customer profile from backend.
       */
      if (!customerId) {
        const customerData =
          await apiRequest(
            "/api/Customer/me"
          );

        if (!customerData?.id) {
          throw new Error(
            "Customer profile not found. Please create your profile first."
          );
        }

        customerId = String(
          customerData.id
        );

        localStorage.setItem(
          "customerId",
          customerId
        );

        setCustomer(customerData);

        setShippingAddress(
          customerData.address || ""
        );
      }

      // ========================================
      // GET CUSTOMER PROFILE
      // ========================================
      if (!customer) {
        const customerData =
          await apiRequest(
            "/api/Customer/me"
          );

        setCustomer(customerData);

        if (customerData?.id) {
          localStorage.setItem(
            "customerId",
            String(customerData.id)
          );
        }

        setShippingAddress(
          customerData?.address || ""
        );
      }

      // ========================================
      // GET CART
      // ========================================
      const cartData =
        await apiRequest(
          `/api/Cart/customer/${customerId}`
        );

      console.log(
        "CHECKOUT CART:",
        cartData
      );

      setCart(cartData);

    } catch (error) {
      console.error(
        "CHECKOUT LOAD ERROR:",
        error
      );

      setMessage(
        error.message ||
          "Unable to load checkout."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // PLACE ORDER
  // ==========================================
  async function placeOrder(e) {
    e.preventDefault();

    setMessage("");

    // ------------------------------------------
    // ADDRESS VALIDATION
    // ------------------------------------------
    if (!shippingAddress.trim()) {
      setMessage(
        "Please enter your delivery address."
      );
      return;
    }

    // ------------------------------------------
    // CUSTOMER ID
    // ------------------------------------------
    let customerId =
      localStorage.getItem("customerId");

    // Try backend if localStorage missing
    if (!customerId) {
      try {
        const customerData =
          await apiRequest(
            "/api/Customer/me"
          );

        if (!customerData?.id) {
          throw new Error(
            "Customer profile not found."
          );
        }

        customerId = String(
          customerData.id
        );

        localStorage.setItem(
          "customerId",
          customerId
        );

      } catch (error) {
        setMessage(
          error.message ||
            "Customer ID not found. Please create your profile first."
        );

        return;
      }
    }

    // ------------------------------------------
    // CART ITEMS
    // ------------------------------------------
    const items =
      cart?.items ||
      cart?.cartItems ||
      [];

    if (!items.length) {
      setMessage(
        "Your cart is empty."
      );
      return;
    }

    try {
      setPlacingOrder(true);

      // ========================================
      // CREATE ORDER ITEMS
      // ========================================
      const orderItems = items.map(
        (item) => {
          const productId = Number(
            item.productId ??
              item.product?.id ??
              item.productID
          );

          const quantity = Number(
            item.quantity
          );

          return {
            productId,
            quantity,
          };
        }
      );

      // ========================================
      // VALIDATE ORDER ITEMS
      // ========================================
      const invalidItem =
        orderItems.find(
          (item) =>
            !item.productId ||
            item.productId <= 0 ||
            !item.quantity ||
            item.quantity <= 0
        );

      if (invalidItem) {
        console.error(
          "INVALID ORDER ITEM:",
          invalidItem
        );

        throw new Error(
          "Invalid product or quantity found in cart."
        );
      }

      // ========================================
      // ORDER REQUEST
      // ========================================
      const orderData = {
        customerId:
          Number(customerId),

        shippingAddress:
          shippingAddress.trim(),

        orderItems,
      };

      console.log(
        "ORDER REQUEST:",
        orderData
      );

      // ========================================
      // CREATE ORDER
      // ========================================
      const order =
        await apiRequest(
          "/api/Order",
          {
            method: "POST",
            body: JSON.stringify(
              orderData
            ),
          }
        );

      console.log(
        "ORDER CREATED:",
        order
      );

      // ========================================
      // SUCCESS
      // ========================================
      setMessage(
        "Order placed successfully!"
      );

      setTimeout(() => {
        navigate(
          `/orders/${order.id}`
        );
      }, 700);

    } catch (error) {
      console.error(
        "PLACE ORDER ERROR:",
        error
      );

      setMessage(
        error.message ||
          "Unable to place order."
      );
    } finally {
      setPlacingOrder(false);
    }
  }

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div style={styles.center}>
        <div>
          <h2>
            Loading checkout...
          </h2>

          <p>
            Please wait.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // CART ITEMS
  // ==========================================
  const items =
    cart?.items ||
    cart?.cartItems ||
    [];

  // ==========================================
  // TOTAL
  // ==========================================
  const totalAmount =
    Number(
      cart?.totalAmount ??
        cart?.total ??
        cart?.totalPrice ??
        0
    );

  // ==========================================
  // EMPTY CART
  // ==========================================
  if (items.length === 0) {
    return (
      <div style={styles.page}>
        <div style={styles.empty}>

          <div style={styles.emptyIcon}>
            🛒
          </div>

          <h2>
            Your cart is empty
          </h2>

          <p>
            Add products before going to
            checkout.
          </p>

          <Link
            to="/products"
            style={styles.shopButton}
          >
            Browse Products →
          </Link>

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
          to="/cart"
          style={styles.backButton}
        >
          ← Back to Cart
        </Link>


        {/* =====================================
            HEADER
        ===================================== */}

        <div style={styles.header}>

          <p style={styles.label}>
            CHECKOUT
          </p>

          <h1>
            Complete Your Order
          </h1>

          <p style={styles.subtitle}>
            Confirm your delivery details and
            place your order.
          </p>

        </div>


        {/* =====================================
            MESSAGE
        ===================================== */}

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}


        <div style={styles.layout}>

          {/* ==================================
              DELIVERY DETAILS
          ================================== */}

          <div style={styles.formCard}>

            <div style={styles.profileHeader}>

              <div>
                <h2>
                  Delivery Details
                </h2>

                <p style={styles.smallText}>
                  Your saved customer profile
                  is used here.
                </p>
              </div>

              <Link
                to="/profile"
                style={styles.editProfile}
              >
                ✏️ Edit Profile
              </Link>

            </div>


            {/* CUSTOMER INFO */}

            {customer && (
              <div style={styles.profileBox}>

                <div>
                  <span style={styles.caption}>
                    Customer
                  </span>

                  <strong>
                    {customer.fullName ||
                      "Customer"}
                  </strong>
                </div>

                <div>
                  <span style={styles.caption}>
                    Phone
                  </span>

                  <strong>
                    {customer.phone ||
                      "Not available"}
                  </strong>
                </div>

              </div>
            )}


            {/* CHECKOUT FORM */}

            <form onSubmit={placeOrder}>

              <div style={styles.addressHeader}>

                <label
                  style={styles.labelText}
                >
                  Shipping Address
                </label>

                <Link
                  to="/profile"
                  style={styles.editAddress}
                >
                  ✏️ Edit Address
                </Link>

              </div>

              <textarea
                value={shippingAddress}
                onChange={(e) =>
                  setShippingAddress(
                    e.target.value
                  )
                }
                placeholder="Enter your complete delivery address"
                rows="7"
                required
                style={styles.textarea}
              />


              <div style={styles.infoBox}>
                🚚 This address will be used
                for this order.
              </div>


              <button
                type="submit"
                disabled={placingOrder}
                style={{
                  ...styles.placeOrderButton,
                  opacity:
                    placingOrder
                      ? 0.7
                      : 1,
                }}
              >
                {placingOrder
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

            </form>

          </div>


          {/* ==================================
              ORDER SUMMARY
          ================================== */}

          <div style={styles.summaryCard}>

            <h2>
              Order Summary
            </h2>

            <div style={styles.itemList}>

              {items.map((item, index) => {

                const product =
                  item.product || {};

                const productId =
                  item.productId ??
                  product.id;

                const quantity =
                  Number(
                    item.quantity || 1
                  );

                const unitPrice =
                  Number(
                    item.unitPrice ??
                      item.price ??
                      product.price ??
                      0
                  );

                const itemTotal =
                  Number(
                    item.totalPrice ??
                      unitPrice *
                        quantity
                  );

                return (
                  <div
                    key={
                      item.id ??
                      `${productId}-${index}`
                    }
                    style={styles.summaryItem}
                  >

                    <div>

                      <strong>
                        {product.name ||
                          item.productName ||
                          `Product #${productId}`}
                      </strong>

                      <span
                        style={styles.qty}
                      >
                        Qty: {quantity}
                      </span>

                    </div>


                    <strong>
                      ₹
                      {itemTotal.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>
                );
              })}

            </div>


            <div style={styles.divider} />


            <div style={styles.totalRow}>

              <span>
                Subtotal
              </span>

              <strong>
                ₹
                {totalAmount.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>


            <div style={styles.totalRow}>

              <span>
                Delivery
              </span>

              <strong>
                Free
              </strong>

            </div>


            <div style={styles.divider} />


            <div style={styles.grandTotal}>

              <span>
                Total
              </span>

              <strong>
                ₹
                {totalAmount.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}


// ==============================================
// STYLES
// ==============================================

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

  header: {
    marginTop: "25px",
    marginBottom: "30px",
  },

  label: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    marginBottom: "7px",
  },

  subtitle: {
    color: "#64748b",
    lineHeight: "1.5",
  },

  message: {
    marginBottom: "20px",
    padding: "14px",
    background: "#eff6ff",
    color: "#1e40af",
    borderRadius: "10px",
    fontWeight: "600",
  },

  layout: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1fr) 380px",
    gap: "25px",
    alignItems: "start",
  },

  formCard: {
    background: "#fff",
    padding: "28px",
    borderRadius: "16px",
    boxShadow:
      "0 8px 25px rgba(15,23,42,0.06)",
  },

  profileHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
  },

  smallText: {
    color: "#64748b",
    fontSize: "13px",
  },

  editProfile: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },

  profileBox: {
    marginTop: "20px",
    padding: "16px",
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    display: "grid",
    gridTemplateColumns:
      "repeat(2, 1fr)",
    gap: "20px",
  },

  caption: {
    display: "block",
    color: "#64748b",
    fontSize: "12px",
    marginBottom: "5px",
  },

  addressHeader: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
  },

  labelText: {
    display: "block",
    color: "#334155",
    fontWeight: "700",
  },

  editAddress: {
    color: "#2563eb",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "700",
  },

  textarea: {
    width: "100%",
    marginTop: "8px",
    padding: "13px",
    border: "1px solid #d1d5db",
    borderRadius: "9px",
    fontSize: "15px",
    resize: "vertical",
    boxSizing: "border-box",
  },

  infoBox: {
    marginTop: "18px",
    padding: "12px",
    background: "#f0fdf4",
    color: "#166534",
    borderRadius: "8px",
    fontSize: "14px",
  },

  placeOrderButton: {
    width: "100%",
    marginTop: "20px",
    padding: "14px",
    border: "none",
    borderRadius: "9px",
    background: "#16a34a",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "800",
    cursor: "pointer",
  },

  summaryCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow:
      "0 8px 25px rgba(15,23,42,0.06)",
    position: "sticky",
    top: "90px",
  },

  itemList: {
    marginTop: "18px",
  },

  summaryItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    padding: "14px 0",
    borderBottom:
      "1px solid #f1f5f9",
  },

  qty: {
    display: "block",
    marginTop: "5px",
    color: "#64748b",
    fontSize: "13px",
  },

  divider: {
    borderTop:
      "1px solid #e5e7eb",
    margin: "20px 0",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "12px",
  },

  grandTotal: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
  },

  empty: {
    maxWidth: "600px",
    margin: "100px auto",
    background: "#fff",
    padding: "60px 20px",
    textAlign: "center",
    borderRadius: "16px",
    boxShadow:
      "0 8px 25px rgba(15,23,42,0.06)",
  },

  emptyIcon: {
    fontSize: "60px",
  },

  shopButton: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 20px",
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
    textAlign: "center",
  },
};

export default Checkout;