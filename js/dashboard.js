import { auth, db } from "../firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  addDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  const notesList = document.getElementById("notes-list");
  const noteInput = document.getElementById("note-input");
  const addNoteBtn = document.getElementById("add-note-btn");

  let currentUser = null;

  // Check auth state
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      currentUser = user;
      document.getElementById("user-email").innerText = currentUser.email;

      // Fetch user role
      const userDocSnap = await getDoc(doc(db, "users", user.uid));
      if (userDocSnap.exists()) {
        const role = userDocSnap.data().role;
        document.getElementById("user-role").innerText = role;

        // Load notes
        loadNotes(user, role);

        // ✅ Load plants here AFTER user and role are ready
        loadPlantsFromJSON();
      }
    } else {
      window.location.href = "index.html";
    }
  });

  // Load notes
  async function loadNotes(user, role) {
    notesList.innerHTML = "";
    const notesRef = collection(db, "notes");
    const querySnapshot = await getDocs(notesRef);

    querySnapshot.forEach((docSnap) => {
      const noteData = docSnap.data();
      displayNote(docSnap.id, noteData, user.uid, role);
    });
  }

  function displayNote(id, data, userId, role) {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    // create elements
    const noteContent = document.createElement("p");
    noteContent.innerText = data.content;

    const noteOwner = document.createElement("small");
    noteOwner.innerText = `By : ${data.userEmail}`;
    noteDiv.append(noteContent, noteOwner);

    if (data.userId === userId || role === "admin") {
      // edit button
      const editBtn = document.createElement("button");
      editBtn.innerText = "📍Edit";
      editBtn.classList.add("edit-btn");
      editBtn.onclick = () => {
        const editTextarea = document.createElement("textarea");
        editTextarea.value = noteContent.innerText;

        const saveBtn = document.createElement("button");
        saveBtn.innerText = "Save";
        saveBtn.classList.add("save-btn");
        saveBtn.onclick = async () => {
          const newContent = editTextarea.value.trim();
          if (newContent !== "") {
            await setDoc(doc(db, "notes", id), {
              ...data,
              content: newContent,
            });
            noteContent.innerText = newContent;
            noteDiv.replaceChild(noteContent, editTextarea);
            noteDiv.replaceChild(saveBtn, editBtn);
          }
        };

        noteDiv.replaceChild(editTextarea, noteContent);
        noteDiv.replaceChild(saveBtn, editBtn);
      };

      //delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete🔥";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.onclick = async () => {
        await deleteDoc(doc(db, "notes", id));
        noteDiv.remove();
      };

      noteDiv.appendChild(editBtn);
      noteDiv.appendChild(deleteBtn);
    }

    notesList.appendChild(noteDiv);
  }

  addNoteBtn.addEventListener("click", async () => {
    const content = noteInput.value.trim();
    if (content === "") return;

    await addDoc(collection(db, "notes"), {
      content,
      userId: currentUser.uid,
      userEmail: currentUser.email,
      createdAt: new Date(),
    });

    noteInput.value = "";
    loadNotes(currentUser, document.getElementById("user-role").innerText);
  });
});
// ------------------- PLANT DATABASE SECTION -------------------
async function loadPlantsFromJSON() {
  const container = document.querySelector(".container");

  const plantSection = document.createElement("section");
  plantSection.innerHTML = `
      <h3 style="color: #FFD700; font-weight: bold;">🌱 Plant Database</h3>
      <div id="plant-list" style="display: flex; flex-wrap: wrap; gap: 16px;"></div>
    `;
  container.appendChild(plantSection);

  const plantList = plantSection.querySelector("#plant-list");

  try {
    const response = await fetch("plants.json"); // adjust path if needed
    const plants = await response.json();

    plants.forEach((plant) => {
      const card = document.createElement("div");
      card.style = `
  border: 2px solid #4CAF50;
  padding: 12px;
  width: 230px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', sans-serif;
  margin: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
`;

      card.onmouseover = () => {
        card.style.transform = "scale(1.03)";
        card.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.2)";
      };
      card.onmouseout = () => {
        card.style.transform = "scale(1)";
        card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
      };

      card.innerHTML = `
  <img src="${plant.image}" alt="${plant.name}"
       style="width: 100%; height: 160px; object-fit: cover; border-radius: 10px; margin-bottom: 10px;" />
  <h4 style="margin: 0 0 6px; color: #2e7d32;">${plant.name}</h4>
  <p style="margin: 4px 0;"><strong>Sunlight:</strong> ${plant.sunlight}</p>
  <p style="margin: 4px 0;"><strong>Watering:</strong> ${plant.watering}</p>
  <p style="margin: 4px 0;"><strong>Soil:</strong> ${plant.soil}</p>
`;

      plantList.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading plant data:", error);
  }
}

// GARDEN TRACKER

// const gardenForm = document.getElementById("gardenForm");
// const gardenLog = document.getElementById("gardenLog");

// function loadEntries() {
//   const entries = JSON.parse(localStorage.getItem("gardenEntries")) || [];
// gardenLog.innerHTML = "";

// entries.forEach((entry, index) => {
//   const div = document.createElement("div");
//   div.className = "entry";
//   div.style = `
//     max-width: 950px;
//     margin: 10px auto;
//     padding: 12px;
//     border: 1px solid #ccc;
//     border-radius: 10px;
//     background: #f0fff4;
//     box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
//     font-family: 'Segoe UI', sans-serif;
//   `;
//   div.innerHTML = `
//     <strong>${entry.name}</strong><br/>
//     <small>Planted on: ${entry.date}</small><br/>
//     <p>${entry.notes}</p>
//   `;
//   gardenLog.appendChild(div);
// });

// }

// gardenForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const name = document.getElementById("plantName").value;
//   const date = document.getElementById("plantDate").value;
//   const notes = document.getElementById("plantNotes").value;

//   const newEntry = { name, date, notes };

//   const existing = JSON.parse(localStorage.getItem("gardenEntries")) || [];
//   existing.push(newEntry);
//   localStorage.setItem("gardenEntries", JSON.stringify(existing));

//   gardenForm.reset();
//   loadEntries();
// });

// loadEntries();

// function saveWateringSchedule(plantName, intervalDays) {
//   const schedule = {
//     name: plantName,
//     lastWatered: new Date().toISOString(), // current date-time
//     intervalDays: intervalDays,
//   };

//   // Save it to localStorage
//   localStorage.setItem(`plant_${plantName}`, JSON.stringify(schedule));
// }

// // Function to check if it's time to water a plant
// function checkWateringReminders() {
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     if (!key.startsWith("plant_")) continue; // Skip non-plant keys

//     const value = localStorage.getItem(key);

//     try {
//       const plantSchedule = JSON.parse(value);

//       if (
//         plantSchedule &&
//         plantSchedule.name &&
//         plantSchedule.lastWatered &&
//         plantSchedule.intervalDays
//       ) {
//         const lastWateredDate = new Date(plantSchedule.lastWatered);
//         const currentDate = new Date();
//         const daysSinceWatering = Math.floor(
//           (currentDate - lastWateredDate) / (1000 * 60 * 60 * 24)
//         );

//         if (daysSinceWatering >= plantSchedule.intervalDays) {
//           sendNotification(plantSchedule.name); // Trigger notification
//         }
//       }
//     } catch (e) {
//       continue;
//     }
//   }
// }

// // Function to request permission for notifications
// function requestNotificationPermission() {
//   if (Notification.permission === "default") {
//     Notification.requestPermission().then((permission) => {
//       if (permission === "granted") {
//         console.log("Notification permission granted.");
//       } else {
//         console.log("Notification permission denied.");
//       }
//     });
//   }
// }

// // Function to trigger a browser notification
// function sendNotification(plantName) {
//   if (Notification.permission === "granted") {
//     new Notification(`Time to water your ${plantName}!`);
//   }
// }

// // Function to handle form submission and save plant entry
// document.getElementById("gardenForm").addEventListener("submit", function (e) {
//   e.preventDefault(); // Prevent the form from reloading the page

//   // Get form values
//   const plantName = document.getElementById("plantName").value;
//   const plantDate = document.getElementById("plantDate").value;
//   const plantNotes = document.getElementById("plantNotes").value;
//   const wateringInterval = 3; // You can customize this as needed (in days)

//   // Create the plant entry object
//   const plantEntry = {
//     name: plantName,
//     plantingDate: plantDate,
//     lastWatered: plantDate, // Initially set it to the planting date
//     intervalDays: wateringInterval,
//     notes: plantNotes,
//   };

//   // Save plant entry to localStorage (use a unique key based on plant name)
//   localStorage.setItem(`plant_${plantName}`, JSON.stringify(plantEntry));

//   // Clear the form fields
//   document.getElementById("plantName").value = "";
//   document.getElementById("plantDate").value = "";
//   document.getElementById("plantNotes").value = "";

//   // Refresh the garden log and watering reminder
//   showGardenLog();
//   showReminderMessage();
// });

// // Function to show the garden log (list of plants)
// function showGardenLog() {
//   const gardenLogDiv = document.getElementById("gardenLog");
//   gardenLogDiv.innerHTML = "";

//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);

//     // ✅ Skip non-plant keys
//     if (!key.startsWith("plant_")) continue;

//     const value = localStorage.getItem(key);

//     try {
//       const plant = JSON.parse(value);

//       if (
//         plant &&
//         plant.name &&
//         plant.plantingDate &&
//         plant.lastWatered &&
//         plant.intervalDays
//       ) {
//         const plantEntry = document.createElement("div");
//         plantEntry.innerHTML = `
//           <h4>${plant.name}</h4>
//           <p>Planted on: ${plant.plantingDate}</p>
//           <p>Notes: ${plant.notes}</p>
//           <p>Last watered: ${plant.lastWatered}</p>
//           <p>Water every ${plant.intervalDays} days</p>
//           <hr>
//         `;
//         gardenLogDiv.appendChild(plantEntry);
//       }
//     } catch (e) {
//       continue;
//     }
//   }
// }

// // Function to display watering reminders
// function showReminderMessage() {
//   const reminderDiv = document.getElementById("watering-reminder");
//   const reminderMessage = [];

//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     if (!key.startsWith("plant_")) continue; // Skip non-plant keys

//     const value = localStorage.getItem(key);

//     let plantSchedule;
//     try {
//       plantSchedule = JSON.parse(value);
//     } catch (err) {
//       continue; // Skip if not valid JSON
//     }

//     // Check if it's a plant schedule object
//     if (
//       plantSchedule &&
//       plantSchedule.name &&
//       plantSchedule.lastWatered &&
//       plantSchedule.intervalDays
//     ) {
//       const lastWateredDate = new Date(plantSchedule.lastWatered);
//       const currentDate = new Date();
//       const daysSinceWatering = Math.floor(
//         (currentDate - lastWateredDate) / (1000 * 60 * 60 * 24)
//       );

//       if (daysSinceWatering >= plantSchedule.intervalDays) {
//         reminderMessage.push(`Time to water your ${plantSchedule.name}!`);
//         sendNotification(plantSchedule.name); // Trigger notification
//       }
//     }
//   }

//   reminderDiv.innerHTML =
//     reminderMessage.length > 0
//       ? reminderMessage.join("<br>")
//       : "No plants need watering today.";
// }

// // Request notification permission when the page loads
// requestNotificationPermission();

// // Call the reminder function on page load
// showReminderMessage();
// checkWateringReminders();
// console.log("Last Watered:", lastWateredDate);
// console.log("Current Date:", currentDate);
// console.log("Days Since Watering:", daysSinceWatering);
