
const express = require('express'); // calling in express

const bodyParser = require('body-parser'); // parse incoming data

const app = express(); // instance of the express server

const port = 5000; // server mailbox

// Tell express where to find static files that it can send on request
app.use( express.static('server/public') );

// Tell's express how to deal with incoming data
app.use( bodyParser.urlencoded( {extended: true} ) );

//const mathCalc = require('./modules/calculation');
let calculatorArray = []; // array to hold the object information while doing operations on server side
let result = 0;

// route to send info to client-side
app.get('/calculator', (req, res) => {
    console.log('Sending equation data...');
    let mathData = []; //array to push an object into to send back to client side
    
    for (objects of calculatorArray) {
        // conditional to determin which operator is used and how to work with the numbers
        if (objects.operator == '+') { 
            result = Number(objects.num1) + Number(objects.num2);
        } else if (objects.operator == '-') {
            result = Number(objects.num1) - Number(objects.num2);
        } else if (objects.operator == '*') {
            result = Number(objects.num1) * Number(objects.num2);
        } else if (objects.operator == '/') {
            result = Number(objects.num1) / Number(objects.num2);
        } // end conditionals
            mathData.push({ // object of information that is sent back to the client side
                num1: objects.num1,
                num2: objects.num2,
                operator: objects.operator,
                result: result 
            })
        }
    res.send(mathData);
})

// route receiving info from client-side
app.post('/calculator', (req, res) => {
    let calcData = req.body // push the expression information into the global array on server side
    calculatorArray.push(calcData);
    res.sendStatus(200); // 200 is an OK status
})

// ---- End of our routes ------------------------------------

// Tell our server to start listening for requests on our port
app.listen( port, () => {
    console.log(`Server is listening on port ${port}...`);
})