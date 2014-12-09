var mesh = new Mesh();
mesh.addVertex(100,100,100);
mesh.addVertex(-100,100,100);
mesh.addVertex(-100,-100,100);
mesh.addVertex(100,-100,100);
mesh.addVertex(100,100,-100);
mesh.addVertex(-100,100,-100);
mesh.addVertex(-100,-100,-100);
mesh.addVertex(100,-100,-100);

strokeWeight(2);

mesh.addEdge(1,2);
mesh.addEdge(1,0);
mesh.addEdge(0,3);
mesh.addEdge(3,2);

mesh.addEdge(0,4);
mesh.addEdge(4,5);
mesh.addEdge(5,1);

mesh.addEdge(5,6);
mesh.addEdge(6,2);

mesh.addEdge(3,7);
mesh.addEdge(4,7);
mesh.addEdge(6,7);

mesh.addFace(0,1,2,3);
mesh.addFace(0,3,7,4);
mesh.addFace(1,0,4,5);
mesh.addFace(4,7,6,5);
mesh.addFace(5,6,2,1);
mesh.addFace(2,6,7,3);

