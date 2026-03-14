const sheetURL="https://opensheet.elk.sh/1v0nH08PXdDqThcLCpMaWv-hzQCAHdGQG3kYLAQoVQEs/Sheet1";
let cart=[];
let productsData=[];

// جلب المنتجات من Google Sheet
fetch(sheetURL)
.then(res=>res.json())
.then(data=>{
  productsData = data;
  displayProducts(data);
});

// عرض المنتجات
function displayProducts(data){
  const container=document.getElementById("products");
  container.innerHTML="";
  data.forEach(p=>{
    container.innerHTML+=`
    <div class="product" data-category="${p.Category}">
      <img src="${p.image}">
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="price">${p.price} جنيه</div>
        <button onclick='addToCart("${p.name}",${p.price})'>أضف للسلة</button>
      </div>
    </div>`;
  });
}

// البحث داخل المنتجات
function searchProducts(){
  const term = document.getElementById("searchInput").value.toLowerCase();
  const filtered = productsData.filter(p=>
    p.name.toLowerCase().includes(term) ||
    p.Category.toLowerCase().includes(term)
  );
  displayProducts(filtered);
}

// تصفية حسب القسم
document.querySelectorAll(".cat").forEach(cat=>{
  cat.addEventListener("click", ()=>{
    const category = cat.getAttribute("data-category");
    if(category===""){
      displayProducts(productsData);
    } else {
      displayProducts(productsData.filter(p=>p.Category===category));
    }
  });
});

// إضافة للسلة
function addToCart(name, price){
  const existing = cart.find(i=>i.name===name);
  if(existing){
    existing.quantity++;
  } else {
    cart.push({name, price, quantity:1});
  }
  updateCart();
}

// تحديث السلة
function updateCart(){
  const cartDiv=document.getElementById("cartItems");
  cartDiv.innerHTML="";
  let total=0;
  cart.forEach(item=>{
    total += Number(item.price)*item.quantity;
    cartDiv.innerHTML+=`<p>${item.name} × ${item.quantity} - ${item.price} جنيه</p>`;
  });
  document.getElementById("totalPrice").innerText="الإجمالي: "+total+" جنيه";
  document.getElementById("cartCount").innerText=cart.length;
}

// إرسال الطلب
function submitOrder() {
  if(cart.length===0){
    alert("السلة فارغة");
    return;
  }

  const name=document.getElementById("name").value;
  const phone=document.getElementById("phone").value;
  const address=document.getElementById("address").value;

  if(!name || !phone || !address){
    alert("يرجى تعبئة جميع البيانات");
    return;
  }

  let items=cart.map(i=>i.name+" × "+i.quantity).join(" | ");
  let total=cart.reduce((sum,i)=>sum+i.price*i.quantity,0);

  fetch("https://script.google.com/macros/s/YOUR_WEB_APP_ID/exec",{
    method:"POST",
    body:JSON.stringify({name, phone, address, items, total})
  })
  .then(res=>res.json())
  .then(res=>{
    if(res.status==="success"){
      alert("تم إرسال الطلب بنجاح 💖");
      cart=[];
      updateCart();
      document.getElementById("name").value="";
      document.getElementById("phone").value="";
      document.getElementById("address").value="";
    } else {
      alert("حدث خطأ أثناء إرسال الطلب: "+res.message);
    }
  })
  .catch(err=>{
    alert("حدث خطأ أثناء إرسال الطلب: "+err);
  });
        }
