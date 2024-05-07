function angleBetween2DVectors(vector_v, vector_w) {
    vx = vector_v[0];
    vy = vector_v[1];
    wx = vector_w[0];
    wy = vector_w[1];

    var crossProduct = vx * wy - vy * wx;

    var dotProduct = vx * wx + vy * wy;

    var angleRadians = Math.atan2(crossProduct, dotProduct);

    return angleRadians;
}

function angleBetween3DVectors(vector_v, vector_w) {
    var dotProduct = vector_v[0] * vector_w[0] + vector_v[1] * vector_w[1] + vector_v[2] * vector_w[2];
    var magnitude_v = Math.sqrt(vector_v[0] * vector_v[0] + vector_v[1] * vector_v[1] + vector_v[2] * vector_v[2]);
    var magnitude_w = Math.sqrt(vector_w[0] * vector_w[0] + vector_w[1] * vector_w[1] + vector_w[2] * vector_w[2]);
    var angleRadians = Math.acos(dotProduct / (magnitude_v * magnitude_w));
    return angleRadians;
}

function playerVec() {
    var phi = player_phi;
    var theta = Math.PI / 2 - up_down_angle;

    var x = Math.sin(theta) * Math.cos(phi);
    var z = Math.sin(theta) * Math.sin(phi);
    var y = Math.cos(theta);
    
    return [x, y, z];
}

function translate(point_x, point_y, point_z) {
    // calculate x
    var vector_to_point_x = [
        point_x - player_x,
        point_z - player_z
    ];

    var vector_to_screen_x = [
        Math.cos(player_phi),
        Math.sin(player_phi)
    ];

    var horiz_angle = angleBetween2DVectors(vector_to_screen_x, vector_to_point_x);
    if (Math.abs(horiz_angle) > 1.5) return false;
    var x_coord = Math.tan(horiz_angle) * SCREEN_DISTANCE;


    // calculate y
    var vector_to_point_y = [
        Math.sqrt((point_x - player_x) * (point_x - player_x) +
                  (point_z - player_z) * (point_z - player_z)),
        point_y - player_y
    ];

    var vector_to_screen_y = [
        Math.cos(up_down_angle),
        Math.sin(up_down_angle)
    ];

    var y_coord = Math.tan(angleBetween2DVectors(vector_to_screen_y, vector_to_point_y)) * SCREEN_DISTANCE;

    return [canvas.width / 2 + x_coord, canvas.height / 2 - y_coord];
}

function drawLine(line) {
    var aX = line[0];
    var aY = line[1];
    var aZ = line[2];
    var bX = line[3];
    var bY = line[4];
    var bZ = line[5];

    objects.push(new Line(aX, aY, aZ, bX, bY, bZ));
}

function drawWireFramePolygon(points) {
    for (var i = 0; i < points.length; i++) {
        let pointA = points[i];
        let pointB = points[0];
        if (i < points.length - 1) pointB = points[i + 1];
        drawLine([pointA[0], pointA[1], pointA[2], pointB[0], pointB[1], pointB[2]])
    }
}

function drawWireFrameRectPrism(pointA, pointB) {
    drawWireFramePolygon([
        [pointA[0], pointA[1], pointA[2]],
        [pointA[0], pointB[1], pointA[2]],
        [pointA[0], pointB[1], pointB[2]],
        [pointA[0], pointA[1], pointB[2]]
    ]);
    drawWireFramePolygon([
        [pointB[0], pointA[1], pointA[2]],
        [pointB[0], pointB[1], pointA[2]],
        [pointB[0], pointB[1], pointB[2]],
        [pointB[0], pointA[1], pointB[2]]
    ]);

    drawWireFramePolygon([
        [pointA[0], pointA[1], pointA[2]],
        [pointB[0], pointA[1], pointA[2]],
        [pointB[0], pointA[1], pointB[2]],
        [pointA[0], pointA[1], pointB[2]]
    ]);
    drawWireFramePolygon([
        [pointA[0], pointB[1], pointA[2]],
        [pointB[0], pointB[1], pointA[2]],
        [pointB[0], pointB[1], pointB[2]],
        [pointA[0], pointB[1], pointB[2]]
    ]);

    drawWireFramePolygon([
        [pointA[0], pointA[1], pointA[2]],
        [pointB[0], pointA[1], pointA[2]],
        [pointB[0], pointB[1], pointA[2]],
        [pointA[0], pointB[1], pointA[2]]
    ]);
    drawWireFramePolygon([
        [pointA[0], pointA[1], pointB[2]],
        [pointB[0], pointA[1], pointB[2]],
        [pointB[0], pointB[1], pointB[2]],
        [pointA[0], pointB[1], pointB[2]]
    ]);
}