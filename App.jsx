import React, { useState, useEffect } from "react";
import Categories from "./Categories"; // الربط أصبح مباشراً الآن!
import Products from "./Products";     // الربط أصبح مباشراً الآن!

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]);

  return (
    <div style={{ ...styles.app, ...(darkMode ? styles.darkApp : {}) }}>
      
      {/* الهيدر */}
      <div style={darkMode ? styles.darkNavbar : styles.navbar}>
        <div style={styles.logo}>Roz Beauty</div>
        <div style={styles.cartIcon} onClick={() => setCurrentPage("cart")}>
          🛒 <span style={styles.badge}>{cart.length}</span>
        </div>
      </div>

      {/* المحتوى */}
      {currentPage === "home" && (
        <div>
          <Categories onSelectCategory={setSelectedCategory} />
          <Products 
            selectedCategory={selectedCategory} 
            darkMode={darkMode}
            onProductClick={(product) => {
              alert(`أنتِ ضغطتِ على: ${product.name}`);
            }} 
          />
        </div>
      )}

      {currentPage === "cart" && (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>السلة فارغة حالياً 🛒</h2>
          <button style={styles.btn} onClick={() => setCurrentPage("home")}>العودة للرئيسية</button>
        </div>
      )}

      {currentPage === "settings" && (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>الإعدادات ⚙️</h2>
          <button style={styles.btn} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "الوضع النهاري ☀️" : "الوضع الليلي 🌙"}
          </button>
        </div>
      )}

      {/* شريط التنقل السفلي */}
      <div style={darkMode ? styles.darkNavBottom : styles.navBottom}>
        <div onClick={() => setCurrentPage("home")} style={currentPage === "home" ? styles.activeNav : styles.navItem}>🏠 الرئيسية</div>
        <div onClick={() => setCurrentPage("cart")} style={currentPage === "cart" ? styles.activeNav : styles.navItem}>🛒 السلة</div>
        <div onClick={() => setCurrentPage("settings")} style={currentPage === "settings" ? styles.activeNav : styles.navItem}>⚙️ الإعدادات</div>
      </div>

    </div>
  );
};

const styles = {
  app: { fontFamily: "'Cairo', sans-serif", direction: "rtl", minHeight: "100vh", backgroundColor: "#f5f5f5", color: "#333", paddingBottom: "80px" },
  darkApp: { backgroundColor: "#121212", color: "#fff" },
  navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", backgroundColor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
  darkNavbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", backgroundColor: "#1f1f1f" },
  logo: { fontSize: "22px", fontWeight: "bold", color: "#8e244d" },
  cartIcon: { fontSize: "20px", cursor: "pointer", position: "relative" },
  badge: { position: "absolute", top: "-8px", right: "-10px", backgroundColor: "#8e244d", color: "#fff", fontSize: "12px", padding: "2px 6px", borderRadius: "50%" },
  navBottom: { position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", backgroundColor: "#fff", padding: "15px 0", boxShadow: "0 -2px 8px rgba(0,0,0,0.1)", justifyContent: "space-around" },
  darkNavBottom: { position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", backgroundColor: "#1f1f1f", padding: "15px 0", justifyContent: "space-around" },
  navItem: { flex: 1, textAlign: "center", cursor: "pointer", fontWeight: "600", color: "#666" },
  activeNav: { flex: 1, textAlign: "center", cursor: "pointer", fontWeight: "bold", color: "#8e244d" },
  btn: { width: "100%", maxWidth: "300px", padding: "10px", backgroundColor: "#8e244d", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'Cairo'", fontWeight: "bold" }
};

export default App;
