let products = [];
let cart = [];

// جلب المنتجات من الشيت
fetch("https://opensheet.elk.sh/1v0nH08PXdDqThcLCpMaWv-hzQCAHdGQG3kYLAQoVQEs/Sheet1")
  .then(res => res.json())
  .then(data => {
    products = data;
    displayProducts(products);
  });

// عرض المنتجات
function displayProducts(list) {
  const container = document.getElementById("products");
  container.innerHTML = "";
  list.forEach((p, i) => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.image || 'https://via.placeholder.com/150'}">
        <h4>${p.name}</h4>
        <p>${p.description || ""}</p>
        <div class="price">${p.price} جنيه</div>
        <button onclick="addToCart(${i})">أضف للسلة</button>
      </div>
    `;
  });
}

// إضافة للسلة
function addToCart(i) {
  let found = cart.find(item => item.name === products[i].name);
  if (found) {
    found.qty++;
  } else {
    cart.push({
      name: products[i].name,
      price: Number(products[i].price),
      qty: 1
    });
  }
  updateCart();
  alert("تمت إضافة المنتج للسلة ✔️");
}

// تحديث السلة في الواجهة
function updateCart() {
  const cartDiv = document.getElementById("cartItems");
  cartDiv.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    cartDiv.innerHTML += `
      <p>${item.name} × ${item.qty} — ${item.price * item.qty} جنيه</p>
    `;
  });
  document.getElementById("totalPrice").innerText =
    "الإجمالي: " + total + " جنيه";
}

// إرسال الطلب
function submitOrder() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  if (!name || !phone || !address) {
    alert("يرجى تعبئة البيانات كاملة ✍️");
    return;
  }
  if (cart.length === 0) {
    alert("السلة فارغة 🛒");
    return;
  }

  let orderItems = "";
  let total = 0;
  cart.forEach(item => {
    orderItems += item.name + " × " + item.qty + " | ";
    total += item.price * item.qty;
  });

  let orderData = {
    order_id: "ORD" + Date.now(),
    name: name,
    phone: phone,
    address: address,
    items: orderItems,
    total: total,
    date: new Date().toLocaleString()
  };

  fetch("https://script.google.com/macros/s/AKfycbx2Vonr07kkY_BfoGbAunz_kHy0qAKGuoLADXer7LJ5963hpR62efGD-KHjdUA92acT/exec", {
    method: "POST",
    body: JSON.stringify(orderData)
  })
  .then(() => {
    alert("تم إرسال الطلب بنجاح! 💖");
    cart = [];
    updateCart();
  });
    }
