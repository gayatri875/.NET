import { Link } from "react-router-dom";

function PublicDashboard() {
  return (
    <div style={styles.page}>

      {/* ================= NAVBAR ================= */}
      <nav style={styles.navbar}>

        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>🛒</span>
          ShopVerse
        </Link>

        <div style={styles.navLinks}>
          <a href="#home" style={styles.navLink}>
            Home
          </a>

          <a href="#features" style={styles.navLink}>
            Features
          </a>

          <a href="#categories" style={styles.navLink}>
            Categories
          </a>

          <a href="#testimonials" style={styles.navLink}>
            Testimonials
          </a>

          <Link
            to="/login"
            style={styles.loginButton}
          >
            Sign In
          </Link>

          <Link
            to="/register"
            style={styles.registerButton}
          >
            Get Started
          </Link>
        </div>

      </nav>


      {/* ================= HERO ================= */}
      <section
        id="home"
        style={styles.hero}
      >

        <div style={styles.heroContent}>

          <span style={styles.badge}>
            🚀 NEXT-GEN SHOPPING
          </span>

          <h1 style={styles.heroTitle}>
            Discover, Shop & 
            <br />
            <span style={styles.highlight}>Elevate</span> Your Style
          </h1>

          <p style={styles.heroText}>
            Join millions of happy shoppers at ShopVerse. 
            Explore curated collections, exclusive deals, 
            and a seamless shopping experience tailored just for you.
          </p>

          <div style={styles.heroButtons}>

            <Link
              to="/register"
              style={styles.primaryButton}
            >
              Start Shopping →
            </Link>

            <Link
              to="/login"
              style={styles.secondaryButton}
            >
              Sign In
            </Link>

          </div>

          <div style={styles.trustBadges}>
            <span>✓ 50K+ Happy Customers</span>
            <span>✓ 4.9/5 Rating</span>
            <span>✓ 30-Day Returns</span>
          </div>

        </div>


        <div style={styles.heroVisual}>

          <div style={styles.floatingCard}>

            <div style={styles.floatingCardInner}>
              <span style={styles.floatingIcon}>🎯</span>
              <div>
                <h3 style={styles.floatingTitle}>Smart Shopping</h3>
                <p style={styles.floatingText}>AI-powered recommendations</p>
              </div>
            </div>

            <div style={styles.floatingCardInner}>
              <span style={styles.floatingIcon}>⚡</span>
              <div>
                <h3 style={styles.floatingTitle}>Lightning Fast</h3>
                <p style={styles.floatingText}>Same-day delivery available</p>
              </div>
            </div>

            <div style={styles.floatingCardInner}>
              <span style={styles.floatingIcon}>🔒</span>
              <div>
                <h3 style={styles.floatingTitle}>Secure Payments</h3>
                <p style={styles.floatingText}>100% encrypted transactions</p>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section
        id="features"
        style={styles.section}
      >

        <div style={styles.sectionTitle}>
          <span style={styles.sectionLabel}>
            WHY SHOPVERSE
          </span>

          <h2 style={styles.sectionHeading}>
            Built for the Modern Shopper
          </h2>

          <p style={styles.sectionSubtext}>
            Experience the future of online shopping with 
            powerful features designed to make every purchase effortless.
          </p>
        </div>


        <div style={styles.featureGrid}>

          <FeatureCard
            icon="🛡️"
            title="Trust & Security"
            text="Bank-grade encryption and fraud protection keep your data and transactions completely safe."
          />

          <FeatureCard
            icon="🚀"
            title="Express Delivery"
            text="Real-time order tracking with lightning-fast shipping options to get your products sooner."
          />

          <FeatureCard
            icon="🎨"
            title="Curated Collections"
            text="Handpicked products from premium brands, updated daily with trending styles and essentials."
          />

          <FeatureCard
            icon="💎"
            title="Premium Support"
            text="24/7 dedicated support team ready to assist you with any questions or concerns."
          />

        </div>

      </section>


      {/* ================= CATEGORIES ================= */}
      <section
        id="categories"
        style={styles.categorySection}
      >

        <div style={styles.sectionTitle}>
          <span style={styles.sectionLabel}>
            SHOP BY CATEGORY
          </span>

          <h2 style={styles.sectionHeading}>
            Find Your Favorites
          </h2>

          <p style={styles.sectionSubtext}>
            Browse through our extensive collection 
            across multiple categories and discover your next purchase.
          </p>
        </div>


        <div style={styles.categoryGrid}>

          <CategoryCard
            icon="💻"
            name="Electronics"
            count="2,500+ Products"
          />

          <CategoryCard
            icon="📱"
            name="Smartphones"
            count="1,800+ Products"
          />

          <CategoryCard
            icon="👕"
            name="Fashion"
            count="3,200+ Products"
          />

          <CategoryCard
            icon="🏠"
            name="Home & Living"
            count="1,900+ Products"
          />

          <CategoryCard
            icon="📚"
            name="Books & Media"
            count="4,000+ Products"
          />

          <CategoryCard
            icon="🎮"
            name="Gaming"
            count="1,200+ Products"
          />

        </div>

      </section>


      {/* ================= TESTIMONIALS ================= */}
      <section
        id="testimonials"
        style={styles.testimonialSection}
      >

        <div style={styles.sectionTitle}>
          <span style={styles.sectionLabel}>
            TESTIMONIALS
          </span>

          <h2 style={styles.sectionHeading}>
            What Our Shoppers Say
          </h2>

          <p style={styles.sectionSubtext}>
            Real experiences from real customers who love shopping at ShopVerse.
          </p>
        </div>

        <div style={styles.testimonialGrid}>

          <div style={styles.testimonialCard}>
            <div style={styles.stars}>⭐⭐⭐⭐⭐</div>
            <p style={styles.testimonialText}>
              "ShopVerse completely transformed my online shopping experience. 
              The interface is intuitive and the delivery is always on time!"
            </p>
            <div style={styles.testimonialAuthor}>
              <span style={styles.authorAvatar}>👩</span>
              <div>
                <h4 style={styles.authorName}>Sarah Johnson</h4>
                <p style={styles.authorRole}>Verified Buyer</p>
              </div>
            </div>
          </div>

          <div style={styles.testimonialCard}>
            <div style={styles.stars}>⭐⭐⭐⭐⭐</div>
            <p style={styles.testimonialText}>
              "The best e-commerce platform I've ever used. 
              Great selection, competitive prices, and exceptional customer service."
            </p>
            <div style={styles.testimonialAuthor}>
              <span style={styles.authorAvatar}>👨</span>
              <div>
                <h4 style={styles.authorName}>Michael Chen</h4>
                <p style={styles.authorRole}>Tech Enthusiast</p>
              </div>
            </div>
          </div>

          <div style={styles.testimonialCard}>
            <div style={styles.stars}>⭐⭐⭐⭐⭐</div>
            <p style={styles.testimonialText}>
              "I've recommended ShopVerse to all my friends. 
              The quality of products and seamless checkout process is unmatched."
            </p>
            <div style={styles.testimonialAuthor}>
              <span style={styles.authorAvatar}>👩</span>
              <div>
                <h4 style={styles.authorName}>Emily Rodriguez</h4>
                <p style={styles.authorRole}>Fashion Blogger</p>
              </div>
            </div>
          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}
      <section style={styles.statsSection}>

        <div style={styles.statsGrid}>

          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>50K+</h3>
            <p style={styles.statLabel}>Happy Customers</p>
          </div>

          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>10K+</h3>
            <p style={styles.statLabel}>Products</p>
          </div>

          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>4.9/5</h3>
            <p style={styles.statLabel}>Average Rating</p>
          </div>

          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>99.9%</h3>
            <p style={styles.statLabel}>Satisfaction Rate</p>
          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section style={styles.cta}>

        <h2 style={styles.ctaHeading}>
          Ready to Elevate Your Shopping?
        </h2>

        <p style={styles.ctaText}>
          Join 50,000+ happy shoppers and discover 
          why ShopVerse is the preferred choice for millions.
        </p>

        <Link
          to="/register"
          style={styles.ctaButton}
        >
          Create Free Account →
        </Link>

        <p style={styles.ctaNote}>
          No credit card required. Start shopping instantly.
        </p>

      </section>


      {/* ================= FOOTER ================= */}
      <footer style={styles.footer}>

        <div style={styles.footerContent}>

          <div style={styles.footerBrand}>
            <h3 style={styles.footerLogo}>
              <span>🛒</span> ShopVerse
            </h3>
            <p style={styles.footerDescription}>
              Your trusted destination for premium online shopping.
              Quality products, exceptional service, and unbeatable prices.
            </p>
            <div style={styles.socialLinks}>
              <a href="#" style={styles.socialLink}>📱</a>
              <a href="#" style={styles.socialLink}>🐦</a>
              <a href="#" style={styles.socialLink}>📸</a>
              <a href="#" style={styles.socialLink}>💼</a>
            </div>
          </div>

          <div style={styles.footerLinks}>
            <h4>Quick Links</h4>
            <a href="#" style={styles.footerLink}>About Us</a>
            <a href="#" style={styles.footerLink}>Contact</a>
            <a href="#" style={styles.footerLink}>FAQ</a>
            <a href="#" style={styles.footerLink}>Blog</a>
          </div>

          <div style={styles.footerLinks}>
            <h4>Customer Service</h4>
            <a href="#" style={styles.footerLink}>Help Center</a>
            <a href="#" style={styles.footerLink}>Returns Policy</a>
            <a href="#" style={styles.footerLink}>Shipping Info</a>
            <a href="#" style={styles.footerLink}>Track Order</a>
          </div>

          <div style={styles.footerLinks}>
            <h4>Legal</h4>
            <a href="#" style={styles.footerLink}>Privacy Policy</a>
            <a href="#" style={styles.footerLink}>Terms of Service</a>
            <a href="#" style={styles.footerLink}>Cookie Policy</a>
          </div>

        </div>

        <div style={styles.footerBottom}>
          <p style={styles.copyright}>
            © 2026 ShopVerse. All rights reserved. Made with ❤️
          </p>
        </div>

      </footer>

    </div>
  );
}


/* =========================================
   FEATURE CARD
========================================= */

function FeatureCard({
  icon,
  title,
  text,
}) {
  return (
    <div style={styles.featureCard}>

      <div style={styles.featureIcon}>
        {icon}
      </div>

      <h3 style={styles.featureTitle}>{title}</h3>

      <p style={styles.featureText}>{text}</p>

    </div>
  );
}


/* =========================================
   CATEGORY CARD
========================================= */

function CategoryCard({
  icon,
  name,
  count,
}) {
  return (
    <div style={styles.categoryCard}>

      <div style={styles.categoryIcon}>
        {icon}
      </div>

      <h3 style={styles.categoryName}>{name}</h3>

      <p style={styles.categoryCount}>{count}</p>

      <Link to="/register" style={styles.categoryLink}>
        Explore →
      </Link>

    </div>
  );
}


/* =========================================
   STYLES
========================================= */

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    color: "#0f172a",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },


  /* NAVBAR */
  navbar: {
    minHeight: "80px",
    padding: "0 6%",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(229, 231, 235, 0.5)",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    gap: "20px",

    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  logo: {
    color: "#0f172a",
    textDecoration: "none",
    fontSize: "26px",
    fontWeight: "800",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  logoIcon: {
    fontSize: "28px",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    flexWrap: "wrap",
  },

  navLink: {
    color: "#475569",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
    transition: "color 0.2s",
  },

  loginButton: {
    padding: "10px 20px",
    border: "1.5px solid #2563eb",
    borderRadius: "10px",
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "14px",
    transition: "all 0.2s",
  },

  registerButton: {
    padding: "11px 22px",
    background: "#2563eb",
    color: "#ffffff",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "14px",
    transition: "all 0.2s",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
  },


  /* HERO */
  hero: {
    minHeight: "700px",
    padding: "80px 8%",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    gap: "60px",

    background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #eef2ff 100%)",
    position: "relative",
    overflow: "hidden",
  },

  heroContent: {
    maxWidth: "650px",
    flexShrink: 0,
  },

  badge: {
    display: "inline-block",
    padding: "8px 16px",
    background: "rgba(37, 99, 235, 0.1)",
    color: "#2563eb",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  heroTitle: {
    fontSize: "56px",
    lineHeight: "1.1",
    margin: "24px 0",
    fontWeight: "800",
  },

  highlight: {
    background: "linear-gradient(135deg, #2563eb, #1e3a8a)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  heroText: {
    color: "#475569",
    fontSize: "18px",
    lineHeight: "1.8",
    maxWidth: "550px",
    fontWeight: "400",
  },

  heroButtons: {
    display: "flex",
    gap: "16px",
    marginTop: "32px",
    flexWrap: "wrap",
  },

  primaryButton: {
    padding: "16px 32px",
    background: "#2563eb",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "16px",
    transition: "all 0.2s",
    boxShadow: "0 8px 24px rgba(37, 99, 235, 0.35)",
  },

  secondaryButton: {
    padding: "16px 32px",
    background: "#ffffff",
    color: "#2563eb",
    textDecoration: "none",
    border: "2px solid #2563eb",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "16px",
    transition: "all 0.2s",
  },

  trustBadges: {
    display: "flex",
    gap: "24px",
    marginTop: "32px",
    padding: "16px 0",
    borderTop: "1px solid #e5e7eb",
    color: "#475569",
    fontSize: "14px",
    fontWeight: "500",
  },

  heroVisual: {
    width: "400px",
    height: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  floatingCard: {
    width: "100%",
    padding: "30px",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(16px)",
    borderRadius: "24px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 20px 60px rgba(37, 99, 235, 0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  floatingCardInner: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "12px 16px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
  },

  floatingIcon: {
    fontSize: "28px",
  },

  floatingTitle: {
    fontSize: "15px",
    fontWeight: "700",
    margin: 0,
    color: "#0f172a",
  },

  floatingText: {
    fontSize: "13px",
    color: "#64748b",
    margin: "4px 0 0 0",
  },


  /* SECTIONS */
  section: {
    padding: "100px 7%",
    background: "#ffffff",
  },

  categorySection: {
    padding: "100px 7%",
    background: "#f8fafc",
  },

  testimonialSection: {
    padding: "100px 7%",
    background: "#ffffff",
  },

  statsSection: {
    padding: "60px 7%",
    background: "#0f172a",
  },

  sectionTitle: {
    maxWidth: "700px",
    margin: "0 auto 56px",
    textAlign: "center",
  },

  sectionLabel: {
    color: "#2563eb",
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },

  sectionHeading: {
    fontSize: "40px",
    fontWeight: "800",
    margin: "16px 0",
    color: "#0f172a",
  },

  sectionSubtext: {
    color: "#64748b",
    fontSize: "18px",
    lineHeight: "1.7",
  },


  /* FEATURES */
  featureGrid: {
    maxWidth: "1200px",
    margin: "0 auto",

    display: "grid",

    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",

    gap: "28px",
  },

  featureCard: {
    padding: "32px",
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    borderRadius: "20px",
    transition: "all 0.3s",
  },

  featureIcon: {
    width: "60px",
    height: "60px",

    background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
    borderRadius: "16px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    fontSize: "30px",
    marginBottom: "18px",
  },

  featureTitle: {
    fontSize: "20px",
    fontWeight: "700",
    margin: "0 0 10px 0",
    color: "#0f172a",
  },

  featureText: {
    color: "#64748b",
    lineHeight: "1.7",
    fontSize: "15px",
    margin: 0,
  },


  /* CATEGORIES */
  categoryGrid: {
    maxWidth: "1200px",
    margin: "0 auto",

    display: "grid",

    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",

    gap: "24px",
  },

  categoryCard: {
    padding: "32px 20px",
    textAlign: "center",

    background: "#ffffff",
    border: "1px solid #e5e7eb",

    borderRadius: "20px",

    transition: "all 0.3s",
  },

  categoryIcon: {
    fontSize: "48px",
    marginBottom: "12px",
  },

  categoryName: {
    fontSize: "18px",
    fontWeight: "700",
    margin: "0 0 6px 0",
    color: "#0f172a",
  },

  categoryCount: {
    fontSize: "14px",
    color: "#94a3b8",
    margin: "0 0 12px 0",
  },

  categoryLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px",
  },


  /* TESTIMONIALS */
  testimonialGrid: {
    maxWidth: "1200px",
    margin: "0 auto",

    display: "grid",

    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",

    gap: "28px",
  },

  testimonialCard: {
    padding: "32px",
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    borderRadius: "20px",
  },

  stars: {
    fontSize: "20px",
    marginBottom: "12px",
  },

  testimonialText: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#334155",
    margin: "0 0 20px 0",
  },

  testimonialAuthor: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  authorAvatar: {
    fontSize: "40px",
  },

  authorName: {
    fontSize: "16px",
    fontWeight: "700",
    margin: 0,
    color: "#0f172a",
  },

  authorRole: {
    fontSize: "14px",
    color: "#94a3b8",
    margin: "4px 0 0 0",
  },


  /* STATS */
  statsGrid: {
    maxWidth: "1000px",
    margin: "0 auto",

    display: "grid",

    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",

    gap: "40px",

    textAlign: "center",
  },

  statItem: {
    color: "#ffffff",
  },

  statNumber: {
    fontSize: "40px",
    fontWeight: "800",
    margin: 0,
    color: "#ffffff",
  },

  statLabel: {
    fontSize: "16px",
    color: "#94a3b8",
    margin: "8px 0 0 0",
    fontWeight: "500",
  },


  /* CTA */
  cta: {
    padding: "100px 20px",
    textAlign: "center",

    background: "linear-gradient(135deg, #1e3a8a, #2563eb)",

    color: "#ffffff",
  },

  ctaHeading: {
    fontSize: "42px",
    fontWeight: "800",
    margin: "0 0 16px 0",
  },

  ctaText: {
    fontSize: "18px",
    lineHeight: "1.8",
    maxWidth: "600px",
    margin: "0 auto 32px",
    opacity: "0.9",
  },

  ctaButton: {
    display: "inline-block",
    marginTop: "8px",

    padding: "16px 40px",

    background: "#ffffff",
    color: "#2563eb",

    textDecoration: "none",
    borderRadius: "12px",

    fontWeight: "800",
    fontSize: "18px",

    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
    transition: "all 0.2s",
  },

  ctaNote: {
    fontSize: "14px",
    marginTop: "20px",
    opacity: "0.8",
  },


  /* FOOTER */
  footer: {
    padding: "60px 7% 0",
    background: "#0f172a",
    color: "#ffffff",
  },

  footerContent: {
    maxWidth: "1200px",
    margin: "0 auto",

    display: "grid",

    gridTemplateColumns: "2fr 1fr 1fr 1fr",

    gap: "40px",

    paddingBottom: "40px",
    borderBottom: "1px solid #1e293b",
  },

  footerBrand: {
    maxWidth: "350px",
  },

  footerLogo: {
    fontSize: "24px",
    fontWeight: "800",
    margin: "0 0 16px 0",
  },

  footerDescription: {
    color: "#94a3b8",
    lineHeight: "1.8",
    fontSize: "15px",
  },

  socialLinks: {
    display: "flex",
    gap: "12px",
    marginTop: "20px",
  },

  socialLink: {
    textDecoration: "none",
    fontSize: "24px",
    opacity: "0.7",
    transition: "opacity 0.2s",
  },

  footerLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  footerLinksH4: {
    fontSize: "16px",
    fontWeight: "700",
    margin: "0 0 8px 0",
    color: "#ffffff",
  },

  footerLink: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.2s",
  },

  footerBottom: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px 0",
    textAlign: "center",
  },

  copyright: {
    color: "#64748b",
    fontSize: "14px",
    margin: 0,
  },
};

export default PublicDashboard;