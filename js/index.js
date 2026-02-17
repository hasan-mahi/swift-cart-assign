// get all products
const getAllProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  const firstThree = data.slice(0, 3);
  displayAllProducts(firstThree);
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

getAllProducts();
