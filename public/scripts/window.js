const w = $(".window");
w.addClass("center");
const screen = $(".screen");
const fullscreen = $(".fullscreen");
const diminish = $(".diminish");
let isFull = false;
let isVisible = true;

$(".close").on("click", () => {
    window.location.replace("/");
});

diminish.on("click", () => {
    if (isFull) {
        fullscreen.click();
    }
    screen.css('display', (isVisible ? 'none' : 'flex'));
    w.css('height', isVisible ? '2.2em' : Math.max(window.innerHeight / 3, 400) + "px");
    w.toggleClass("center");
    w.toggleClass("bottom")
    isVisible = !isVisible;
});

fullscreen.on("click", () => {
    if (!isVisible)
        diminish.click();
    isFull = !isFull;
    if (isFull) {
        w.css('width', window.innerWidth - 10 + "px");
        w.css('height', window.innerHeight - 10 + "px");
    } else {
        w.css('width', Math.max(window.innerWidth / 3, 500) + "px");
        w.css('height', Math.max(window.innerHeight / 3, 400) + "px");
    }
});