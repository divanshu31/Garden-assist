document.addEventListener("DOMContentLoaded", () => {
  displaySeasonalTips();
});
function toggleTip(id) {
    const body = document.getElementById(`tipBody${id}`);
    if (body) {
      body.classList.toggle('open');
    }
  }
  
function displaySeasonalTips() {
  const container = document.getElementById("seasonalTipsContainer");
  if (!container) {
    console.error("seasonalTipsContainer not found in DOM.");
    return;
  }


  const tips = [
    {
      season: "Spring",
      title: "Prepare Your Soil",
      description:
        "Add compost and organic matter to enrich your soil before planting.",
    },
    {
      season: "Summer",
      title: "Water Smartly",
      description:
        "Water early in the morning and use mulch to retain moisture.",
    },
    {
      season: "Fall",
      title: "Plant Cover Crops",
      description:
        "Sow cover crops to improve soil fertility during the off-season.",
    },
    {
      season: "Winter",
      title: "Plan Ahead",
      description: "Use this time to plan your garden layout and order seeds.",
    },
  ];

  tips.forEach((tip) => {
    const card = document.createElement("div");
    card.className = "tip-card";
    card.innerHTML = `
        <h3>${tip.title}</h3>
        <p>${tip.description}</p>
        <span class="season-badge">${tip.season}</span>
      `;
    container.appendChild(card);
  });

  Object.entries(tipsData).forEach(([season, tips]) => {
    tips.forEach(tip => {
      const isFavorited = isTipFavorited(season, tip.title);
      
      const tipBox = document.createElement("div");
      tipBox.className = "tip-box";
      tipBox.innerHTML = `
        <h4>${tip.title}</h4>
        <p>${tip.description}</p>
        <span class="favorite-icon" onclick="toggleFavorite(event, '${season}', '${encodeURIComponent(tip.title)}')">
          ${isFavorited ? '❤️' : '🤍'}
        </span>
      `;
      document.getElementById("seasonalTips").appendChild(tipBox);
    });
  });
  
  tipBox.innerHTML = `
  <div class="tip-header" onclick="toggleTip(${i})">
    <span class="season-emoji">${getSeasonEmoji(season)}</span>
    <h4>${tip.title}</h4>
    <span class="badge ${tip.category}">${tip.category}</span>
    <span class="favorite-icon" onclick="toggleFavorite(event, '${season}', '${
    tip.title
  }')">
      ${isFavorited ? "❤️" : "🤍"}
    </span>
  </div>
  <div class="tip-body" id="tipBody${i}">
    <p>${tip.description}</p>
  </div>
`;
}
function getFavorites() {
  return JSON.parse(localStorage.getItem("favoriteTips")) || [];
}

function isTipFavorited(season, title) {
  const favorites = getFavorites();
  return favorites.some((t) => t.season === season && t.title === title);
}

function toggleFavorite(event, season, title) {
  event.stopPropagation(); // prevent accordion toggle

  let favorites = getFavorites();
  const index = favorites.findIndex(
    (t) => t.season === season && t.title === title
  );

  if (index > -1) {
    favorites.splice(index, 1); // remove
  } else {
    favorites.push({ season, title });
  }

  localStorage.setItem("favoriteTips", JSON.stringify(favorites));
  displaySeasonalTips();
}
