import { aiTypes, cellStatus, isPaused, playerColors, aiSpeeds, invertJson, leadingZero, trailingZero } from "./global.js";

export default function Player(maze, id) {
    var _maze = maze;
    var _id = id;
    var controlsEnabled = false;
    var stepsTaken = 0;
    let startTime;

    const mazeReady = () => {
        window.removeEventListener('mazeReady', mazeReady);
        toggleControls();
        render();
        drawPath(_maze.startCell().x, -1);
        startTime = Date.now();
    }

    window.addEventListener('mazeReady', mazeReady);

    var cells = _maze.cells().slice();

    var canvasTrail = document.createElement("canvas");
    canvasTrail.width = _maze.width();
    canvasTrail.height = _maze.height();
    document.getElementById("game").appendChild(canvasTrail);

    var canvas = document.createElement("canvas");
    canvas.width = _maze.width();
    canvas.height = _maze.height();
    document.getElementById("game").appendChild(canvas);
    
    var context = canvas.getContext("2d");
    var contextTrail = canvasTrail.getContext("2d");

    var x = _maze.startCell().x;
    var y = _maze.startCell().y;
    
    var spriteColor = playerColors[Math.floor(Math.random() * playerColors.length)];
    contextTrail.fillStyle = spriteColor;

    this.spriteColor = () => { return spriteColor; }
    this.canvasSprite = () => { return canvas; }
    this.canvasTrail = () => { return canvasTrail; }

    let path = [];
    let animatingSprite = false;

    var handler = function(key) {
        console.log(key);
        if (isPaused() || animatingSprite || !controlsEnabled) return;
        
        var prevX = x;
        var prevY = y;

        if (_id === aiTypes.PLAYER_1 || _id === undefined) {
            if (key.key === 'w' && playerCell().hasStatus(cellStatus.NORTH)) y -= 1;
            else if (key.key === 'a' && playerCell().hasStatus(cellStatus.WEST)) x -= 1;
            else if (key.key === 's' && playerCell().hasStatus(cellStatus.SOUTH)) y += 1;
            else if (key.key === 'd' && playerCell().hasStatus(cellStatus.EAST)) x += 1;
            else if (key.key === 'q' && path.length > 0) {
                animateSprite(playerCell());
                return;
            }
        }
        if (_id === aiTypes.PLAYER_2 || _id === undefined) {
            if (key.key === 'ArrowUp' && playerCell().hasStatus(cellStatus.NORTH)) y -= 1;
            else if (key.key === 'ArrowLeft' && playerCell().hasStatus(cellStatus.WEST)) x -= 1;
            else if (key.key === 'ArrowDown' && playerCell().hasStatus(cellStatus.SOUTH)) y += 1;
            else if (key.key === 'ArrowRight' && playerCell().hasStatus(cellStatus.EAST)) x += 1;
            else if (key.key === 'Enter' && path.length > 0) {
                animateSprite(playerCell());
                return;
            }
        }
        
        if (x !== prevX || y !== prevY) {
            stepsTaken++;
            path.push(playerCell(prevX, prevY));
            drawPath(prevX, prevY);
        }

        if (path.length >= 2 && x === path[path.length - 2].x && y === path[path.length - 2].y) {
            path.pop();
            path.pop();
        }
        
        if (reachedGoal()) {
            render();
            toggleControls();
            showStats();
        }
    }

    this.disable = () => {}

    const showStats = () => {
        const hud = document.getElementById("hud");

        const totalMinutes = (Date.now() - startTime) / 60000;
        const minutes = Math.floor(totalMinutes);
        const totalSeconds = (totalMinutes - minutes) * 60;
        const seconds = Math.floor(totalSeconds);
        const totalMilliseconds = (totalSeconds - seconds) * 1000;
        const milliseconds = Math.floor(totalMilliseconds);

        const aiTypeKey = invertJson(aiTypes)[_id];
        const message = `<span style="color: ${spriteColor}">●</span> ${aiTypeKey}: ${stepsTaken} steps — ${leadingZero(minutes)}:${leadingZero(seconds)}:${trailingZero(milliseconds)}`;
        const p = document.createElement("p");

        p.classList = "stat";
        p.style = "margin: 4px 0px";
        p.innerHTML = message;
        hud.appendChild(p);
    }

    const drawPath = (prevX, prevY) => {
        let tempStyle = contextTrail.strokeStyle;
        const tempWidth = contextTrail.lineWidth;
        const tempCap = contextTrail.lineCap;
        context.lineCap = "round";
        contextTrail.lineWidth = _maze.cellWidth() * 0.2;
        if (contextTrail.lineWidth < 1) contextTrail.lineWidth = 1;
        contextTrail.strokeStyle = spriteColor;
        contextTrail.beginPath();
        contextTrail.moveTo(toScreenSpace(prevX) + _maze.cellWidth() * 0.5, toScreenSpace(prevY) + _maze.cellWidth() * 0.5);
        contextTrail.lineTo(toScreenSpace(x) + _maze.cellWidth() * 0.5, toScreenSpace(y) + _maze.cellWidth() * 0.5);
        contextTrail.stroke();
        contextTrail.beginPath();
        contextTrail.arc(toScreenSpace(x) + _maze.cellWidth() * 0.5, toScreenSpace(y) + _maze.cellWidth() * 0.5, contextTrail.lineWidth * 0.5, 0, 2 * Math.PI);
        contextTrail.fill();
        contextTrail.strokeStyle = tempStyle;
        contextTrail.lineWidth = tempWidth;
        contextTrail.lineCap = tempCap;
    }

    const animateSprite = (initialCell) => {
        animatingSprite = true;
        stepsTaken++;

        let destinationCell = path.pop();
        x = destinationCell.x;
        y = destinationCell.y;

        if (destinationCell.decisionsFromStart === initialCell.decisionsFromStart) setTimeout(() => animateSprite(initialCell), aiSpeeds.VERY_FAST);
        else animatingSprite = false;
    }

    document.addEventListener("keyup", handler);

    this.setColor = (color) => {
        spriteColor = color;
        switch (spriteColor) {
            case "pink":
                spriteColor = "#FF3399";
                break;
            case "green":
                spriteColor = "#00CC00";
                break;
        }
        contextTrail.fillStyle = spriteColor;
    }

    const toggleControls = function() {
        controlsEnabled = !controlsEnabled;
    }

    const reachedGoal = function() {
        return playerCell().hasStatus(cellStatus.END);
    }

    const playerCell = function(pX = x, pY = y) {
        return cells[pX][pY];
    }

    this.render = () => { render(); }
    const render = function() {
        if (!controlsEnabled) return;
        
        context.clearRect(0, 0, canvas.width, canvas.height);

        var screenSpaceX = toScreenSpace(x);
        var screenSpaceY = toScreenSpace(y);

        context.beginPath();
        context.arc(screenSpaceX + _maze.cellWidth() / 2, screenSpaceY + _maze.cellWidth() / 2, _maze.cellWidth() / 2, 0, Math.PI * 2);
        context.fillStyle = spriteColor;
        context.stroke();
        context.fill();

        context.beginPath();
        context.arc(screenSpaceX + _maze.cellWidth() / 2, screenSpaceY + _maze.cellWidth() / 2, _maze.cellWidth() / 3, 0, Math.PI);
        context.stroke();

        context.beginPath();
        context.arc(screenSpaceX + _maze.cellWidth() * 0.35, screenSpaceY + _maze.cellWidth() * 0.35, _maze.cellWidth() / 12, 0, Math.PI * 2);
        context.stroke();

        context.beginPath();
        context.arc(screenSpaceX + _maze.cellWidth() * 0.65, screenSpaceY + _maze.cellWidth() * 0.35, _maze.cellWidth() / 12, 0, Math.PI * 2);
        context.stroke();

        //contextTrail.fillRect(screenSpaceX + _maze.cellWidth() * 0.25, screenSpaceY + _maze.cellWidth() * 0.25, _maze.cellWidth() - _maze.cellWidth() * 0.5, _maze.cellWidth() - _maze.cellWidth() * 0.5);
        /* if (path.some(c => c.x === x && c.y === y)) {
            if ((cells[x][y].hasStatus(cellStatus.NORTH) &&
                path.some(c => c.x === x && c.y === y - 1)) ||
                cells[x][y].hasStatus(cellStatus.START)) {
                    contextTrail.fillRect(x * (cellWidth + wallWidth) + ((cellWidth / 2) - (wallWidth / 2)) + wallWidth, y * (cellWidth + wallWidth) + ((cellWidth / 2) - (wallWidth / 2)) + wallWidth, wallWidth, -cellWidth);
            }
            if (cells[x][y].hasStatus(cellStatus.SOUTH) &&
                path.some(c => c.x === x && c.y === y + 1)) {
                    contextTrail.fillRect(x * (cellWidth + wallWidth) + ((cellWidth / 2) - (wallWidth / 2)) + wallWidth, y * (cellWidth + wallWidth) + ((cellWidth / 2) - (wallWidth / 2)) + wallWidth, wallWidth, cellWidth);
            }
            if (cells[x][y].hasStatus(cellStatus.WEST) &&
                path.some(c => c.x === x - 1 && c.y === y)) {
                    contextTrail.fillRect(x * (cellWidth + wallWidth) + ((cellWidth / 2) + (wallWidth / 2)) + wallWidth, y * (cellWidth + wallWidth) + ((cellWidth / 2) - (wallWidth / 2)) + wallWidth, -cellWidth, wallWidth);
            }
            if (cells[x][y].hasStatus(cellStatus.EAST) &&
                path.some(c => c.x === x + 1 && c.y === y)) {
                    contextTrail.fillRect(x * (cellWidth + wallWidth) + ((cellWidth / 2) - (wallWidth / 2)) + wallWidth, y * (cellWidth + wallWidth) + ((cellWidth / 2) - (wallWidth / 2)) + wallWidth, cellWidth, wallWidth);
            }
        }    */
    }

    const toScreenSpace = function(n)  {
        return n * (_maze.cellWidth() + _maze.wallWidth()) + _maze.wallWidth();
    }
}