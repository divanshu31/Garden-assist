document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("regionSelect");
    const output = document.getElementById("careGuideOutput");
  
    const guides = {
      tropical: {
        title: "🌴 Tropical Region",
        tips: [
          "Choose humidity-loving plants like Monstera and ferns.",
          "Avoid direct sun; use filtered light or partial shade.",
          "Keep soil consistently moist but well-drained.",
          "Use neem spray to control pests due to high humidity."
        ],
      },
      temperate: {
        title: "🍁 Temperate Region",
        tips: [
          "Great for annuals and perennials like tulips and lavender.",
          "Mulch beds to retain moisture and protect roots.",
          "Watch for frost dates and bring sensitive plants indoors.",
          "Fertilize during growing season (spring to early summer)."
        ],
      },
      arid: {
        title: "🌵 Arid Region",
        tips: [
          "Use succulents and drought-resistant herbs like rosemary.",
          "Water deeply but infrequently.",
          "Avoid high organic matter soils—use sandy mixes.",
          "Shade cloth can reduce midday heat stress on plants."
        ],
      },
      continental: {
        title: "🌲 Continental Region",
        tips: [
          "Hardy perennials and evergreens do well here.",
          "Plan for hot summers and freezing winters.",
          "Use raised beds to extend growing seasons.",
          "Cover young plants in early spring to avoid cold snaps."
        ],
      },
      polar: {
        title: "❄️ Polar Region",
        tips: [
          "Stick to indoor plants: peace lily, spider plant, aloe vera.",
          "Use LED grow lights to extend daylight indoors.",
          "Monitor temperature and avoid cold window drafts.",
          "Use humidifiers or pebble trays to increase humidity."
        ],
      },
    };
  
    function renderGuide(region) {
      const guide = guides[region];
      if (!guide) {
        output.innerHTML = "<p>No guide available for this region.</p>";
        return;
      }
  
      output.innerHTML = `
        <h3>${guide.title}</h3>
        <ul>${guide.tips.map(tip => `<li>${tip}</li>`).join("")}</ul>
      `;
    }
  
    select.addEventListener("change", () => {
      renderGuide(select.value);
    });
  
    renderGuide(select.value); // Load default
  });
  