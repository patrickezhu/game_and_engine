var dc_outward = true;
var dc_move = false;
var dc_corner1 = [800, 200, -50];
var dc_corner2 = [800, 200, 0];
var dc_corner3 = [800, 150, -50];
var dc_corner4 = [800, 150, 0];

var dc_corner5 = [850, 200, -50];
var dc_corner6 = [850, 200, 0];
var dc_corner7 = [850, 150, -50];
var dc_corner8 = [850, 150, 0];
function drawExpandingCube() { 
    if (dc_move) {
        var dc_ov = dc_outward ? 1 : -1;
        var dc_ov = ((76 - Math.abs(76 - dc_corner3[1]))/76 * 10 + 0.1) * dc_ov;
    } else {
        var dc_ov = 0;
    }



    dc_corner1 = [dc_corner1[0]-dc_ov, dc_corner1[1]+dc_ov, dc_corner1[2]-dc_ov];
    dc_corner2 = [dc_corner2[0]-dc_ov, dc_corner2[1]+dc_ov, dc_corner2[2]+dc_ov];
    dc_corner3 = [dc_corner3[0]-dc_ov, dc_corner3[1]-dc_ov, dc_corner3[2]-dc_ov];
    dc_corner4 = [dc_corner4[0]-dc_ov, dc_corner4[1]-dc_ov, dc_corner4[2]+dc_ov];

    dc_corner5 = [dc_corner5[0]+dc_ov, dc_corner5[1]+dc_ov, dc_corner5[2]-dc_ov];
    dc_corner6 = [dc_corner6[0]+dc_ov, dc_corner6[1]+dc_ov, dc_corner6[2]+dc_ov];
    dc_corner7 = [dc_corner7[0]+dc_ov, dc_corner7[1]-dc_ov, dc_corner7[2]-dc_ov];
    dc_corner8 = [dc_corner8[0]+dc_ov, dc_corner8[1]-dc_ov, dc_corner8[2]+dc_ov];



    drawSimpleRectangularPrism(dc_corner1, [dc_corner1[0]+50, dc_corner1[1]+50, dc_corner1[2]+50]);
    drawSimpleRectangularPrism(dc_corner2, [dc_corner2[0]+50, dc_corner2[1]+50, dc_corner2[2]+50]);
    drawSimpleRectangularPrism(dc_corner3, [dc_corner3[0]+50, dc_corner3[1]+50, dc_corner3[2]+50]);
    drawSimpleRectangularPrism(dc_corner4, [dc_corner4[0]+50, dc_corner4[1]+50, dc_corner4[2]+50]);

    drawSimpleRectangularPrism(dc_corner5, [dc_corner5[0]+50, dc_corner5[1]+50, dc_corner5[2]+50]);
    drawSimpleRectangularPrism(dc_corner6, [dc_corner6[0]+50, dc_corner6[1]+50, dc_corner6[2]+50]);
    drawSimpleRectangularPrism(dc_corner7, [dc_corner7[0]+50, dc_corner7[1]+50, dc_corner7[2]+50]);
    drawSimpleRectangularPrism(dc_corner8, [dc_corner8[0]+50, dc_corner8[1]+50, dc_corner8[2]+50]);

    if (dc_corner3[1] <= 0) dc_outward = false;
    if (dc_corner3[1] >= 150) dc_outward = true;
}
