import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.title}>Health AI</h2>
      <div>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/health" style={styles.link}>My Health</Link>
        <Link to="/chat" style={styles.link}>AI Chat</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#0f172a",
    color: "white",
  },
  title: {
    margin: 0,
  },
  link: {
    marginLeft: "15px",
    color: "white",
    textDecoration: "none",
  },
};