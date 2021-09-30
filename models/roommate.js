const Model = require('./model');

class Roommate extends Model {

    constructor (uuid, nameBackup, request) {
        super(uuid, nameBackup)
        this.request = request

        this.leerBackup();
    };

    async newRoommate() {
        try {
            
            const response = await this.request.get('https://randomuser.me/api');
            const { first: name, last: lastName } = response.data.results[0].name
            return {
                id: this.uuid().slice(0, 6),
                nombre: `${ name } ${ lastName }`,
                debe: 0,
                recibe: 0
            };
    
        } catch (error) {
    
            console.log(error);
    
        }
    };

}

module.exports = Roommate;