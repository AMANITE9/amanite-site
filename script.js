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
