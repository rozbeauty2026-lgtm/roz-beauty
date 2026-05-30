import React, { useState, useEffect } from "react";

const Products = ({ selectedCategory, onProductClick, darkMode }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // حطّي رابط قوقل شيت (Web App URL) الخاص بك هنا
  const GOOGLE_SHEET_API = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(GOOGLE_SHEET_API);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("خطأ في جلب البيانات:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) => p.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  if (loading) return <div style={{ textAlignment: "center", padding: "20px" }}><p>جاري تحميل منتجات Roz Beauty...</p></div>;

  return (
    <div style={styles.productsGrid}>
      {filteredProducts.map((product) => (
        <div key={product.id} style={{ ...styles.card, ...(darkMode ? styles.darkCard : {}) }} onClick={() => onProductClick(product)}>
          <img src={product.image} alt={product.name} style={styles.image} />
          <div style={styles.info}>
            <h4 style={styles.name}>{product.name}</h4>
            <p style={{ ...styles.price, ...(darkMode ? styles.darkPrice : {}) }}>{product.price} جنيه</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  productsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "15px", padding: "15px" },
  card: { backgroundColor: "#fff", borderRadius: "15px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", cursor: "pointer" },
  darkCard: { backgroundColor: "#1f1f1f" },
  image: { width: "100%", height: "150px", objectFit: "cover" },
  info: { padding: "10px" },
  name: { fontSize: "13px", margin: "0 0 5px 0" },
  price: { fontSize: "14px", fontWeight: "bold", color: "#8e244d", margin: "0" },
  darkPrice: { color: "#ff6f91" }
};

export default Products;
