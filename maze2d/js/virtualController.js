export default function VirtualController (player1) {    
    const _div = document.createElement("div");
    const div_top = document.createElement("div");
    const div_bottom = document.createElement("div");
    const left = document.createElement("button");
    const right = document.createElement("button");
    const up = document.createElement("button");
    const down = document.createElement("button");
    const back = document.createElement("button");

    left.innerHTML = "L";
    right.innerHTML = "&RightArrow;";
    up.innerHTML = "&UpArrow;";
    down.innerHTML = "&DownArrow;";
    back.innerHTML = "&#x21A9;";

    left.onclick = () => { dispatchKey("a"); };
    right.onclick = () => { dispatchKey("d"); };
    up.onclick = () => { dispatchKey("w"); };
    down.onclick = () => { dispatchKey("s"); };
    back.onclick = () => { dispatchKey("q"); };

    _div.id = "virtualController";

    div_top.style.display = "flex";
    div_bottom.style.display = "flex";

    div_top.appendChild(back);
    div_top.appendChild(up);

    div_bottom.appendChild(left);
    div_bottom.appendChild(down);
    div_bottom.appendChild(right);

    _div.appendChild(div_top);
    _div.appendChild(div_bottom);

    this.div = _div;

    const dispatchKey = (key) => {
        var eventObj = document.createEvent("Events");
        eventObj.initEvent("keyup", true, true);
        eventObj.key = key;
        document.dispatchEvent(eventObj);
    }
}