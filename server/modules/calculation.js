
module.exports = () => {
    let mathData = []; //array to push an object into to send back to client side
    for (objects of calculatorArray) {
        let result = 0; // used for the equation
        // conditional to determin which operator is used and how to work with the numbers
        if (objects.operator == '/add') { 
            objects.operator = '+';
            result = Number(objects.num1) + Number(objects.num2);
        } else if (objects.operator == '/subtract') {
            objects.operator = '-';
            result = Number(objects.num1) - Number(objects.num2);
        } else if (objects.operator == '/multiply') {
            objects.operator = '*';
            result = Number(objects.num1) * Number(objects.num2);
        } else if (objects.operator == '/divide') {
            objects.operator = '/';
            result = Number(objects.num1) / Number(objects.num2);
        } // end conditionals
            //mathData.result = result;
            mathData.push({ // object of information that is sent back to the client side
                num1: objects.num1,
                num2: objects.num2,
                operator: objects.operator,
                result: result
        })
    } // end for loop
} // end function 