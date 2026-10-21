/* ==========================================================
   CRIS BRAGA | SOLUÇÕES EM REFRIGERAÇÃO
   Catálogo, filtros, orçamento, WhatsApp e interações
   ========================================================== */

const WHATSAPP_NUMBER = "5518988137640";

/* ==========================================================
   1. CATÁLOGO
   ========================================================== */

const categories = [
  {
    id: "compressores",
    title: "Compressores",
    description:
      "Consulte compressores para aplicações de refrigeração comercial e industrial.",
    image:
      "https://okmarts.com/cdn-cgi/image/fit%3Dcontain%2Cformat%3Dauto%2Cmetadata%3Dnone%2Conerror%3Dredirect%2Cquality%3D90%2Cwidth%3D1000%2Cheight%3D1000/https%3A/okmarts.com/jeecg-boot/sys/common/view/product/Refrigeration%20Compressors/Danfoss/2025/Danfoss_SH184A4ALC_1.png",
    keywords: "compressor compressores danfoss refrigeração",
    tag: "COMPRESSORES",
  },
  {
    id: "motores",
    title: "Motores e componentes",
    description:
      "Motores, ventiladores e componentes para equipamentos e sistemas de refrigeração.",
    image:
      "https://cdn11.bigcommerce.com/s-2cvhcu7/images/stencil/1280x1280/products/14261/29199/RB_Morrill_5R031_Still03__14792.1620144194.jpg?c=2",
    keywords: "motor motores ventilador elétrico componentes",
    tag: "MOTORES E COMPONENTES",
  },
  {
    id: "tubos",
    title: "Tubos e conexões",
    description:
      "Tubos de cobre, conexões e itens utilizados em instalações e manutenções.",
    image:
      "https://lirp.cdn-website.com/6ce3488c/dms3rep/multi/opt/gambar%2Bpipa%2Btembaga%2Bac-1920w.jpg",
    keywords: "tubos tubo cobre conexões tubulação instalação",
    tag: "TUBULAÇÃO",
  },
  {
    id: "acessorios",
    title: "Componentes e acessórios",
    description:
      "Válvulas, instrumentos, controles e acessórios para sistemas de refrigeração.",
    image:
      "https://iacrkins.com/Upload/Product/b5b75711-e1c0-485f-8257-765418c59c5e.jpg",
    keywords: "componentes acessórios válvulas controles manômetros peças",
    tag: "COMPONENTES E ACESSÓRIOS",
  },
  {
    id: "fluidos",
    title: "Fluidos refrigerantes",
    description:
      "Consulte fluidos refrigerantes conforme as necessidades da sua aplicação.",
    image:
      "https://erefrigerants.com/cdn/shop/files/r32a.jpg?v=1711654179&width=990",
    keywords: "fluidos refrigerantes gás gases r32 r410a r134a",
    tag: "FLUIDOS REFRIGERANTES",
  },
  {
    id: "camaras-frias",
    title: "Soluções para câmaras frias",
    description:
      "Equipamentos e componentes para projetos, instalações e manutenção de câmaras frias.",
    image:
      "https://image.made-in-china.com/2f0j00BJpVAFyPpcbI/Farm-Chicken-Grouper-Fish-Cold-Storage-Room.jpg",
    keywords: "câmaras frias câmara fria evaporador conservação industrial",
    tag: "REFRIGERAÇÃO INDUSTRIAL",
  },
];

/* ==========================================================
   2. ELEMENTOS DO HTML
   ========================================================== */

const categoryGrid = document.querySelector("#categoryGrid");
const filterList = document.querySelector("#filterList");
const productSearch = document.querySelector("#productSearch");
const resultsCount = document.querySelector("#resultsCount");
const resetFiltersButton = document.querySelector("#resetFilters");

const quoteForm = document.querySelector("#quoteForm");
const productType = document.querySelector("#productType");
const productInput = document.querySelector("#produto");
const formFeedback = document.querySelector("#formFeedback");

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

const backToTop = document.querySelector("#backToTop");
const currentYear = document.querySelector("#currentYear");
const siteHeader = document.querySelector(".site-header");

let activeFilter = "todos";
let revealObserver = null;

/* ==========================================================
   3. FUNÇÕES AUXILIARES
   ========================================================== */

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });
}

function prefersReducedMotion() {
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
  );
}

function scrollToElement(element) {
  if (!element) return;

  element.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

/* ==========================================================
   4. WHATSAPP
   ========================================================== */

function buildWhatsAppURL(message) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");

  if (!number) return "";

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function configureWhatsAppLinks() {
  document.querySelectorAll(".js-whatsapp").forEach((link) => {
    const message =
      link.dataset.whatsappMessage ||
      "Olá, Cris Braga! Gostaria de informações sobre produtos para refrigeração.";

    const url = buildWhatsAppURL(message);

    if (!url) return;

    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function renderWhatsAppIcon() {
  const iconContainer = document.querySelector(".floating-contact-icon");

  if (!iconContainer) return;

  iconContainer.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="23"
      height="23"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M20.52 3.48A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.15 1.59 5.95L.05 24l6.3-1.65a11.9 11.9 0 0 0 5.7 1.45h.01c6.55 0 11.89-5.34 11.89-11.9a11.8 11.8 0 0 0-3.43-8.42ZM12.06 21.8h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.22-3.74.98.99-3.65-.23-.37a9.86 9.86 0 0 1-1.52-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.92 2.83a9.82 9.82 0 0 1 2.87 6.99c0 5.45-4.44 9.89-9.89 9.89Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.23-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.18-.3-.02-.46.13-.61l.45-.52c.15-.17.2-.29.3-.49.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.07c.2.3 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.17-1.29.1-1.42-.07-.12-.27-.2-.57-.34Z"
      />
    </svg>
  `;
}

/* ==========================================================
   5. FILTROS DO CATÁLOGO
   ========================================================== */

function renderFilters() {
  if (!filterList) return;

  const filters = [
    { id: "todos", label: "Todas as categorias" },
    ...categories.map((category) => ({
      id: category.id,
      label: category.title,
    })),
  ];

  filterList.innerHTML = filters
    .map((filter) => {
      const isActive = activeFilter === filter.id;

      return `
        <button
          class="filter-button ${isActive ? "active" : ""}"
          type="button"
          data-filter="${escapeHTML(filter.id)}"
          aria-pressed="${isActive}"
        >
          ${escapeHTML(filter.label)}
        </button>
      `;
    })
    .join("");
}

function updateResultsCount(total) {
  if (!resultsCount) return;

  if (total === 0) {
    resultsCount.textContent = "Nenhuma categoria encontrada";
    return;
  }

  resultsCount.textContent = `${total} ${
    total === 1 ? "categoria encontrada" : "categorias encontradas"
  }`;
}

/* ==========================================================
   6. RENDERIZAÇÃO DAS CATEGORIAS
   ========================================================== */

function renderCategories() {
  if (!categoryGrid) return;

  const searchTerm = normalizeText(productSearch?.value);

  const visibleCategories = categories.filter((category) => {
    const matchesFilter =
      activeFilter === "todos" || category.id === activeFilter;

    const searchableText = normalizeText(
      [
        category.title,
        category.description,
        category.keywords,
        category.tag,
      ].join(" "),
    );

    return matchesFilter && searchableText.includes(searchTerm);
  });

  updateResultsCount(visibleCategories.length);

  if (visibleCategories.length === 0) {
    categoryGrid.innerHTML = `
      <div class="empty-state">
        <h3>Não encontramos essa categoria</h3>

        <p>
          Tente buscar por outro produto ou limpe os filtros
          para visualizar todas as opções.
        </p>

        <button
          class="button button-primary"
          id="emptyReset"
          type="button"
        >
          Ver todas as categorias
        </button>
      </div>
    `;

    categoryGrid
      .querySelector("#emptyReset")
      ?.addEventListener("click", clearFilters);

    return;
  }

  categoryGrid.innerHTML = visibleCategories
    .map(
      (category) => `
      <article
        class="category-card"
        data-category="${escapeHTML(category.id)}"
        data-reveal
      >
        <div class="category-image">
          <img
            src="${escapeHTML(category.image)}"
            alt="${escapeHTML(category.title)}"
            loading="lazy"
            decoding="async"
            referrerpolicy="no-referrer"
          />

          <span class="category-tag">
            ${escapeHTML(category.tag)}
          </span>
        </div>

        <div class="category-card-content">
          <h3>${escapeHTML(category.title)}</h3>

          <p>${escapeHTML(category.description)}</p>

          <button
            class="category-link"
            type="button"
            data-category-select="${escapeHTML(category.id)}"
          >
            Solicitar orçamento
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </article>
    `,
    )
    .join("");

  configurarImagensDoCatalogo();
  observarNovosCards();
}

function mostrarFallbackDeImagem(image) {
  image.classList.add("image-hidden");
  image.parentElement?.classList.add("image-fallback");
}

function configurarImagensDoCatalogo() {
  if (!categoryGrid) return;

  categoryGrid.querySelectorAll(".category-image img").forEach((image) => {
    image.addEventListener("error", () => mostrarFallbackDeImagem(image), {
      once: true,
    });
  });
}

/* Imagens do destaque inicial e da seção de atendimento */
function configurarImagensGerais() {
  document
    .querySelectorAll(".hero-photo, .service-image-frame img")
    .forEach((image) => {
      if (image.complete && image.naturalWidth === 0) {
        mostrarFallbackDeImagem(image);
        return;
      }

      image.addEventListener("error", () => mostrarFallbackDeImagem(image), {
        once: true,
      });
    });
}

function clearFilters() {
  activeFilter = "todos";

  if (productSearch) {
    productSearch.value = "";
  }

  renderFilters();
  renderCategories();
}

productSearch?.addEventListener("input", renderCategories);

filterList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");

  if (!button) return;

  activeFilter = button.dataset.filter;

  renderFilters();
  renderCategories();
});

resetFiltersButton?.addEventListener("click", clearFilters);

/* ==========================================================
   7. SELEÇÃO DE CATEGORIA PARA ORÇAMENTO
   ========================================================== */

categoryGrid?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category-select]");

  if (!button) return;

  const category = categories.find(
    (item) => item.id === button.dataset.categorySelect,
  );

  if (!category) return;

  if (productType) {
    const option = [...productType.options].find(
      (item) => normalizeText(item.value) === normalizeText(category.title),
    );

    if (option) {
      productType.value = option.value;
    }
  }

  if (productInput) {
    productInput.value = category.title;
  }

  setFormFeedback(
    `Você selecionou "${category.title}". Complete os dados para solicitar seu orçamento.`,
  );

  scrollToElement(document.querySelector("#orcamento"));

  if (productInput) {
    window.setTimeout(
      () => {
        productInput.focus({ preventScroll: true });
      },
      prefersReducedMotion() ? 0 : 450,
    );
  }
});

/* ==========================================================
   8. FORMULÁRIO DE ORÇAMENTO
   ========================================================== */

function setFormFeedback(message, type = "success") {
  if (!formFeedback) return;

  formFeedback.textContent = message;
  formFeedback.classList.toggle("error", type === "error");
  formFeedback.setAttribute("role", type === "error" ? "alert" : "status");
}

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!quoteForm.reportValidity()) return;

  if (!WHATSAPP_NUMBER.replace(/\D/g, "")) {
    setFormFeedback("O número do WhatsApp não está configurado.", "error");
    return;
  }

  const formData = new FormData(quoteForm);

  const nome = String(formData.get("nome") || "").trim();
  const empresa = String(formData.get("empresa") || "").trim();
  const categoria = String(formData.get("categoria") || "").trim();
  const produto = String(formData.get("produto") || "").trim();
  const quantidade = String(formData.get("quantidade") || "").trim();
  const detalhes = String(formData.get("detalhes") || "").trim();

  const mensagem = [
    "Olá, Cris Braga! Gostaria de solicitar um orçamento.",
    "",
    `Nome: ${nome}`,
    empresa ? `Empresa: ${empresa}` : "",
    categoria ? `Categoria: ${categoria}` : "",
    produto ? `Produto ou modelo: ${produto}` : "",
    quantidade ? `Quantidade: ${quantidade}` : "",
    detalhes ? `Detalhes: ${detalhes}` : "",
    "",
    "Fico no aguardo do retorno. Obrigado(a)!",
  ]
    .filter(Boolean)
    .join("\n");

  const url = buildWhatsAppURL(mensagem);

  /* Sem "noopener" na função: com ele o retorno é sempre null.
     O vínculo com a página é removido logo depois. */
  const newWindow = window.open(url, "_blank");

  if (newWindow) {
    newWindow.opener = null;
    setFormFeedback(
      "Sua solicitação está pronta. Confira os dados no WhatsApp e envie a mensagem.",
    );
  } else {
    setFormFeedback(
      "O navegador bloqueou a nova aba. Permita pop-ups para continuar.",
      "error",
    );
  }
});

/* ==========================================================
   9. MENU RESPONSIVO
   ========================================================== */

function closeMobileMenu() {
  if (!menuToggle || !mainNav) return;

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  menuToggle.classList.remove("is-open");
  mainNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", () => {
  if (!mainNav) return;

  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");

  menuToggle.classList.toggle("is-open", !isOpen);
  mainNav.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("click", (event) => {
  if (!mainNav || !menuToggle) return;

  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  const clickedOutside =
    !mainNav.contains(event.target) && !menuToggle.contains(event.target);

  if (isOpen && clickedOutside) {
    closeMobileMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }

  const target = event.target;
  const isTyping =
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

  if (event.key === "/" && !isTyping) {
    event.preventDefault();
    productSearch?.focus();
  }
});

window.addEventListener(
  "resize",
  () => {
    if (window.innerWidth > 780) {
      closeMobileMenu();
    }
  },
  { passive: true },
);

/* ==========================================================
   10. ANIMAÇÕES DE ENTRADA
   ========================================================== */

function setupRevealAnimations() {
  const elements = document.querySelectorAll("[data-reveal]");

  if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
    elements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  revealObserver?.disconnect();

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px",
    },
  );

  elements.forEach((element) => {
    revealObserver.observe(element);
  });
}

function observarNovosCards() {
  if (!categoryGrid) return;

  const cards = categoryGrid.querySelectorAll("[data-reveal]");

  if (!revealObserver || prefersReducedMotion()) {
    cards.forEach((card) => {
      card.classList.add("is-visible");
    });

    return;
  }

  cards.forEach((card) => {
    if (!card.classList.contains("is-visible")) {
      revealObserver.observe(card);
    }
  });
}

/* ==========================================================
   11. NAVEGAÇÃO ATIVA
   ========================================================== */

function setupActiveNavigation() {
  const navLinks = [...document.querySelectorAll(".nav-link")];

  const sections = navLinks
    .map((link) => {
      const href = link.getAttribute("href");

      return href?.startsWith("#") ? document.querySelector(href) : null;
    })
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`,
          );
        });
      });
    },
    {
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    },
  );

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================
   12. CABEÇALHO E BOTÃO VOLTAR AO TOPO
   ========================================================== */

function updateHeaderState() {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 12);
}

function updateBackToTop() {
  if (!backToTop) return;

  backToTop.classList.toggle("is-visible", window.scrollY > 450);
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
window.addEventListener("scroll", updateBackToTop, { passive: true });

backToTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
});

/* ==========================================================
   13. ANO AUTOMÁTICO NO RODAPÉ
   ========================================================== */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* ==========================================================
   14. INICIALIZAÇÃO
   ========================================================== */

renderWhatsAppIcon();
configureWhatsAppLinks();
configurarImagensGerais();
renderFilters();
renderCategories();
setupRevealAnimations();
setupActiveNavigation();
updateHeaderState();
updateBackToTop();

document.body.classList.add("js-ready");
