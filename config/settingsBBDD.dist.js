
var settingsBBDD = {
    connections : {
        appBBDD  : {
            "dev": {
                "username": "",
                "password": "",
                "database": "",
                "host": "",
                "dialect": "mysql"
            },
            "test": {
                "username": "",
                "password": "",
                "database": "",
                "host": "",
                "dialect": "mysql"
            },
            "prod": {
                "username": "",
                "password": null,
                "database": "",
                "host": "",
                "dialect": "mysql"
            }
        }
    },
    getBBDDSettings : function(database,environment){
        if(database && this.connections[database]){
            if(environment && this.connections[database][environment]){
                return this.connections[database][environment];
            }else{
                return this.connections[database]['dev'];
            }
        }else{
            console.log('Database settings not found or database not set');
        }
    }
};
module.exports = settingsBBDD;


