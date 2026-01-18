let products = [
 {id:1,name:"Wireless Headphones",price:2999,image:"a1.jpg"},
 {id:2,name:"Smart Watch",price:4999,image:"a2.jpg"},
 {id:3,name:"Bluetooth Speaker",price:1999,image:"a3.jpg"},
 {id:4,name:"Laptop Bag",price:1499,image:"a4.jpg"},
 {id:5,name:"USB-C Charger",price:999,image:"a5.jpg"},
 {id:6,name:"Gaming Mouse",price:1299,image:"a6.jpg"},
 {id:7,name:"Keyboard",price:2499,image:"a7.jpg"},
 {id:8,name:"Power Bank",price:1799,image:"a8.jpg"},
 {id:9,name:"Earbuds",price:2199,image:"a9.jpg"},
 {id:10,name:"Monitor",price:12999,image:"a10.jpg"},
 {id:11,name:"Webcam",price:2199,image:"a11.jpg"},
 {id:12,name:"Router",price:1899,image:"a12.jpg"},
 {id:13,name:"Hard Disk",price:5499,image:"a13.jpg"},
 {id:14,name:"Pendrive",price:699,image:"a14.jpg"},
 {id:15,name:"Tablet",price:15999,image:"a15.jpg"},
 {id:16,name:"Laptop Stand",price:999,image:"a16.jpg"},
 {id:17,name:"Mobile Case",price:399,image:"a17.jpg"},
 {id:18,name:"Backpack",price:1999,image:"a18.jpg"},
 {id:19,name:"Trimmer",price:1499,image:"a19.jpg"},
 {id:20,name:"Iron Box",price:1299,image:"a20.jpg"},
 {id:21,name:"Toaster",price:1799,image:"a21.jpg"},
 {id:22,name:"Mixer",price:3499,image:"a22.jpg"},
 {id:23,name:"Kettle",price:1499,image:"a23.jpg"},
 {id:24,name:"Fan",price:2999,image:"a24.jpg"},
 {id:25,name:"LED Bulb",price:499,image:"a25.jpg"},
 {id:26,name:"Extension Board",price:699,image:"a26.jpg"},
 {id:27,name:"Tripod",price:1199,image:"a27.jpg"},
 {id:28,name:"Microphone",price:2499,image:"a28.jpg"},
 {id:29,name:"Office Chair",price:8999,image:"a29.jpg"},
 {id:30,name:"Computer Desk",price:11999,image:"a30.jpg"}
];



let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ---------------- LOAD PRODUCTS ----------------
function loadProducts(list = products){
  let pl = document.getElementById("productList");
  if(!pl) return;
  pl.innerHTML = "";
  list.forEach(p=>{
    pl.innerHTML += `
      <div class="product">
        <img src="${p.image}">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
        <button onclick="buyNow(${p.id})">Buy Now</button>
      </div>`;
  });
  updateCartCount();
}

// ---------------- SEARCH ----------------
function searchProducts(){
  let val = document.getElementById("searchBox").value.toLowerCase();
  loadProducts(products.filter(p=>p.name.toLowerCase().includes(val)));
}

// ---------------- CART ----------------
function addToCart(id){
  let item = cart.find(i=>i.id===id);
  if(item) item.qty++;
  else cart.push({id:id, qty:1});
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function buyNow(id){
  cart = [{id:id, qty:1}];
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "checkout.html";
}

function updateCartCount(){
  let c = document.getElementById("cartCount");
  if(c) c.innerText = cart.reduce((a,b)=>a+b.qty,0);
}

// ---------------- CART PAGE ----------------
function loadCart(){
  let ci = document.getElementById("cartItems");
  if(!ci) return;
  ci.innerHTML = "";
  let total = 0;

  cart.forEach((c,i)=>{
    let p = products.find(x=>x.id===c.id);
    let t = p.price*c.qty;
    total += t;
    ci.innerHTML += `
      <div class="product">
        <img src="${p.image}">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <input type="number" min="1" value="${c.qty}" onchange="updateQty(${i},this.value)">
        <p>Total: ₹${t}</p>
        <button onclick="removeItem(${i})">Remove</button>
      </div>`;
  });
  document.getElementById("totalPrice").innerText = total;
}

function updateQty(i,q){
  cart[i].qty=parseInt(q);
  localStorage.setItem("cart",JSON.stringify(cart));
  loadCart();
}

function removeItem(i){
  cart.splice(i,1);
  localStorage.setItem("cart",JSON.stringify(cart));
  loadCart();
}

// ---------------- DARK MODE TOGGLE ----------------
function toggleDarkMode(){
  document.body.classList.toggle("dark-mode");
}

