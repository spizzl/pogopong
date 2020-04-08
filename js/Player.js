class Player {
    constructor(id, name, x) {
        this.id = id
        this.x = x || 0
        this.name = name
        this.h = 800 / 5
        this.w = this.h / 5
    }
    //
    updateValues(x, y) {
        this.x = x
        this.y = y
    }
    //
    getValues() {
        var data = {
            id: this.id,
            x: this.x,
            y: this.y
        }
        return data;
    }
}
//
module.exports = Player