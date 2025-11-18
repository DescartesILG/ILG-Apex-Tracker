const typeList = document.getElementById("type-list");
const shipsContainer = document.getElementById("ships-container");
const searchInput = document.getElementById("search");

// Load JSON data
let shipsData = {}; // you can fetch this from your JSON file or embed it

fetch("ships.json")
  .then(response => response.json())
  .then(data => {
    shipsData = data;
    renderTypeList();
    renderShips();
  });

// Render sidebar type list
function renderTypeList() {
  typeList.innerHTML = "";
  Object.keys(shipsData).forEach(type => {
    const li = document.createElement("li");
    li.textContent = type;
    li.addEventListener("click", () => {
      document.querySelectorAll("#type-list li").forEach(l => l.classList.remove("active"));
      li.classList.add("active");
      renderShips(type);
    });
    typeList.appendChild(li);
  });
}

// Render ships for a given type (or all types)
function renderShips(filterType = null) {
  shipsContainer.innerHTML = "";
  const searchTerm = searchInput.value.toLowerCase();

  const types = filterType ? { [filterType]: shipsData[filterType] } : shipsData;

  Object.entries(types).forEach(([type, ships]) => {
    Object.entries(ships).forEach(([shipName, variants]) => {
      // Filter by search
      if (!shipName.toLowerCase().includes(searchTerm)) return;

      // Create ship card
      const shipCard = document.createElement("div");
      shipCard.className = "ship-card";

      const shipTitle = document.createElement("h4");
      shipTitle.textContent = shipName;
      shipCard.appendChild(shipTitle);

      // Variants container
      const variantsContainer = document.createElement("div");
      variantsContainer.className = "variants-container";

      Object.entries(variants).forEach(([variantName, levels]) => {
        const
