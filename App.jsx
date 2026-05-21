import React, { useState, useEffect } from "react";
import Categories from "./components/Categories";
// سنقوم بإنشاء واستيراد المكونات الأخرى تباعاً في الخطوات القادمة
// import Navbar from "./components/Navbar";
// import Products from "./components/Products";
// import CartPage from "./components/CartPage";
// import SettingsPage from "./components/SettingsPage";
// import NavBottom from "./components/NavBottom";

const App = () => {
  // 1. إدارة الصفحات (currentPage)
  const [currentPage, setCurrentPage] = useState("home");

  // 2. إدارة الوضع الليلي
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  // 3. إدارة السلة
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 4. إدارة القسم المختار للفلترة
  const [selectedCategory, setSelectedCategory] = useState("all");

  // تأثير لحفظ وتطبيق الوضع الليلي عند تغيره
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // تأثير لحفظ السلة تلقائياً عند تغير محتوياتها
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // دالة إضافة منتج للسلة
  const addToCart = (product) => {
    setCart((prevCart) => {
      // التحقق إذا كان المنتج بنفس اللون والحجم موجود مسبقاً
      const exists = prevCart.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize
      );

      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prevCart, product];
    });
  };

  // دالة حذف أو تعديل الكمية في السلة
  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  return (
    <div style={{ ...styles.app, ...(darkMode ? styles.darkApp : {}) }}>
      
      {/* مؤقتاً: الهيدر لحين إنشاء ملف منفصل له */}
      <div style={darkMode ? styles.darkNavbar : styles.navbar}>
        <div style={styles.logo}>Roz Beauty</div>
        <div style={styles.cartIcon} onClick={() => setCurrentPage("cart")}>
          🛒 <span style={styles.badge}>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </div>
      </div>

      {/* عرض الصفحات بناءً على الحالة (State) */}
      {currentPage === "home" && (
        <div>
          {/* شريط الأقسام الأفقي الاحترافي الذي جهزناه */}
          <Categories onSelectCategory={setSelectedCategory} />
          
          {/* هنا ستكون شبكة المنتجات مستقبلاً */}
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h3>مساحة عرض المنتجات لقسم: {selectedCategory}</h3>
            <p style={{ color: "#777" }}>جاري تجهيز مكون المنتجات وربطه بشيت قوقل...</p>
          </div>
        </div>
      )}

      {currentPage === "cart" && (
        <div style={{ padding: "20px" }}>
          <h2>صفحة السلة 🛒</h2>
          {/* هنا سيرتبط مكون السلة المستقل لاحقاً */}
          <p>عدد الأنواع في السلة حالياً: {cart.length}</p>
          <button style={styles.btn} onClick={() => setCurrentPage("home")}>العودة للتسوق</button>
        </div>
      )}

      {currentPage === "settings" && (
        <div style={{ padding: "20px" }}>
          <h2>الإعدادات ⚙️</h2>
          <button style={styles.btn} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "تفعيل الوضع النهاري ☀️" : "تفعيل الوضع الليلي 🌙"}
          </button>
        </div>
      )}

      {/* شريط التنقل السفلي الثابت (مؤقت لحين فصله) */}
      <div style={darkMode ? styles.darkNavBottom : styles.navBottom}>
        <div onClick={() => setCurrentPage("home")} style={currentPage === "home" ? styles.activeNav : styles.navItem}>🏠 الرئيسية</div>
        <div onClick={() => setCurrentPage("cart")} style={currentPage === "cart" ? styles.activeNav : styles.navItem}>🛒 السلة</div>
        <div onClick={() => setCurrentPage("settings")} style={currentPage === "settings" ? styles.activeNav : styles.navItem}>⚙️ الإعدادات</div>
      </div>

    </div>
  );
};

// التنسيقات الأساسية للهيكل
const styles = {
  app: { fontFamily: "'Cairo', sans-serif", direction: "rtl", minHeight: "100vh", backgroundColor: "#f5f5f5", color: "#333", paddingBottom: "80px", transition: "0.3s" },
  darkApp: { backgroundColor: "#121212", color: "#fff" },
  navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", backgroundColor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
  darkNavbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", backgroundColor: "#1f1f1f", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" },
  logo: { fontSize: "22px", fontWeight: "bold", color: "#8e244d" },
  cartIcon: { fontSize: "20px", cursor: "pointer", position: "relative" },
  badge: { position: "absolute", top: "-8px", right: "-10px", backgroundColor: "#8e244d", color: "#fff", fontSize: "12px", padding: "2px 6px", borderRadius: "50%" },
  navBottom: { position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "around", backgroundColor: "#fff", padding: "15px 0", boxShadow: "0 -2px 8px rgba(0,0,0,0.1)", justifyConetnt: "space-around" },
  darkNavBottom: { position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "around", backgroundColor: "#1f1f1f", padding: "15px 0", boxShadow: "0 -2px 8px rgba(0,0,0,0.3)" },
  navItem: { flex: 1, textAlign: "center", cursor: "pointer", fontWeight: "600", color: "#666" },
  activeNav: { flex: 1, textAlign: "center", cursor: "pointer", fontWeight: "bold", color: "#8e244d" },
  btn: { width: "100%", padding: "10px", backgroundColor: "#8e244d", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'Cairo'", fontWeight: "bold", marginTop: "10px" }
};

export default App;
