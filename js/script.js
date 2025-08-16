// * add event on element

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

// * navbar toggle

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

// * Header sticky & back top btn active

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
};

addEventOnElem(window, "scroll", headerSticky);

// * scroll reveal effect

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
};

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

let cart = [];
let cartCountElem = document.querySelector('.header-action-btn[aria-label="cart item"] .btn-badge');
let cartTotalElem = document.querySelector('.header-action-btn[aria-label="cart item"] data');

function updateCartUI() {
  cartCountElem.textContent = cart.length;

  let total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotalElem.textContent = `$${total.toFixed(2)}`;
}

const addToCartBtns = document.querySelectorAll('.action-btn[aria-label="add to cart"]');

addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const productCard = btn.closest(".shop-card");

    const title = productCard.querySelector(".card-title").textContent;
    const priceText = productCard.querySelector(".price .span").textContent.replace("$", "");
    const price = parseFloat(priceText);

    const product = { title, price };

    cart.push(product);

    updateCartUI();

    console.log("Added to cart:", product);
  });
});
