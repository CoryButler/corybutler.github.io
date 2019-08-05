let variables = [];

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

let translator = new Translator();

/*
5 a 3
5 b 4
2 a a
2 b b
5 c a
0 c b
7 c
8 c
*/