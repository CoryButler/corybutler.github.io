const _body = document.getElementsByTagName("body")[0];
const _canvas = document.getElementsByTagName("canvas")[0];
const _context = _canvas.getContext("2d");
const _button_inject = document.getElementById("inject");
const _label_injectionMessage = document.getElementById("label_injectionMessage");
const _injectionMessage = document.getElementById("injectionMessage");
const _extractionMessage = document.getElementById("extractionMessage");
const _eof = "<br><br>---End of Message---<br><br>";
const _image = document.createElement("img");
_image.style.cssText = "opacity: 0; position: absolute; pointerEvents: none";
_image.name = "badReichenhall.png"
_image.onload = () => {
    _canvas.width = _image.width;
    _canvas.height = _image.height;
    _context.drawImage(_image, 0, 0, _image.width, _image.height);
    _injectionMessage.setAttribute("maxlength", messageMaxLenth());
    _injectionMessage.value = _injectionMessage.value.substr(0, messageMaxLenth());
    undateLabelInjectionMessage();
}
_image.src = "img/badReichenhall_steg.png";
document.body.appendChild(_image);

function invert () {
    var imgData = getImageData();
    for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i + 0] ^= 255;
        imgData.data[i + 1] ^= 255;
        imgData.data[i + 2] ^= 255;
    }
    _context.putImageData(imgData, 0, 0);
}

function inject () {
    var message = getFullInjectionMessage() + _eof;

    var messageBytes = [];
    message.split("").forEach(m => messageBytes.push(leadingZeroes(m.charCodeAt(0).toString(2))));

    var messageBits = [];
    messageBytes.forEach(byte => byte.split("").forEach(bit => messageBits.push(parseInt(bit, 2))));

    var imgData = getImageData();

    var j = 0;
    for (var i = 0; i < messageBits.length; i++) {
        if (j % 4 === 0) { j++; }
            if (messageBits[i] === 1) { imgData.data[j - 1] |= 1; }
            else { imgData.data[j - 1] &= ~1; }
        j++;
    }

    _context.putImageData(imgData, 0, 0);
    
    var temp = _button_inject.innerHTML;
    _button_inject.disabled = true;
    _button_inject.innerHTML = "👍 Message Injected";
    setTimeout(() => { _button_inject.disabled = false; _button_inject.innerHTML = temp; }, 1000);
}

function extract () {
    var imgData = getImageData();

    var binaryMessage = "";    
    for (var i = 0; i < imgData.data.length; i += 4) {
        binaryMessage += imgData.data[i + 0] & 1;
        binaryMessage += imgData.data[i + 1] & 1;
        binaryMessage += imgData.data[i + 2] & 1;
    }

    var arr = [];
    for (var i = 0; i < binaryMessage.length; i += 8) {
        arr.push(String.fromCharCode(parseInt(binaryMessage.substr(i, 8), 2)));
    }

    _extractionMessage.innerHTML = (arr.join(""));
}

function save() {
    var filename = _image.name.substring(0, _image.name.lastIndexOf(".")) + "_steg" + _image.name.substring(_image.name.lastIndexOf("."));
    var a  = document.createElement("a");
    a.href = _canvas.toDataURL(_image.type, 1.0);
    a.download = filename;
    _body.appendChild(a);
    a.click();
    _body.removeChild(a)
}

function readFile(e) {
    var file = e.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = e => { 
        _image.src = e.target.result;
        _image.name = file.name;
        _image.type = file.type;
    };
    reader.readAsDataURL(file);
}

function leadingZeroes (n) {
    while (n.length < 8) { n = "0" + n; }
    return n;
}

function undateLabelInjectionMessage() {
    _label_injectionMessage.innerHTML = "Message to Inject: (" + messageCurrLength() + " / " + messageMaxLenth() + ")"
}

function messageCurrLength() {
    var length = getFullInjectionMessage().length;
    _button_inject.disabled = length === 0;
    return length;
}

function messageMaxLenth() {
    return Math.floor((_image.width * _image.height) / 3) - _eof.length;
}

function getImageData() {
    return _context.getImageData(0, 0, _canvas.width, _canvas.height);    
}

function getFullInjectionMessage() {
    return _injectionMessage.value.replaceAll("\n", "<br>");
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

document.getElementById("file-input").addEventListener("change", readFile, false);
_injectionMessage.addEventListener("change", () => console.log(1), false);