const images = [
  "photo1.jpg","photo2.jpg","photo3.jpg","photo4.jpg",
  "photo5.jpg","photo6.jpg","photo7.jpg","photo8.jpg"
];

const track = document.querySelector(".galerie-track");
const speed = 1; // pixels par frame
let imgElements = [];
let offset = 0;

// Ajouter une itération complète
function appendIteration() {
  images.forEach(src => {
    const img = document.createElement("img");
    img.src = `./assets/photos/${src}`;
    track.appendChild(img);
    imgElements.push(img);
  });
}

// Ajouter 2 itérations initiales
appendIteration();
appendIteration();

function animate() {
  offset += speed;
  track.style.transform = `translateX(-${offset}px)`;

  const trackWidth = imgElements.reduce((sum, img) => sum + img.offsetWidth, 0);
  const containerWidth = track.parentElement.offsetWidth;

  if (trackWidth - offset < containerWidth + 50) {
    appendIteration();

    // Supprimer la première itération complète
    const firstIterationCount = images.length;

    // Calculer la largeur totale à retirer AVANT suppression
    let removedWidth = 0;
    for (let i = 0; i < firstIterationCount; i++) {
      removedWidth += imgElements[i].offsetWidth;
    }

    for (let i = 0; i < firstIterationCount; i++) {
      const img = imgElements.shift();
      track.removeChild(img);
    }

    // Ajuster offset exactement
    offset -= removedWidth;
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
