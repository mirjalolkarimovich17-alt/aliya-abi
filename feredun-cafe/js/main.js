(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const fmt = (n) => n.toLocaleString("ru-RU").replace(/,/g, " ") + " so'm";
  const PHONE = "+998 (99) 034-95-95";

  /* ---------- Rasm: avval mahalliy fayl, keyin onlayn, keyin gradient ---------- */
  function smartImg(img, local, fallback) {
    img.dataset.stage = "local";
    img.onerror = () => {
      if (img.dataset.stage === "local" && fallback) {
        img.dataset.stage = "remote";
        img.src = fallback;
      } else {
        img.onerror = null;
        img.classList.add("img--missing");
        img.removeAttribute("src");
      }
    };
    img.src = local;
  }

  /* ---------- Navbar ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("nav--solid", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const burger = $("#burger");
  const links = $("#navLinks");
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    links.classList.toggle("open");
  });
  $$("#navLinks a").forEach((a) =>
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      links.classList.remove("open");
    })
  );

  /* ---------- Menyu ---------- */
  const tabsEl = $("#tabs");
  const grid = $("#menuGrid");
  const emptyEl = $("#menuEmpty");
  let activeCat = "all";
  let query = "";

  MENU_CATEGORIES.forEach((c) => {
    const b = document.createElement("button");
    b.className = "tab" + (c.id === activeCat ? " active" : "");
    b.innerHTML = `<span>${c.icon}</span>${c.name}`;
    b.setAttribute("role", "tab");
    b.addEventListener("click", () => {
      activeCat = c.id;
      $$(".tab", tabsEl).forEach((t) => t.classList.remove("active"));
      b.classList.add("active");
      renderMenu();
    });
    tabsEl.appendChild(b);
  });

  $("#search").addEventListener("input", (e) => {
    query = e.target.value.trim().toLowerCase();
    renderMenu();
  });

  function renderMenu() {
    const items = MENU_ITEMS.filter(
      (i) =>
        (activeCat === "all" || i.cat === activeCat) &&
        (!query || (i.name + " " + i.desc).toLowerCase().includes(query))
    );
    grid.innerHTML = "";
    emptyEl.hidden = items.length > 0;
    items.forEach((item, idx) => {
      const card = document.createElement("article");
      card.className = "dish";
      card.style.animationDelay = `${Math.min(idx, 12) * 40}ms`;
      card.innerHTML = `
        <div class="dish__img">
          <img loading="lazy" alt="${item.name}" />
          ${item.badge ? `<span class="badge">${item.badge}</span>` : ""}
        </div>
        <div class="dish__body">
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <div class="dish__foot">
            <span class="price">${fmt(item.price)}<small> / ${item.unit}</small></span>
            <button class="add" aria-label="Savatchaga qo'shish">+</button>
          </div>
        </div>`;
      smartImg($("img", card), `images/menu/${item.id}.jpg`, item.fallback);
      $(".add", card).addEventListener("click", (e) => {
        e.stopPropagation();
        addToCart(item.id);
      });
      card.addEventListener("click", () => openModal(item));
      grid.appendChild(card);
    });
  }
  renderMenu();

  /* ---------- Modal ---------- */
  const modal = $("#modal");
  let modalItem = null;
  function openModal(item) {
    modalItem = item;
    smartImg($("#modalImg"), `images/menu/${item.id}.jpg`, item.fallback);
    $("#modalImg").alt = item.name;
    $("#modalTitle").textContent = item.name;
    $("#modalDesc").textContent = item.desc;
    $("#modalPrice").textContent = fmt(item.price);
    $("#modalUnit").textContent = "/ " + item.unit;
    const badge = $("#modalBadge");
    badge.textContent = item.badge || "";
    badge.hidden = !item.badge;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest("[data-close-modal]")) closeModal();
  });
  $("#modalAdd").addEventListener("click", () => {
    if (modalItem) addToCart(modalItem.id);
    closeModal();
  });

  /* ---------- Savatcha ---------- */
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem("feredun-cart")) || {}; } catch (_) {}
  const save = () => { try { localStorage.setItem("feredun-cart", JSON.stringify(cart)); } catch (_) {} };
  const byId = (id) => MENU_ITEMS.find((i) => i.id === id);

  function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    save();
    renderCart();
    toast(`${byId(id).name} savatchaga qo'shildi`);
    const fab = $("#cartFab");
    fab.classList.remove("bump");
    void fab.offsetWidth;
    fab.classList.add("bump");
  }
  function changeQty(id, d) {
    cart[id] = (cart[id] || 0) + d;
    if (cart[id] <= 0) delete cart[id];
    save();
    renderCart();
  }
  function cartText() {
    const lines = Object.entries(cart).map(([id, q]) => {
      const it = byId(id);
      return `• ${it.name} × ${q} = ${fmt(it.price * q)}`;
    });
    return `Feredun Cafe — buyurtma:\n${lines.join("\n")}\nJami: ${$("#cartTotal").textContent}`;
  }
  function renderCart() {
    const list = $("#cartList");
    const entries = Object.entries(cart).filter(([id]) => byId(id));
    let total = 0, count = 0;
    list.innerHTML = entries.length ? "" : `<p class="muted center">Savatcha bo'sh</p>`;
    entries.forEach(([id, q]) => {
      const it = byId(id);
      total += it.price * q;
      count += q;
      const row = document.createElement("div");
      row.className = "cart-row";
      row.innerHTML = `
        <img alt="" />
        <div class="cart-row__info"><strong>${it.name}</strong><span>${fmt(it.price)}</span></div>
        <div class="qty"><button data-d="-1">−</button><span>${q}</span><button data-d="1">+</button></div>`;
      smartImg($("img", row), `images/menu/${it.id}.jpg`, it.fallback);
      $$(".qty button", row).forEach((b) => b.addEventListener("click", () => changeQty(id, +b.dataset.d)));
      list.appendChild(row);
    });
    $("#cartTotal").textContent = fmt(total);
    $("#cartCount").textContent = count;
    $("#cartFab").classList.toggle("has", count > 0);
    $("#orderBtn").disabled = count === 0;
  }
  renderCart();

  $("#orderBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(cartText());
      toast(`Buyurtma nusxalandi. Endi ${PHONE} raqamiga yuboring yoki qo'ng'iroq qiling.`, 5000);
    } catch (_) {
      alert(cartText());
    }
  });

  const drawer = $("#drawer");
  const overlay = $("#overlay");
  const openDrawer = () => { drawer.classList.add("open"); overlay.classList.add("show"); drawer.setAttribute("aria-hidden", "false"); };
  const closeDrawer = () => { drawer.classList.remove("open"); overlay.classList.remove("show"); drawer.setAttribute("aria-hidden", "true"); };
  $("#cartFab").addEventListener("click", openDrawer);
  overlay.addEventListener("click", closeDrawer);
  $("[data-close-drawer]").addEventListener("click", closeDrawer);
  addEventListener("keydown", (e) => { if (e.key === "Escape") { closeDrawer(); closeModal(); } });

  /* ---------- Galereya ---------- */
  const gal = $("#gallery-grid");
  GALLERY.forEach((g) => {
    const fig = document.createElement("figure");
    fig.innerHTML = `<img loading="lazy" alt="${g.title}" /><figcaption>${g.title}</figcaption>`;
    smartImg($("img", fig), g.src, g.fallback);
    gal.appendChild(fig);
  });

  /* ---------- Bron formasi ---------- */
  const form = $("#bookingForm");
  form.date.min = new Date().toISOString().slice(0, 10);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const text =
      `Feredun Cafe — joy band qilish\n` +
      `Ism: ${d.name}\nTelefon: ${d.phone}\nSana: ${d.date}, ${d.time}\n` +
      `Mehmonlar: ${d.guests}\nJoy: ${d.place}` + (d.note ? `\nIzoh: ${d.note}` : "");
    let copied = false;
    try { await navigator.clipboard.writeText(text); copied = true; } catch (_) {}
    const ok = $("#formOk");
    ok.hidden = false;
    ok.innerHTML =
      `✅ Bron matni tayyor${copied ? " va nusxalandi" : ""}. Tasdiqlash uchun qo'ng'iroq qiling: ` +
      `<a href="tel:+998990349595">${PHONE}</a>`;
  });

  /* ---------- Toast ---------- */
  let tId;
  function toast(msg, ms = 2200) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(tId);
    tId = setTimeout(() => t.classList.remove("show"), ms);
  }

  /* ---------- Reveal animatsiyasi ---------- */
  const io = new IntersectionObserver(
    (ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  $("#year").textContent = new Date().getFullYear();
})();
