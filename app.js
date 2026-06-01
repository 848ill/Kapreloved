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
  let activeImageIndex = 0;

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

  const getFirstImage = (p) => p.images && p.images.length > 0 ? p.images[0] : null;

  // ── Filter & sort ──────────────────────────────────────────
  function getFiltered() {
    let list = [...products];
    if (activeCategory !== "all") list = list.filter((p) => p.category === activeCategory);
    if (activeCondition !== "all") list = list.filter((p) => p.condition === activeCondition);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) =>
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

      const saving = p.originalPrice > p.price ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
      const firstImg = getFirstImage(p);
      const imgCount = p.images ? p.images.length : 0;

      card.innerHTML = `
        <div class="card__img-wrap">
          ${firstImg
            ? `<img src="${firstImg}" alt="${p.name}" class="card__img" loading="lazy">`
            : `<div class="card__img-placeholder">${placeholder(p.category)}</div>`
          }
          <div class="card__badges">
            ${p.status === "sold"
              ? `<span class="badge badge--sold">Sold</span>`
              : `<span class="badge badge--available">Available</span>`
            }
            ${saving > 0 && p.status !== "sold" ? `<span class="badge badge--saving">-${saving}%</span>` : ""}
          </div>
          ${imgCount > 1 ? `<div class="card__img-count">${imgCount} foto</div>` : ""}
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
              ${p.originalPrice && p.originalPrice > p.price ? `<span class="card__original">${fmt(p.originalPrice)}</span>` : ""}
            </div>
            <span class="card__cond ${conditionColor[p.condition] || ""}">${p.condition}</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => openModal(p));
      grid.appendChild(card);
    });
  }

  // ── Gallery ────────────────────────────────────────────────
  function renderGallery(p, index) {
    activeImageIndex = index;
    const images = p.images || [];
    const imgWrap = document.getElementById("modal-img-wrap");

    if (images.length === 0) {
      imgWrap.innerHTML = `<div class="modal__img-placeholder">${placeholder(p.category)}</div>`;
      return;
    }

    imgWrap.innerHTML = `
      <div class="gallery">
        <div class="gallery__main">
          <img src="${images[index]}" alt="${p.name} foto ${index + 1}" class="gallery__img" id="gallery-main-img">
          ${images.length > 1 ? `
            <button class="gallery__arrow gallery__arrow--prev" id="gallery-prev" aria-label="Foto sebelumnya">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button class="gallery__arrow gallery__arrow--next" id="gallery-next" aria-label="Foto berikutnya">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <div class="gallery__counter">${index + 1} / ${images.length}</div>
          ` : ""}
        </div>
        ${images.length > 1 ? `
          <div class="gallery__thumbs">
            ${images.map((src, i) => `
              <button class="gallery__thumb ${i === index ? "gallery__thumb--active" : ""}" data-index="${i}">
                <img src="${src}" alt="${p.name} foto ${i + 1}" loading="lazy">
              </button>
            `).join("")}
          </div>
        ` : ""}
      </div>
    `;

    // Arrow events
    document.getElementById("gallery-prev")?.addEventListener("click", (e) => {
      e.stopPropagation();
      const newIndex = (activeImageIndex - 1 + images.length) % images.length;
      renderGallery(p, newIndex);
    });

    document.getElementById("gallery-next")?.addEventListener("click", (e) => {
      e.stopPropagation();
      const newIndex = (activeImageIndex + 1) % images.length;
      renderGallery(p, newIndex);
    });

    // Thumb events
    imgWrap.querySelectorAll(".gallery__thumb").forEach((thumb) => {
      thumb.addEventListener("click", (e) => {
        e.stopPropagation();
        renderGallery(p, parseInt(thumb.dataset.index));
      });
    });
  }

  // ── Modal ──────────────────────────────────────────────────
  function openModal(p) {
    activeProduct = p;
    const saving = p.originalPrice > p.price ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;

    document.getElementById("modal-id").textContent = p.id;
    document.getElementById("modal-name").textContent = p.name;
    document.getElementById("modal-brand").textContent = p.brand;
    document.getElementById("modal-category").textContent = p.category;
    document.getElementById("modal-size").textContent = p.size && p.size !== "-" ? `Size ${p.size}` : "";
    document.getElementById("modal-condition").textContent = p.condition;
    document.getElementById("modal-price").textContent = fmt(p.price);
    document.getElementById("modal-original").textContent = p.originalPrice && p.originalPrice > p.price ? fmt(p.originalPrice) : "";
    document.getElementById("modal-saving").textContent = saving > 0 ? `Hemat ${saving}%` : "";
    document.getElementById("modal-desc").textContent = p.description;
    document.getElementById("modal-status").textContent = p.status === "sold" ? "Sold" : "Available";
    document.getElementById("modal-status").className = "modal__status-badge " + (p.status === "sold" ? "badge--sold" : "badge--available");

    renderGallery(p, 0);

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
    activeImageIndex = 0;
  }

  // ── Keyboard nav gallery ───────────────────────────────────
  document.addEventListener("keydown", (e) => {
    if (!activeProduct) return;
    if (e.key === "Escape") { closeModal(); return; }
    if (!activeProduct.images || activeProduct.images.length <= 1) return;
    if (e.key === "ArrowLeft") {
      const newIndex = (activeImageIndex - 1 + activeProduct.images.length) % activeProduct.images.length;
      renderGallery(activeProduct, newIndex);
    }
    if (e.key === "ArrowRight") {
      const newIndex = (activeImageIndex + 1) % activeProduct.images.length;
      renderGallery(activeProduct, newIndex);
    }
  });

  // ── Events ─────────────────────────────────────────────────
  searchInput?.addEventListener("input", (e) => { searchQuery = e.target.value.trim(); render(); });
  sortSelect?.addEventListener("change", (e) => { sortOrder = e.target.value; render(); });

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

  document.getElementById("reset-btn")?.addEventListener("click", () => {
    searchQuery = ""; activeCategory = "all"; activeCondition = "all"; sortOrder = "default";
    searchInput.value = ""; sortSelect.value = "default";
    categoryBtns.forEach((b) => b.classList.remove("pill--active"));
    conditionBtns.forEach((b) => b.classList.remove("pill--active"));
    document.querySelector('[data-category="all"]')?.classList.add("pill--active");
    document.querySelector('[data-condition="all"]')?.classList.add("pill--active");
    render();
  });

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("revealed")),
    { threshold: 0.08 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  render();
})();