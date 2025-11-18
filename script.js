// Load JSON data
fetch('ships.json')
  .then(response => response.json())
  .then(data => {
    const typeList = document.getElementById('type-list');
    const shipsContainer = document.getElementById('ships-container');
    const searchInput = document.getElementById('search');

    // Populate sidebar with ship classes
    for (let shipClass in data) {
      const li = document.createElement('li');
      li.textContent = shipClass;
      li.addEventListener('click', () => {
        document.querySelectorAll('li').forEach(el => el.classList.remove('active'));
        li.classList.add('active');
        displayShips(shipClass);
      });
      typeList.appendChild(li);
    }

    // Display ships for a given class
    function displayShips(shipClass) {
      shipsContainer.innerHTML = '';
      const classData = data[shipClass];

      for (let shipName in classData) {
        const shipVariants = classData[shipName];

        // Create main ship card
        const shipCard = document.createElement('div');
        shipCard.className = 'ship-card';

        const title = document.createElement('h4');
        title.textContent = shipName;
        shipCard.appendChild(title);

        // Variants container
        const variantsContainer = document.createElement('div');
        variantsContainer.className = 'variants-container';

        // Loop through variants
        for (let variantName in shipVariants) {
          const levels = shipVariants[variantName];

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
        }

        shipCard.appendChild(variantsContainer);
        shipsContainer.appendChild(shipCard);
      }
    }

    // Search functionality
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      shipsContainer.querySelectorAll('.ship-card').forEach(card => {
        const name = card.querySelector('h4').textContent.toLowerCase();
        card.style.display = name.includes(query) ? '' : 'none';
      });
    });

    // Initially display the first ship class
    const firstClass = Object.keys(data)[0];
    if (firstClass) {
      typeList.querySelector('li').classList.add('active');
      displayShips(firstClass);
    }
  })
  .catch(err => console.error('Error loading ship data:', err));
