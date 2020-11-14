console.log('Hello javaScript!');

$(document).ready(onReady);

// empty variable to push input information and button operators into an object to send to server side
let expression = {
    num1: null,
    num2: null,
    operator: null
}

function onReady() {
    console.log('Hello jQuery!');
    // click handler functions to decipher which operator button is pressed
    $('#add').on('click', function() {expression.operator = '/add'}); 
    $('#subtract').on('click', function() {expression.operator = '/subtract'});
    $('#multiply').on('click', function() {expression.operator = '/multiply'});
    $('#divide').on('click', function() {expression.operator = '/divide'});
    //$('#calculatorBox').on('click', whichButton);
    $('#clear').on('click', doClear); // clear button clears inputs when pressed
    $('#equals').on('click', doMath); // when pressed sends the input info and operators to the server side
    returnMath(); // renders the information to the DOM so it does not go away on refresh
    //whichButton();
} // end onReady function

/*$(window).on("load", function () {
    console.log('hello from jq');
    // add a listeneer to all buttons
    $('.numpad').on('click', whichButton);
});*/

// John's suggestion for which one was clicked on
/*function whichButton() {
    let buttonId = $(this).text();
    console.log(buttonId);
    $('#calculatorBox').val(function() {
        //$('#numsThusFar').append(`${this.value} + ${buttonId}`)
        //return this.value + '' + buttonId;
    })
        switch(buttonId) {
            case '+':
                doAdding();
                break;
            case '-':
                doSubtracting();
                break;
            case '*':
                doMultiplying();
                break;
            case '/':
                doDividing();
                break;
        }
}*/

function doMath() {

    expression.num1 = $('#numsToMath').val(); // input values are made into variables
    expression.num2 = $('#numsThusFar').val();

    $.ajax({
        method: 'POST',
        url: '/calculator',
        data: expression // the expression object is sent to the server side
    }).then( function(response) {
        console.log('Math happened!');
        returnMath(); // calls this function to 
    }).catch( function(error) {
        console.log('Error', error);
        alert('OOPS! There is an ERROR!');
    })
} // end doMath function

function returnMath() {

    $.ajax({
        method: 'GET',
        url: '/calculator'
    }).then( function(response) { // retrieves the mathData from the server side
        console.log('Numbers have been calculated', response)
        renderMath(response); // need to pass in the response information here so we can render it to the DOM
    }).catch( function(error) {
        console.log('Error', error);
        alert('OOPS! There is an ERROR!');
    })
} // end returnMath function

function doClear() { // clears the input fields
    $('#numsToMath').val('');
    $('#numsThusFar').val(''); 
} // end doClear function

function renderMath(mathData) {
    $('#showTheMath').empty(); // empty the ul so that the already stored data doesn't reiterate
    // conditionals to change the /operators to actual operator signs
    for (let item of mathData) {
        if (item.operator == '/add') {
            item.operator = '+';
        } else if (item.operator == '/subtract') {
            item.operator = '-';
        } else if (item.operator == '/multiply') {
            item.operator = '*';
        } else if (item.operator == '/divide') {
            item.operator = '/';
        }
    // appends the new equation to the DOM
        $('#showTheMath').append(`<li>${item.num1} ${item.operator} ${item.num2} = ${item.result}</li>`);
        $('#answer').empty(); // clears the previous equation's answer
        $('#answer').append(`${item.result}`); // puts the most recent equation's answer onto the DOM
    } // end for loop
} // end renderMath function 
