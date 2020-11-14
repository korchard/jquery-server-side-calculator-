
const express = require('express'); // calling in express

const bodyParser = require('body-parser'); // parse incoming data

const app = express(); // instance of the express server

const port = 5000; // server mailbox

// Tell express where to find static files that it can send on request
app.use( express.static('server/public') );

// Tell's express how to deal with incoming data
app.use( bodyParser.urlencoded( {extended: true} ) );

let calculatorArray = []; // array to hold the object information while doing operations on server side

// route to send info to client-side
app.get('/calculator', (req, res) => {
    console.log('Sending equation data...');
    let mathData = []; //array to push an object into to send back to client side
    
    for (objects of calculatorArray) {
        let result = 0; // used for the equation
        // conditional to determin which operator is used and how to work with the numbers
        if (objects.operator == '/add') { 
            result = Number(objects.num1) + Number(objects.num2);
            objects.operator = '+';
        } else if (objects.operator == '/subtract') {
            result = Number(objects.num1) - Number(objects.num2);
            objects.operator = '-';
        } else if (objects.operator == '/multiply') {
            result = Number(objects.num1) * Number(objects.num2);
            objects.operator = '*';
        } else if (objects.operator == '/divide') {
            result = Number(objects.num1) / Number(objects.num2);
            objects.operator = '/';
        } // end conditionals
            mathData.push({ // object of information that is sent back to the client side
                num1: objects.num1,
                num2: objects.num2,
                operator: objects.operator,
                result: result
        })
    } // end for loop
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