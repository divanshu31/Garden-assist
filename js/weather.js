document.addEventListener("DOMContentLoaded", () => {
    const weatherInfo = document.getElementById("weatherInfo");
    const apiKey = "85fe43e196eb8090d07f67f366b15a2e"; // Replace with your actual API key
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Fetching weather for:", latitude, longitude); // Debugging geolocation
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("API request failed with status: " + response.status);
              }
              return response.json();
            })
            .then((data) => {
              const temp = data.main.temp;
              const city = data.name;
              weatherInfo.innerHTML = `<p>Current temperature in ${city}: ${temp}°C</p>`;
            })
            .catch((error) => {
              console.error("Error fetching weather data:", error);
              weatherInfo.innerHTML = `<p>Unable to retrieve temperature data.</p>`;
            });
        },
        (error) => {
          console.error("Geolocation error:", error);
          weatherInfo.innerHTML = `<p>Geolocation is not enabled or available.</p>`;
        }
      );
    } else {
      weatherInfo.innerHTML = `<p>Geolocation is not supported by this browser.</p>`;
    }
  });
  