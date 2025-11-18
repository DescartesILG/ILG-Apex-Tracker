let shipsData = {};
const ORDERED_TYPES = ["Battleship","Carrier","Battlecruiser","Auxiliary Ship",
                       "Cruiser","Destroyer","Frigate","Corvette","Fighter"];

async function loadShips() {
  try {
    const resp = await fetch('ships.json');
    shipsData = await resp.json();
  } catch(e) { console.error("Could not load JSON", e); return; }
  renderTypeList();
  renderShips();
}

function renderTypeList() {
  const ul = document.getElementById('type-list');
  ul.innerHTML = '';
  ORDERED_TYPES.forEach(t => {
    const li = document.createElement('li');
    li.textContent = t;
    li.onclick = () => {
      document.querySelectorAll('#type-list li').forEach(n=>n.classList.remove('active'));
      li.classList.add('active');
      renderShips(t);
    };
    ul.appendChild(li);
  });
}

function renderShips(filterType) {
  const container = document.getElementById('ships-container');
  const searchVal = document.getElementById('search').value.toLowerCase();
  container.innerHTML = '';

  Object.keys(shipsData).forEach(type => {
    if(filterType && type !== filterType) return;

    const typeDiv = document.createElement('div');
    typeDiv.innerHTML = `<h2>${type}</h2>`;

    Object.keys(shipsData[type]).forEach(ship => {
      if(searchVal && !ship.toLowerCase().includes(searchVal)) return;

      const shipDiv = document.createElement('div');
      shipDiv.className = 'ship-card';
      shipDiv.innerHTML = `<h3>${ship}</h3>`;

      const variants = shipsData[type][ship];
      Object.keys(variants).forEach(vName => {
        const variantDiv = document.createElement('div');
        variantDiv.className = 'variant-card';
        let html = `<strong>${vName}</strong><br>`;
        variants[vName].forEach(m => {
          const boosts = [];
          if(m.hp) boosts.push(m.hp + ' HP');
          Object.keys(m).forEach(k => {
            if(k !== 'level' && k !== 'hp') boosts.push(`+${m[k]} ${k}`);
          });
          html += `Apex ${m.level}: ${boosts.join(', ') || '—'}<br>`;
        });
        variantDiv.innerHTML = html;
        shipDiv.appendChild(variantDiv);
      });

      typeDiv.appendChild(shipDiv);
    });

    container.appendChild(typeDiv);
  });
}

// Search input listener
document.getElementById('search').oninput = () => renderShips(
  document.querySelector('#type-list li.active')?.textContent
);

loadShips();
