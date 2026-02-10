/*********************************
 * LOAD PRODUCTS FROM ADMIN
 *********************************/
/*********************************
 * PRODUCTS (STATIC – GITHUB SAFE)
 *********************************/
const products = [
  {
    name: "Spiderman Keychain",
    price: 299,
    img: "images/spiderman.jpg"
  },
  {
    name: "Reversible Doll",
    price: 999,
    img: "images/bunny.jpg"
  },
  {
    name: "Spiderman Beanie",
    price: 345,
    img: "images/Spiderman Beanie.jpg"
  },
  {
    name: "Cherry Car Hangings",
    price: 199,
    img: "images/cherry.jpg"
  },
  {
    name: "Tulip Flower Pot",
    price: 399,
    img: "images/Tulip Flower Pot.jpg"
  },
  {
    name: "Bow Mesh Bag",
    price: 599,
    img: "images/Bow Mesh Bag.jpg"
  },
  {
    name: "Panda Keychain",
    price: 299,
    img: "images/Panda Keychain.jpg"
  },
  {
    name: "Sunflower",
    price: 299,
    img: "images/sunflower.jpg"
  },
  {
    name: "Flower Vase",
    price: 499,
    img: "images/flowervase.jpg"
  },
  {
    name: "Cat Keychain",
    price: 199,
    img: "images/catkeychain.jpg"
  },
  {
    name: "Star Keychain",
    price: 199,
    img: "images/Starkeychain.jpg"
  },
  {
    name: "Luffy",
    price: 345,
    img: "images/Luffy.jpg"
  }
];

/*********************************
 * GET ELEMENTS (SAFE)
 *********************************/
const container = document.getElementById("products");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const miniCart = document.getElementById("miniCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

/*********************************
 * CART STATE
 *********************************/
let cart = JSON.parse(localStorage.getItem("cart")) || [];
if (cartCount) cartCount.innerText = cart.length;

/*********************************
 * RENDER PRODUCTS (SAFE)
 *********************************/
function renderProducts() {
  if (!container) return; // ✅ prevents crash on hero page

  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>No products added yet.</p>";
    return;
  }

  products.forEach((p) => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}" onclick="openModal('${p.img}')">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>
        <div class="btns">
          <button class="add" onclick="addToCart('${p.name}', ${p.price})">
            Add to Cart
          </button>
          <button class="buy" onclick="buyNow('${p.name}', ${p.price})">
            Buy
          </button>
        </div>
      </div>
    `;
  });
}

/*********************************
 * CART FUNCTIONS
 *********************************/
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  if (cartCount) cartCount.innerText = cart.length;
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  if (cartCount) cartCount.innerText = cart.length;
  renderCart();
}

function renderCart() {
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} - ₹${item.price}</span>
        <button class="remove-btn" onclick="removeItem(${index})">✖</button>
      </div>
    `;
  });

  cartTotal.innerText = total;
}

/*********************************
 * MINI CART TOGGLE
 *********************************/
function toggleCart() {
  if (!miniCart) return;
  miniCart.classList.toggle("show");
  renderCart();
}

/*********************************
 * CHECKOUT
 *********************************/
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  const phoneNumber = "918590033956"; // <-- your WhatsApp number (no +)

  let message = "Hello, I would like to place an order with the following items:\n\n";

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - Rs.${item.price}\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  message += `\nTotal Amount: Rs.${total}\n`;
  message += "Please let me know the availability. Thank you.";

  const whatsappURL =
    "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

  // ✅ Open WhatsApp
  window.open(whatsappURL, "_blank");

  // ✅ AUTO-CLEAR CART
  cart = [];
  localStorage.removeItem("cart");

  // ✅ UPDATE UI
  cartCount.innerText = 0;
  renderCart();

  // ✅ CLOSE MINI CART (optional but clean UX)
  miniCart.classList.remove("show");
}

/*********************************
 * BUY NOW
 *********************************/
function buyNow(name, price, img) {
  const phoneNumber = "918590033956"; // 👈 your WhatsApp number (with country code)

  const message =
    `Hello,%0A%0A` +
    `I’m interested in purchasing the following product:%0A%0A` +
    `• Product: ${name}%0A` +
    `• Price: ₹${price}%0A` +
    `Could you please confirm availability?%0A%0A` +
    `Thank you.`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

  window.open(whatsappURL, "_blank");
}

/*********************************
 * IMAGE MODAL
 *********************************/
function openModal(src) {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  if (!modal || !modalImg) return;

  modal.style.display = "flex";
  modalImg.src = src;
}

function closeModal() {
  const modal = document.getElementById("imgModal");
  if (modal) modal.style.display = "none";
}

/*********************************
 * DARK MODE
 *********************************/
function toggleDark() {
  document.body.classList.toggle("dark");
}

/*********************************
 * HERO IMAGE SLIDER (100% SAFE)
 *********************************/
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-image.slider .slide");

  if (!slides.length) return; // ✅ no hero on products page

  let currentSlide = 0;

  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 2500);
});

/*********************************
 * INITIAL LOAD
 *********************************/
renderProducts();
renderCart();


