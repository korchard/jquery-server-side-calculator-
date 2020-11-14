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
    $('.calc').on('click', notWorking); // to indicate the calculator doesn't work
    $('#clear').on('click', doClear); // clear button clears inputs when pressed
    $('#equals').on('click', doMath); // when pressed sends the input info and operators to the server side
    returnMath(); // renders the information to the DOM so it does not go away on refresh
} // end onReady function

function doMath() {

    expression.num1 = $('#numsToMath').val(); // input values are made into variables
    expression.num2 = $('#numsThusFar').val();

    $.ajax({
        method: 'POST',
        url: '/calculator',
        data: expression // the expression object is sent to the server side
    }).then( function(response) {
        console.log('Math happened!');
        returnMath(); // calls this function to then retrieve the mathData from server side
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
        renderAnswer(response);
    }).catch( function(error) {
        console.log('Error', error);
        alert('OOPS! There is an ERROR!');
    })
} // end returnMath function

function doClear() { // clears the input fields
    $('#numsToMath').val('');
    $('#numsThusFar').val(''); 
    $('#answer').empty();
} // end doClear function

function renderMath(mathData) {
    $('#showTheMath').empty(); // empty the ul so that the already stored data doesn't reiterate
    for (let item of mathData) {
    // appends the new equation to the DOM
        $('#showTheMath').append(`<li>${item.num1} ${item.operator} ${item.num2} = ${item.result}</li>`);
    } // end for loop
} // end renderMath function 

function notWorking() {
    alert('Calculator is broken...try the manual input below!');
} // end notWorking function

function renderAnswer(mathData) {
    for (let item of mathData) {
        $('#answer').empty(); // want it to empty the answer each time it loops through, so that it does't concatenate
        $('#answer').append(`${item.result}`);
    } // end for loop
    //$('#answer').append(`${mathData.result}`);
} // end renderAnswer function