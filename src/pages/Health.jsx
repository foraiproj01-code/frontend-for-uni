import { useState } from "react";

export default function Health() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState(""); // см
  const [weight, setWeight] = useState(""); // кг
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const calculateBMI = () => {
    if (!age || !height || !weight) {
      return;
    }
    const heightM = height / 100;
    const bmiValue = weight / (heightM * heightM);
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setCategory("Салмак жетишсиз");
      setSuggestion("Салмакты көбөйтүү, туура тамактануу, спорт менен машыгуу");
    } else if (bmiValue < 25) {
      setCategory("Нормада");
      setSuggestion("Саламат жашоо, спорт жана туура тамактануу улант");
    } else if (bmiValue < 30) {
      setCategory("Ашыкча салмак");
      setSuggestion("Салмакты азайтуу, туура тамактануу, спорт менен машыгуу");
    } else {
      setCategory("Семиздик");
      setSuggestion("Дарыгерге кайрылыңыз, атайын диета жана спорт зарыл");
    }
  };

  const getCategoryColor = () => {
    if (category === "Салмак жетишсиз") return "#ffc107";
    if (category === "Нормада") return "#4caf50";
    if (category === "Ашыкча салмак") return "#ff9800";
    return "#f44336";
  };

  const getBMIColor = () => {
    if (!bmi) return "#333";
    if (bmi < 18.5) return "#ffc107";
    if (bmi < 25) return "#4caf50";
    if (bmi < 30) return "#ff9800";
    return "#f44336";
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>❤️</div>
          <h2 style={styles.title}>Менин саламаттыгым</h2>
          <p style={styles.subtitle}>BMI калькулятору жана сунуштар</p>
        </div>

        <div style={styles.content}>
          <div style={styles.infoBox}>
            <p style={styles.infoText}>
              📊 BMI (Дене массасынын индекси) - салмак менен боюнүн катышын көрсөтөт
            </p>
          </div>

          <div style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>🎂</span> Жашы
              </label>
              <input
                type="number"
                placeholder="Мисалы: 25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>📏</span> Бою (см)
              </label>
              <input
                type="number"
                placeholder="Мисалы: 170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>⚖️</span> Салмагы (кг)
              </label>
              <input
                type="number"
                placeholder="Мисалы: 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={styles.input}
              />
            </div>

            <button onClick={calculateBMI} style={styles.button}>
              BMI эсептөө
            </button>
          </div>

          {bmi && (
            <div style={styles.resultCard}>
              <div style={styles.bmiCircle}>
                <div style={styles.bmiValue}>
                  <span style={styles.bmiNumber}>{bmi}</span>
                  <span style={styles.bmiUnit}>BMI</span>
                </div>
              </div>

              <div style={styles.resultDetails}>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Категория:</span>
                  <span style={{...styles.detailValue, color: getCategoryColor()}}>
                    {category}
                  </span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Сунуштар:</span>
                  <span style={styles.detailValue}>{suggestion}</span>
                </div>
              </div>

              <div style={styles.bmiScale}>
                <div style={styles.scaleBar}>
                  <div style={{...styles.scaleSegment, backgroundColor: "#ffc107"}}>18.5</div>
                  <div style={{...styles.scaleSegment, backgroundColor: "#4caf50"}}>25</div>
                  <div style={{...styles.scaleSegment, backgroundColor: "#ff9800"}}>30</div>
                  <div style={{...styles.scaleSegment, backgroundColor: "#f44336"}}>40+</div>
                </div>
                <div style={styles.scaleIndicator} style={{
                  ...styles.scaleIndicator,
                  left: `${Math.min((bmi / 40) * 100, 100)}%`,
                  backgroundColor: getBMIColor()
                }}>
                  ▼
                </div>
              </div>
            </div>
          )}
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
  content: {
    padding: "30px",
  },
  infoBox: {
    backgroundColor: "#e3f2fd",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "25px",
    borderLeft: "4px solid #2196f3",
  },
  infoText: {
    margin: 0,
    fontSize: "13px",
    color: "#1976d2",
    lineHeight: "1.5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "20px",
  },
  inputGroup: {
    width: "100%",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#333",
    fontSize: "14px",
    fontWeight: "500",
  },
  labelIcon: {
    marginRight: "5px",
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
  resultCard: {
    marginTop: "30px",
    padding: "20px",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    borderRadius: "15px",
    textAlign: "center",
  },
  bmiCircle: {
    width: "150px",
    height: "150px",
    margin: "0 auto 20px",
    backgroundColor: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  bmiValue: {
    textAlign: "center",
  },
  bmiNumber: {
    display: "block",
    fontSize: "36px",
    fontWeight: "bold",
    color: "#333",
  },
  bmiUnit: {
    display: "block",
    fontSize: "14px",
    color: "#666",
    marginTop: "5px",
  },
  resultDetails: {
    textAlign: "left",
    marginBottom: "20px",
  },
  detailItem: {
    marginBottom: "12px",
    padding: "8px",
    backgroundColor: "white",
    borderRadius: "8px",
  },
  detailLabel: {
    fontWeight: "600",
    color: "#555",
    marginRight: "10px",
  },
  detailValue: {
    color: "#333",
  },
  bmiScale: {
    marginTop: "20px",
    position: "relative",
  },
  scaleBar: {
    display: "flex",
    height: "8px",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "10px",
  },
  scaleSegment: {
    flex: 1,
    height: "100%",
  },
  scaleIndicator: {
    position: "relative",
    textAlign: "center",
    fontSize: "20px",
    transition: "left 0.3s ease",
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
  
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    opacity: 0.5;
  }
`;

// Глобалдык стилдерди кошуу (бир жолу гана):
// document.head.insertAdjacentHTML('beforeend', '<style>' + globalStyles + '</style>');