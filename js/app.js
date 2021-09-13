const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  console.log(products)
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const reteCount=product.rating.rate;
    let start='';
    let count=0;
    for(let i=0;i<5;i++){
     if(Math.floor(reteCount)>i){
       start+=('<i class="fas fa-star"></i>')
     }else if((reteCount + '').includes('.')&&count==0){
       start +=('<i class="fas fa-star-half-alt"></i>')
       count++;
     }else{
       start +=('<i class="far fa-star"></i>')
     }
    
    }

// // product add

    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title.slice(0,18)}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
       <p>Rating ${start} (${reteCount})</p>
       <p> <i class="fas fa-user" id="user"> </i> Reviews :  ${product.rating.count}</p>
      <button onclick="addToCart(${product.id},${product.price})"id="addToCart-btn" class="buy-now btn btn-dark">add to cart</button>
      <button id="details-btn" class="btn btn-danger" onclick="details('${product.id}')" <li class="nav-item mx-2"data-bs-toggle="modal" data-bs-target="#exampleModal"></li>Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted =parseFloat(element);

  return converted;
 
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total.toFixed(2));
  updateTotal()
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText =parseFloat(value.toFixed(2));
  updateTotal()
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 0) {
    setInnerText("delivery-charge", 20);
    setInnerText("total-tax", priceConverted * 0.2);
    updateTotal()
  }

  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText =(grandTotal.toFixed(2));
};



// /////////////  details

function details(id){

const url=`https://fakestoreapi.com/products/${id}`;
fetch(url)
.then(res=>res.json())
.then(data=>displayditails(data))

}

const displayditails=(product)=>{
 

console.log(product)

const cardproduct=document.getElementById("cartProducts")
cardproduct.textContent="";
const div=document.createElement("div")
div.classList.add("box-size")

div.innerHTML=`
 <div class="card">
 <img src="${product.image}" class="w-50 mx-auto h-25" />
  <div class="card-body">
  <h5>${product.title}</h5>
  <p>${product.description}</p>
  <small>Rate: ${product.rating.rate}</small><br/>
  <small>Reviews:${product.rating.count}</small>
  <h4>Price :  $ ${product.price}</h4>
  </div>
 </div>

`

cardproduct.appendChild(div)

// category: "men's clothing"
// description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket."
// id: 2
// image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
// price: 22.3
// rating: {rate: 4.1, count: '259'}
// title
}



function buynow(){

  
  
  confirm("congratulations your order is procceing")

}