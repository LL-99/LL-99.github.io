// Helper for forced delays
const delay = ms => new Promise(res => setTimeout(res, ms));

//#region Parallax

// Handle parallax intro images autoscroll
HandleParallax();

async function HandleParallax() {
    // Get all images
    var parallaxImages = document.getElementsByClassName('parallax-intro');
    let currentImage = -1;

    // Permanently loop through them
    while(true) {
        //console.log("Showing new image");

        currentImage++;
        currentImage %= parallaxImages.length;

        for(let img of parallaxImages) {
            img.style.display = "none";
        }
        parallaxImages[currentImage].style.display = "block";

        await delay(3000);
    }


}

//#endregion