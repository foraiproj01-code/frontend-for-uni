import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    height: "",
    weight: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email.includes("@")) {
      setError("Email туура эмес");
      return;
    }
    if (formData.password.length < 6) {
      setError("Пароль 6 символдон узун болушу керек");
      return;
    }
    if (!formData.firstName || !formData.lastName) {
      setError("Аты жана Фамилиясы керек");
      return;
    }

    setError("");
    console.log("Register info:", formData);

    // Dashboardка navigate
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>📝</div>
          <h2 style={styles.title}>Аккаунт ачуу</h2>
          <p style={styles.subtitle}>Системага катталыңыз</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.halfGroup}>
              <label style={styles.label}>Аты</label>
              <input
                name="firstName"
                placeholder="Атыңыз"
                value={formData.firstName}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.halfGroup}>
              <label style={styles.label}>Фамилиясы</label>
              <input
                name="lastName"
                placeholder="Фамилияңыз"
                value={formData.lastName}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.thirdGroup}>
              <label style={styles.label}>Жашы</label>
              <input
                name="age"
                type="number"
                placeholder="Жаш"
                value={formData.age}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.thirdGroup}>
              <label style={styles.label}>Бою (см)</label>
              <input
                name="height"
                type="number"
                placeholder="Бой"
                value={formData.height}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.thirdGroup}>
              <label style={styles.label}>Салмагы (кг)</label>
              <input
                name="weight"
                type="number"
                placeholder="Салмак"
                value={formData.weight}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Электрондук почта</label>
            <input
              name="email"
              type="email"
              placeholder="misal@email.com"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Пароль</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {error && (
            <div style={styles.errorContainer}>
              <span style={styles.errorIcon}>⚠️</span>
              <p style={styles.error}>{error}</p>
            </div>
          )}

          <button type="submit" style={styles.button}>
            Катталуу
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Аккаунтуңуз барбы? <Link to="/" style={styles.link}>Кирүү</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
    fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', sans-serif",
  },
  card: {
    maxWidth: "550px",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease",
    animation: "fadeInUp 0.5s ease",
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "30px 30px",
    textAlign: "center",
    color: "white",
  },
  logo: {
    fontSize: "48px",
    marginBottom: "10px",
  },
  title: {
    margin: "0",
    fontSize: "28px",
    fontWeight: "600",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    margin: "10px 0 0",
    fontSize: "14px",
    opacity: "0.9",
  },
  form: {
    padding: "30px",
  },
  row: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  halfGroup: {
    flex: 1,
    minWidth: "120px",
  },
  thirdGroup: {
    flex: 1,
    minWidth: "90px",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#333",
    fontSize: "14px",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "16px",
    border: "2px solid #e1e5e9",
    borderRadius: "10px",
    transition: "all 0.3s ease",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  errorContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#fee",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "20px",
    borderLeft: "4px solid #f44336",
  },
  errorIcon: {
    fontSize: "18px",
  },
  error: {
    margin: "0",
    color: "#d32f2f",
    fontSize: "14px",
    flex: 1,
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
    fontFamily: "inherit",
  },
  footer: {
    padding: "20px 30px 30px",
    textAlign: "center",
    borderTop: "1px solid #e1e5e9",
    backgroundColor: "#fafafa",
  },
  footerText: {
    margin: "0",
    color: "#666",
    fontSize: "14px",
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.3s ease",
  },
};

// Глобалдык стилдер (index.js же App.jsке кошуңуз)
const globalStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  input:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
    outline: none;
  }
  
  button:hover {
    background-color: #764ba2;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102,126,234,0.4);
  }
  
  a:hover {
    color: #764ba2;
    text-decoration: underline;
  }
`;

// Эгер глобалдык CSS колдонсоңуз:
// document.head.insertAdjacentHTML('beforeend', '<style>' + globalStyles + '</style>');