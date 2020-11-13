console.log('Hello javaScript!');

$(document).ready(onReady);

function onReady() {
    console.log('Hello jQuery!');

    //$('#add').on('click', doAdding);
    //$('#subtract').on('click', doSubtracting);
    //$('#multiply').on('click', doMultiplication);
    //$('#divide').on('click', doDivide);
    $('#equals').on('click', doMath);
    $('#clear').on('click', doClear);
}

function doMath(event) {
    event.preventDefault();

    let value1 = $('#value1').val();
    let value2 = $('#value2').val();
    let add = ('#add').on('click', doAdding);
    let subtract = $('#subtract').on('click', doSubtracting);
    let multiply = $('#multiply').on('click', doMultiplication);
    let divide = $('#divide').on('click', doDivide);
  
    $.ajax({
        method: 'POST',
        url: '/calculator',
        data: {
            num1: value1,
            num2: value2
            
        }
    }).then( function(response) {
        console.log('Math happened!');
        //getCats();
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
        //renderCats(response);
    }).catch( function(error) {
        console.log('Error', error);
        alert('OOPS! There is an ERROR!');
    })
}

function doClear() {
    $('#value1').val(); // empty inputs
    $('#value2').val(); // empty inputs
}



