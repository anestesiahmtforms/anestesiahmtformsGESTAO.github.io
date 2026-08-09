const managementItems = [
  {
    title: "COORDENA\u00c7\u00c3O ADMINISTRATIVA",
    url: "#"
  },
  {
    title: "GEST\u00c3O OPERACIONAL",
    url: "#"
  },
  {
    title: "COORDENA\u00c7\u00c3O CL\u00cdNICA",
    url: "#"
  },
  {
    title: "GEST\u00c3O DA QUALIDADE",
    url: "#"
  },
  {
    title: "GEST\u00c3O DAS \u00c1REAS ASSISTENCIAIS EXTRA BLOCO",
    url: "#"
  },
  {
    title: "GEST\u00c3O DE CONDUTA \u00c9TICA",
    url: "#"
  },
  {
    title: "GEST\u00c3O DE EQUIPAMENTOS",
    url: "#"
  },
  {
    title: "GEST\u00c3O DE PESSOAS",
    url: "#"
  },
  {
    title: "GEST\u00c3O DE PRONTU\u00c1RIO",
    url: "#"
  },
  {
    title: "GEST\u00c3O DO AMBULAT\u00d3RIO PR\u00c9-ANEST\u00c9SICO",
    url: "#"
  },
  {
    title: "GEST\u00c3O FINANCEIRA",
    url: "#"
  }
];

const iconGrid = document.querySelector("#iconGrid");
const cardTemplate = document.querySelector("#cardTemplate");

function formatLabel(text) {
  return text
    .toLowerCase()
    .replace(/(^|[\s-])\p{L}/gu, (char) => char.toUpperCase())
    .replace(/\bDc\b/g, "DC");
}

function renderCards() {
  const fragment = document.createDocumentFragment();

  managementItems.forEach((item, index) => {
    const card = cardTemplate.content.firstElementChild.cloneNode(true);
    const title = card.querySelector("h2");
    const hint = card.querySelector(".icon-card__hint");
    const glyph = card.querySelector(".icon-card__glyph");

    title.textContent = formatLabel(item.title);
    card.href = item.url;
    card.dataset.index = String(index + 1);
    card.style.animationDelay = `${index * 55}ms`;

    if (item.url === "#") {
      hint.textContent = "Link aguardando definicao";
      card.addEventListener("click", (event) => {
        event.preventDefault();
        window.alert(`Informe o link para: ${formatLabel(item.title)}`);
      });
    }

    glyph.style.borderRadius = `${12 + (index % 5)}px`;
    glyph.style.transform = `rotate(${index % 2 === 0 ? -10 : 10}deg)`;

    fragment.appendChild(card);
  });

  iconGrid.appendChild(fragment);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {
        // Silent fail keeps the app usable even if SW registration is blocked.
      });
    });
  }
}

renderCards();
registerServiceWorker();
