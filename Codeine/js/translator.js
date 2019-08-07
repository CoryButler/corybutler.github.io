function Translator () {
    this.translate = () => {
        variables = [];
        document.getElementById("log").value = "";
        let code = document.getElementById("code").value;
        let statements = code.split("\n").join("").split(";");
        let length = statements.length
        let toRemove = [];
        
        for (let i = 0; i < length; i++) {
            let lookAt = 1;
            while (statements[i].includes("{") && !statements[i].includes("}")) {
                statements[i] += "," + statements[i + lookAt];
                toRemove.push(i + lookAt);
                lookAt++;
            }

            if (statements[i].includes("{") && statements[i].includes("}")) {
                let f = statements[i].substring(statements[i].indexOf("{") + 1, statements[i].indexOf("}") - 1);
                f = " " + f.replaceAll(" ", "~");
                statements[i] = statements[i].substring(0, statements[i].indexOf("{") - 1) + f;
            }
        }

        length = toRemove.length;
        for (let i = length - 1; i >= 0; i--) {
            statements.splice(toRemove[i], 1);
        }

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
        let f = elements[0];
        let a = !isNaN(parseFloat(elements[1])) ? parseFloat(elements[1]) : elements[1];
        let b = !isNaN(parseFloat(elements[2])) ? parseFloat(elements[2]) : elements[2];
        if (f !== "") {
            let r = functions[f](a, b);
            console.log(r);
            return r;
        }
    }

    this.exe = (elements) => {
        return execute(elements);
    }
}