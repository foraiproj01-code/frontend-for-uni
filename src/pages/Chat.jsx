import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Автоматтык түрдө ылдый сүрүү
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Колдонуучунун билдирүүсүн кошуу
    const userMessage = { sender: "user", text: input, time: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // AI терип жатат деген эффект
    setIsTyping(true);
    
    // AI жоопту симуляциялоо (кыска кечигүү менен)
    setTimeout(() => {
      const aiReply = { 
        sender: "ai", 
        text: generateAIResponse(input),
        time: new Date().toLocaleTimeString()
      };
      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const generateAIResponse = (text) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes("салмак") || lowerText.includes("weight")) {
      return "🏋️‍♂️ Салмакты нормалдаштыруу үчүн күнүнө 30 мүнөт кардио машыгууларды жасоо, туура тамактануу жана жетиштүү уйку сунушталат.";
    }
    if (lowerText.includes("бой") || lowerText.includes("height")) {
      return "📏 Боюңузга ылайык салмакта болуу маанилүү. BMI индексиңизди 'My Health' бөлүмүнөн текшере аласыз.";
    }
    if (lowerText.includes("тамак") || lowerText.includes("food")) {
      return "🥗 Туура тамактануу үчүн: көк чөптөр, мөмө-жемиштер, белокко бай тамактарды жеп, куурулган жана канттуу тамактардан алыс болуңуз.";
    }
    if (lowerText.includes("спорт") || lowerText.includes("exercise")) {
      return "💪 Күндөлүк спорт машыгуулары ден соолукка пайдалуу. Жөө басуу, чуркоо, сууда сүзүү - эң мыкты көнүгүүлөрдүн бири.";
    }
    if (lowerText.includes("суу") || lowerText.includes("water")) {
      return "💧 Күнүнө 2-3 литр суу ичүү сунушталат. Суу организмден токсиндерди чыгарып, терини таза кармайт.";
    }
    if (lowerText.includes("уйку") || lowerText.includes("sleep")) {
      return "😴 Чоң кишилерге 7-8 саат уйку сунушталат. Сапаттуу уйку ден соолуктун негизи.";
    }
    if (lowerText.includes("салам") || lowerText.includes("hello") || lowerText.includes("саламат")) {
      return "👋 Саламатсызбы! Мен Health AI жардамчысы. Саламаттык жана фитнес боюнча суроолоруңузга жооп берүүгө даярмын.";
    }
    
    return "🤖 Мен сизге саламаттык жана фитнес боюнча кеңештерди бере алам. Сураныңызды тактап бериңиз же 'My Health' бөлүмүнөн BMI эсептеп көрүңүз!";
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.logo}>🤖</div>
            <div style={styles.headerText}>
              <h2 style={styles.title}>AI Health Assistant</h2>
              <p style={styles.subtitle}>Саламаттык боюнча суроолоруңузга жооп берет</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button onClick={clearChat} style={styles.clearButton}>
              🗑️ Тазалоо
            </button>
          )}
        </div>

        <div style={styles.chatBox}>
          {messages.length === 0 ? (
            <div style={styles.welcomeContainer}>
              <div style={styles.welcomeIcon}>💬</div>
              <h3 style={styles.welcomeTitle}>Кош келиңиз!</h3>
              <p style={styles.welcomeText}>
                Мен Health AI жардамчысымын. Төмөнкүдөй суроолорду бере аласыз:
              </p>
              <div style={styles.suggestionChips}>
                <div style={styles.chip}>Салмакты кантип азайтам?</div>
                <div style={styles.chip}>Канча уйку керек?</div>
                <div style={styles.chip}>Сууну канча ичишим керек?</div>
                <div style={styles.chip}>Спорттун пайдасы</div>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.messageRow,
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    ...styles.messageBubble,
                    ...(msg.sender === "user" ? styles.userBubble : styles.aiBubble),
                  }}
                >
                  <div style={styles.messageSender}>
                    {msg.sender === "user" ? "👤 Сиз" : "🤖 Health AI"}
                  </div>
                  <div style={styles.messageText}>{msg.text}</div>
                  <div style={styles.messageTime}>{msg.time}</div>
                </div>
              </div>
            ))
          )}
          
          {isTyping && (
            <div style={styles.typingContainer}>
              <div style={styles.typingBubble}>
                <div style={styles.typingDot}></div>
                <div style={styles.typingDot}></div>
                <div style={styles.typingDot}></div>
                <span style={styles.typingText}>AI жазып жатат...</span>
              </div>
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        <div style={styles.inputContainer}>
          <textarea
            placeholder="Сураныңызды жазыңыз..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            style={styles.input}
            rows={1}
          />
          <button 
            onClick={handleSend} 
            style={styles.button}
            disabled={!input.trim()}
          >
            <span style={styles.sendIcon}>📤</span>
            Жөнөтүү
          </button>
        </div>
        
        <div style={styles.footer}>
          <p style={styles.footerText}>
            💡 Кеңеш: Сураныңызды так жана толук жазыңыз
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
    fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', sans-serif",
  },
  card: {
    maxWidth: "800px",
    width: "100%",
    height: "80vh",
    backgroundColor: "white",
    borderRadius: "24px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    animation: "slideUp 0.5s ease",
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  logo: {
    fontSize: "40px",
    animation: "pulse 2s infinite",
  },
  headerText: {
    color: "white",
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
  },
  subtitle: {
    margin: "5px 0 0",
    fontSize: "12px",
    opacity: 0.9,
  },
  clearButton: {
    padding: "8px 16px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease",
  },
  chatBox: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    backgroundColor: "#f8f9fa",
  },
  welcomeContainer: {
    textAlign: "center",
    padding: "40px 20px",
  },
  welcomeIcon: {
    fontSize: "64px",
    marginBottom: "20px",
  },
  welcomeTitle: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "10px",
  },
  welcomeText: {
    color: "#666",
    marginBottom: "20px",
  },
  suggestionChips: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
  },
  chip: {
    padding: "8px 16px",
    backgroundColor: "#e9ecef",
    borderRadius: "20px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  messageRow: {
    display: "flex",
    marginBottom: "15px",
  },
  messageBubble: {
    maxWidth: "70%",
    padding: "12px 16px",
    borderRadius: "18px",
    position: "relative",
  },
  userBubble: {
    backgroundColor: "#667eea",
    color: "white",
    borderBottomRightRadius: "4px",
  },
  aiBubble: {
    backgroundColor: "white",
    color: "#333",
    borderBottomLeftRadius: "4px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  messageSender: {
    fontSize: "11px",
    marginBottom: "5px",
    opacity: 0.8,
  },
  messageText: {
    fontSize: "14px",
    lineHeight: 1.5,
    wordWrap: "break-word",
  },
  messageTime: {
    fontSize: "10px",
    marginTop: "5px",
    opacity: 0.6,
    textAlign: "right",
  },
  typingContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "15px",
  },
  typingBubble: {
    backgroundColor: "white",
    padding: "12px 16px",
    borderRadius: "18px",
    borderBottomLeftRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  typingDot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#667eea",
    borderRadius: "50%",
    animation: "typing 1.4s infinite",
  },
  typingText: {
    fontSize: "12px",
    color: "#666",
  },
  inputContainer: {
    padding: "20px",
    borderTop: "1px solid #e1e5e9",
    display: "flex",
    gap: "10px",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    padding: "12px 16px",
    fontSize: "14px",
    border: "2px solid #e1e5e9",
    borderRadius: "12px",
    resize: "none",
    fontFamily: "inherit",
    outline: "none",
    transition: "all 0.3s ease",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  sendIcon: {
    fontSize: "16px",
  },
  footer: {
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
    borderTop: "1px solid #e1e5e9",
  },
  footerText: {
    margin: 0,
    fontSize: "11px",
    color: "#666",
    textAlign: "center",
  },
};

// Глобалдык анимациялар
const globalStyles = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  
  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.4;
    }
    30% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }
  
  .typing-dot:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  .typing-dot:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  textarea:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
    outline: none;
  }
  
  button:hover:not(:disabled) {
    background-color: #764ba2;
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102,126,234,0.4);
  }
  
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .chip:hover {
    background-color: #667eea;
    color: white;
    transform: translateY(-2px);
  }
  
  .clear-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    .message-bubble {
      max-width: 85%;
    }
    
    .suggestion-chips {
      gap: 8px;
    }
    
    .chip {
      font-size: 12px;
      padding: 6px 12px;
    }
  }
`;

// Глобалдык стилдерди кошуу (бир жолу гана):
// document.head.insertAdjacentHTML('beforeend', '<style>' + globalStyles + '</style>');