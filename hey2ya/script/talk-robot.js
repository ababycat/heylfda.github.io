// var url = 'http://www.tuling123.com/openapi/api';
// parms = {
//     'key' : '891c3b602b85424ebca432794c431f8d',
//     'info' : cmd,
//     'userid' : '123456'
// };

function displayDate() {
    document.getElementById("demo").innerHTML = Date();
}

function sendData() {
    var input = document.getElementById("input").value;
    if (input != "" & input != "\n") {
        document.getElementById("output").value += input;
    };
    clearInput();
}

function clearOutput() {
    document.getElementById("output").value = "";
}

function clearInput() {
    document.getElementById("input").value = "";
}

function keyPressed(event) {
    var event = event || window.event;
    document.getElementById("demo").innerHTML = event.keyCode;
    if (event.keyCode == 13) {
        sendData();
    }
}