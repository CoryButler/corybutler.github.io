function Translator () {
    this.translate = () => {
        variables = [];
        document.getElementById("log").value = "";
        let code = document.getElementById("code").value;
        let statements = code.split("\n");
        console.log(statements);
        process(statements);
    }

    const process = (statements) => {
        statements.forEach(statement => {
            let elements = statement.split(" ");
            execute(elements);
        });
    }

    const execute = (elements) => {
        let r = "";
        let f = parseInt(elements[0]);
        let a = !isNaN(parseFloat(elements[1])) ? parseFloat(elements[1]) : elements[1];
        let b = !isNaN(parseFloat(elements[2])) ? parseFloat(elements[2]) : elements[2];
        
        switch (f) {
            case 0:
                r = add(a, b);
                break;
            case 1:
                r = subtract(a, b);
                break;
            case 2:
                r = multiply(a, b);
                break;
            case 3:
                r = divide(a, b);
                break;
            case 4:
                r = modulo(a, b);
                break;
            case 5:
                r = define(a, b);
                break;
            case 6:
                r = assign(a, b);
                break;
            case 7:
                r = squareRoot(a);
                break;
            case 8:
                r = log(a);
                break;
            default:
                r = "ERROR";
                break;
        }

        log(r);
    }
}