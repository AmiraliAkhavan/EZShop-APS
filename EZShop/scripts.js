const container = document.querySelector(".container");
const carousel = document.querySelector(".carousel");
const searchInput = document.querySelector("[data-search]");
// const products = document.querySelector(".products");
let products = [];
function html(ele) {
  const html = `<div class="card" style="width: 21rem">

  <a href="product.html?id=${ele.id}" class="title" target="_blank">
  <figure class="cardeffect">
  <img class="card-img-top" src="${ele.image}"
  alt="${ele.title}" />
  <figcaption>
  <h5>${ele.title}</h5>
  <b><p class="description">${ele.description}</p></b>
  </figcaption>
  </figure>
  <button class= "addbtnc"><a href="#!" class="add-cart">Add to cart</a></button>
  </a>
  </div>`;
  container.innerHTML += html;
  /* GETS NECESSARY INFO FOR CART */
  let products1 = {
    img : ele.image,
    name: ele.title,
    tag: ele.id,
    price: ele.price,
    inCart: 0,
  };

  products.push(products1);
  // console.log(products1);
}

const getData = async () => {
  const request = await axios.get("https://fakestoreapi.com/products");
  request.data.forEach((ele) => {
    html(ele);
  });
  search(request.data);
};

getData();

function search(element) {
  searchInput.addEventListener("input", (e) => {
    container.innerHTML = "";
    carousel.innerHTML = "";
    const epiCount = element.filter((ele) => {
      return (
        ele.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        ele.description.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    epiCount.forEach((ele) => {
      html(ele);
    });
  });
}
/*************************** CART ***************************/

setTimeout(() => {
  let carts = container.getElementsByClassName("add-cart");

  for (let i = 0; i < carts.length; i++) {
    console.log("aps");
    carts[i].addEventListener("click", () => {
      cartNumbers(products[i]);
      totalcost(products[i]);
    });
  }
}, 3000);

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function onLoadCardNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }


  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  console.log(cartItems);
}

function totalcost(product) {


  let cartCost = localStorage.getItem("totalCost");
  
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
  

}


onLoadCardNumbers();
