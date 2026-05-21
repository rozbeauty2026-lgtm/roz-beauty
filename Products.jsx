import React, { useState, useEffect } from "react";

const Products = ({ selectedCategory, onProductClick, darkMode }) => {
  const [products, setProducts] = useState([]); // لتخزين كافة المنتجات القادمة من السيرفر
  const [filteredProducts, setFilteredProducts] = useState([]); // لتخزين المنتجات بعد الفلترة
  const [loading, setLoading] = useState(true); // حالة التحميل لحين جلب البيانات
  const [error, setError] = useState(null); // لإظهار رسالة خطأ في حال فشل الاتصال

  // 1. رابط الـ API الخاص بجدول قوقل شيت (استبدل هذا الرابط برابط الـ Web App الخاص بك)
  const GOOGLE_SHEET_API = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

  useEffect(() => {
    // دالة جلب البيانات
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(GOOGLE_SHEET_API);
        if (!response.ok) {
          throw new Error("فشل في جلب البيانات من السيرفر");
        }
        const data = await response.json();
        
        // نضع البيانات في الـ state
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 2. تأثير (Effect) لفلترة المنتجات تلقائياً كلما تغير القسم المختار من القائمة العلوية
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      // نفترض أن العمود في الشيت يسمى 'category' أو 'section'
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  // 3. واجهة التحميل (Loading Shimmer / Text)
  if (loading) {
    return (
      <div style={styles.center}>
        <p style={styles.loadingText}>جاري تحميل منتجات Roz Beauty...</p>
      </div>
    );
  }

  // 4. واجهة الخطأ
  if (error) {
    return (
      <div style={styles.center}>
        <p style={styles.errorText}>عذراً، حدث خطأ: {error}</p>
        <p style={{ fontSize: "14px", color: "#666" }}>تأكد من إعدادات الـ API ونشر السكربت.</p>
      </div>
    );
  }

  // 5. واجهة عدم وجود منتجات في هذا القسم
  if (filteredProducts.length === 0) {
    return (
      <div style={styles.center}>
        <p style={{ fontSize: "16px", color: "#777" }}>لا توجد منتجات متوفرة في هذا القسم حالياً.</p>
      </div>
    );
  }

  // 6. عرض شبكة المنتجات الاحترافية
  return (
    <div style={styles.productsGrid}>
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          style={{ ...styles.card, ...(darkMode ? styles.darkCard : {}) }}
          onClick={() => onProductClick(product)} // يفتح المودال عند الضغط على الكارت
        >
          <div style={styles.imageContainer}>
            <img src={product.image} alt={product.name} style={styles.image} />
          </div>
          <div style={styles.info}>
            <h4 style={styles.name}>{product.name}</h4>
            <p style={{ ...styles.price, ...(darkMode ? styles.darkPrice : {}) }}>
              {product.price} جنيه
            </p>
            <button
              style={{ ...styles.btn, ...(darkMode ? styles.darkBtn : {}) }}
              onClick={(e) => {
                e.stopPropagation(); // لمنع فتح المودال عند الضغط على الزر مباشرة
                onProductClick(product); // أو يمكنك تعديله لليضيف مباشرة للسلة
              }}
            >
              عرض التفاصيل
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// التنسيقات الداخلية لمظهر عصري وشبكي (Grid)
const styles = {
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: "15px",
    padding: "15px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
    transition: "transform 0.2s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "between",
  },
  darkCard: {
    backgroundColor: "#1f1f1f",
    boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
  },
  imageContainer: {
    width: "100%",
    height: "160px",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  info: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  name: {
    fontSize: "13px",
    margin: "0 0 8px 0",
    height: "36px",
    overflow: "hidden",
    lineHeight: "1.4",
    fontWeight: "600",
  },
  price: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#8e244d",
    margin: "0 0 10px 0",
  },
  darkPrice: {
    color: "#ff6f91",
  },
  btn: {
    width: "100%",
    padding: "8px",
    backgroundColor: "#8e244d",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontFamily: "'Cairo'",
    fontWeight: "bold",
    fontSize: "12px",
    marginTop: "auto", // يضمن بقاء الزر بالأسفل دائماً
  },
  darkBtn: {
    backgroundColor: "#ff6f91",
    color: "#121212",
  },
  center: {
    padding: "50px 20px",
    textAlign: "center",
  },
  loadingText: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#8e244d",
  },
  errorText: {
    fontSize: "16px",
    color: "#ff3b30",
    fontWeight: "bold",
  },
};

export default Products;
