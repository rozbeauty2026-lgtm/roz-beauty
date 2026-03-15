const sheetURL="https://opensheet.elk.sh/1v0nH08PXdDqThcLCpMaWv-hzQCAHdGQG3kYLAQoVQEs/Sheet1";

let productsData=[];
let cart=[];

/* الأقسام */

const categoriesList=[

{name:"الكل",icon:"https://i.imgur.com/n9ZVlX2.png"},

{name:"العناية بالبشرة",icon:"https://i.imgur.com/rb86TWc.jpg"},
{name:"العناية بالشعر",icon:"https://i.imgur.com/19yLtSC.jpg"},
{name:"المكياج",icon:"https://i.imgur.com/E6QEprz.png"},
{name:"العطور",icon:"https://i.imgur.com/PXpmpHB.png"},
{name:"العروض",icon:"https://i.imgur.com/BFBplR8.png"},
{name:"شنط وملابس",icon:"https://i.imgur.com/TS5EgqL.png"},
{name:"إكسسوارات",icon:"https://i.imgur.com/JftwUHq.png"}

];

/* إنشاء الأقسام */

const categoriesDiv=document.getElementById("categories");

categoriesList.forEach(c=>{

const div=document.createElement("div");

div.className="cat";

div.dataset.category=c.name;

div.innerHTML=`<img src="${c.icon}"><span>${c.name}</span>`;

div.addEventListener("click",()=>{

document.querySelectorAll(".cat").forEach(el=>el.classList.remove("active"));

div.classList.add("active");

filterCategory(c.name);

});

categoriesDiv.appendChild(div);

});

/* جلب المنتجات */

fetch(sheetURL)

.then(res=>res.json())

.then(data=>{

productsData=data;

displayProducts(productsData);

});

/* عرض المنتجات */

function displayProducts(list){

const container=document.getElementById("products");

container.innerHTML="";

list.forEach(p=>{

container.innerHTML+=`

<div class="product">

<img src="${p.image}">

<div class="info">

<div class="name">${p.name}</div>

<div class="price">${p.price} جنيه</div>

<button onclick='addToCart("${p.name}",${p.price})'>أضف للسلة</button>

</div>

</div>

`;

});

}

/* فلترة الأقسام */

function filterCategory(category){

if(category==="الكل"){

displayProducts(productsData);

return;

}

const filtered=productsData.filter(p=>

p.Category && p.Category.trim()===category

);

displayProducts(filtered);

}

/* البحث */

const searchInput=document.getElementById("searchInput");

searchInput.addEventListener("input",()=>{

const term=searchInput.value.toLowerCase();

const filtered=productsData.filter(p=>

(p.name && p.name.toLowerCase().includes(term)) ||

(p.Category && p.Category.toLowerCase().includes(term))

);

displayProducts(filtered);

});

/* السلة */

function addToCart(name,price){

let item=cart.find(i=>i.name===name);

if(item){

item.quantity++;

}else{

cart.push({name,price,quantity:1});

}

updateCart();

}

function updateCart(){

const cartDiv=document.getElementById("cartItems");

cartDiv.innerHTML="";

let total=0;

cart.forEach(item=>{

total+=Number(item.price)*item.quantity;

cartDiv.innerHTML+=`<p>${item.name} × ${item.quantity} - ${item.price} جنيه</p>`;

});

document.getElementById("totalPrice").innerText="الإجمالي: "+total+" جنيه";

document.getElementById("cartCount").innerText=cart.length;

}

/* إرسال الطلب */

function submitOrder(){

if(cart.length===0){

alert("السلة فارغة");

return;

}

const name=document.getElementById("name").value;

const phone=document.getElementById("phone").value;

const address=document.getElementById("address").value;

if(!name || !phone || !address){

alert("اكمل البيانات");

return;

}

let items=cart.map(i=>i.name+" × "+i.quantity).join(" | ");

let total=cart.reduce((sum,i)=>sum+i.price*i.quantity,0);

fetch("https://script.google.com/macros/s/YOUR_WEB_APP_URL/exec",{

method:"POST",

body:JSON.stringify({name,phone,address,items,total})

})

.then(res=>res.json())

.then(res=>{

if(res.status==="success"){

alert("تم إرسال الطلب بنجاح 💖");

cart=[];

updateCart();

}else{

alert("حدث خطأ");

}

})

.catch(err=>alert("حدث خطأ: "+err));

}
