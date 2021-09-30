class Server {

    constructor (server, port, cors) {
        this.app = server();
        this.port = port;
        this.cors = cors
        this.framework = server
        this.roommatePostPath = '/roommate';
        this.roommateGetPath = '/roommates';
        this.gastosGetPath = '/gastos'
        this.gastoPath = '/gasto'

        //Middlewares
        this.middlewares();

        //Routes of my app 
        this.routes();
    };

    middlewares(){
        //CORS
         this.app.use( this.cors() );

        //Reading and parsing the body
        this.app.use( this.framework.json() );

        //Public directory
        this.app.use( this.framework.static('public') );
    };

    routes(){
        this.app.use( this.roommatePostPath, require('../routes/roommates.routes') );
        this.app.use( this.roommateGetPath, require('../routes/roommates.routes') );
        this.app.use( this.gastoPath, require('../routes/gastos.routes') );
        this.app.use( this.gastosGetPath, require('../routes/gastos.routes') );
        //this.app.use( this.mailingPath, require('../routes/mailing.routes') );
    };

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    };

}

module.exports = Server;