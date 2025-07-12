"use strict";

// TILE SLIDE

let active_slide;
let slide_license = true;

function slide(destination) {

    if (active_slide != destination) {

        if (active_slide != null) {

            let active_slide_elmnt = document.getElementById(active_slide);
            let active_slide_elmnt_cache = active_slide_elmnt;

            active_slide_elmnt.style.animation = 'fade-out .5s ease-in-out both';

            setTimeout(() => {
                active_slide_elmnt_cache.style.display = 'none';
            }, 500);

        }

        let destination_slide = document.getElementById(destination);
        destination_slide.style.display = 'block';
        destination_slide.style.animation = 'fade-in .5s ease-in-out both';

        active_slide = destination;

    }

}

setTimeout('slide("overview")', 150);

// DOWN

let continue_verify = true;

document.addEventListener('DOMContentLoaded', function () {

    window.addEventListener('wheel', function (event) {
        if (event.deltaY > 0) {
            if (active_slide === 'overview' && continue_verify) {
                continue_verify = false;
                setTimeout(() => {
                    continue_verify = true;
                }, 500);
                slide('explanation');
            }
        }

    });

    let touchStartY = 0;

    window.addEventListener('touchstart', function (event) {
        touchStartY = event.touches[0].clientY;
    });

    window.addEventListener('touchmove', function (event) {
        const touchEndY = event.touches[0].clientY;

        if (touchStartY > touchEndY) {
            if (active_slide === 'overview' && continue_verify) {
                continue_verify = false;
                setTimeout(() => {
                    continue_verify = true;
                }, 500);
                slide('explanation');
            }
        }
    });
});

// UP

document.addEventListener('DOMContentLoaded', function () {
    const scroll_container = document.getElementById('explanation');

    function handleScroll(event) {
        const at_top = scroll_container.scrollTop === 0;

        if (event.deltaY < 0 && at_top) {
            if (continue_verify) {
                continue_verify = false;
                setTimeout(() => {
                    continue_verify = true;
                }, 500);
                slide('overview');
            }
        }
    }

    scroll_container.addEventListener('wheel', handleScroll);

    let touchStartY = 0;

    scroll_container.addEventListener('touchstart', function (event) {
        touchStartY = event.touches[0].clientY;
    });

    scroll_container.addEventListener('touchmove', function (event) {
        const touchEndY = event.touches[0].clientY;
        const at_top = scroll_container.scrollTop === 0;

        if ((touchStartY < touchEndY) && at_top) {
            if (continue_verify) {
                continue_verify = false;
                setTimeout(() => {
                    continue_verify = true;
                }, 500);
                slide('overview');
            }
        }
    });
});

// ENTIRE UP-SCROLL

function entire_up_scroll() {

    document.getElementById('explanation').scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout('slide("overview")', 500);

}