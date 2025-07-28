// const list = document.querySelector("navlist");
// const hamburger = document.querySelector(".fa-bars")


// hamburger.addEventListener("click", ()=>{
//     hamburger.classList.toggle("fa-x");
//     list.classList.toggle("navlist-active")
// })
// cart logic
  // All logic inside here
  
;
document.addEventListener("DOMContentLoaded", () => {
  const cartModal = document.getElementById("cart-modal");
  const cartItemsList = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const cartCountEls = document.querySelectorAll("#cart-count");
  let cart = [];

  function updateCartUI() {
    cartItemsList.innerHTML = "";
    let total = 0;
    cart.forEach((item, idx) => {
      total += item.price;
      const li = document.createElement("li");
      li.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
          <img src="${item.image}" alt="${item.title}" width="50">
          <div><strong>${item.title}</strong><br>$${item.price.toFixed(2)}</div>
          <button onclick="removeFromCart(${idx})" style="margin-left:auto;">Remove</button>
        </div>
      `;
      cartItemsList.appendChild(li);
    });
    cartTotalEl.textContent = total.toFixed(2);
    cartCountEls.forEach(el => el.textContent = cart.length);
  }

  function addToCart(product) {
    cart.push(product);
    updateCartUI();
    openCart();
  }

  document.querySelectorAll(".add-to-card").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      const title = card.querySelector(".title").textContent.trim();
      const price = parseFloat(card.querySelector(".amount").textContent.replace("$", ""));
      const image = card.querySelector("img").src;
      addToCart({ title, price, image });
    });
  });

  window.openCart = () => cartModal.style.display = "block";
  window.closeCart = () => cartModal.style.display = "none";
  window.removeFromCart = idx => {
    cart.splice(idx, 1);
    updateCartUI();
  };
});


let cart = [];

const addToCartButtons = document.querySelectorAll(".add-to-card");
const cartPanel = document.getElementById("cart-panel");
const cartItemsContainer = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");

// Add click listeners to all buttons
addToCartButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    const title = card.querySelector(".title").textContent;
    const price = parseFloat(card.querySelector(".amount").textContent.replace("$", ""));
    const image = card.querySelector("img").src;

    addToCart({ title, price, image });
    openCart();
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.querySelectorAll("#cart-count");
  const addToCartButtons = document.querySelectorAll(".add-to-card");

  let cart = [];

  function updateCartUI() {
    // Clear current items
    cartItemsContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${item.image}" alt="${item.title}" width="50" height="50">
          <div>
            <strong>${item.title}</strong><br>
            $${item.price}
          </div>
          <button onclick="removeFromCart(${index})" style="margin-left:auto; background: red; color: white;">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(li);
      total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.forEach(span => (span.textContent = cart.length));
  }

  function addToCart(product) {
    cart.push(product);
    updateCartUI();
  }

  // Attach click handlers to each "Add to Cart" button
  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      const title = card.querySelector(".title").textContent.trim();
      const price = parseFloat(card.querySelector(".amount").textContent.replace("$", ""));
      const image = card.querySelector("img").src;

      const product = { title, price, image };
      addToCart(product);
      openCart();
    });
  });

  // Expose globally for remove buttons
  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCartUI();
  };

  window.openCart = function () {
    document.getElementById("cart-modal").style.display = "block";
  };

  window.closeCart = function () {
    document.getElementById("cart-modal").style.display = "none";
  };
});

function addToCart(product) {
  const existing = cart.find(item => item.title === product.title);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
}

function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const itemEl = document.createElement("div");
    itemEl.classList.add("cart-item");
    itemEl.innerHTML = `
      <p><strong>${item.title}</strong></p>
      <p>Price: $${item.price}</p>
      <p>Qty: ${item.quantity}</p>
      <hr>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  cartCountEl.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartTotalEl.textContent = total.toFixed(2);
}

function openCart() {
  cartPanel.classList.add("active");
}

function closeCart() {
  cartPanel.classList.remove("active");
}

let card = JSON.parse(localStorage.getItem('cart')) || [];

const updateCartCount = () => {
  const cartCountElement = document.getElementById('cart-count');
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
};

const addToCart = (product) => {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.title} added to cart!`);
};

// fetch & render products
const productContainer = document.getElementById('product-list');

const fetchProducts = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/products');
    const products = await res.json();
    renderProducts(products);
  } catch (err) {
    console.error('Error fetching products:', err);
  }
};

const renderProducts = (products) => {
  productContainer.innerHTML = ''; // Clear any previous items

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('card');

    productCard.innerHTML = `
  <img src="${product.image}" alt="${product.title}">
  <div class="card-content">
    <p class="title">${product.title}</p>
    <div class="price">
      <span class="amount">$${product.price}</span>
    </div>
    <button class="add-to-card" onclick='handleAddToCart(${JSON.stringify({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image
    }).replace(/"/g, '&quot;')})'>Add to Cart</button>
  </div>
`;

const handleAddToCart = (product) => {
  addToCart(product);
  openCart();
};


const openCart = () => {
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    cartModal.style.display = 'block';
  }
};


    const btn = productCard.querySelector('.add-to-card');
    btn.addEventListener('click', () => {
      addToCart({
        id: product._id, // assuming MongoDB _id
        title: product.title,
        price: product.price,
        image: product.image
      });
    });

    productContainer.appendChild(productCard);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  fetchProducts();
});

