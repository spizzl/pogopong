class Player {
    constructor(id, x) {
        this.id = id;
        this.x = x || 0;
    }
    //
    updateValues(x) {
        this.x = x;
    }
    //
    getValues() {
        var data = {
            id: this.id,
            x: this.x
        }
        return data;
    }
}
//
module.exports = Player