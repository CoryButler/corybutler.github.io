export default function Menu_MazeSettings (parent, settings) {
    const mazeSettings = document.createElement("div");
    const inputWidth = document.createElement("input");
    const inputHeight = document.createElement("input");
    const inputSeed = document.createElement("input");
    const checkbox_animate = document.createElement("input");
    const checkbox_useSeed = document.createElement("input");
    const label_inputWidth = document.createElement("label");
    const label_inputHeight = document.createElement("label");
    const label_inputSeed = document.createElement("label");
    const label_checkbox_animate = document.createElement("label");
    const label_checkbox_useSeed = document.createElement("label");
    let width = settings.width;
    let height = settings.height;
    let seed = settings.seed;
    let animate = settings.animate;
    let useSeed = settings.useSeed

    this.width = () => { return width; }
    this.height = () => { return height; }
    this.seed = () => { return seed; }
    this.useSeed = () => { return useSeed; }
    this.animate = () => { return animate; }
    this.displayRandomSeed = (s) => { seed = s; inputSeed.value = s; }

    mazeSettings.style = "border: 1px solid grey; border-radius: 4px; padding: 8px; float: right; margin-bottom: 8px";

    inputWidth.style =  "float: right; width: 64px; margin-left: 16px";
    inputWidth.type = "number";
    inputWidth.min = 2;
    inputWidth.max = 200;
    inputWidth.value = settings.width;
    inputWidth.onkeypress = (e) => { let num = parseInt(e.key); if (isNaN(num) || num < 0 && num > 9) return false; width = inputWidth.value; }
    inputWidth.oninput = () => { width = inputWidth.value; }

    inputHeight.style = "float: right; width: 64px; margin-left: 16px";
    inputHeight.type = "number";
    inputHeight.min = 2;
    inputHeight.max = 200;
    inputHeight.value = settings.height;
    inputHeight.onkeypress = (e) => { let num = parseInt(e.key); if (isNaN(num) || num < 0 && num > 9) return false; height = inputHeight.value; }
    inputHeight.oninput = () => { height = inputHeight.value; }

    inputSeed.style = "float: right; width: 64px; margin-left: 16px";
    inputSeed.type = "number";
    inputSeed.min = 0;
    inputSeed.max = 2147483647;
    inputSeed.value = settings.seed;
    inputSeed.onkeypress = (e) => { let num = parseInt(e.key); if (isNaN(num) || num < 0 && num > 9) return false; seed = inputSeed.value; }
    inputSeed.oninput = () => { seed = inputSeed.value; }

    label_inputWidth.for = inputWidth.id;
    label_inputWidth.innerHTML = "Width (in cells)";

    label_inputHeight.for = inputHeight.id;
    label_inputHeight.innerHTML = "Height (in cells)";
    
    label_inputSeed.for = inputSeed.id;
    label_inputSeed.innerHTML = "Seed";

    label_checkbox_animate.for = checkbox_animate.id;
    label_checkbox_animate.innerHTML = "Animate maze creation";

    label_checkbox_useSeed.for = checkbox_useSeed.id;
    label_checkbox_useSeed.innerHTML = "Use Seed";

    checkbox_animate.type = "checkbox";
    checkbox_animate.id = "animateMazeCreation";
    checkbox_animate.checked = settings.animate;
    checkbox_animate.onchange = () => { animate = !animate; }

    checkbox_useSeed.type = "checkbox";
    checkbox_useSeed.id = "useSeed";
    checkbox_useSeed.checked = settings.useSeed;
    checkbox_useSeed.onchange = () => { useSeed = !useSeed; }

    mazeSettings.appendChild(label_inputWidth);
    mazeSettings.appendChild(inputWidth);
    mazeSettings.appendChild(document.createElement("br"));
    mazeSettings.appendChild(document.createElement("br"));
    mazeSettings.appendChild(label_inputHeight);
    mazeSettings.appendChild(inputHeight);
    mazeSettings.appendChild(document.createElement("br"));
    mazeSettings.appendChild(document.createElement("br"));
    mazeSettings.appendChild(label_checkbox_useSeed);
    mazeSettings.appendChild(checkbox_useSeed);
    mazeSettings.appendChild(document.createElement("br"));
    mazeSettings.appendChild(document.createElement("br"));
    mazeSettings.appendChild(label_inputSeed);
    mazeSettings.appendChild(inputSeed);
    mazeSettings.appendChild(document.createElement("br"));
    mazeSettings.appendChild(document.createElement("br"));
    mazeSettings.appendChild(label_checkbox_animate);
    mazeSettings.appendChild(checkbox_animate);
    parent.appendChild(mazeSettings);
}