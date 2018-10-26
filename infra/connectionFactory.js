var mysql = require('mysql');
function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'casadocodigo'
    });
};

//wrapper
module.exports = () =>{
    return createDBConnection;
};