
const express = require('express'); // calling in express

const bodyParser = require('body-parser'); // parse incoming data

const app = express(); // instance of the express server

const port = 5000; // server mailbox

// Tell express where to find static files that it can send on request
app.use( express.static('server/public') );

// Tell's express how to deal with incoming data
app.use( bodyParser.urlencoded( {extended: true} ) );

let mathData = [];

// route to GET
app.get('/calculator', (req, res) => {
    console.log('Sending equation data...');
    res.send(mathData);
})

app.post('/calculator', (req, res) => {
    let numeroUno = req.body.num1; // value input from client.js
    let numeroDos = req.body.num2; // value input from client.js
    console.log('Getting mathematics data...', numeroUno, numeroDos);
    
    mathData.push(numeroUno);
    mathData.push(numeroDos);
    res.sendStatus(200); // 200 is an OK status
})

// ---- End of our routes ------------------------------------

// Tell our server to start listening for requests on our port
app.listen( port, () => {
    console.log(`Server is listening on port ${port}...`);
})