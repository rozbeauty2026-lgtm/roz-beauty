import React from "react";

// بيانات الأقسام مع رابط الصورة والاسم
const categories = [
  { name: "العروض", img: "https://i.imgur.com/BFBplR8.png" },
  { name: "شنط وملابس", img: "https://i.imgur.com/TS5EgqL.png" },
  { name: "إكسسوارات", img: "https://i.imgur.com/JftwUHq.png" },
  { name: "عطور", img: "https://i.imgur.com/PXpmpHB.png" },
  { name: "مكياج", img: "https://i.imgur.com/E6QEprz.png" },
  { name: "عناية بالشعر", img: "https://i.imgur.com/19yLtSC.jpg" },
  { name: "عناية بالبشرة", img: "https://i.imgur.com/rb86TWc.jpg" },
];

const Categories = () => {
  return (
    <div style={styles.container}>
      {categories.map((cat, index) => (
        <div key={index} style={styles.category}>
          <img src={cat.img} alt={cat.name} style={styles.image} />
          <p>{cat.name}</p>
        </div>
      ))}
    </div>
  );
};

// تنسيق بسيط
const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  category: {
    width: "100px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
  },
};

export default Categories;
