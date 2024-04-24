// Cart Functionality

let cart_nav = document.getElementsByClassName("cart");
let checkout_cart = document.getElementById("checkout-cart");
let fix_cart = document.getElementById("fix-cart-btn");

function showCart() {
  if (checkout_cart.style.display != "block") {
    checkout_cart.style.display = "block";
  } else {
    checkout_cart.style.display = "none";
  }
}
cart_nav[0].addEventListener("click", showCart, closeCart);
fix_cart.addEventListener("click", showCart, closeCart);

function closeCart() {
  checkout_cart.style.display = "none";
}

productAddBtn = document.getElementsByClassName("add-btn");
div_checkoutProducts = document.getElementById("checkout-products");
cart_item_count = document.getElementById("num-items");

const getProducts = () => {
  let products;
  if (localStorage.getItem("cart") === null) {
    products = [];
    fix_cart.style.display = "none";
  } else {
    products = JSON.parse(localStorage.getItem("cart"));
    cart_item_count.innerHTML = products.length;
    if (cart_item_count.innerHTML != 0) {
      fix_cart.style.display = "flex";
    } else {
      fix_cart.style.display = "none";
    }
  }
  let output;
  const allProducts = products.map((product) => {
    return `
    <div class="cart-product">
      <img src="${product.image}" alt="" />
      <h4>${product.title}</h4>
      <p class="cart-product-price">&#x20B9;${product.price}</p>
      <div class="product-quantity">
        <i class="fa-solid fa-angle-left" onclick="decreaseQty(${product.id})"></i>
          <span class="quantity">${product.quantity}</span>
        <i class="fa-solid fas fa-angle-right" onclick="increaseQty(${product.id})"></i>
      </div>
      <div class="delete-product">
          <button onclick="removeProduct(${product.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
      </div>
    </div>
        `;
  });
  output = allProducts.join("");
  div_checkoutProducts.innerHTML = output;
};

getProducts();

function addProduct(id, title, price, image) {
  let product = {
    id: id,
    quantity: 1,
    image: image,
    title: title,
    price: price,
  };
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    cart = [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    getProducts();
  } else {
    cart = JSON.parse(cart);
    let item = cart.find((item) => item.id == id);
    if (item) {
      item.quantity++;
    } else {
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    getProducts();
  }
}

const removeProduct = (id) => {
  let products;
  if (localStorage.getItem("cart") === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("cart"));
  }
  products = products.filter((product) => {
    return product.id !== +id;
  });
  localStorage.setItem("cart", JSON.stringify(products));
  getProducts();
};

const increaseQty = (id) => {
  let products;
  if (localStorage.getItem("cart") === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("cart"));
    let item = products.find((item) => item.id == id);
    if (item) {
      item.quantity++;
    }
    localStorage.setItem("cart", JSON.stringify(products));
    getProducts();
  }
};

const decreaseQty = (id) => {
  let products;
  if (localStorage.getItem("cart") === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("cart"));
    let item = products.find((item) => item.id == id);
    if (item.quantity > 1) {
      item.quantity--;
    }
    localStorage.setItem("cart", JSON.stringify(products));
    getProducts();
  }
};

// Like Functionality
function likeProduct(id) {
  let product = id;
  let products;
  if (localStorage.getItem("liked") === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("liked"));
  }
  let index = products.indexOf(id);
  if (index !== -1) {
    products.splice(index, 1);
    liked = document.getElementById(id);
    liked.style.color = "#999";
  } else {
    products.push(product);
  }
  localStorage.setItem("liked", JSON.stringify(products));
  getLikedProducts();
}

getLikedProducts = () => {
  let products;
  if (localStorage.getItem("liked") === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("liked"));
  }
  products.map((id) => {
    liked = document.getElementById(id);
    liked.style.color = "red";
  });
};
getLikedProducts();

// Nav Category Functionality
hero_div = document.getElementById("hero");
feature_div = document.getElementById("featured-products");
weekly_div = document.getElementById("weekly-top-selling");

const shop = () => {
  hero_div.style.display = "none";
  // feature_div.style.display = "none";
  // weekly_div.style.display = "none";
  // hr = document.querySelectorAll("hr");
  // hr.forEach((element) => {
  //   element.style.display = "none";
  // });
};

const home = () => {
  hero_div.style.display = "grid";
};

// shop();
