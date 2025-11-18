fetch('ships.json')
  .then(response => response.json())
  .then(data => {
    const typeList = document.getElementById('type-list');
    const shipsContainer = document.getElementById('ships-container');
    const searchInput = document.getElementById('search');

    // Sidebar
    Object.keys(data).forEach((shipClass, index) => {
      const li = document.createElement('li');
      li.textContent = shipClass;
      li.addEventListener('click', () => {
        document.querySelectorAll('li').forEach(el => el.classList.remove('active'));
        li.classList.add('active');
        displayShips(shipClass);
      });
      typeList.appendChild(li);

      // First class active
      if (index === 0) {
        li.classList.add('active');
        displayShips(shipClass);
      }
    });

    function displayShips(shipClass) {
      shipsContainer.innerHTML = '';
      const classData = data[shipClass];
      if (!classData) return;

      Object.keys(classData).forEach(shipName => {
        const shipVariants = classData[shipName];
        if (!shipVariants) return;

        const shipCard = document.createElement('div');
        shipCard.className = 'ship-card';

        const title = document.createElement('h4');
        title.textContent = shipName;
        shipCard.appendChild(title);

        const variantsContainer = document.createElement('div');
        variantsContainer.className = 'variants-container';

        Object.keys(shipVariants).forEach(variantName => {
          const levels = shipVariants[variantName];
          if (!Array.isArray(levels)) return;

          const variantCard = document.createElement('div');
          variantCard.className = 'variant-card';

          const variantTitle = document.createElement('strong');
          variantTitle.textContent = variantName;
          variantCard.appendChild(variantTitle);

          const statsList = document.createElement('ul');
          levels.forEach(level => {
            const li = document.createElement('li');
            let statsText = `Level ${level.level}: HP ${level.hp}`;
            if (level.warp_speed) statsText += `, Warp ${level.warp_speed}`;
            li.textContent = statsText;
            statsList.appendChild(li);
          });

          variantCard.appendChild(statsList);
          variantsContainer.appendChild(variantCard);
        });

        shipCard.appendChild(variantsContainer);
        shipsContainer.appendChild(shipCard);
      });
    }

    // Search
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      shipsContainer.querySelectorAll('.ship-card').forEach(card => {
        const name = card.querySelector('h4').textContent.toLowerCase();
        card.style.display = name.includes(query) ? '' : 'none';
      });
    });
  })
  .catch(err => console.error('Error loading ship data:', err));
