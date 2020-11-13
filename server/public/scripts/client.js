console.log('Hello javaScript!');

$(document).ready(onReady);

function onReady() {
    console.log('Hello jQuery!');

    $('#equals').on('click', doMath);
}
