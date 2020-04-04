class PuckHandler {
    constructor(w, h) {
        this.width = w
        this.height = this.width
        const {
            sin,
            cos,
            random,
            map
        } = require('mathjs')
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
        this.puck.update()
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
        const {
            sin,
            cos,
            map
        } = require('mathjs')
        if (this.puck.y - this.puck.r < p.y + p.h / 2 //
            && this.puck.y + this.puck.r > p.y - p.h / 2 //
            && (this.puck.x - this.puck.r < p.x + p.w / 2 || this.puck.x + this.puck.r > p.x - p.w / 2)) {
            if (this.puck.x > p.x) {
                let diff = this.puck.y - (p.y - p.h / 2);
                let rad = 0.7853981;
                //dumb numbers are degrees as radians values
                let angle = map(diff, 0, p.h, -rad, rad);
                this.puck.xspeed = 5 * cos(angle);
                this.puck.yspeed = 5 * sin(angle);
                this.puck.x = p.x + p.w / 2 + this.puck.r;
            }
            if (this.puck.x < p.x) {
                let diff = this.y - (p.y - p.h / 2);
                let angle = map(diff, 0, p.h, 4.4505895, 2.3561944);
                //dumb numbers are degrees as radians values
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
        this.x = this.width / 2;
        this.y = this.height / 2;
        this.xspeed = 0;
        this.yspeed = 0;
        this.r = 12;
    }
    start() {
        const {
            sin,
            cos,
            random,
            pi
        } = require('mathjs')
        let angle = random(-pi / 4, pi / 4);
        this.xspeed = 5 * cos(angle);
        this.yspeed = 5 * sin(angle);
        if (random() < 0.5) {
            this.xspeed *= -1;
        }
    }
    update() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    }
    checkGoal(g) {
        /*var g = {
            x: 999,
            y: 999,
            w: 100,
            h: 100
        }*/
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
    }
}
//
module.exports = PuckHandler