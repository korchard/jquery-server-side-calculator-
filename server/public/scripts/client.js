console.log('Hello javaScript!');

$(document).ready(onReady);

let expression = {
    num1: null,
    num2: null,
    operator: null
}

function onReady() {
    console.log('Hello jQuery!');
    $('#add').on('click', function() {expression.operator = '/add'});
    $('#subtract').on('click', function() {expression.operator = '/subtract'});
    $('#multiply').on('click', function() {expression.operator = '/multiply'});
    $('#divide').on('click', function() {expression.operator = '/divide'});
    //$('#calculatorBox').on('click', whichButton);
    $('#clear').on('click', doClear);
    $('#equals').on('click', doMath);
    returnMath();
    //whichButton();
}

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

    expression.num1 = $('#numsToMath').val();
    expression.num2 = $('#numsThusFar').val();

    $.ajax({
        method: 'POST',
        url: '/calculator',
        data: expression
    }).then( function(response) {
        console.log('Math happened!');
        returnMath();
    }).catch( function(error) {
        console.log('Error', error);
        alert('OOPS! There is an ERROR!');
    })
}

function returnMath() {

    $.ajax({
        method: 'GET',
        url: '/calculator'
    }).then( function(response) {
        console.log('Numbers have been calculated', response)
        renderMath(response);
    }).catch( function(error) {
        console.log('Error', error);
        alert('OOPS! There is an ERROR!');
    })
}

function doClear() {
    $('#numsToMath').val('');
    $('#numsThusFar').val(''); // clear calculations
}

function renderMath(mathData) {
    $('#showTheMath').empty();

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

        $('#showTheMath').append(`<li>${item.num1} ${item.operator} ${item.num2} = ${item.result}</li>`);
        $('#answer').empty();
        $('#answer').append(`${item.result}`);
    } 
}
