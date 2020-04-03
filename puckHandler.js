class PuckHandler {
    bla() {
        console.log("bla")
    }
    //
    spawnPuck() {
        this.puck = new Puck()
    }
    //
    startPuck() {
        this.puck.start()
    }
    //
    updatePuck() {
        puck.checkPaddleRight(right);
        puck.checkPaddleLeft(left);
        puck.update();
        puck.edges();
        puck.show();
    }
    //
    getPuck() {
        var data = {
            x: this.puck.x,
            y: this.puck.y
        }
        return data
    }
    //
    checkPuckCollision(p) {
        if (this.puck.y - this.puck.r < p.y + p.h / 2 //
            && this.puck.y + this.puck.r > p.y - p.h / 2 //
            && (this.puck.x - this.puck.r < p.x + p.w / 2 || this.puck.x + this.puck.r > p.x - p.w / 2)) {
            if (this.puck.x > p.x) {
                let diff = this.puck.y - (p.y - p.h / 2);
                let rad = radians(45);
                let angle = map(diff, 0, p.h, -rad, rad);
                this.puck.xspeed = 5 * cos(angle);
                this.puck.yspeed = 5 * sin(angle);
                this.puck.x = p.x + p.w / 2 + this.puck.r;
            }
            if (this.puck.x < p.x) {
                let diff = this.y - (p.y - p.h / 2);
                let angle = map(diff, 0, p.h, radians(225), radians(135));
                this.puck.xspeed = 5 * cos(angle);
                this.puck.yspeed = 5 * sin(angle);
                this.puck.x = p.x - p.w / 2 - this.puck.r;
            }
        }
    }
}
//
class Puck {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.xspeed = 0;
        this.yspeed = 0;
        this.r = 12;
    }
    start() {
        this.x = width / 2;
        this.y = height / 2;
        let angle = random(-PI / 4, PI / 4);
        this.xspeed = 5 * Math.cos(angle);
        this.yspeed = 5 * Math.sin(angle);
        if (random(1) < 0.5) {
            this.xspeed *= -1;
        }
    }
    update() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    }
    show() {
        fill(255);
        ellipse(this.x, this.y, this.r * 2);
    }
    checkGoal(GOOOLisisisis) {
        var g = {
            x: 999,
            y: 999,
            w: 100,
            h: 100
        }
        if (this.y - this.r < g.y + g.h / 2 //
            && this.y + this.r > g.y - g.h / 2 //
            && (this.x - this.r < g.x + g.w / 2 || this.x + this.r > g.x - g.w / 2)) {
            //
        }
    }
    checkEdges() {
        if (this.y < 0 || this.y > height) {
            this.yspeed *= -1;
        }
        if (this.x - this.r > width) {
            ding.play();
            leftscore++;
            this.reset();
        }
        if (this.x + this.r < 0) {
            ding.play();
            rightscore++;
            this.reset();
        }
    }
}
//
module.exports = PuckHandler