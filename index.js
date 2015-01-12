function createSlideShow(prefix, containerSelector, delay) {
    var container = document.querySelector(containerSelector);
    var images = [];
    var count = container.querySelectorAll("img").length;

    for (var i = 0; i < count; i++) {
        images.push(document.querySelector("#" + prefix + i));
    }
    
    var index = 0;
    var active = false;
    
    container.addEventListener('mouseover', function () {
        active = true;
    });
    container.addEventListener('mouseout', function () {
        active = false;
    });

    setInterval(function () {
        if (active) {
            images[index].style.display = "none";
            index = (index + 1) % count;
            images[index].style.display = "block";
        }
    }, delay);
}

createSlideShow("API_", "#API_container", 1000);
createSlideShow("tidy_", "#tidy_container", 1000);
createSlideShow("debugger_", "#debugger_container", 1000);
