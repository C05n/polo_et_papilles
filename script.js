let data = {};

// Charger le JSON
fetch('./assets/data.json')
   .then(res => res.json())
   .then(json => {
      data = json;

      // Afficher la catégorie par défaut
      const defaultCategory = "Plats Uniques";

      // Trouver le bouton correspondant et déclencher le clic
      const defaultButton = document.querySelector(`.menu-filters button[data-category="${defaultCategory}"]`);
      if (defaultButton) defaultButton.click();
   })
   .catch(err => console.error("Erreur JSON :", err));


// Sélection des boutons et du conteneur d'affichage
const filterButtons = document.querySelectorAll(".menu-filters button");
const resultsContainer = document.getElementById("menu");


// Ajout des événements sur chaque bouton
filterButtons.forEach(button => {
   button.addEventListener("click", () => {
      const category = button.dataset.category;

      // Afficher les éléments filtrés
      afficherCategorie(category);

      // Gérer le bouton actif visuellement
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
   });
});


// Fonction d'affichage
function afficherCategorie(category) {
   const items = data[category] || [];

   if (!items.length) {
      resultsContainer.innerHTML = `<p>Aucun élément dans cette catégorie.</p>`;
      return;
   }

   resultsContainer.innerHTML = items.map(item => `
      <div class="menu-item">
         <h3 class="menu-item-title">${item.title}</h3>
         <p class="menu-item-desc">${item.description}</p>
         <p class="menu-item-subtitle">${item.subtitle}</p>
      </div>
   `).join("");
}
