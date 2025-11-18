async function loadShips() {
  let data;
  try {
    const resp = await fetch('ships.json');
    data = await resp.json();
  } catch(e) {
    console.error("Could not load JSON", e);
    return;
  }

  const container = document.getElementById('ships-container');
  Object.keys(data).forEach(type => {
    const typeDiv = document.createElement('div');
    typeDiv.innerHTML = `<h2>${type}</h2>`;
    
    Object.keys(data[type]).forEach(ship => {
      const shipDiv = document.createElement('div');
      shipDiv.className = 'ship-card';
      shipDiv.innerHTML = `<h3>${ship}</h3>`;
      
      const variants = data[type][ship];
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

loadShips();
