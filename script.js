let data = {};

fetch("./assets/data/data.json")
   .then(res => res.json())
   .then(json => {
      data = json;
      remplirToutesLesCategories();
   })
   .catch(err => console.error("Erreur JSON :", err));

function creerHTMLItem(item, categoryName, itemsCount) {
   // Template spécial pour Planches Apéro ou pour peu d'items
   if (categoryName === "Planches Apéro" || categoryName === "Cocktail Dinatoire") {
      return `
      <div class="card-item">
         <h3 class="menu-item-title">${item.title || ""}</h3>
         <p class="menu-item-desc">${item.description || ""}</p>
         <p class="menu-item-subtitle">${item.subtitle || ""}</p>
         <p class="menu-item-subsubtitle">${item.subsubtitle || ""}</p>
         <p class="menu-item-price">${item.price || ""}</p>
      </div>
      `;
   }

   // Template par défaut
   return `
   <div class="menu-item">
      <h3 class="menu-item-title">${item.title || ""}</h3>
      <p class="menu-item-desc">${item.description || ""}</p>
      <p class="menu-item-subtitle">${item.subtitle || ""}</p>
   </div>
   `;
}

function remplirToutesLesCategories() {
   const categoriesDivs = document.querySelectorAll(".data-container");

   categoriesDivs.forEach(div => {
      const categoryName = div.dataset.category;
      const items = data[categoryName] || [];

      if (!items.length) {
         div.innerHTML = `<p>Aucun élément dans cette catégorie.</p>`;
         return;
      }

      // Vérifier si la catégorie contient des sous-catégories
      const subCategoryDivs = div.querySelectorAll(".sub-category");

      if (subCategoryDivs.length > 0) {
         // Cas avec sous-catégories
         subCategoryDivs.forEach(subDiv => {
            const subName = subDiv.dataset.subcategory;
            const subContainer = subDiv.querySelector(".menu-item-container");

            const filteredItems = items.filter(item => item.subCategory === subName);

            if (!filteredItems.length) {
               subContainer.innerHTML = `<p>Aucun élément dans cette sous-catégorie.</p>`;
               return;
            }

            subContainer.innerHTML = filteredItems
               .map(item => creerHTMLItem(item, categoryName, filteredItems.length))
               .join("");
         });
      } else {
         // Cas sans sous-catégorie
         const container = div.querySelector(".menu-item-container");
         container.innerHTML = items
            .map(item => creerHTMLItem(item, categoryName, items.length))
            .join("");
      }
   });
}
