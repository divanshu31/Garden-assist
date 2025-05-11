document.addEventListener("DOMContentLoaded", () => {
    const journalForm = document.getElementById("journalForm");
    const journalEntriesContainer = document.getElementById("journalEntries");
  
    journalForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const title = document.getElementById("journalTitle").value.trim();
      const notes = document.getElementById("journalNotes").value.trim();
      const photoInput = document.getElementById("journalPhoto");
      const editId = journalForm.getAttribute("data-edit-id");
  
      if (!title || !notes) return;
  
      const file = photoInput.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const photoUrl = file ? reader.result : null;
  
        if (editId) {
          updateEntry(editId, { title, notes, photo: photoUrl });
          journalForm.removeAttribute("data-edit-id");
        } else {
          const entry = {
            id: Date.now(),
            title,
            notes,
            photo: photoUrl,
            date: new Date().toLocaleString(),
          };
          saveEntry(entry);
        }
  
        renderEntries();
        journalForm.reset();
      };
  
      if (file) {
        reader.readAsDataURL(file);
      } else {
        reader.onload(); // trigger directly if no image
      }
    });
  
    function saveEntry(entry) {
      const entries = getEntries();
      entries.push(entry);
      localStorage.setItem("plantJournal", JSON.stringify(entries));
    }
  
    function updateEntry(id, updatedData) {
      let entries = getEntries();
      entries = entries.map((e) =>
        e.id == id ? { ...e, ...updatedData } : e
      );
      localStorage.setItem("plantJournal", JSON.stringify(entries));
    }
  
    function deleteEntry(id) {
      let entries = getEntries();
      entries = entries.filter((e) => e.id != id);
      localStorage.setItem("plantJournal", JSON.stringify(entries));
      renderEntries();
    }
  
    function editEntry(id) {
      const entries = getEntries();
      const entry = entries.find((e) => e.id == id);
      if (!entry) return;
  
      document.getElementById("journalTitle").value = entry.title;
      document.getElementById("journalNotes").value = entry.notes;
      journalForm.setAttribute("data-edit-id", entry.id);
      scrollToForm();
    }
  
    function scrollToForm() {
      journalForm.scrollIntoView({ behavior: "smooth" });
    }
  
    function getEntries() {
      return JSON.parse(localStorage.getItem("plantJournal")) || [];
    }
  
    function renderEntries() {
  const entries = getEntries();
  journalEntriesContainer.innerHTML = "";

  entries.slice().reverse().forEach((entry) => {
    const div = document.createElement("div");
    div.className = "journal-entry";
    div.innerHTML = `
      <div class="journal-header">
        <h4>${entry.title}</h4>
        <div class="entry-actions">
          <button onclick="editEntry('${entry.id}')">✏️</button>
          <button onclick="deleteEntry('${entry.id}')">🗑️</button>
        </div>
      </div>
      <small>${entry.date}</small>
      <p>${entry.notes}</p>
      ${
        entry.photo
          ? `<img src="${entry.photo}" alt="Journal Photo" />`
          : ""
      }
    `;
    journalEntriesContainer.appendChild(div);
  });
}

  
    // Make functions globally accessible
    window.deleteEntry = deleteEntry;
    window.editEntry = editEntry;
  
    renderEntries();
  });
  