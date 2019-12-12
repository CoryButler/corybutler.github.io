import { aiTypes, playerColors, aiSpeeds } from "../global.js";

export default function PlayerButton (player, parent) {
    const selected_color = playerColors.indexOf(player.color);
    const selected_speed = player.speed;
    const selected_controls = player.controls;
    
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const dropdown_color = document.createElement("select");
    const dropdown_speed = document.createElement("select");
    const controlScheme = document.createElement("p");
    let isChecked = player.isChecked;
    let type = player.type;
    let speed = player.speed;
    let color = player.color;

    this.isChecked = () => { return isChecked; }
    this.type = () => { return type; }
    this.speed = () => { return speed; }
    this.color = () => { return color; }

    checkbox.type = "checkbox";
    checkbox.id = "checkbox_" + type;
    checkbox.checked = isChecked;
    checkbox.oninput = () => { isChecked = !isChecked; }

    dropdown_color.id = "select_" + color;
    dropdown_color.style = "margin: 0px 16px; float: right";

    dropdown_speed.id = "select_" + speed;
    dropdown_speed.style = "margin: 0px 16px; float: right";

    controlScheme.id = "controls";
    controlScheme.style = "margin: 0px 16px; float: right";
    controlScheme.innerHTML = selected_controls;

    label.for = dropdown_color.id;
    label.style = "font-size: 0.8em";
    for (let key in aiTypes) { if (aiTypes[key] === type) label.innerHTML = key; }

    for (let i = 0; i < playerColors.length; i++) {
        const option = document.createElement("option");
        option.value = playerColors[i];
        option.style = "background-color: " + playerColors[i].replace("green", "#00CC00").replace("pink", "#FF3399");
        option.innerHTML = playerColors[i];
        option.selected = selected_color === i;
        dropdown_color.appendChild(option);
    }

    for (let i in aiSpeeds) {
        const option = document.createElement("option");
        option.value = aiSpeeds[i];
        option.innerHTML = i;
        option.selected = selected_speed === aiSpeeds[i];
        dropdown_speed.appendChild(option);
    }

    dropdown_color.onchange = () => { color = dropdown_color.options[dropdown_color.selectedIndex].value; }
    dropdown_speed.onchange = () => { speed = dropdown_speed.options[dropdown_speed.selectedIndex].value; }

    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(dropdown_color);
    if (selected_speed !== undefined) div.appendChild(dropdown_speed);
    if (selected_controls !== undefined) div.appendChild(controlScheme);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
    parent.appendChild(div);
}