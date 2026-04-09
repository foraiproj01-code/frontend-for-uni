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
      alert("Сураныч, бардык маалыматтарды толтуруңуз!");
      return;
    }

    if (height <= 0 || weight <= 0 || age <= 0) {
      alert("Маалыматтар туура эмес!");
      return;
    }

    const heightM = height / 100;
    const bmiValue = weight / (heightM * heightM);
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setCategory("Салмак жетишсиз");
      setSuggestion("🥗 Салмакты көбөйтүү үчүн: күнүнө 5-6 жолу тамактаныңыз, белокко бай тамактарды жеңиз, күч машыгууларын жасаңыз");
    } else if (bmiValue < 25) {
      setCategory("Нормада ✅");
      setSuggestion("💪 Саламаттыкты сактоо үчүн: азыркы режимиңизди улантыңыз, аптасына 3-4 жолу спорт менен машыгыңыз");
    } else if (bmiValue < 30) {
      setCategory("Ашыкча салмак");
      setSuggestion("🏃‍♂️ Салмакты азайтуу үчүн: кардио машыгууларды көбөйтүңүз, углеводду чектеңиз, сууну көп ичиңиз");
    } else {
      setCategory("Семиздик ⚠️");
      setSuggestion("🏥 Дарыгерге кайрылыңыз! Атайын диета кармаңыз, күнүнө 10 000 кадам басыңыз, акырындык менен салмакты азайтыңыз");
    }
  };

  const getCategoryColor = () => {
    if (category === "Салмак жетишсиз") return "#ff9800";
    if (category === "Нормада ✅") return "#4caf50";
    if (category === "Ашыкча салмак") return "#ffc107";
    return "#f44336";
  };

  const getCategoryEmoji = () => {
    if (category === "Салмак жетишсиз") return "⚠️";
    if (category === "Нормада ✅") return "😊";
    if (category === "Ашыкча салмак") return "🤔";
    return "🚨";
  };

  const handleReset = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setBmi(null);
    setCategory("");
    setSuggestion("");
  };

  // BMI позициясын эсептөө (0-40 аралыгында)
  const getBMIPosition = () => {
    if (!bmi) return 0;
    let position = (bmi / 40) * 100;
    if (position > 95) position = 95;
    if (position < 5) position = 5;
    return position;
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>💚</div>
          <h2 style={styles.title}>Саламаттык индекси</h2>
          <p style={styles.subtitle}>BMI эсептөө жана сунуштар</p>
        </div>

        <div style={styles.content}>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>ℹ️</span>
            <span style={styles.infoText}>
              BMI (Body Mass Index) - дене салмагынын индекси
            </span>
          </div>

          <div style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>🎂</span> Жашыңыз
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
                <span style={styles.labelIcon}>📏</span> Боюңуз (см)
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
                <span style={styles.labelIcon}>⚖️</span> Салмагыңыз (кг)
              </label>
              <input
                type="number"
                placeholder="Мисалы: 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.buttonGroup}>
              <button onClick={calculateBMI} style={styles.button}>
                📊 BMI эсептөө
              </button>
              <button onClick={handleReset} style={styles.resetButton}>
                🔄 Тазалоо
              </button>
            </div>
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
                <div style={styles.detailRow}>
                  <div style={styles.detailIcon}>{getCategoryEmoji()}</div>
                  <div style={styles.detailContent}>
                    <div style={styles.detailLabel}>Категория</div>
                    <div style={{...styles.detailValue, color: getCategoryColor(), fontWeight: "bold"}}>
                      {category}
                    </div>
                  </div>
                </div>

                <div style={styles.detailRow}>
                  <div style={styles.detailIcon}>💡</div>
                  <div style={styles.detailContent}>
                    <div style={styles.detailLabel}>Сунуштар</div>
                    <div style={styles.detailValue}>{suggestion}</div>
                  </div>
                </div>
              </div>

              {/* BMI шкаласы - оңдолгон версия */}
              <div style={styles.bmiScaleContainer}>
                <div style={styles.scaleLabels}>
                  <span style={styles.scaleLabelText}>18.5</span>
                  <span style={styles.scaleLabelText}>25</span>
                  <span style={styles.scaleLabelText}>30</span>
                  <span style={styles.scaleLabelText}>40</span>
                </div>
                <div style={styles.scaleBar}>
                  <div style={{...styles.scaleSegment, backgroundColor: "#ff9800", width: "25%"}}></div>
                  <div style={{...styles.scaleSegment, backgroundColor: "#4caf50", width: "25%"}}></div>
                  <div style={{...styles.scaleSegment, backgroundColor: "#ffc107", width: "25%"}}></div>
                  <div style={{...styles.scaleSegment, backgroundColor: "#f44336", width: "25%"}}></div>
                </div>
                <div style={styles.scalePointerWrapper}>
                  <div 
                    style={{
                      ...styles.scalePointer,
                      left: `${getBMIPosition()}%`
                    }}
                  >
                    <div style={styles.pointerArrow}>▼</div>
                    <div style={{...styles.pointerValue, backgroundColor: getCategoryColor()}}>
                      {bmi}
                    </div>
                  </div>
                </div>
                <div style={styles.scaleCategories}>
                  <span style={styles.categoryLabel}>Жетишсиз</span>
                  <span style={styles.categoryLabel}>Норма</span>
                  <span style={styles.categoryLabel}>Ашыкча</span>
                  <span style={styles.categoryLabel}>Семиздик</span>
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
    fontFamily: "'Segoe UI', 'Roboto', sans-serif",
  },
  card: {
    maxWidth: "600px",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "24px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    overflow: "hidden",
    animation: "slideUp 0.5s ease",
  },
  header: {
    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    padding: "35px 30px",
    textAlign: "center",
    color: "white",
  },
  logo: {
    fontSize: "54px",
    marginBottom: "10px",
  },
  title: {
    margin: "0",
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    margin: "10px 0 0",
    fontSize: "14px",
    opacity: "0.95",
  },
  content: {
    padding: "30px",
  },
  infoCard: {
    backgroundColor: "#e8f5e9",
    padding: "12px 15px",
    borderRadius: "12px",
    marginBottom: "25px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderLeft: "4px solid #4caf50",
  },
  infoIcon: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  infoText: {
    margin: 0,
    fontSize: "13px",
    color: "#2e7d32",
    flex: 1,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
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
    fontWeight: "600",
  },
  labelIcon: {
    marginRight: "8px",
    fontSize: "16px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "16px",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "10px",
  },
  button: {
    flex: 2,
    padding: "14px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
  },
  resetButton: {
    flex: 1,
    padding: "14px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
  },
  resultCard: {
    marginTop: "30px",
    padding: "25px",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)",
    borderRadius: "20px",
    animation: "fadeIn 0.5s ease",
  },
  bmiCircle: {
    width: "140px",
    height: "140px",
    margin: "0 auto 25px",
    backgroundColor: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },
  bmiValue: {
    textAlign: "center",
  },
  bmiNumber: {
    display: "block",
    fontSize: "40px",
    fontWeight: "bold",
    color: "#333",
    lineHeight: 1,
  },
  bmiUnit: {
    display: "block",
    fontSize: "14px",
    color: "#666",
    marginTop: "8px",
  },
  resultDetails: {
    marginBottom: "25px",
  },
  detailRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "16px",
    padding: "12px",
    backgroundColor: "white",
    borderRadius: "12px",
  },
  detailIcon: {
    fontSize: "24px",
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: "12px",
    color: "#666",
    marginBottom: "4px",
  },
  detailValue: {
    fontSize: "14px",
    color: "#333",
    lineHeight: 1.5,
  },
  // BMI шкаласынын стилдери - оңдолгон
  bmiScaleContainer: {
    marginTop: "30px",
    padding: "15px 0",
  },
  scaleLabels: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    padding: "0 5px",
  },
  scaleLabelText: {
    fontSize: "11px",
    color: "#666",
    fontWeight: "500",
  },
  scaleBar: {
    display: "flex",
    height: "12px",
    borderRadius: "6px",
    overflow: "hidden",
    marginBottom: "5px",
  },
  scaleSegment: {
    height: "100%",
  },
  scalePointerWrapper: {
    position: "relative",
    height: "40px",
    marginTop: "5px",
  },
  scalePointer: {
    position: "absolute",
    transform: "translateX(-50%)",
    textAlign: "center",
    transition: "left 0.5s ease",
  },
  pointerArrow: {
    fontSize: "20px",
    color: "#333",
    lineHeight: 1,
  },
  pointerValue: {
    position: "absolute",
    top: "-28px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "white",
    padding: "2px 8px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    minWidth: "40px",
  },
  scaleCategories: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    padding: "0 5px",
  },
  categoryLabel: {
    fontSize: "10px",
    color: "#888",
    textAlign: "center",
    flex: 1,
  },
};

// Глобалдык стилдер
const globalStyles = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  input:focus {
    border-color: #4caf50;
    box-shadow: 0 0 0 3px rgba(76,175,80,0.1);
    outline: none;
  }
  
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  }
  
  button:active {
    transform: translateY(0);
  }
  
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    opacity: 0.5;
  }
`;

// Глобалдык стилдерди кошуу (бир жолу гана):
// document.head.insertAdjacentHTML('beforeend', '<style>' + globalStyles + '</style>');