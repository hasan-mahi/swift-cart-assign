//get cart from local
const getCartFromLocal = () => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  }
  return [];
};

// Add product to localStorage cart
const addCartToLocal = (product) => {
  const cart = getCartFromLocal();
  const exists = cart.some((item) => item === product);

  if (!exists) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

// Remove product from localStorage cart
const removeCartFromLocal = (product) => {
  let cart = getCartFromLocal();
  cart = cart.filter((id) => id !== product);
  localStorage.setItem("cart", JSON.stringify(cart));
};

// added cart
let cart = getCartFromLocal();

const addCart = (product) => {
  addCartToLocal(product);
  cart = getCartFromLocal();
  updateCartCount();
};

const updateCartCount = () => {
  const cartCount = document.getElementById("cart-count");
  cartCount.innerText = cart.length;
};

document.addEventListener("DOMContentLoaded", () => {
  cart = getCartFromLocal();
  updateCartCount();
});

// for cart modal product
// get cart product that already added
const getCartProducts = (allProducts) => {
  const cartIds = getCartFromLocal();
  const cartProducts = [];

  for (let id of cartIds) {
    const product = allProducts.find((p) => p.id === id);
    if (product) {
      cartProducts.push(product);
    }
  }

  return cartProducts;
};

// calculate cart price
const calculateTotal = (products) => {
  let total = 0;

  for (let product of products) {
    total += product.price;
  }

  return total.toFixed(2);
};

// display cart items
const displayCartItems = (products) => {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "flex justify-between items-center border p-3 rounded-lg";

    div.innerHTML = `
      <div class="flex gap-3 items-center">
        <img src="${product.image}" class="w-16 h-16 object-contain" />
        <div>
          <h4 class="font-semibold text-sm">${product.title}</h4>
          <p class="text-sm">$${product.price}</p>
        </div>
      </div>
      <button 
        class="btn btn-sm btn-outline btn-error"
        onclick="removeCartItem(${product.id})"
      >-</button>
    `;

    cartContainer.appendChild(div);
  });

  document.getElementById("cart-total").innerText =
    `$ ${calculateTotal(products)}`;
};

// remove product from cart
const removeCartItem = async (productId) => {
  removeCartFromLocal(productId);
  cart = getCartFromLocal();
  updateCartCount();

  // Fetch products
  const res = await fetch("https://fakestoreapi.com/products");
  const allProducts = await res.json();
  const cartProducts = getCartProducts(allProducts);
  displayCartItems(cartProducts);
};

const openCartModal = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const allProducts = await res.json();

  const cartProducts = getCartProducts(allProducts);
  displayCartItems(cartProducts);
  cart_modal.showModal();
};
