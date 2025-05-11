const treatmentData = {
    aphids: {
      name: "Aphids",
      treatment: "🧴 Spray with neem oil or water + mild soap. 🐞 Add ladybugs to eat them."
    },
    powderyMildew: {
      name: "Powdery Mildew",
      treatment: "🧂 Use baking soda spray (1 tsp baking soda + 1 quart water + soap). ✂️ Remove infected leaves."
    },
    rootRot: {
      name: "Root Rot",
      treatment: "🌱 Repot in fresh dry soil. 🧹 Trim bad roots. Ensure drainage is proper."
    },
    whiteflies: {
      name: "Whiteflies",
      treatment: "🪤 Use yellow sticky traps. 🧴 Neem oil spray works great. Spray under leaves."
    },
    blight: {
      name: "Blight",
      treatment: "🔥 Remove affected plants. 🚫 Avoid overhead watering. Use copper fungicide."
    }
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    const issueSelect = document.getElementById("issueSelect");
    const infoDiv = document.getElementById("treatmentInfo");
  
    issueSelect.addEventListener("change", function () {
      const selected = this.value;
  
      if (selected && treatmentData[selected]) {
        const { name, treatment } = treatmentData[selected];
        infoDiv.innerHTML = `
          <h4>${name}</h4>
          <p>${treatment}</p>
        `;
      } else {
        infoDiv.innerHTML = '';
      }
    });
  });
  
// Handle form submission for pest/disease identification
document.getElementById('pestForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent the page from reloading
  
    // Get the issue selected by the user
    const selectedIssue = document.getElementById('issueSelect').value;
  
    // Only display treatment information if a valid issue is selected
    if (selectedIssue && selectedIssue !== 'Choose an issue') {
        displayTreatmentInfo(selectedIssue);
    } else {
        // Clear the treatment information if no valid issue is selected
        const treatmentInfoDiv = document.getElementById('treatmentInfo');
        treatmentInfoDiv.innerHTML = '';
    }
});

// Function to display treatment information dynamically
function displayTreatmentInfo(issue) {
    const treatmentInfoDiv = document.getElementById('treatmentInfo');
    const treatmentMessage = getTreatmentMessage(issue);
    
    // Display the treatment message in the div
    treatmentInfoDiv.innerHTML = `
      <h4>Treatment Suggestion:</h4>
      <p>${treatmentMessage}</p>
    `;
}

  
  // Function to get the treatment message based on the selected issue
  function getTreatmentMessage(issue) {
    // Treatment suggestions for each issue
    const treatments = {
      'pest': 'To treat pests, use organic insecticides or neem oil. Make sure to check under leaves for pests and apply the treatment as directed.',
      'disease': 'For plant diseases, remove affected leaves and treat with a fungicide. Ensure proper airflow and avoid overwatering.',
      'yellowLeaves': 'Yellowing leaves may indicate overwatering or poor soil drainage. Ensure the soil drains well and water only when needed.',
      'wilting': 'Wilting can be caused by under-watering or root rot. Check the soil for moisture and avoid letting the plant sit in soggy soil.',
      'brownSpots': 'Brown spots could be a sign of fungal infection. Prune affected areas and apply fungicide according to the product instructions.'
    };
  
    // Return the treatment suggestion or a default message
    return treatments[issue] || 'Please select a valid issue to get a treatment suggestion.';
  }
  