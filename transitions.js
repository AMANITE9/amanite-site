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

    window.addEventListener("pageshow", hideTransition);

    window.addEventListener("DOMContentLoaded", () => {

        const fade = document.querySelector(".fade-transition");

        if(!fade) return;

        requestAnimationFrame(hideTransition);

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
