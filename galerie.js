// Tableau des images
const images = ["photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg", "photo5.jpg", "photo6.jpg", "photo7.jpg", "photo8.jpg"];
const track = document.querySelector(".galerie-track");
const speed = 1; // pixels par frame

// Fonction pour ajouter une itération complète du tableau à la piste
function appendTable() {
  let width = 0;
  images.forEach(src => {
    const img = document.createElement("img");
    img.src = `assets/photos/${src}`;
    track.appendChild(img);
    width += img.offsetWidth + (parseInt(getComputedStyle(img).marginRight) || 0);
  });
  return width;
}

// Ajouter la première itération
let totalWidth = appendTable();

// Offset initial
let offset = 0;

// Fonction pour vérifier si une nouvelle itération doit être ajoutée
function checkAndAppend() {
  // Largeur totale visible de la piste
  const trackVisibleWidth = track.parentElement.offsetWidth;

  // Si la largeur totale moins l'offset restant est inférieure à l'espace visible
  // => il faut ajouter une nouvelle itération
  if (totalWidth - offset < trackVisibleWidth + 100) { // +100 pour anticiper
    totalWidth += appendTable();
  }
}

// Animation continue
function animate() {
  offset += speed;
  track.style.transform = `translateX(-${offset}px)`;

  // Vérifier si une nouvelle itération doit être ajoutée
  checkAndAppend();

  requestAnimationFrame(animate);
}

// Démarrer l'animation
requestAnimationFrame(animate);
