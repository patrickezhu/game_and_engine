function angleBetweenVectors(vector_v, vector_w) {
    vx = vector_v[0];
    vy = vector_v[1];
    wx = vector_w[0];
    wy = vector_w[1];

    var crossProduct = vx * wy - vy * wx;

    var dotProduct = vx * wx + vy * wy;

    var angleRadians = Math.atan2(crossProduct, dotProduct);

    return angleRadians;
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

    var x_coord = Math.tan(angleBetweenVectors(vector_to_screen_x, vector_to_point_x)) * SCREEN_DISTANCE;


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

    var y_coord = Math.tan(angleBetweenVectors(vector_to_screen_y, vector_to_point_y)) * SCREEN_DISTANCE;

    return [canvas.width / 2 + x_coord, canvas.height / 2 - y_coord];
}

function drawLine(line) {
    ctx.strokeStyle = LINE_COLOR;
    ctx.lineWidth = 2;
    var aX = line[0];
    var aY = line[1];
    var aZ = line[2];
    var bX = line[3];
    var bY = line[4];
    var bZ = line[5];

    var a_translated = translate(aX, aY, aZ);
    var b_translated = translate(bX, bY, bZ);

    if (
        (a_translated[0] > canvas.width || a_translated[0] < 0 ||
        a_translated[1] > canvas.height || a_translated[1] < 0) &&
        (b_translated[0] > canvas.width || b_translated[0] < 0 ||
        b_translated[1] > canvas.height || b_translated[1] < 0)
    ) return;

    ctx.beginPath();
    ctx.moveTo(a_translated[0], a_translated[1]);
    ctx.lineTo(b_translated[0], b_translated[1]);
    ctx.stroke();
}

function drawPolygon(points) {
    for (var i = 0; i < points.length; i++) {
        var pointA = points[i];
        var pointB = points[0];
        if (i < points.length - 1) pointB = points[i + 1];
        drawLine([pointA[0], pointA[1], pointA[2], pointB[0], pointB[1], pointB[2]])
    }
}

function drawRectPrism(pointA, pointB) {
    drawPolygon([
        [pointA[0], pointA[1], pointA[2]],
        [pointA[0], pointB[1], pointA[2]],
        [pointA[0], pointB[1], pointB[2]],
        [pointA[0], pointA[1], pointB[2]]
    ]);
    drawPolygon([
        [pointB[0], pointA[1], pointA[2]],
        [pointB[0], pointB[1], pointA[2]],
        [pointB[0], pointB[1], pointB[2]],
        [pointB[0], pointA[1], pointB[2]]
    ]);

    drawPolygon([
        [pointA[0], pointA[1], pointA[2]],
        [pointB[0], pointA[1], pointA[2]],
        [pointB[0], pointA[1], pointB[2]],
        [pointA[0], pointA[1], pointB[2]]
    ]);
    drawPolygon([
        [pointA[0], pointB[1], pointA[2]],
        [pointB[0], pointB[1], pointA[2]],
        [pointB[0], pointB[1], pointB[2]],
        [pointA[0], pointB[1], pointB[2]]
    ]);

    drawPolygon([
        [pointA[0], pointA[1], pointA[2]],
        [pointB[0], pointA[1], pointA[2]],
        [pointB[0], pointB[1], pointA[2]],
        [pointA[0], pointB[1], pointA[2]]
    ]);
    drawPolygon([
        [pointA[0], pointA[1], pointB[2]],
        [pointB[0], pointA[1], pointB[2]],
        [pointB[0], pointB[1], pointB[2]],
        [pointA[0], pointB[1], pointB[2]]
    ]);
}