import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const getLinkStyle = (path) => {
    const baseStyle = {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 20px",
      color: "white",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "500",
      borderRadius: "12px",
      transition: "all 0.3s ease",
    };
    
    if (location.pathname === path) {
      return {
        ...baseStyle,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        transform: "scale(1.05)",
      };
    }
    
    return baseStyle;
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>🤖</div>
          <h2 style={styles.title}>Health AI</h2>
        </div>

        <div style={styles.navLinks}>
          <Link to="/dashboard" style={getLinkStyle("/dashboard")}>
            <span style={styles.linkIcon}>📊</span>
            Dashboard
          </Link>
          
          <Link to="/health" style={getLinkStyle("/health")}>
            <span style={styles.linkIcon}>❤️</span>
            My Health
          </Link>
          
          <Link to="/chat" style={getLinkStyle("/chat")}>
            <span style={styles.linkIcon}>💬</span>
            AI Chat
          </Link>
        </div>

        <div style={styles.userSection}>
          <div style={styles.userIcon}>👤</div>
          <Link to="/" style={styles.logoutLink}>
            🚪 Чыгуу
          </Link>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "0 20px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
    flexWrap: "wrap",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoIcon: {
    fontSize: "32px",
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
    color: "white",
    letterSpacing: "-0.5px",
  },
  navLinks: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  linkIcon: {
    fontSize: "18px",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  userIcon: {
    width: "40px",
    height: "40px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  logoutLink: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "8px 16px",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    color: "white",
    textDecoration: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease",
  },
};