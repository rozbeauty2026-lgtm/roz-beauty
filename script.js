// رابط Google Sheet
const sheetURL = "https://opensheet.elk.sh/1v0nH08PXdDqThcLCpMaWv-hzQCAHdGQG3kYLAQoVQEs/Sheet1";

// رابط Apps Script لاستلام الطلبات
const orderAPI = "https://script.google.com/macros/s/AKfycbwJOdPdKK4Kxkwy-MxGNvPSDI8HGcgkCyVMjDtsNAbYZmdHNxgEGJQQQEzUlzTEujv7TA/exec";

let allProducts = [];
let cart = [];


// جلب المنتجات من الشيت
fetch(sheetURL)
.then(res => res.json())
.then(data => {
    allProducts = data;
    showProducts(data);
});


// عرض المنتجات
function showProducts(products){

    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(p => {

        container.innerHTML += `
        <div class="product">

            <img src="${p.image}">

            <div class="info">

                <div class="name">${p.name}</div>

                <div class="price">${p.price} جنيه</div>

                <button onclick='addToCart("${p.name}",${p.price})'>
                أضف للسلة
                </button>

            </div>

        </div>
        `;
    });

}


// فلترة المنتجات حسب القسم
function filterProducts(category){

    const filtered = allProducts.filter(p => p.Category === category);

    showProducts(filtered);

}



// إضافة منتج للسلة
function addToCart(name, price){

    cart.push({
        name: name,
        price: price,
        quantity: 1
    });

    updateCart();

}



// تحديث السلة
function updateCart(){

    const cartDiv = document.getElementById("cartItems");

    cartDiv.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        cartDiv.innerHTML += `
        <p>
        ${item.name} × ${item.quantity}
        - ${item.price} جنيه
        </p>
        `;

    });

    document.getElementById("totalPrice").innerText =
    "الإجمالي: " + total + " جنيه";

    document.getElementById("cartCount").innerText = cart.length;

}



// إرسال الطلب
function submitOrder(){

    if(cart.length === 0){

        alert("السلة فارغة");

        return;

    }

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    let items = cart.map(i => i.name + " × " + i.quantity).join(" | ");

    let total = cart.reduce((sum,i)=>sum+i.price*i.quantity,0);


    fetch(orderAPI,{

        method:"POST",

        body:JSON.stringify({
            name,
            phone,
            address,
            items,
            total
        })

    })

    .then(res=>res.json())

    .then(res=>{

        if(res.status === "success"){

            alert("تم إرسال الطلب بنجاح 💖");

            cart = [];

            updateCart();

        }

        else{

            alert("حدث خطأ أثناء إرسال الطلب");

        }

    })

    .catch(err=>{

        alert("خطأ في الاتصال");

    });

      }
