/* Chácara Recanto da Montanha — interações e efeitos de scroll */
(() => {
  const S = window.SITE;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  // "?movimento=1" na URL força os efeitos mesmo com "reduzir movimento" ligado no sistema (útil para testar).
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches && !/[?&]movimento=1/.test(location.search);
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  document.documentElement.classList.remove("no-js");
  if (/[?&]movimento=1/.test(location.search)) document.documentElement.classList.add("force-motion");

  /* ---------- WhatsApp: todos os links ---------- */
  $$("[data-wa]").forEach((a) => {
    a.href = `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(a.dataset.wa)}`;
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", () => {
      const section = a.closest("section,header,footer")?.id || "flutuante";
      window.gtag?.("event", "whatsapp_click", { section });
      window.plausible?.("WhatsApp", { props: { section } });
    });
  });
  $("#ano").textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  const burger = $(".burger"), nav = $("#menu");
  const setMenu = (open) => {
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  /* ---------- Fotos: arte no lugar quando a imagem não existe ---------- */
  const toPlaceholder = (fig) => {
    if (fig.classList.contains("is-placeholder")) return;
    fig.classList.add("is-placeholder");
    const ph = document.createElement("figcaption");
    ph.className = "media__ph";
    ph.innerHTML = `<svg aria-hidden="true"><use href="#${fig.dataset.icon || "i-leaf"}"/></svg>${fig.dataset.label || ""}`;
    fig.appendChild(ph);
  };
  $$(".media").forEach((fig) => {
    const img = $("img", fig);
    if (!img) return toPlaceholder(fig);
    if (img.complete && img.naturalWidth === 0) toPlaceholder(fig);
    img.addEventListener("error", () => toPlaceholder(fig));
  });

  /* ---------- Reveal ao rolar ---------- */
  $$("[data-delay]").forEach((el) => el.style.setProperty("--d", el.dataset.delay));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal, .reveal-left, .reveal-right").forEach((el) => io.observe(el));

  /* ---------- Contadores ---------- */
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0);
      const fmt = (v) => v.toFixed(dec).replace(".", ",");
      countIO.unobserve(el);
      if (reduce) return (el.textContent = fmt(to));
      const t0 = performance.now(), dur = 1600;
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur), k = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt(to * k);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$(".count").forEach((el) => countIO.observe(el));

  /* ---------- Tilt 3D nos cards ---------- */
  if (finePointer && !reduce) {
    $$(".tilt").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 14}deg) rotateY(${(x - 0.5) * 16}deg) translateY(-6px)`;
        card.style.setProperty("--gx", `${x * 100}%`);
        card.style.setProperty("--gy", `${y * 100}%`);
      });
      card.addEventListener("pointerleave", () => (card.style.transform = ""));
    });
  }

  /* ---------- Galeria: filtros, entrada 3D e lightbox ---------- */
  const grid = $("[data-gallery]");
  const items = $$(".g-item", grid);
  if (!reduce) {
    grid.classList.add("is-3d");
    const gIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const i = items.indexOf(e.target);
        e.target.style.transitionDelay = `${(i % 4) * 90}ms`;
        e.target.classList.add("in");
        gIO.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    items.forEach((it) => gIO.observe(it));
  }
  $$(".filters button").forEach((b) => b.addEventListener("click", () => {
    $$(".filters button").forEach((x) => { x.classList.toggle("is-active", x === b); x.setAttribute("aria-selected", x === b); });
    const f = b.dataset.filter;
    items.forEach((it) => it.classList.toggle("is-hidden", f !== "all" && it.dataset.cat !== f));
  }));

  const lb = $(".lightbox"), lbFig = $(".lightbox__fig");
  let lbIndex = 0;
  const visible = () => items.filter((i) => !i.classList.contains("is-hidden"));
  const showLB = (i) => {
    const list = visible();
    lbIndex = (i + list.length) % list.length;
    lbFig.innerHTML = "";
    const clone = list[lbIndex].cloneNode(true);
    clone.removeAttribute("style");
    clone.removeAttribute("tabindex");
    clone.removeAttribute("role");
    clone.className = "media" + (list[lbIndex].classList.contains("is-placeholder") ? " is-placeholder" : "");
    lbFig.appendChild(clone);
  };
  items.forEach((it) => {
    it.tabIndex = 0;
    it.setAttribute("role", "button");
    const open = () => { lb.hidden = false; showLB(visible().indexOf(it)); $(".lightbox__close").focus(); document.body.style.overflow = "hidden"; };
    it.addEventListener("click", open);
    it.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), open()));
  });
  const closeLB = () => { lb.hidden = true; document.body.style.overflow = ""; };
  $(".lightbox__close").addEventListener("click", closeLB);
  $(".lightbox__prev").addEventListener("click", () => showLB(lbIndex - 1));
  $(".lightbox__next").addEventListener("click", () => showLB(lbIndex + 1));
  lb.addEventListener("click", (e) => e.target === lb && closeLB());
  addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLB();
    if (e.key === "ArrowLeft") showLB(lbIndex - 1);
    if (e.key === "ArrowRight") showLB(lbIndex + 1);
  });

  /* ---------- Carrossel 3D de depoimentos ---------- */
  const ring = $(".carousel3d__ring"), quotes = $$(".quote", ring), dots = $(".carousel3d__dots");
  const n = quotes.length, step = 360 / n;
  let cur = 0, timer;
  quotes.forEach(() => dots.appendChild(document.createElement("i")));
  const layout = () => {
    const w = quotes[0].offsetWidth;
    const radius = Math.round(w / 2 / Math.tan(Math.PI / n)) + 40;
    quotes.forEach((q, i) => (q.style.transform = `rotateY(${i * step}deg) translateZ(${radius}px)`));
    ring.style.transform = `translateZ(${-radius}px) rotateY(${-cur * step}deg)`;
    quotes.forEach((q, i) => {
      const active = ((cur % n) + n) % n === i;
      q.style.opacity = active ? 1 : 0.35;
      q.setAttribute("aria-hidden", !active);
    });
    $$("i", dots).forEach((d, i) => d.classList.toggle("on", ((cur % n) + n) % n === i));
  };
  const go = (d) => { cur += d; layout(); restart(); };
  const restart = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => { cur++; layout(); }, 5500); };
  $(".c-prev").addEventListener("click", () => go(-1));
  $(".c-next").addEventListener("click", () => go(1));
  let sx = null;
  ring.addEventListener("pointerdown", (e) => (sx = e.clientX));
  addEventListener("pointerup", (e) => { if (sx === null) return; const dx = e.clientX - sx; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); sx = null; });
  layout(); restart();
  addEventListener("resize", layout);

  /* ---------- Mapa sob demanda ---------- */
  $(".map__facade").addEventListener("click", function () {
    const f = document.createElement("iframe");
    f.src = `https://www.google.com/maps?q=${S.lat},${S.lng}&z=16&output=embed`;
    f.title = "Mapa da Chácara Recanto da Montanha";
    f.loading = "lazy";
    f.referrerPolicy = "no-referrer-when-downgrade";
    this.replaceWith(f);
    $(".map").classList.add("is-loaded");
  });

  /* ---------- Loop de scroll: header, progresso, parallax, estrutura horizontal ---------- */
  const header = $(".header"), bar = $(".scroll-progress span");
  const amen = $(".amenities"), track = $(".amenities__track"), sticky = $(".amenities__sticky");
  const stack = $("[data-parallax]");
  const finalCta = $(".final-cta"), finalBg = $(".final-cta__bg"), heroBg = $(".hero__bg");
  const mouse = { x: 0, y: 0 };
  if (finePointer && !reduce) {
    addEventListener("pointermove", (e) => {
      mouse.x = e.clientX / innerWidth - 0.5;
      mouse.y = e.clientY / innerHeight - 0.5;
      if (scrollY < innerHeight && !ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
  }
  const hint = $(".amenities__hint");
  const sections = $$("main section[id]");
  const navLinks = $$(".nav a");
  const desktopH = matchMedia("(min-width: 901px)");
  let lastY = scrollY, ticking = false;

  const sizeAmenities = () => {
    if (desktopH.matches && !reduce) {
      const dist = track.scrollWidth - innerWidth;
      amen.style.height = `${sticky.offsetHeight + Math.max(0, dist)}px`;
    } else {
      amen.style.height = "";
      track.style.transform = "";
    }
  };

  const onScroll = () => {
    const y = scrollY, vh = innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    header.classList.toggle("is-solid", y > 40);
    header.classList.toggle("is-hidden", y > lastY && y > vh * 0.8 && !document.body.classList.contains("menu-open"));
    lastY = y;

    if (!reduce) {
      // Estrutura: rolagem vertical vira deslocamento horizontal
      if (desktopH.matches) {
        const r = amen.getBoundingClientRect();
        const total = amen.offsetHeight - sticky.offsetHeight;
        const p = Math.min(1, Math.max(0, -r.top / (total || 1)));
        track.style.transform = `translate3d(${-p * (track.scrollWidth - innerWidth)}px,0,0)`;
        hint.style.opacity = 1 - p * 1.5;
      }
      // Parallax do bloco "sobre"
      if (stack) {
        const r = stack.getBoundingClientRect();
        const p = (r.top + r.height / 2 - vh / 2) / vh;
        stack.style.transform = `rotateX(${p * 8}deg) rotateY(${p * -10}deg)`;
        $(".stack__card--back", stack).style.translate = `0 ${p * 40}px`;
        $(".stack__card--front", stack).style.translate = `0 ${p * -30}px`;
      }
      // Foto do topo: desce mais devagar que a página (profundidade)
      if (y < vh * 1.2) heroBg.style.transform = `translate3d(${mouse.x * -18}px, ${y * 0.35 + mouse.y * -12}px, 0)`;
      // Foto da chamada final: parallax
      const fr = finalCta.getBoundingClientRect();
      if (fr.top < vh && fr.bottom > 0) {
        const p = (vh - fr.top) / (vh + fr.height);
        finalBg.style.transform = `translate3d(0, ${(p - 0.5) * -14}%, 0)`;
      }
    }

    // Link ativo do menu
    let current = "";
    sections.forEach((s) => { if (s.getBoundingClientRect().top < vh * 0.4) current = s.id; });
    navLinks.forEach((a) => a.classList.toggle("is-current", a.hash === `#${current}`));
    ticking = false;
  };

  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener("resize", () => { sizeAmenities(); onScroll(); });
  addEventListener("load", () => { sizeAmenities(); onScroll(); });
  sizeAmenities(); onScroll();

  /* Dica do WhatsApp aparece uma vez */
  setTimeout(() => {
    const w = $(".wa-float");
    w.classList.add("show-tip");
    setTimeout(() => w.classList.remove("show-tip"), 4000);
  }, 7000);
})();
