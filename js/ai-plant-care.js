// Add this to your existing Firebase code
async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}

function determineClimateZone(temp) {
  if (temp > 24) return "tropical";
  if (temp > 18) return "subtropical";
  if (temp > 10) return "temperate";
  return "cold";
}

function getCareGuide(climateZone) {
  const guides = {
    tropical: `
        <h3>Tropical Region Care</h3>
        <ul>
          <li>Choose humidity-loving plants like Monstera and ferns</li>
          <li>Avoid direct sun; use filtered light or partial shade</li>
          <li>Keep soil consistently moist but well-drained</li>
          <li>Use neem spray to control pests due to high humidity</li>
        </ul>
      `,
    subtropical: `
        <h3>Subtropical Region Care</h3>
        <ul>
          <li>Good for citrus trees, palms, and bougainvillea</li>
          <li>Provide afternoon shade in summer</li>
          <li>Water deeply but less frequently</li>
          <li>Watch for fungal diseases in humid periods</li>
        </ul>
      `,
    temperate: `
        <h3>Temperate Region Care</h3>
        <ul>
          <li>Ideal for roses, lavender, and many vegetables</li>
          <li>Most plants need 6+ hours of sunlight</li>
          <li>Water when top inch of soil is dry</li>
          <li>Mulch to regulate soil temperature</li>
        </ul>
      `,
    cold: `
        <h3>Cold Region Care</h3>
        <ul>
          <li>Choose cold-hardy plants like conifers and winter vegetables</li>
          <li>Protect plants from frost with covers</li>
          <li>Water in morning to prevent freezing</li>
          <li>Use cold frames or greenhouses for sensitive plants</li>
        </ul>
      `,
  };
  return (
    guides[climateZone] || "<p>No care guide available for this climate.</p>"
  );
}

// Add this to your DOMContentLoaded event listener
document.getElementById("getWeatherBtn").addEventListener("click", async () => {
  const city = document.getElementById("locationInput").value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const weatherData = await getWeatherData(city);
  if (weatherData) {
    const temp = weatherData.main.temp;
    const climateZone = determineClimateZone(temp);
    const careGuide = getCareGuide(climateZone);

    document.getElementById("weatherDisplay").innerHTML = `
        <p>Current temperature in ${city}: ${temp}°C</p>
        <p>Climate zone: ${climateZone}</p>
      `;

    document.getElementById("careGuide").innerHTML = careGuide;
  } else {
    document.getElementById("weatherDisplay").innerHTML =
      "<p>Could not fetch weather data. Please try again.</p>";
  }
});
