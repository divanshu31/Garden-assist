document.addEventListener("DOMContentLoaded", () => {
  const challengeListContainer = document.getElementById("challengeList");
  const modal = document.getElementById("challengeDetailModal");
  const titleEl = document.getElementById("challengeTitle");
  const descEl = document.getElementById("challengeDescription");
  const dateEl = document.getElementById("challengeDates");
  const entriesContainer = document.getElementById("challengeEntriesContainer");
  const form = document.getElementById("challengeSubmissionForm");
  const captionInput = document.getElementById("challengeCaption");
  const photoInput = document.getElementById("challengePhoto");

  let currentChallengeId = null;

  // Initialize challenges
  const challenges = getChallenges();
  renderChallengeList(challenges);

  function getChallenges() {
    const data = localStorage.getItem("gardeningChallenges");
    if (data) return JSON.parse(data);

    const starter = [
      {
        id: "sprout-sprint",
        title: "🌱 Sprout Sprint",
        description: "Grow any seed and share your progress!",
        startDate: "2025-05-01",
        endDate: "2025-05-15",
        entries: [],
      },
      {
        id: "bloom-battle",
        title: "🌸 Bloom Battle",
        description: "Post your best flower bloom!",
        startDate: "2025-05-05",
        endDate: "2025-05-20",
        entries: [],
      },
    ];
    localStorage.setItem("gardeningChallenges", JSON.stringify(starter));
    return starter;
  }

  function renderChallengeList(challenges) {
    challengeListContainer.innerHTML = "";
    challenges.forEach((challenge) => {
      const div = document.createElement("div");
      div.className = "challenge-card";
      div.innerHTML = `
          <h4>${challenge.title}</h4>
          <p>${challenge.description}</p>
          <small>🗓️ ${challenge.startDate} → ${challenge.endDate}</small>
          <br/>
          <button onclick="joinChallenge('${challenge.id}')">Join Challenge</button>
        `;
      challengeListContainer.appendChild(div);
    });
  }

  window.joinChallenge = function (challengeId) {
    const challenges = JSON.parse(localStorage.getItem("gardeningChallenges"));
    const challenge = challenges.find((c) => c.id === challengeId);
    if (!challenge) return;

    currentChallengeId = challengeId;
    titleEl.textContent = challenge.title;
    descEl.textContent = challenge.description;
    dateEl.textContent = `🗓️ ${challenge.startDate} → ${challenge.endDate}`;
    captionInput.value = "";
    photoInput.value = "";
    entriesContainer.innerHTML = "";

    challenge.entries.forEach((entry) => {
      const div = document.createElement("div");
      div.innerHTML = `
          <img src="${entry.photo}" alt="User Entry" />
          <p>${entry.caption}</p>
          <small>${entry.date}</small>
        `;
      entriesContainer.appendChild(div);
    });

    modal.classList.remove("hidden");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const caption = captionInput.value.trim();
    const file = photoInput.files[0];
    if (!caption || !file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const photoData = reader.result;
      const challenges = JSON.parse(
        localStorage.getItem("gardeningChallenges")
      );
      const challenge = challenges.find((c) => c.id === currentChallengeId);
      if (!challenge) return;

      challenge.entries.push({
        photo: photoData,
        caption,
        date: new Date().toLocaleString(),
      });

      localStorage.setItem("gardeningChallenges", JSON.stringify(challenges));
      joinChallenge(currentChallengeId); // Refresh modal
    };
    reader.readAsDataURL(file);
  });

  window.closeChallengeModal = function () {
    modal.classList.add("hidden");
    currentChallengeId = null;
  };
});
