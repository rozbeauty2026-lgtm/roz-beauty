import React, { useState } from "react";

const categories = [
  { id: "all", name: "الكل", img: "https://i.imgur.com/BFBplR8.png" },
  { id: "offers", name: "العروض", img: "https://i.imgur.com/BFBplR8.png" },
  { id: "bags", name: "شنط وملابس", img: "https://i.imgur.com/TS5EgqL.png" },
  { id: "accessories", name: "إكسسوارات", img: "https://i.imgur.com/JftwUHq.png" },
  { id: "perfumes", name: "عطور", img: "https://i.imgur.com/PXpmpHB.png" },
  { id: "makeup", name: "مكياج", img: "https://i.imgur.com/E6QEprz.png" },
  { id: "hair", name: "عناية بالشعر", img: "https://i.imgur.com/19yLtSC.jpg" },
  { id: "skin", name: "عناية بالبشرة", img: "https://i.imgur.com/rb86TWc.jpg" },
];

const Categories = ({ onSelectCategory }) => {
  const [activeCat, setActiveCat] = useState("all");

  const handleCategoryClick = (id) => {
    setActiveCat(id);
    if (onSelectCategory) {
      onSelectCategory(id);
    }
  };

  return (
    <div style={styles.container}>
      {categories.map((cat) => {
        const isActive = activeCat === cat.id;
        return (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            style={{ ...styles.category, ...(isActive ? styles.activeCategory : {}) }}
          >
            <div style={styles.imageWrapper}>
              <img src={cat.img} alt={cat.name} style={styles.image} />
            </div>
            <p style={{ ...styles.text, ...(isActive ? styles.activeText : {}) }}>
              {cat.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: { display: "flex", gap: "15px", padding: "15px 10px", overflowX: "auto", WebkitOverflowScrolling: "touch" },
  category: { flex: "0 0 auto", width: "85px", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" },
  imageWrapper: { width: "65px", height: "65px", borderRadius: "50%", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.08)", backgroundColor: "#fff" },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  text: { fontSize: "12px", fontWeight: "600", marginTop: "8px", color: "#555", textAlign: "center", fontFamily: "'Cairo', sans-serif" },
  activeText: { color: "#8e244d", fontWeight: "700" }
};

export default Categories;
