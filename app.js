// ============================================================
// KAPRELOVED — APP LOGIC
// ============================================================

(() => {
  // ── State ──────────────────────────────────────────────────
  let activeCategory = "all";
  let activeCondition = "all";
  let searchQuery = "";
  let sortOrder = "default";
  let activeProduct = null;

  // ── DOM refs ───────────────────────────────────────────────
  const grid = document.getElementById("listings-grid");
  const emptyState = document.getElementById("empty-state");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");
  const categoryBtns = document.querySelectorAll("[data-category]");
  const conditionBtns = document.querySelectorAll("[data-condition]");
  const modal = document.getElementById("modal");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalClose = document.getElementById("modal-close");
  const countEl = document.getElementById("item-count");

  // ── Helpers ────────────────────────────────────────────────
  const fmt = (n) => "Rp " + n.toLocaleString("id-ID");

  const conditionColor = {
    "Like New": "cond-likenew",
    "Very Good": "cond-verygood",
    "Good": "cond-good",
  };

  const placeholder = (category) => {
    const map = { Pakaian: "👕", Sepatu: "👟", Tas: "👜", Aksesoris: "⌚", Lainnya: "📦" };
    return map[category] || "📦";
  };

  // ── Filter & sort ──────────────────────────────────────────
  function getFiltered() {
    let list = [...products];

    if (activeCategory !== "all") list = list.filter((p) => p.category === activeCategory);
    if (activeCondition !== "all") list = list.filter((p) => p.condition === activeCondition);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sortOrder === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortOrder === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortOrder === "name") list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }

  // ── Render grid ────────────────────────────────────────────
  function render() {
    const list = getFiltered();
    grid.innerHTML = "";

    if (countEl) countEl.textContent = list.length;

    if (list.length === 0) {
      emptyState.classList.remove("hidden");
      grid.classList.add("hidden");
      return;
    }

    emptyState.classList.add("hidden");
    grid.classList.remove("hidden");

    list.forEach((p, i) => {
      const card = document.createElement("article");
      card.className = "card" + (p.status === "sold" ? " card--sold" : "");
      card.style.animationDelay = `${i * 40}ms`;
      card.setAttribute("data-id", p.id);

      const saving = Math.round((1 - p.price / p.originalPrice) * 100);

      card.innerHTML = `
        <div class="card__img-wrap">
          ${
            p.image
              ? `<img src="${p.image}" alt="${p.name}" class="card__img" loading="lazy">`
              : `<div class="card__img-placeholder">${placeholder(p.category)}</div>`
          }
          <div class="card__badges">
            ${p.status === "sold" ? `<span class="badge badge--sold">Sold</span>` : `<span class="badge badge--available">Available</span>`}
            ${saving > 0 && p.status !== "sold" ? `<span class="badge badge--saving">-${saving}%</span>` : ""}
          </div>
        </div>
        <div class="card__body">
          <div class="card__meta">
            <span class="card__category">${p.category}</span>
            <span class="card__id">${p.id}</span>
          </div>
          <h3 class="card__name">${p.name}</h3>
          <p class="card__brand">${p.brand}${p.size && p.size !== "-" ? ` · Size ${p.size}` : ""}</p>
          <p class="card__desc">${p.description}</p>
          <div class="card__footer">
            <div class="card__pricing">
              <span class="card__price">${fmt(p.price)}</span>
              ${p.originalPrice ? `<span class="card__original">${fmt(p.originalPrice)}</span>` : ""}
            </div>
            <span class="card__cond ${conditionColor[p.condition] || ""}">${p.condition}</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => openModal(p));
      grid.appendChild(card);
    });
  }

  // ── Modal ──────────────────────────────────────────────────
  function openModal(p) {
    activeProduct = p;
    const saving = Math.round((1 - p.price / p.originalPrice) * 100);

    document.getElementById("modal-id").textContent = p.id;
    document.getElementById("modal-name").textContent = p.name;
    document.getElementById("modal-brand").textContent = p.brand;
    document.getElementById("modal-category").textContent = p.category;
    document.getElementById("modal-size").textContent = p.size && p.size !== "-" ? `Size ${p.size}` : "";
    document.getElementById("modal-condition").textContent = p.condition;
    document.getElementById("modal-price").textContent = fmt(p.price);
    document.getElementById("modal-original").textContent = p.originalPrice ? fmt(p.originalPrice) : "";
    document.getElementById("modal-saving").textContent = saving > 0 ? `Hemat ${saving}%` : "";
    document.getElementById("modal-desc").textContent = p.description;
    document.getElementById("modal-status").textContent = p.status === "sold" ? "Sold" : "Available";
    document.getElementById("modal-status").className = "modal__status-badge " + (p.status === "sold" ? "badge--sold" : "badge--available");

    const imgWrap = document.getElementById("modal-img-wrap");
    imgWrap.innerHTML = p.image
      ? `<img src="${p.image}" alt="${p.name}" class="modal__img">`
      : `<div class="modal__img-placeholder">${placeholder(p.category)}</div>`;

    // WA button
    const waBtn = document.getElementById("modal-wa-btn");
    if (p.status === "sold") {
      waBtn.style.display = "none";
    } else {
      waBtn.style.display = "flex";
      const msg = encodeURIComponent(
        `Halo, saya tertarik dengan barang berikut:\n\n*${p.name}* (${p.id})\nKondisi: ${p.condition}\nHarga: ${fmt(p.price)}\n\nApakah masih available?`
      );
      waBtn.href = `https://wa.me/${WA_NUMBER}?text=${msg}`;
    }

    modal.classList.add("modal--open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("modal--open");
    document.body.style.overflow = "";
    activeProduct = null;
  }

  // ── Events ─────────────────────────────────────────────────
  searchInput?.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    render();
  });

  sortSelect?.addEventListener("change", (e) => {
    sortOrder = e.target.value;
    render();
  });

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.category;
      categoryBtns.forEach((b) => b.classList.remove("pill--active"));
      btn.classList.add("pill--active");
      render();
    });
  });

  conditionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCondition = btn.dataset.condition;
      conditionBtns.forEach((b) => b.classList.remove("pill--active"));
      btn.classList.add("pill--active");
      render();
    });
  });

  modalClose?.addEventListener("click", closeModal);
  modalBackdrop?.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  document.getElementById("reset-btn")?.addEventListener("click", () => {
    searchQuery = "";
    activeCategory = "all";
    activeCondition = "all";
    sortOrder = "default";
    searchInput.value = "";
    sortSelect.value = "default";
    categoryBtns.forEach((b) => b.classList.remove("pill--active"));
    conditionBtns.forEach((b) => b.classList.remove("pill--active"));
    document.querySelector('[data-category="all"]')?.classList.add("pill--active");
    document.querySelector('[data-condition="all"]')?.classList.add("pill--active");
    render();
  });

  // ── Scroll reveal ──────────────────────────────────────────
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("revealed")),
    { threshold: 0.08 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // ── Init ───────────────────────────────────────────────────
  render();
})();
