// get all products
const getAllProducts = async () => {
  showLoader();
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  displayAllProducts(data);
  hideLoader();
};

const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
};

const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
};

//display all products
const displayAllProducts = (products) => {
  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");

    card.className =
      "card bg-base-100 shadow-md hover:shadow-xl transition duration-300";

    card.innerHTML = `
      <figure class="p-4">
        <img
          src="${product.image}"
          alt="${product.title}"
          class="h-48 w-full object-contain"
        />
      </figure>

      <!-- Category & Rating -->
      <div class="flex justify-between items-center px-4 text-sm">
        <div class="badge badge-outline badge-primary">
          ${product.category}
        </div>
        <p class="text-gray-500">
         <i class="fa-solid fa-star text-yellow-500"></i> ${product.rating.rate} (${product.rating.count})
        </p>
      </div>

      <!-- Card Body -->
      <div class="card-body pt-4">
        <h2 class="card-title text-sm line-clamp-2">
          ${product.title}
        </h2>

        <p class="text-lg font-bold">$${product.price}</p>

        <!-- Buttons -->
        <div class="card-actions gap-2 mt-4">
     <button onclick="getProductById(${product.id})" class="btn btn-outline btn-neutral btn-sm flex-1">
        <i class="fa-regular fa-eye"></i>Details</button>

          <button onclick="addCart(${product.id})" class="btn btn-primary btn-sm flex-1">
            <i class="fa-solid fa-cart-shopping"></i>
            Add
          </button>
        </div>
      </div>
    `;

    cardContainer.appendChild(card);
  });
};

//get all category
const getAllCategory = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((data) => displayAllCategory(data));
};

//display all category
const displayAllCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";
  categories.forEach((category) => {
    const allBadge = document.createElement("div");
    allBadge.className = "badge badge-outline cursor-pointer px-4 py-2";
    allBadge.innerHTML = category;

    allBadge.addEventListener("click", () => {
      getProductByCategory(category);
      setActiveCategory(allBadge);
    });

    categoryContainer.append(allBadge);
  });
};

// get product by category
const getProductByCategory = async (category) => {
  showLoader();
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`,
  );
  const data = await res.json();
  displayAllProducts(data);
  hideLoader();
};

// set style for active category
const setActiveCategory = (activeBadge) => {
  document.querySelectorAll("#category-container .badge").forEach((badge) => {
    badge.classList.remove("badge-primary");
    badge.classList.add("badge-outline");
  });

  activeBadge.classList.remove("badge-outline");
  activeBadge.classList.add("badge-primary");
};

//get product by id
const getProductById = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => displayProductDetails(data));
};

//display product details
const displayProductDetails = (product) => {
  const modal = document.getElementById("product-modal");

  modal.innerHTML = `
    <div class="modal-box w-11/12 max-w-lg rounded-xl p-6 sm:p-8 shadow-lg bg-white">
      <h3 class="text-2xl font-bold mb-3 text-gray-900">${product.title}</h3>
      <p class="text-gray-700 mb-4 leading-relaxed">${product.description}</p>
      <div class="flex justify-between items-center mb-6">
        <p class="text-xl font-bold text-gray-900">$${product.price}</p>
        <p class="text-sm text-gray-500">
          <i class="fa-solid fa-star text-yellow-500"></i> ${product.rating.rate} (${product.rating.count} reviews)
        </p>
      </div>
      <div class="modal-action flex flex-col sm:flex-row gap-3">
        <form method="dialog" class="flex-1">
          <button class="btn btn-primary w-full">Buy Now</button>
        </form>
        <form method="dialog" class="flex-1">
          <button onclick="addCart(${product.id})" class="btn btn-outline w-full">Add to Cart</button>
        </form>
      </div>
    </div>
  `;

  // open modal
  modal.showModal();
};

getAllProducts();
getAllCategory();
