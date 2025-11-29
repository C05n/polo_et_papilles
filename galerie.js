const images = [
  "photo1.JPG", "photo2.JPG", "photo3.JPG", "photo4.JPG",
  "photo5.JPG", "photo6.JPG", "photo7.JPG", "photo8.JPG"
];

const leftImg  = document.querySelector('.galerie-slider-img-prev');
const mainImg  = document.querySelector('.galerie-slider-img-main');
const rightImg = document.querySelector('.galerie-slider-img-next');

const dots = document.querySelector('.dots');

let currentSlide = 0;
let timer;

function updateSlides() {
    const prevIndex = (currentSlide - 1 + images.length) % images.length;
    const nextIndex = (currentSlide + 1) % images.length;

    leftImg.src  = "./assets/photos/" + images[prevIndex];
    mainImg.src  = "./assets/photos/" + images[currentSlide];
    rightImg.src = "./assets/photos/" + images[nextIndex];

    updateDots();
    resetTimer();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % images.length;
    updateSlides();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + images.length) % images.length;
    updateSlides();
}

function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(nextSlide, 3000);
}

function updateDots() {
    dots.innerHTML = '';
    for (let i = 0; i < images.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentSlide) dot.classList.add('dot_selected');

        dot.addEventListener('click', () => {
            currentSlide = i;
            updateSlides();
        });

        dots.appendChild(dot);
    }
}

updateSlides();
