const mysql = require('mysql2'); // create connection  
const db = mysql.createConnection({  
    host: 'localhost', 
    port: 3307, 
    user: 'root',  
    password: '',  
    database: 'online_shop'  
});  
// connect  
db.connect((err) => {  
    if (err) {  
        console.error('Database connection failed:', err);  
        return;  
    }  
    console.log('Connected to MySQL');  
});  
module.exports = db.promise();