let variables = [];

const functions = {
    "+": (a, b) => { return add(a, b); },
    "-": (a, b) => { return subtract(a, b); },
    "*": (a, b) => { return multiply(a, b); },
    "/": (a, b) => { return divide(a, b); },
    "%": (a, b) => { return modulo(a, b); },
    "@": (a, b) => { return define(a, b); },
    "=": (a, b) => { return assign(a, b); },
    "_": (a, b) => { return squareRoot(a); },
    "<": (a, b) => { return log(a); },
    ">": (a, b) => { return customFunction(a, b)}
}

let functionOperations = {}

function add (a, b) {
    let val_a = !isNaN(parseFloat(a)) ? a : getValue(a);
    let val_b = !isNaN(parseFloat(b)) ? b : getValue(b);
    let r = val_a + val_b;
    return assign(a, r);
}

function subtract (a, b) {
    let val_a = !isNaN(parseFloat(a)) ? a : getValue(a);
    let val_b = !isNaN(parseFloat(b)) ? b : getValue(b);
    let r = val_a - val_b;
    return assign(a, r);
}

function multiply (a, b) {
    let val_a = !isNaN(parseFloat(a)) ? a : getValue(a);
    let val_b = !isNaN(parseFloat(b)) ? b : getValue(b);
    let r = val_a * val_b;
    return assign(a, r);
}

function divide (a, b) {
    let val_a = !isNaN(parseFloat(a)) ? a : getValue(a);
    let val_b = !isNaN(parseFloat(b)) ? b : getValue(b);
    let r = val_a / val_b;
    return assign(a, r);
}

function modulo (a, b) {
    let val_a = !isNaN(parseFloat(a)) ? a : getValue(a);
    let val_b = !isNaN(parseFloat(b)) ? b : getValue(b);
    let r = ((val_b % val_a) + val_a) % val_a;
    return assign(a, r);
}

function define (a, b) {
    let val_b = !isNaN(parseFloat(b)) ? b : getValue(b);
    if (getValue(a) !== undefined) 
        return "ERROR: '" + a + "' is already defined.";
    variables.push({ key: a, value: val_b });
    return variables[variables.length - 1].value;
}

function assign (a, b) {
    let val_b = !isNaN(parseFloat(b)) ? b : getValue(b);
    variables.forEach(v => {
        if (v.key === a) v.value = val_b;
    });
    return b;
}

function squareRoot (a) {
    let val_a = !isNaN(parseFloat(a)) ? a : getValue(a);
    let r = Math.sqrt(val_a);
    return assign(a, r);
}

function log (a) {
    let val_a = !isNaN(parseFloat(a)) ? a : getValue(a);
    if (val_a === undefined) val_a = a;
    document.getElementById("log").value += val_a + "\n";
    return val_a;
}

function getValue (a) {
    let value;
    variables.forEach(v => {
        if (v.key === a) value = v.value;
    });
    return value;
}

function customFunction (a, b) {
    if (getValue(a) !== undefined) return "Function name must be unique."
    
    let operations = b;
    operations = operations.split("\n").join("").split("~").join(" ").split(",");

    functions[a] = (x, y) => {
        operations.forEach(operation => {
            x = translator.exe(operation.replaceAll("#0", x).replaceAll("#1", y).split(" "));
        });
        let r = x;
        return assign(x, r);
    };
    
    return "New function '" + a + "' created.";
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

let translator = new Translator();

/*
5 a 3
5 b 4
2 a a
2 b b
5 c a
0 c b
7 c

= getHyp a b
{
* a a
* b b
= c a
+ c b
_ c
}

< getHyp 3 4

int a 3;
int b 4;
int c sqrt sq a sq b;

def a
set a 3
def b
set a 4
def c
set 

*/