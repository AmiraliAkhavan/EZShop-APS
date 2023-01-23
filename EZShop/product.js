// const proImg = document.querySelector(".card-img-top");
const products = document.querySelector(".products");
const container = document.querySelector(".container");
const carousel = document.querySelector(".carousel");
// proImg.src = `https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg`;

function html(ele) {
  const html = `<section id="services" class="services section-bg">
    <div class="container-fluid">

        <div class="row row-sm">
            <div class="col-md-6">
                <img class="proimg" src="${ele.image}"alt="">
            </div>
            <div class="col-md-6">
                <div class="_product-detail-content">
                    <p class="_p-name">${ele.title}</p>
                    <div class="_p-price-box">
                        <div class="p-list">
                            <span>Price : <b>${ele.price} $</b>
                        </div>
                        
                        <div class="_p-features">
                            <span> Description About this product:- </span>
                            ${ele.description}
                        </div>
                        <form action="" method="post" accept-charset="utf-8">
                            <ul class="spe_ul"></ul>
                            <div class="_p-qty-and-cart">
                                <div class="_p-add-cart">
                                    <a href="#"><button class="btn-theme btn buy-btn">
                                        <i class="fa fa-shopping-cart"></i> Buy Now
                                    </button></a>
                        

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`;
  container.innerHTML += html;
}
const searchParams = new URLSearchParams(window.location.search);
const pageId = searchParams.get("id");

fetch(`https://fakestoreapi.com/products/${pageId}`)
  .then((res) => res.json())
  .then((json) => html(json));

// const getData = async () => {
//   const request = await axios.get("https://fakestoreapi.com/products/1");
//   request.data.forEach((ele) => {
//     ele.id = `product.html?productid=${ele.id}`
//     html(ele);
//   });

// };

// getData();
