const filterSidebar = document.getElementById("filterSidebar");
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

const selectedAuthores = [];
const selectedLanguages = [];
const selectedGenres = [];
const selectedYears = [];
const localStorageCart = JSON.parse(localStorage.getItem("cart"));
const cartItems = localStorageCart || [];

function render(booksList) {
  const template = booksList
    .map((book) => {
      return `
        <div class="products-card">
          <img src="./assets/images/books/${book.imgSrc}" alt="${
        book.title
      }" class="products-card__image" />
          <div class="products-card__info">
            <h3 class="products-card__title">${book.title}</h3>
            <p class="products-card__author">${book.author}</p>
            <p class="products-card__price">۱۵۰٬۰۰۰ تومان</p>
          </div>
          <div class="products-card__overlay">
            <div class="products-card__details">
              <p>ژانر: ${book.genre}</p>
              <p>زبان: ${book.language}</p>
              <p>سال انتشار: ${book.published_date}</p>
             ${
               cartItems.includes(book.id)
                 ? `<a href="./cartitem.html" class="products-card__buy-button">مشاهده کتابخانه <i class="fas fa-book-reader"></i></a>`
                 : `<button onclick=addToCart(${book.id}) class="products-card__buy-button">افزودن به کتابخانه <i class="fas fa-book-reader"></i></button>`
             }
              </div>
          </div>
        </div>
      `;
    })
    .join("");

  document.querySelector(".products-container").innerHTML = template;
}

render(BOOKS);

function addToCart(id) {
  if (!cartItems.includes(id)) cartItems.push(id);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  render(BOOKS);
  updateCartCount();
}

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

updateCartCount()

function authorChange(event) {
  const value = event.target.value;
  if (event.target.checked) {
    if (!selectedAuthores.includes(value)) {
      selectedAuthores.push(value);
    }
  } else {
    const index = selectedAuthores.findIndex((item) => item === value);
    if (index !== -1) {
      selectedAuthores.splice(index, 1);
    }
  }
}

function languageChange(event) {
  const value = event.target.value;
  if (event.target.checked) {
    if (!selectedLanguages.includes(value)) {
      selectedLanguages.push(value);
    }
  } else {
    const index = selectedLanguages.findIndex((item) => item === value);
    if (index !== -1) {
      selectedLanguages.splice(index, 1);
    }
  }
}

function genreChange(event) {
  const value = event.target.value;
  if (event.target.checked) {
    if (!selectedGenres.includes(value)) {
      selectedGenres.push(value);
    }
  } else {
    const index = selectedGenres.findIndex((item) => item === value);
    if (index !== -1) {
      selectedGenres.splice(index, 1);
    }
  }
}

function yearChange(event) {
  const value = event.target.value;
  if (event.target.checked) {
    if (!selectedYears.includes(value)) {
      selectedYears.push(value);
    }
  } else {
    const index = selectedYears.findIndex((item) => item === value);
    if (index !== -1) {
      selectedYears.splice(index, 1);
    }
  }
}

function renderFilter(booksList) {
  const authors = [];
  for (const book of booksList) {
    if (!authors.includes(book.author)) {
      authors.push(book.author);
    }
  }

  const authorTemplate = authors
    .map((author, index) => {
      return `
        <div>
          <label for="author-${index}">${author}</label>
          <input class="author-checkbox" id="author-${index}" type="checkbox" value="${author}" />
        </div>
      `;
    })
    .join("");

  const languages = [];
  for (const book of booksList) {
    if (!languages.includes(book.language)) {
      languages.push(book.language);
    }
  }

  const languageTemplate = languages
    .map((lang, index) => {
      return `
        <div>
          <label for="lang-${index}">${lang}</label>
          <input class="lang-checkbox" id="lang-${index}" type="checkbox" value="${lang}" />
        </div>
      `;
    })
    .join("");

  const genres = [];
  for (const book of booksList) {
    if (!genres.includes(book.genre)) {
      genres.push(book.genre);
    }
  }

  const genreTemplate = genres
    .map((genre, index) => {
      return `
        <div> 
          <label for="genre-${index}">${genre}</label>
          <input class="genre-checkbox" id="genre-${index}" type="checkbox" value="${genre}"/>
        </div>`;
    })
    .join("");

  const years = [];
  for (const book of booksList) {
    const yearStr = String(book.published_date);
    if (!years.includes(yearStr)) {
      years.push(yearStr);
    }
  }

  const yearTemplate = years
    .map((year, index) => {
      return `
        <div> 
          <label for="year-${index}">${year}</label>
          <input class="year-checkbox" id="year-${index}" type="checkbox" value="${year}"/>
        </div>`;
    })
    .join("");

  let fullTemplate = `
    <div class="accordion">
    <h2 class="filter-title">دسته بندی کتاب‌ها</h2>
      <h3 class="accordion-title">نویسنده</h3>
      <div class="accordion-content">${authorTemplate}</div>
    </div>
    <div class="accordion">
      <h3 class="accordion-title">زبان</h3>
      <div class="accordion-content">${languageTemplate}</div>
    </div>
    <div class="accordion">
      <h3 class="accordion-title">ژانر</h3>
      <div class="accordion-content">${genreTemplate}</div>
    </div>
    <div class="accordion">
      <h3 class="accordion-title">سال انتشار</h3>
      <div class="accordion-content">${yearTemplate}</div>
    </div>
    <div>
        <button class="filter-sidebar__btn--apply">اعمال فیلترها</button>
        <button class="filter-sidebar__btn--reset">حذف فیلترها</button>
       </div>
  `;

  filterSidebar.innerHTML = fullTemplate;

  const authorCheckboxes = document.querySelectorAll(".author-checkbox");
  for (const checkbox of authorCheckboxes) {
    checkbox.addEventListener("change", authorChange);
  }

  const langCheckboxes = document.querySelectorAll(".lang-checkbox");
  for (const checkbox of langCheckboxes) {
    checkbox.addEventListener("change", languageChange);
  }

  const genreCheckboxes = document.querySelectorAll(".genre-checkbox");
  for (const checkbox of genreCheckboxes) {
    checkbox.addEventListener("change", genreChange);
  }

  const yearCheckboxes = document.querySelectorAll(".year-checkbox");
  for (const checkbox of yearCheckboxes) {
    checkbox.addEventListener("change", yearChange);
  }
}

renderFilter(BOOKS);

function filterBooks() {
  let filtered = BOOKS;

  if (selectedAuthores.length > 0) {
    filtered = filtered.filter((book) =>
      selectedAuthores.includes(book.author)
    );
  }

  if (selectedLanguages.length > 0) {
    filtered = filtered.filter((book) =>
      selectedLanguages.includes(book.language)
    );
  }

  if (selectedGenres.length > 0) {
    filtered = filtered.filter((book) => selectedGenres.includes(book.genre));
  }

  if (selectedYears.length > 0) {
    filtered = filtered.filter((book) =>
      selectedYears.includes(String(book.published_date))
    );
  }

  render(filtered);
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("filter-sidebar__btn--reset")) {
    selectedAuthores.length = 0;
    selectedLanguages.length = 0;
    selectedGenres.length = 0;
    selectedYears.length = 0;
    const checkboxes = document.querySelectorAll(
      ".author-checkbox, .lang-checkbox, .genre-checkbox, .year-checkbox"
    );
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    render(BOOKS);
  }
  if (event.target.classList.contains("filter-sidebar__btn--apply")) {
    filterBooks();
  }
});


document.addEventListener("click", function (event) {
  if (event.target.classList.contains("filter-sidebar__btn--reset")) {
    selectedAuthores.length = 0;
    selectedLanguages.length = 0;
    selectedGenres.length = 0;
    selectedYears.length = 0;
    const checkboxes = document.querySelectorAll(
      ".author-checkbox, .lang-checkbox, .genre-checkbox, .year-checkbox"
    );
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    render(BOOKS);
  }
});


const hamburgerBtn = document.getElementById("hamburgerBtn");
const sideMenu = document.getElementById("sideMenu");
const closeBtn = document.getElementById("closeBtn");

hamburgerBtn.addEventListener("click", () => {
  sideMenu.classList.toggle("sidemenu--active");
});

closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("sidemenu--active");
});

document.querySelectorAll(".accordion-title").forEach((title) => {
  title.addEventListener("click", () => {
    title.classList.toggle("active");
    const content = title.parentElement.querySelector(".accordion-content");
    content.classList.toggle("open");
  });
});

const toggleBtn = document.querySelector(".filter-sidebar__toggle");
const sidebar = document.querySelector(".filter-sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});


