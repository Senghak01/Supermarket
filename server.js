require('dotenv').config();
const express = require('express'); 
const db = require('./db');  
const ip = require('ip'); 
const app = express(); 
const signin = require('./signin');
const signup = require('./signup');
app.use(express.json()); 
app.use('/', signin);
app.use('/', signup);

// Start the server 
const PORT = 3000; 
const HOST = ip.address(); 
app.listen(PORT, HOST, () => { 
    console.log(`Server running on http://${HOST}:${PORT}`); 
});