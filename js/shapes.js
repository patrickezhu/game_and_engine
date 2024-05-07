var objects = [];

function renderAll() {
    objects.sort((a, b) => b.distFromPlayer() - a.distFromPlayer());

    for (var i = 0; i < objects.length; i++) {
        objects[i].render();
    }
}

function renderShapes() {
    objects = [];

    // drawWireFrameRectPrism([800, 0, -100], [1000, 400, 100]);

    // drawWireFrameRectPrism([875, 0, 200], [925, 50, 250]);

    // drawWireFrameRectPrism([850, 150, -200], [950, 250, -300]);

    // drawSimpleRectangularPrism([800, 0, -100], [1000, 400, 100]);
    // drawSimpleRectangularPrism([875, 0, 200], [925, 50, 250]);
    // drawSimpleRectangularPrism([850, 150, -200], [950, 250, -300]);

    drawExpandingCube();


    renderAll();
}