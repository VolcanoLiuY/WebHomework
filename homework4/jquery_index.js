$(document).ready(calculator);
var theInput = '';
var result = '0';
function calculator() {
    $('button').click(function() {
        if(this.id == '=') {
            output();
        } else if (this.id == '←') {
            backward();
        } else if (this.id == "CE") {
            ce();
        } else {
            input(this);
        }
    });
}

function output() {
    try {
        result = eval(theInput);
        $('input').attr("value", result);
        theInput = result;
        result = '0';
    } catch (exception) {
        alert("WARNING");
        ce();
    }
}

function backward() {
    theInput = theInput.substring(0, theInput.length-1);
    result = theInput;
    $('input').attr("value", result);
}

function ce() {
    result = '0';
    theInput = '';
    $('input').attr("value", result);
}

function input(that) {
    if (!isFull()) {
        theInput = theInput + that.id;
        $('input').attr("value", theInput);
    }
}

function isFull() {
    if (theInput.length > 16 ) {
        return true;
    }
    return false;
}
