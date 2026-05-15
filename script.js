const audio = new Audio();

const bubbles =
document.querySelectorAll('.demo-bubble');

const progressBars =
document.querySelectorAll('.progress-fill');

const progressContainers =
document.querySelectorAll('.progress-bar');

let currentBubble = null;

/* ================= PLAY / PAUSE ================= */

bubbles.forEach(bubble => {

    bubble.addEventListener('click', () => {

        const track =
        bubble.dataset.track;

        /* MEME PISTE = PAUSE */

        if(audio.src.includes(track)
        && !audio.paused){

            audio.pause();

            bubble.classList.remove('playing');

            return;
        }

        /* RESET AUTRES BULLES */

        bubbles.forEach(b =>

            b.classList.remove('playing')
        );

        /* NOUVELLE PISTE */

        audio.src = track;

        audio.play();

        bubble.classList.add('playing');

        currentBubble = bubble;
    });
});

/* ================= UPDATE PROGRESSION ================= */

audio.addEventListener('timeupdate', () => {

    if(!audio.duration) return;

    const progress =

    (audio.currentTime / audio.duration) * 100;

    progressBars.forEach(bar => {

        bar.style.width =
        progress + '%';
    });
});

/* ================= CLIQUER BARRE ================= */

progressContainers.forEach(bar => {

    bar.addEventListener('click', (e) => {

        const width =
        bar.clientWidth;

        const clickX =
        e.offsetX;

        const duration =
        audio.duration;

        audio.currentTime =
        (clickX / width) * duration;
    });
});

/* ================= FIN MUSIQUE ================= */

audio.addEventListener('ended', () => {

    /* RESET BULLES */

    bubbles.forEach(b =>

        b.classList.remove('playing')
    );

    /* RESET BARRES */

    progressBars.forEach(bar => {

        bar.style.width = '0%';
    });
});

/* ================================================= */
/* ================= GALLERY ======================= */
/* ================================================= */

const galleryImages = [

    "images/PROMODAY1.PNG",
    "images/PROMODAY2.PNG",
    "images/PROMODAY3.PNG",
    "images/PROMODAY4.PNG",
    "images/PROMODAY5.PNG",
    "images/PROMODAY6.PNG"

];

let currentImage = 0;

/* ================= OPEN ================= */

function openGallery(index){

    currentImage = index;

    const lightbox =
    document.getElementById("lightbox");

    const lightboxImg =
    document.getElementById("lightbox-img");

    if(lightbox){

        lightbox.style.display = "flex";
    }

    if(lightboxImg){

        lightboxImg.src =
        galleryImages[currentImage];
    }
}

/* ================= CLOSE ================= */

function closeGallery(){

    const lightbox =
    document.getElementById("lightbox");

    if(lightbox){

        lightbox.style.display = "none";
    }
}

/* ================= NEXT ================= */

function nextImage(event){

    if(event){

        event.stopPropagation();
    }

    currentImage++;

    if(currentImage >= galleryImages.length){

        currentImage = 0;
    }

    const lightboxImg =
    document.getElementById("lightbox-img");

    if(lightboxImg){

        lightboxImg.src =
        galleryImages[currentImage];
    }
}

/* ================= PREV ================= */

function prevImage(event){

    if(event){

        event.stopPropagation();
    }

    currentImage--;

    if(currentImage < 0){

        currentImage =
        galleryImages.length - 1;
    }

    const lightboxImg =
    document.getElementById("lightbox-img");

    if(lightboxImg){

        lightboxImg.src =
        galleryImages[currentImage];
    }
}

/* ================================================= */
/* ================= SWIPE MOBILE ================== */
/* ================================================= */

let touchStartX = 0;
let touchEndX = 0;

const lightbox =
document.getElementById("lightbox");

/* TOUCH START */

if(lightbox){

    lightbox.addEventListener("touchstart", e => {

        touchStartX =
        e.changedTouches[0].screenX;
    });

    /* TOUCH END */

    lightbox.addEventListener("touchend", e => {

        touchEndX =
        e.changedTouches[0].screenX;

        handleSwipe();
    });

    /* TAP OUTSIDE TO CLOSE */

    lightbox.addEventListener("click", e => {

        if(e.target === lightbox){

            closeGallery();
        }
    });
}

/* SWIPE DETECTION */

function handleSwipe(){

    const swipeDistance =
    touchEndX - touchStartX;

    /* SWIPE GAUCHE */

    if(swipeDistance < -50){

        nextImage();
    }

    /* SWIPE DROITE */

    if(swipeDistance > 50){

        prevImage();
    }
}

/* ================================================= */
/* ================= PAGE TRANSITION =============== */
/* ================================================= */

window.addEventListener("DOMContentLoaded", () => {

    const fade =
    document.querySelector(".fade-transition");

    /* SECURITE */

    if(!fade) return;

    /* ================= FADE IN ================= */

    requestAnimationFrame(() => {

        fade.classList.add("hidden");
    });

    /* ================= FADE OUT ================= */

    document.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", e => {

            const href =
            link.getAttribute("href");

            if(!href) return;

            e.preventDefault();

            fade.classList.remove("hidden");

            setTimeout(() => {

                window.location.href = href;

            }, 800);
        });
    });
});
/* ================================================= */
/* ================= PRELOAD ======================= */
/* ================================================= */

const preloadImages = [

    "images/transition.PNG",

    "images/HOME.PNG",
    "images/DAY.PNG",
    "images/NIGHT.PNG",
    "images/BOOKING.PNG",

    "images/PROMODAY1.PNG",
    "images/PROMODAY2.PNG",
    "images/PROMODAY3.PNG",

    "images/PROMONIGHT1.PNG",
    "images/PROMONIGHT2.PNG",
    "images/PROMONIGHT3.PNG"
];

preloadImages.forEach(src => {

    const img = new Image();

    img.src = src;
});
