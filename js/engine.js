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
        1, 0
    ];

    var y_coord = Math.tan(angleBetweenVectors(vector_to_screen_y, vector_to_point_y)) * SCREEN_DISTANCE;

    return [canvas.width / 2 + x_coord, canvas.height / 2 - y_coord];
}

function renderLines() {
    ctx.strokeStyle = LINE_COLOR;
    ctx.lineWidth = 2;
    for (var i = 0; i < lines.length; i++) {
        line = lines[i];
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
        ) continue;

        ctx.beginPath();
        ctx.moveTo(a_translated[0], a_translated[1]);
        ctx.lineTo(b_translated[0], b_translated[1]);
        ctx.stroke();
    }
}