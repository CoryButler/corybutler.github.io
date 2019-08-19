var _canvas = document.getElementsByTagName("canvas")[0];
var _context = _canvas.getContext("2d");

var _image = document.createElement("img");
_image.style.opacity = 0;
_image.style.position = "absolute";
_image.style.pointerEvents = "none";
_image.id = "img"
_image.src = "img/badReichenhall.png";
_image.onload = () => {
    _canvas.width = _image.width;
    _canvas.height = _image.height;
    _context.drawImage(_image, 0, 0, _image.width, _image.height);
}

document.body.appendChild(_image);

function leadingZeroes (n) {
    while (n.length < 8) { n = "0" + n; }
    return n;
}

function invert () {
    var imgData = _context.getImageData(0, 0, _canvas.width, _canvas.height);
    for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i + 0] ^= 255;
        imgData.data[i + 1] ^= 255;
        imgData.data[i + 2] ^= 255;
    }
    _context.putImageData(imgData, 0, 0);
}

function inject () {
    var message = document.getElementById("injectionMessage").value + "<br><br><br>";
    var messageBytes = [];
    for (var i = 0; i < message.length; i++) {
        messageBytes.push(leadingZeroes(message.charCodeAt(i).toString(2)));
    }

    var messageBits = [];
    messageBytes.forEach(b => {
        for (var i = 0; i < b.length; i++) {
            messageBits.push(parseInt(b[i], 2));
        }
    });

    var imgData = _context.getImageData(0, 0, _canvas.width, _canvas.height);

    var j = 0;
    for (var i = 0; i < messageBits.length; i++) {
        if (j % 4 === 0) { j++; }
            if (messageBits[i] === 1) {
                imgData.data[j - 1] |= 1;
            }
            else {
                imgData.data[j - 1] &= ~1;
            }
        j++;
    }

    _context.putImageData(imgData, 0, 0);
}

function extract () {
    var imgData = _context.getImageData(0, 0, _canvas.width, _canvas.height);

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

    document.getElementById("extractionMessage").innerHTML = (arr.join(""));
}