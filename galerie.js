// Tableau des images
const images = ["photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg"];
const track = document.querySelector(".galerie-track");
const speed = 1; // pixels par frame

// Liste de toutes les images actuellement dans le DOM
let imgElements = [];

// Fonction pour ajouter une itération complète du tableau
function appendTable() {
    const newImages = [];
    images.forEach(src => {
        const img = document.createElement("img");
        img.src = `./assets/photos/${src}`; // ou ./assets/photos/${src} selon ton repo
        track.appendChild(img);
        newImages.push(img);
    });
    imgElements = imgElements.concat(newImages);
}

// Ajouter initialement deux itérations pour remplir la piste
appendTable();
appendTable();

// Offset de translation
let offset = 0;

// Fonction d’animation
function animate() {
    offset += speed;
    track.style.transform = `translateX(-${offset}px)`;

    // Vérifier si la première image est complètement sortie
    const firstImg = imgElements[0];
    if (firstImg && firstImg.offsetWidth + firstImg.offsetLeft - offset < 0) {
        // Supprimer l'image du DOM et du tableau
        track.removeChild(firstImg);
        imgElements.shift();
    }

    // Vérifier si une nouvelle itération doit être ajoutée à droite
    const trackWidth = imgElements.reduce((sum, img) => sum + img.offsetWidth, 0);
    const trackVisibleWidth = track.parentElement.offsetWidth;
    if (trackWidth - offset < trackVisibleWidth + 50) { // +50 px pour anticiper
        appendTable();
    }

    requestAnimationFrame(animate);
}

// Démarrer l'animation
requestAnimationFrame(animate);
