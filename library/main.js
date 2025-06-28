// const hamburgerBtn = document.getElementById("hamburgerBtn");
// const sideMenu = document.getElementById("sideMenu");
// const closeBtn = document.getElementById("closeBtn");

// hamburgerBtn.addEventListener("click", () => {
//   sideMenu.classList.toggle("sidemenu--active");
// });

// closeBtn.addEventListener("click", () => {
//   sideMenu.classList.remove("sidemenu--active");
// });

const BOOKS = [
  {
    id: 1,
    title: "خواجه تاجدار",
    author: "ژان گور",
    published_date: 2007,
    language: "فارسی",
    genre: "تاریخ",
    imgSrc: "1.jpg",
  },
  {
    id: 2,
    title: "ضیافت",
    author: "افلاطون",
    published_date: 385,
    language: "یونانی",
    genre: "فلسفه",
    imgSrc: "2.jpg",
  },
  {
    id: 3,
    title: "منطق الطیر",
    author: "عطار",
    published_date: 1177,
    language: "فارسی",
    genre: "شعر",
    imgSrc: "3.jpg",
  },
  {
    id: 4,
    title: "مثنوی معنوی",
    author: "مولوی",
    published_date: 1258,
    language: "فارسی",
    genre: "شعر",
    imgSrc: "4.jpg",
  },
  {
    id: 5,
    title: "دیوان حافظ",
    author: "حافظ",
    published_date: 1200,
    language: "فارسی",
    genre: "شعر",
    imgSrc: "5.jpg",
  },
  {
    id: 6,
    title: "رومئو و ژولیت",
    author: "ویلیام شکسپیر",
    published_date: 1595,
    language: "انگلیسی",
    genre: "عاشقانه",
    imgSrc: "6.jpg",
  },
  {
    id: 7,
    title: "ویس و رامین",
    author: "فخرالدین اسعد گرگانی",
    published_date: 1054,
    language: "فارسی",
    genre: "عاشقانه",
    imgSrc: "7.jpg",
  },
  {
    id: 8,
    title: "گلستان",
    author: "سعدی",
    published_date: 1258,
    language: "فارسی",
    genre: "شعر",
    imgSrc: "8.jpg",
  },
  {
    id: 9,
    title: "بوستان",
    author: "سعدی",
    published_date: 1257,
    language: "فارسی",
    genre: "شعر",
    imgSrc: "9.jpg",
  },
  {
    id: 10,
    title: "گلشن راز",
    author: "شیخ محمود شبستری",
    published_date: 1311,
    language: "فارسی",
    genre: "شعر",
    imgSrc: "10.jpg",
  },
  {
    id: 11,
    title: "لیلی و مجنون",
    author: "نظامی",
    published_date: 1188,
    language: "فارسی",
    genre: "عاشقانه",
    imgSrc: "11.jpg",
  },
  {
    id: 12,
    title: "شاهنامه",
    author: "فردوسی",
    published_date: 1010,
    language: "فارسی",
    genre: "شعر",
    imgSrc: "12.jpg",
  },
  {
    id: 13,
    title: "ایلیاد",
    author: "هومر",
    published_date: 762,
    language: "یونانی",
    genre: "شعر",
    imgSrc: "13.jpg",
  },
  {
    id: 14,
    title: "اودیسه",
    author: "هومر",
    published_date: 725,
    language: "یونانی",
    genre: "شعر",
    imgSrc: "14.jpg",
  },
  {
    id: 15,
    title: "هملت",
    author: "ویلیام شکسپیر",
    published_date: 1609,
    language: "یونانی",
    genre: "درام",
    imgSrc: "15.jpg",
  },
  {
    id: 16,
    title: "دن کیشوت",
    author: "میگل دسروانتس",
    published_date: 1605,
    language: "اسپانیایی",
    genre: "درام",
    imgSrc: "16.jpg",
  },
];

const cartUl = document.getElementById("cart");
const localStorageCart = JSON.parse(localStorage.getItem("cart"));
const cartItems = localStorageCart || [];

function renderCartItems() {
  const filterBooks = BOOKS.filter((book) => cartItems.includes(book.id));

  if (filterBooks.length === 0) {
    cartUl.innerHTML = `
      <div class="empty-basket">
        <img src="./assets/images/icon/basket.png" alt="empty-basket" /> 
        <p>شما هیچ کالایی در سبد خرید خود ندارید!</p>
      </div>
    `;
    return;
  }

  const template = filterBooks
    .map((item) => {
      return `
        <li class="cart-list__item">
          <span><img src="./assets/images/books/${item.imgSrc}" alt="${item.title}" /></span>
          <span>${item.title}</span>
          <span>${item.author}</span>
          <span>
            <div class="quantity-control">
              <button>+</button>
              <span>1</span>
              <button>-</button>
            </div>
          </span>
          <span>۱۵۰٬۰۰۰ تومان</span>
          <span>
            <button onclick="DeleteFromCart(${item.id})" class="delete-button">×</button>
          </span>
        </li>
      `;
    })
    .join("");

  cartUl.innerHTML = template;
}

function DeleteFromCart(bookId) {
  const index = cartItems.indexOf(bookId);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCartItems();
  updateCartCount();
}

renderCartItems();

function toPersianNumber(number) {
  const persianNumber = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number
    .toString()
    .split("")
    .map((num) => persianNumber[+num] || num)
    .join("");
}

function updateCartCount() {
  const cartNumberEl = document.getElementById("cart-number");
  const count = cartItems.length;
  localStorage.setItem("cartCount", count);
  if (cartNumberEl) {
    cartNumberEl.textContent = toPersianNumber(count);
  }
}

updateCartCount();

const controls = document.querySelectorAll(".quantity-control");

for (let i = 0; i < controls.length; i++) {
  const plus = controls[i].children[0];
  const number = controls[i].children[1];
  const minus = controls[i].children[2];

  plus.onclick = function () {
    number.textContent = +number.textContent + 1;
  };

  minus.onclick = function () {
    if (+number.textContent > 1) number.textContent--;
  };
}
