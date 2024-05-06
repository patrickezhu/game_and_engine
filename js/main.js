var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

const WINDOW_WIDTH = 200;
const WINDOW_HEIGHT = 200;
const SCREEN_DISTANCE = 800;
const BACKGROUND_COLOR = "#1a1a1a";
const LINE_COLOR = "#ffffff";

const WALK_SPEED = 15;
const TURN_SPEED = 0.02;

var player_x = 0;
var player_y = 100;
var player_z = 0;
var player_phi = 0;
var up_down_angle = 0;

var forward = false;
var backward = false;
var left = false;
var right = false;

var pan_up = false;
var pan_down = false;
var pan_left = false;
var pan_right = false;


function paintScreen() {
    ctx.fillStyle = BACKGROUND_COLOR;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    renderShapes();
}

function updatePlayer() {
    if (forward) {
        player_x += Math.cos(player_phi) * WALK_SPEED;
        player_z += Math.sin(player_phi) * WALK_SPEED;
    }
    if (backward) {
        player_x -= Math.cos(player_phi) * WALK_SPEED;
        player_z -= Math.sin(player_phi) * WALK_SPEED;
    }
    if (left) {
        player_x += Math.sin(player_phi) * WALK_SPEED;
        player_z -= Math.cos(player_phi) * WALK_SPEED;
    }
    if (right) {
        player_x -= Math.sin(player_phi) * WALK_SPEED;
        player_z += Math.cos(player_phi) * WALK_SPEED;

    }
    if (pan_up && up_down_angle < 1.5) {
        up_down_angle += TURN_SPEED;
    }
    if (pan_down && up_down_angle > -1.5) {
        up_down_angle -= TURN_SPEED;
    }
    if (pan_left) {
        player_phi -= TURN_SPEED;
    }
    if (pan_right) {
        player_phi += TURN_SPEED;
    }

    if (player_phi > Math.PI * 2) player_phi -= Math.PI * 2;
    if (player_phi < - Math.PI * 2) player_phi += Math.PI * 2;
}

function frame() {
    updatePlayer();
    paintScreen();
}

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
setInterval(frame, 50);