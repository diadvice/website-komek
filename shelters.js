const shelters = [
  {
    name: "I am alive shelter",
    city: "astana",
    address: "Астана, ул. Примерная 1",
    phone: "+7 702 000 41 41",
    bank: "Каспи: 1234 5678 9012 3456",
    instagram: "@i_am_alive_shelter",
    emoji: "🐱"
  },
  {
    name: "Ковчег приют",
    city: "astana",
    address: "Астана, ул. Примерная 2",
    phone: "+7 701 334 71 01",
    bank: "Каспи: 4400 4364 0570 4473",
    paypal: "PayPal: productblog",
    emoji: "🦜"
  },
  {
    name: "Zverahelp",
    city: "astana",
    address: "Астана",
    phone: "+7 707 482 2307",
    instagram: "@zverahelpassistance",
    emoji: "🐈"
  },
  {
    name: "Асенька",
    city: "astana",
    address: "ул. Сарыарка, 31",
    phone: "+775 983 28 28",
    bank: "Каспи: 4400 6202 3021 1208",
    emoji: "🐾"
  },
  {
    name: "Балто",
    city: "astana",
    address: "Астана",
    phone: "+7 707 803 71 71",
    instagram: "@balto_shelter",
    emoji: "🐕"
  },
  {
    name: "СтопОтлов",
    city: "astana",
    address: "Сабина Манулова, 2/1",
    phone: "+7 775 232 22 99",
    instagram: "@stop_otlov",
    emoji: "🚫"
  },
  {
    name: "Добрые руки",
    city: "almaty",
    address: "Алматы, ул. Абая 10",
    phone: "+7 727 000 11 22",
    instagram: "@dobrye_ruki_almaty",
    emoji: "🤝"
  },
  {
    name: "Лапки",
    city: "almaty",
    address: "Алматы, мкр. Аlatau",
    phone: "+7 701 555 33 44",
    bank: "Каспи: 5169 1234 5678 9012",
    emoji: "🐾"
  },
  {
    name: "Хвост и лапы",
    city: "shymkent",
    address: "Шымкент, ул. Байтурсынова 5",
    phone: "+7 725 333 22 11",
    instagram: "@hvost_i_lapy",
    emoji: "🐶"
  },
  {
    name: "Пушистики",
    city: "taldykorgan",
    address: "Талдықорған",
    phone: "+7 728 444 55 66",
    emoji: "🐱"
  },
  {
    name: "Зверята",
    city: "semey",
    address: "Семей, ул. Ленина 1",
    phone: "+7 722 111 22 33",
    instagram: "@zveryata_semey",
    emoji: "🐇"
  },
  {
    name: "Найди друга",
    city: "almaty",
    address: "Алматы, ул. Сейфуллина 120",
    phone: "+7 701 999 88 77",
    bank: "Каспи: 4400 9988 7766 5544",
    emoji: "❤️"
  },
];

const CARDS_PER_PAGE = 6;
let currentPage = 1;
let activeFilter = "all";

function getFiltered() {
  if (activeFilter === "all") return shelters;
  return shelters.filter(s => s.city === activeFilter);
}

function renderCards() {
  const filtered = getFiltered();
  const total = filtered.length;
  const totalPages = Math.ceil(total / CARDS_PER_PAGE);
  if (currentPage > totalPages) currentPage = 1;

  const start = (currentPage - 1) * CARDS_PER_PAGE;
  const slice = filtered.slice(start, start + CARDS_PER_PAGE);

  const grid = document.getElementById("cardsGrid");
  grid.innerHTML = slice.map(s => `
    <div class="card">
      <div class="card__img-placeholder">${s.emoji}</div>
      <div class="card__body">
        <div class="card__name">${s.name}</div>
        <ul class="card__info">
          ${s.address ? `<li><span class="icon">📍</span>${s.address}</li>` : ""}
          ${s.phone ? `<li><span class="icon">📞</span>${s.phone}</li>` : ""}
          ${s.bank ? `<li><span class="icon">💳</span>${s.bank}</li>` : ""}
          ${s.paypal ? `<li><span class="icon">💰</span>${s.paypal}</li>` : ""}
          ${s.instagram ? `<li><span class="icon">📸</span>${s.instagram}</li>` : ""}
        </ul>
        <button class="card__btn">Подробнее &nbsp;→</button>
      </div>
    </div>
  `).join("");

  document.getElementById("pageInfo").textContent =
    total > CARDS_PER_PAGE ? `${currentPage} / ${totalPages}` : "";
  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = currentPage >= totalPages;
  document.getElementById("prevBtn").style.display = total > CARDS_PER_PAGE ? "" : "none";
  document.getElementById("nextBtn").style.display = total > CARDS_PER_PAGE ? "" : "none";
}

function prevPage() {
  if (currentPage > 1) { currentPage--; renderCards(); }
}

function nextPage() {
  const total = getFiltered().length;
  if (currentPage < Math.ceil(total / CARDS_PER_PAGE)) { currentPage++; renderCards(); }
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    currentPage = 1;
    renderCards();
  });
});

document.querySelectorAll(".city-pin").forEach(pin => {
  pin.addEventListener("click", () => {
    const city = pin.dataset.city;
    const btn = document.querySelector(`.filter-btn[data-filter="${city}"]`);
    if (btn) {
      btn.click();
      document.querySelector(".shelters-section").scrollIntoView({ behavior: "smooth" });
    }
  });
});

renderCards();
