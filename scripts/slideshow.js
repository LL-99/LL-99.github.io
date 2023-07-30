// Handles all things slideshows
// Needs to be included on every page containing them

// Get all slideshows and initialize an index array of the same size
var slideshows = document.getElementsByClassName("slideshow");
var slideshowCount = slideshows.length;
var slideIndices = new Array(slideshowCount).fill(0);

//console.log(slideshows);
//console.log(slideIndices);

// Initialize all slideshows and select the initial image from them
for (let i = 0; i < slideshowCount; i++) {
    initializeSlideshow(slideshows[i], i);
    setSlide(i, slideIndices[i]);
}

// Lastly add a "on resize" listener to the window to ensure that the navigators are placed correctly
window.addEventListener('resize', function () { updateNavigatorPositionAll() });

// Forcefully call this once after page initialization is done
// Sadly I haven't found a better way, please let me know if you are aware of one
// window.setTimeout(function () {
//     console.log("force update");
//     updateNavigatorPositionAll();
// }, 100);

/**
 * Initializes all slideshows by registering them and giving them IDs
 * @param {Element} slideshow 
 * @param {int} id 
 */
function initializeSlideshow(slideshow, id) {

    // Set the slideshow's ID to slideshow_N
    slideshow.id = "slideshow_" + id;

    // Set the navigator's IDs to nav_prev|next_N
    // Also add event listeners to actually apply their functionalities
    let nav_prev = slideshow.getElementsByClassName("slide-prev")[0];
    nav_prev.id = "nav_prev_" + slideshow.id;
    nav_prev.addEventListener('click', function () { changeSlide(id, -1); updateNavigatorPosition(id); });

    let nav_next = slideshow.getElementsByClassName("slide-next")[0];
    nav_next.id = "nav_next_" + slideshow.id;
    nav_next.addEventListener('click',
        function () {
            changeSlide(id, 1);
            updateNavigatorPosition(id);
        });

    // Get all dots for instant selection of specific slides
    let dots = slideshow.getElementsByClassName("dot");

    // Set dot IDs to dot_I_N and add the actual functionality
    for (let i = 0; i < dots.length; i++) {
        dots[i].id = "dot_" + i + "_" + slideshow.id;
        dots[i].addEventListener('click',
            function () {
                setSlide(id, i);
                updateNavigatorPosition(id);
            });
    }
}

/**
 * Changes the current slide by a relative offset (usually +1 for next or -1 for previous)
 * @param {int} slideshowIndex 
 * @param {int} relativeChange 
 */
function changeSlide(slideshowIndex, relativeChange) {
    // Simply apply the offset to the current index to retrieve the new absolute index
    setSlide(slideshowIndex, slideIndices[slideshowIndex] + relativeChange);
}

/**
 * Changes the current slide to a specific one
 * @param {int} slideshowIndex 
 * @param {int} newSlideIndex 
 */
function setSlide(slideshowIndex, newSlideIndex) {
    ///console.log("Changing slide for slideshow " + slideshowIndex + ": " + slideIndices[slideshowIndex] + " -> " + newSlideIndex);

    // Get the slides
    let currentSlideshow = slideshows[slideshowIndex];
    let currentSlides = currentSlideshow.getElementsByClassName("slide");

    //console.log(currentSlides);

    // Apply modulo to wrap around the index
    // Since JS modulo can go negative, we need to use a little trick
    newSlideIndex = ((newSlideIndex % currentSlides.length) + currentSlides.length) % currentSlides.length;

    // Update image visuals
    for (let slide of currentSlides) {
        slide.style.display = "none";
    }
    currentSlides[newSlideIndex].style.display = "block";

    // Apply the new index
    slideIndices[slideshowIndex] = newSlideIndex;

    // Lastly retrieve the current images pixel height and adjust the navigator's positions accordingly
    //updateNavigatorPosition(slideshowIndex);
}


/**
 * Updates the position of all navigators
 */
function updateNavigatorPositionAll() {
    console.log("Updating all navigators");

    for (let i = 0; i < slideshowCount; i++) {
        updateNavigatorPosition(i);
    }
}

/**
 * Update the position of the navigators for a specific slideshow.
 * Sadly getting this to align wasn't as clean as simply setting a margin or similar to 50% in the css and call it a day
 * If you know a better solution please let me know!
 * 
 * @param {int} slideshowIndex 
 */
function updateNavigatorPosition(slideshowIndex) {
    // Get references to the current slideshow's navigators & shown image
    let currentSlideshow = slideshows[slideshowIndex];
    let currentSlides = currentSlideshow.getElementsByClassName("slide");
    let currentSlideIndex = currentSlides[slideIndices[slideshowIndex]].getElementsByClassName("slide-index")[0];
    let navNext = currentSlideshow.getElementsByClassName("slide-next")[0];
    let navPrev = currentSlideshow.getElementsByClassName("slide-prev")[0];

    // TODO: Remove debug log
    //console.log(currentImage);
    //console.log(navNext);
    //console.log(navPrev);
    //console.log(currentImage.clientHeight);

    // Get current image
    let currentImage = currentSlides[slideIndices[slideshowIndex]].getElementsByClassName("slide-image")[0];

    // If we don't have an image try to find a video
    if (currentImage == undefined || currentImage == null) {
        currentImage = currentSlides[slideIndices[slideshowIndex]].getElementsByClassName("slide-video")[0];
    }

    // TODO: Remove try catch
    try {
        // Precompute the relevant values
        let topPos = currentImage.clientHeight / 2 + "px";
        let imageStyle = window.getComputedStyle(currentImage, null);

        // Set navigator y pos
        navNext.style.top = navPrev.style.top = topPos;

        // Set navigator & index text x pos (since images are always centered: left offset = right offset)
        navPrev.style.left = navNext.style.right = currentSlideIndex.style.left = imageStyle.marginLeft;
    }
    catch (error) {
        console.error(error);
    }
}