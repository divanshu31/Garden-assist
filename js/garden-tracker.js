document.addEventListener("DOMContentLoaded", () => {
  const addPlantForm = document.getElementById("addPlantForm");
  const plantsContainer = document.getElementById("plantsContainer");

  // Load saved plants from localStorage
  function loadPlants() {
    const plants = JSON.parse(localStorage.getItem("gardenPlants")) || [];
    plantsContainer.innerHTML = "";

    if (plants.length === 0) {
      plantsContainer.innerHTML = `<p class="no-plants">No plants added yet. Start by adding one above!</p>`;
      return;
    }

    plants.forEach((plant) => {
      const plantCard = document.createElement("div");
      plantCard.className = "plant-card";
      plantCard.innerHTML = `
          <h3>${plant.name}</h3>
          <small>Planted on: ${plant.date}</small>
          <p>${plant.notes || "No additional notes."}</p>
        `;
      plantsContainer.appendChild(plantCard);
    });
  }

  // Handle form submission
  addPlantForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("plantName").value.trim();
    const date = document.getElementById("plantDate").value;
    const notes = document.getElementById("plantNotes").value.trim();

    if (!name || !date) {
      alert("Plant name and date are required!");
      return;
    }

    const newPlant = { name, date, notes };
    const plants = JSON.parse(localStorage.getItem("gardenPlants")) || [];
    plants.push(newPlant);
    localStorage.setItem("gardenPlants", JSON.stringify(plants));

    addPlantForm.reset();
    loadPlants(); // ← THIS LINE FIXES THE ISSUE (refresh the display)
  });

  // Initial load
  loadPlants();
});
