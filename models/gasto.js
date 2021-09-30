const Model = require('./model');

class Gasto extends Model {

    constructor (uuid, nameBackup) {
        super(uuid, nameBackup)
    }

    newExpense(roommate, descripcion, monto) {
        return {
            id: this.uuid().slice(0, 6),
            roommate,
            descripcion,
            monto
        };
    };

}

module.exports = Gasto;