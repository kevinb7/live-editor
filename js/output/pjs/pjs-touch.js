function addTouch(processing, canvasElement) {

    processing.touches = {};

    processing.touchStarted = function(id, x, y) {};
    processing.touchMoved = function(id, x, y) {};
    processing.touchEnded = function(id, x, y) {};
    
    canvasElement.addEventListener("touchstart", function (e) {
        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];
            
            var id = touch.identifier;
            var x = touch.pageX;
            var y = touch.pageY;
            
            processing.touches[id] = { x: x, y: y };
            processing.touchStarted(id, x, y);
        }
    });
    
    canvasElement.addEventListener("touchmove", function (e) {
        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            var id = touch.identifier;
            var x = touch.pageX;
            var y = touch.pageY;
            
            // TODO: decide whether to replace to overwrite properties
            processing.touches[id].x = x;
            processing.touches[id].y = y;

            processing.touchMoved(touch.identifier, x, y);
        }
    });
    
    canvasElement.addEventListener("touchend", function (e) {
        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];
            
            var id = touch.identifier;
            var x = touch.pageX;
            var y = touch.pageY;
            
            delete processing.touches[id];
            processing.touchEnded(touch.identifier, x, y);
        }
    });
    
    canvasElement.addEventListener("touchcancel", function (e) {
        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];
            
            var id = touch.identifier;
            var x = touch.pageX;
            var y = touch.pageY;

            delete processing.touches[id];
            processing.touchEnded(touch.identifier, x, y);
        }
    });
}
