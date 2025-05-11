import { db } from "../firebase-config.js"; // path ko adjust kar if needed
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// ✅ Sample plant data
const samplePlants = [
  {
    name: "Aloe Vera",
    sunlight: "Indirect sunlight",
    watering: "Once every 2 weeks",
    soil: "Well-drained cactus mix",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Aloe_vera_flower.JPG"
  },
  {
    name: "Snake Plant",
    sunlight: "Low to bright light",
    watering: "Every 2–3 weeks",
    soil: "Well-drained potting mix",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Snake_Plant.jpg"
  },
  {
    name: "Peace Lily",
    sunlight: "Low light",
    watering: "Keep soil moist",
    soil: "Rich, well-drained",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Spathiphyllum_cochlearispathum_RTBG.jpg"
  },
  {
    name: "Spider Plant",
    sunlight: "Bright indirect light",
    watering: "Water weekly",
    soil: "Well-drained soil",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Chlorophytum_comosum0.jpg"
  },
  {
    name: "ZZ Plant",
    sunlight: "Low to medium light",
    watering: "Every 2–3 weeks",
    soil: "Well-drained soil",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Zamioculcas_Zamiifolia.jpg"
  }
];

// ✅ Upload data to Firebase
async function uploadPlants() {
  for (const plant of samplePlants) {
    await addDoc(collection(db, "plants"), plant);
    console.log(`Uploaded: ${plant.name}`);
  }
}

uploadPlants();