var mesh = new Mesh();

var radius = 75;
var count = 9;
for (var i = 0; i < count; i++) {
    var x = radius * cos(i * 360 / count);
    var y = radius * sin(i * 360 / count);
    mesh.addVertex(x, y, 150);
}

for (var i = 0; i < count; i++) {
    var x = radius * cos(i * 360 / count);
    var y = radius * sin(i * 360 / count);
    mesh.addVertex(x, y, -150);
}

strokeWeight(2);

for (var i = 0; i < count - 1; i++) {
    mesh.addEdge(i, i + 1);
    mesh.addEdge(i + count, i + count + 1);
}

for (var i = 0; i < count - 1; i++) {
    mesh.addFace(1 + i, 0 + i, count + i, (count + 1) + i);
}

mesh.addEdge(count - 1,0);
mesh.addEdge(2*count - 1,count);

mesh.addFace(0, count - 1, 2 * count - 1, count);

var cap1 = [];
var cap2 = [];
for (var i = 0; i < count; i++) {
    cap1.push(i);
    cap2.push(2 * count - i - 1);
}

mesh.addFace.apply(mesh, cap1);
mesh.addFace.apply(mesh, cap2);
