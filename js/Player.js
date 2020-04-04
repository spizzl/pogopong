class Player {
    constructor(id, name, x) {
        this.id = id
        this.x = x || 0
        this.name = name
    }
    //
    updateValues(x) {
        this.x = x
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