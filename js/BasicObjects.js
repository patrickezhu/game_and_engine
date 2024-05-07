class Line {
    constructor(ax, ay, az, bx, by, bz) {
        this.aX = ax;
        this.aY = ay;
        this.aZ = az;
        this.bX = bx;
        this.bY = by;
        this.bZ = bz;
    }

    render() {
        ctx.strokeStyle = LINE_COLOR;
        ctx.lineWidth = 2;

        var a_translated = translate(this.aX, this.aY, this.aZ);
        var b_translated = translate(this.bX, this.bY, this.bZ);
    
        if (!a_translated[2] && !b_translated[2]) return;
    
        // if ( i think this makes it so really long lines wont render, which isnt intended
        //     (a_translated[0] > canvas.width || a_translated[0] < 0 ||
        //     a_translated[1] > canvas.height || a_translated[1] < 0) &&
        //     (b_translated[0] > canvas.width || b_translated[0] < 0 ||
        //     b_translated[1] > canvas.height || b_translated[1] < 0)
        // ) return;
    
        ctx.beginPath();
        ctx.moveTo(a_translated[0], a_translated[1]);
        ctx.lineTo(b_translated[0], b_translated[1]);
        ctx.stroke();
    }

    distFromPlayer() {
        var diffaX = this.aX - player_x;
        var diffaY = this.aY - player_y;
        var diffaZ = this.aZ - player_z;
        var diffbX = this.bX - player_x;
        var diffbY = this.bY - player_y;
        var diffbZ = this.bZ - player_z;

        return Math.min(
            Math.sqrt(diffaX*diffaX + diffaY*diffaY + diffaZ*diffaZ),
            Math.sqrt(diffbX*diffbX + diffbY*diffbY + diffbZ*diffbZ)
        )
    }
}

class Simple3DRectangle { // has 1 constant axis
    constructor(ax, ay, az, bx, by, bz, facingPos) {
        this.aX = ax;
        this.aY = ay;
        this.aZ = az;
        this.bX = bx;
        this.bY = by;
        this.bZ = bz;

        if (ax == bx) {
            if (facingPos) {
                this.directional_vec = [1, 0, 0];
            } else {
                this.directional_vec = [-1, 0, 0];
            }
            this.const_axis = 'x';
        } else if (ay == by) {
            if (facingPos) {
                this.directional_vec = [0, 1, 0];
            } else {
                this.directional_vec = [0, -1, 0];
            }
            this.const_axis = 'y';
        } else if (az == bz) {
            if (facingPos) {
                this.directional_vec = [0, 0, 1];
            } else {
                this.directional_vec = [0, 0, -1];
            }
            this.const_axis = 'z';
        } else {
            throw new Error('SimpleRectangle declared without sharing constant axis');
        }
    }

    render() {
        if (angleBetween3DVectors(
            this.directional_vec,
            playerVec()
        ) < Math.PI * 1/3) return;

        ctx.strokeStyle = LINE_COLOR;
        ctx.lineWidth = 2;

        var a_translated = translate(this.aX, this.aY, this.aZ);
        var b_translated = translate(this.bX, this.bY, this.bZ);
        var c_translated = [];
        var d_translated = [];

        switch (this.const_axis) {
            case 'x':
                c_translated = translate(this.aX, this.bY, this.aZ);
                d_translated = translate(this.aX, this.aY, this.bZ);
                break;
            case 'y':
                c_translated = translate(this.aX, this.aY, this.bZ);
                d_translated = translate(this.bX, this.aY, this.aZ);
                break;
            case 'z':
                c_translated = translate(this.aX, this.bY, this.aZ);
                d_translated = translate(this.bX, this.aY, this.bZ);
                break;
        }

        if (!a_translated[2] && !b_translated[2] && !c_translated[2] && !d_translated[2]) return;

        ctx.beginPath();
        ctx.moveTo(a_translated[0], a_translated[1]);
        ctx.lineTo(c_translated[0], c_translated[1]);
        ctx.lineTo(b_translated[0], b_translated[1]);
        ctx.lineTo(d_translated[0], d_translated[1]);

        ctx.closePath();
        // ctx.strokeStyle = 'white';

        // if (this.const_axis == 'x') ctx.fillStyle = 'red';
        // if (this.const_axis == 'y') ctx.fillStyle = 'green';
        // if (this.const_axis == 'z') ctx.fillStyle = 'blue';


        if (this.directional_vec[0] === 1 && this.directional_vec[1] === 0 && this.directional_vec[2] === 0) {
            ctx.fillStyle = '#ff564a'; ctx.strokeStyle = '#ff564a';
        }
        if (this.directional_vec[0] === -1 && this.directional_vec[1] === 0 && this.directional_vec[2] === 0) {
            ctx.fillStyle = '#870900'; ctx.strokeStyle = '#870900';
        }
        if (this.directional_vec[0] === 0 && this.directional_vec[1] === 1 && this.directional_vec[2] === 0) {
            ctx.fillStyle = '#7dff7f'; ctx.strokeStyle = '#7dff7f';
        }
        if (this.directional_vec[0] === 0 && this.directional_vec[1] === -1 && this.directional_vec[2] === 0) {
            ctx.fillStyle = '#004d01'; ctx.strokeStyle = '#004d01';
        }
        if (this.directional_vec[0] === 0 && this.directional_vec[1] === 0 && this.directional_vec[2] === 1) {
            ctx.fillStyle = '#82c1ff'; ctx.strokeStyle = '#82c1ff';
        }
        if (this.directional_vec[0] === 0 && this.directional_vec[1] === 0 && this.directional_vec[2] === -1) {
            ctx.fillStyle = '#003263'; ctx.strokeStyle = '#003263';
        }

        ctx.fill();
        ctx.stroke();
    }

    distFromPlayer() {
        var diffaX = this.aX - player_x;
        var diffaY = this.aY - player_y;
        var diffaZ = this.aZ - player_z;
        var diffbX = this.bX - player_x;
        var diffbY = this.bY - player_y;
        var diffbZ = this.bZ - player_z;

        switch (this.const_axis) {
            case 'x':
                return Math.max(
                    Math.sqrt(diffaX*diffaX + diffaY*diffaY + diffaZ*diffaZ),
                    Math.sqrt(diffbX*diffbX + diffbY*diffbY + diffbZ*diffbZ),
                    Math.sqrt(diffaX*diffaX + diffaY*diffaY + diffbZ*diffbZ),
                    Math.sqrt(diffbX*diffbX + diffbY*diffbY + diffaZ*diffaZ)
                )
            case 'y':
                return Math.max(
                    Math.sqrt(diffaX*diffaX + diffaY*diffaY + diffaZ*diffaZ),
                    Math.sqrt(diffbX*diffbX + diffbY*diffbY + diffbZ*diffbZ),
                    Math.sqrt(diffaX*diffaX + diffaY*diffaY + diffbZ*diffbZ),
                    Math.sqrt(diffbX*diffbX + diffbY*diffbY + diffaZ*diffaZ)
                )
            case 'z':
                return Math.max(
                    Math.sqrt(diffaX*diffaX + diffaY*diffaY + diffaZ*diffaZ),
                    Math.sqrt(diffbX*diffbX + diffbY*diffbY + diffbZ*diffbZ),
                    Math.sqrt(diffaX*diffaX + diffbY*diffbY + diffaZ*diffaZ),
                    Math.sqrt(diffbX*diffbX + diffaY*diffaY + diffbZ*diffbZ)
                )
        }
    }
} 

function drawSimpleRectangularPrism(point1, point2) {
    var aX = point1[0];
    var aY = point1[1];
    var aZ = point1[2];
    var bX = point2[0];
    var bY = point2[1];
    var bZ = point2[2];

    var face1 = new Simple3DRectangle(aX, aY, aZ, aX, bY, bZ, aX > bX);
    var face2 = new Simple3DRectangle(bX, aY, aZ, bX, bY, bZ, aX < bX);

    var face3 = new Simple3DRectangle(aX, aY, aZ, bX, aY, bZ, aY > bY);
    var face4 = new Simple3DRectangle(aX, bY, aZ, bX, bY, bZ, aY < bY);

    var face5 = new Simple3DRectangle(aX, aY, aZ, bX, bY, aZ, aZ > bZ);
    var face6 = new Simple3DRectangle(aX, aY, bZ, bX, bY, bZ, aZ < bZ);

    objects.push(face1);
    objects.push(face2);
    objects.push(face3);
    objects.push(face4);
    objects.push(face5);
    objects.push(face6);
}