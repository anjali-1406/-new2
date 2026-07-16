document.addEventListener("DOMContentLoaded", function () {

    /* ============================
       IMAGE PREVIEW
    ============================ */

    const imageInput = document.getElementById("id_image");

    const previewImage =
        document.getElementById("story-preview-image");

    const placeholder =
        document.getElementById("story-placeholder");

    if (imageInput) {

        imageInput.addEventListener("change", function () {

            if (!this.files.length) return;

            const reader = new FileReader();

            reader.onload = function (e) {

                previewImage.src = e.target.result;

                previewImage.style.display = "block";

                if (placeholder) {

                    placeholder.style.display = "none";

                }

            };

            reader.readAsDataURL(this.files[0]);

        });

    }

    /* ============================
       STORY PROGRESS BAR
    ============================ */

    const progress =
        document.getElementById("story-progress-fill");

    if (!progress) return;

    let width = 0;

    const duration = 5000;

    const interval = 50;

    const step = 100 / (duration / interval);

    const timer = setInterval(function () {

        width += step;

        progress.style.width = width + "%";

        if (width >= 100) {

            clearInterval(timer);

            if (
                typeof NEXT_STORY_URL !== "undefined" &&
                NEXT_STORY_URL
            ) {

                window.location.href = NEXT_STORY_URL;

            } else {

                window.location.href = "/";

            }

        }

    }, interval);
  /* ==========================================
   STORY NAVIGATION
========================================== */

document.addEventListener("keydown", function (e) {

    // ESC -> Close Story
    if (e.key === "Escape") {

        window.location.href = "/";

    }

});


/* ==========================================
   PREVENT IMAGE DRAG
========================================== */

const storyImage = document.querySelector(".story-full-image");

if (storyImage) {

    storyImage.setAttribute("draggable", "false");

}


/* ==========================================
   PAUSE / RESUME TIMER
========================================== */

let paused = false;

document.addEventListener("visibilitychange", function () {

    paused = document.hidden;

});


/* ==========================================
   CLICK TO NEXT
========================================== */

const viewer = document.querySelector(".story-viewer");

if (viewer) {

    viewer.addEventListener("click", function () {

        if (
            typeof NEXT_STORY_URL !== "undefined" &&
            NEXT_STORY_URL
        ) {

            window.location.href = NEXT_STORY_URL;

        } else {

            window.location.href = "/";

        }

    });

}


/* ==========================================
   MOBILE SWIPE
========================================== */

let touchStartX = 0;

let touchEndX = 0;

document.addEventListener("touchstart", function (e) {

    touchStartX = e.changedTouches[0].screenX;

});

document.addEventListener("touchend", function (e) {

    touchEndX = e.changedTouches[0].screenX;

    if (touchStartX - touchEndX > 60) {

        if (
            typeof NEXT_STORY_URL !== "undefined" &&
            NEXT_STORY_URL
        ) {

            window.location.href = NEXT_STORY_URL;

        }

    }

});


/* ==========================================
   LOADING EFFECT
========================================== */

window.addEventListener("load", function () {

    document.body.classList.add("story-loaded");

});

});
