// save button click by toggle , color change and locally store

const saveBtn = document.querySelector(".btn-save");
// Load saved state
if (localStorage.getItem("isSaved") === "true") {
  saveBtn.classList.add("active");
}

saveBtn.addEventListener("click", () => {
  saveBtn.classList.toggle("active");
  localStorage.setItem("isSaved", saveBtn.classList.contains("active"));
});

//any where modal

const whereButton = document.getElementById("whereButton");
const regionModal = document.getElementById("regionModal");
const regionOptions = document.querySelectorAll(".region-option");

whereButton.addEventListener("click", () => {
  regionModal.style.display = "block";
});

regionOptions.forEach((option) => {
  option.addEventListener("click", () => {
    whereButton.textContent = option.textContent;
    regionModal.style.display = "none";
  });
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === regionModal) {
    regionModal.style.display = "none";
  }
});

// get the app hide for mobile version

const getApp = document.getElementById("get-app");
const appBanner = document.getElementById("app-banner");

getApp.addEventListener("click", () => {
  appBanner.style.display = "none";
});

//   guest modal part

const addGuestsButton = document.getElementById("addGuestsButton");
const guestModal = document.getElementById("guestModal");
const guestCounts = {
  adults: 0,
  children: 0,
  infants: 0,
  pets: 0,
};

addGuestsButton.addEventListener("click", () => {
  guestModal.style.display =
    guestModal.style.display === "none" ? "block" : "none";
});

document.querySelectorAll(".guest-button").forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.dataset.type;
    const action = button.dataset.action;
    const countElement = button.parentElement.querySelector(".guest-count");
    const decrementButton = button.parentElement.querySelector(
      '[data-action="decrement"]'
    );

    if (action === "increment") {
      guestCounts[type]++;
    } else if (action === "decrement" && guestCounts[type] > 0) {
      guestCounts[type]--;
    }

    countElement.textContent = guestCounts[type];
    decrementButton.disabled = guestCounts[type] === 0;

    updateAddGuestsButton();
  });
});

function updateAddGuestsButton() {
  const totalGuests = guestCounts.adults + guestCounts.children;
  let guestText =
    totalGuests > 0
      ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
      : "Add guests";

  if (guestCounts.infants > 0) {
    guestText += `, ${guestCounts.infants} infant${
      guestCounts.infants > 1 ? "s" : ""
    }`;
  }
  if (guestCounts.pets > 0) {
    guestText += `, ${guestCounts.pets} pet${guestCounts.pets > 1 ? "s" : ""}`;
  }

  addGuestsButton.innerHTML = `Who<br>${guestText}`;
}

// Close modal when clicking outside

window.addEventListener("click", (e) => {
  if (!guestModal.contains(e.target) && e.target !== addGuestsButton) {
    guestModal.style.display = "none";
  }
});
