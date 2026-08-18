const managementItems = [
  {
    title: "COORDENA\u00c7\u00c3O ADMINISTRATIVA",
    gestorUrl: "#",
    equipeUrl: "#"
  },
  {
    title: "GEST\u00c3O OPERACIONAL",
    gestorUrl: "#",
    equipeUrl: "#"
  },
  {
    title: "COORDENA\u00c7\u00c3O CL\u00cdNICA",
    gestorUrl: "#",
    equipeUrl: "#"
  },
  {
    title: "GEST\u00c3O DA QUALIDADE",
    gestorUrl: "#",
    equipeUrl: "#"
  },
  {
    title: "GEST\u00c3O DAS \u00c1REAS ASSISTENCIAIS EXTRA BLOCO",
    gestorUrl: "#",
    equipeUrl: "#"
  },
  {
    title: "GEST\u00c3O DE CONDUTA \u00c9TICA",
    gestorUrl: "#",
    equipeUrl: "#"
  },
  {
    title: "GEST\u00c3O DE EQUIPAMENTOS",
    gestorUrl: "#",
    equipeUrl: "#"
  },
  {
    title: "GEST\u00c3O DE PESSOAS",
    gestorUrl: "#",
    equipeUrl: "#"
  },
  {
    title: "GEST\u00c3O DE PRONTU\u00c1RIO",
    gestorUrl: "#",
    equipeUrl: "#"
  },
  {
    title: "GEST\u00c3O DO AMBULAT\u00d3RIO PR\u00c9-ANEST\u00c9SICO",
    gestorUrl: "#",
    equipeUrl: "#"
  },
  {
    title: "GEST\u00c3O FINANCEIRA",
    gestorUrl: "#",
    equipeUrl: "#"
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

function configureAction(button, url, itemTitle, audienceLabel) {
  button.href = url;

  if (url === "#") {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      window.alert(`Informe o link de ${audienceLabel} para: ${formatLabel(itemTitle)}`);
    });
  }
}

function renderCards() {
  const fragment = document.createDocumentFragment();

  managementItems.forEach((item, index) => {
    const card = cardTemplate.content.firstElementChild.cloneNode(true);
    const title = card.querySelector("h2");
    const glyph = card.querySelector(".icon-card__glyph");
    const gestorButton = card.querySelector('[data-role="gestor"]');
    const equipeButton = card.querySelector('[data-role="equipe"]');

    title.textContent = formatLabel(item.title);
    card.dataset.index = String(index + 1);
    card.style.animationDelay = `${index * 55}ms`;

    configureAction(gestorButton, item.gestorUrl, item.title, "Gestor");
    configureAction(equipeButton, item.equipeUrl, item.title, "Equipe");

    glyph.style.borderRadius = `${12 + (index % 5)}px`;
    glyph.style.transform = `rotate(${index % 2 === 0 ? -10 : 10}deg)`;

    fragment.appendChild(card);
  });

  iconGrid.appendChild(fragment);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js?v=20260818-2").catch(() => {
        // Silent fail keeps the app usable even if SW registration is blocked.
      });
    });
  }
}

renderCards();
registerServiceWorker();
