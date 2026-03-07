const sheetURL="https://opensheet.elk.sh/1v0nH08PXdDqThcLCpMaWv-hzQCAHdGQG3kYLAQoVQEs/Sheet1";

fetch(sheetURL)

.then(res=>res.json())

.then(data=>{

const container=document.getElementById("products");

if(!container) return;

data.forEach(p=>{

container.innerHTML+=`

<div class="product">

<img src="${p.image}">

<div class="info">

<div>${p.name}</div>

<div class="price">${p.price} جنيه</div>

<button onclick="viewProduct('${p.name}','${p.price}','${p.image}')">

عرض المنتج

</button>

</div>

</div>

`;

});

});

function viewProduct(name,price,image){

window.location=

`product.html?name=${name}&price=${price}&image=${image}`;

}
