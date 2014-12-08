background(255);
strokeWeight(2);
translate(200,200);
scale(1,-1);

var viewMatrix;

var mesh = createCube(200);
mesh.draw();

var rotateMesh = function (mesh) {
    var speed = 0.5;
    var dx = speed * (mouseX - pmouseX);
    var dy = speed * (mouseY - pmouseY);

    var axis = new Vector3(dy, dx, 0);
    var angle = Math.PI * axis.length() / 180;

    if (axis.length() > 0.001) {
        axis = axis.normalize();
        var rotMatrix = Matrix4.rotation(axis, angle);
        viewMatrix = rotMatrix.mul(viewMatrix);
    }
};

mouseDragged = function () {
    rotateMesh(mesh);
};

draw = function() {
    background(255);
    mesh.draw();
};
