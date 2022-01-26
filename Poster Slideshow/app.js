const slideshowImage = document.getElementById("SlideshowImage");

let posterNumber = 1;
window.setInterval(function() {
        posterNumber++;
        if (posterNumber == 6) posterNumber = 1;
        slideshowImage.setAttribute("src", `poster${posterNumber}.png`);
}, 1000)