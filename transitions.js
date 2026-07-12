/* ================================================= */
/* ================ PAGE TRANSITIONS =============== */
/* ================================================= */

(() => {

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function hideTransition(){

        const fade = document.querySelector(".fade-transition");

        if(!fade) return;

        fade.classList.remove("is-transitioning");
        fade.classList.add("hidden");
        fade.setAttribute("aria-hidden", "true");
    }

    function waitForPrimaryImage(){

        const image = document.querySelector(".page-image");

        if(!image || (image.complete && image.naturalWidth > 0)){

            return Promise.resolve();
        }

        return new Promise(resolve => {

            const finish = () => resolve();

            image.addEventListener("load", finish, { once:true });
            image.addEventListener("error", finish, { once:true });

            window.setTimeout(finish, 2500);
        });
    }

    function beginEntrance(){

        const fade = document.querySelector(".fade-transition");

        if(!fade) return;

        fade.classList.remove("is-transitioning");
        fade.classList.add("is-entering");
        fade.setAttribute("aria-hidden", "false");

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                fade.classList.add("hidden");
                fade.setAttribute("aria-hidden", "true");

                window.setTimeout(() => {

                    fade.classList.remove("is-entering");

                }, 1150);
            });
        });
    }

    window.addEventListener("pageshow", event => {

        if(event.persisted){

            hideTransition();
        }
    });

    window.addEventListener("DOMContentLoaded", () => {

        const fade = document.querySelector(".fade-transition");

        if(!fade) return;

        if(prefersReducedMotion){

            hideTransition();

        }else{

            waitForPrimaryImage().then(beginEntrance);
        }

        document.querySelectorAll("a[href]").forEach(link => {

            link.addEventListener("click", event => {

                const href = link.getAttribute("href");

                if(
                    event.defaultPrevented ||
                    event.button !== 0 ||
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey ||
                    link.target ||
                    link.hasAttribute("download") ||
                    !href ||
                    href.startsWith("#")
                ) return;

                event.preventDefault();

                if(prefersReducedMotion){

                    window.location.assign(href);
                    return;
                }

                fade.classList.add("is-transitioning");
                fade.classList.remove("hidden");
                fade.setAttribute("aria-hidden", "false");

                window.setTimeout(() => {

                    window.location.assign(href);

                }, 1100);
            });
        });
    });
})();
