import { aiSpeeds, aiTypes, isPaused, cellStatus, playerColors, invertJson, leadingZero, trailingZero } from "./global.js";

export default function Ai (maze, aiType = aiTypes.UNVISITED_TURNS, aiSpeed = aiSpeeds.NORMAL) {
    var _aiType = aiType;
    var _maze = maze;
    var controlsEnabled = false;
    var prevDirection = cellStatus.SOUTH;
    var stepsTaken = 0;
    let startTime;
    let isDisabled = false;

    const mazeReady = () => {
        window.removeEventListener('mazeReady', mazeReady);
        toggleControls();
        render();
        drawPath(_maze.startCell().x, -1)
        logicLoop();
        startTime = Date.now();
    }

    window.addEventListener('mazeReady', mazeReady);

    var _aiSpeed = aiSpeed;
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

    const modulo = (n, m) => {
        return ((n % m) + m) % m;
    }
    
    var logicLoop = function() {
        if (isDisabled) return;

        if (isPaused()) {
            setTimeout(function() { logicLoop(); }, 1);
            return;
        }

        if (!controlsEnabled) return;

        if (reachedGoal()) {
            toggleControls();
            showStats();
            return;
        }
        
        var prevX = x;
        var prevY = y;

        cells[x][y].status.push(cellStatus.STEPPED);

        var direction;

        switch(_aiType) {
            case aiTypes.RANDOM:
                direction = random();
                break;
            case aiTypes.RANDOM_TURNS:
                direction = randomTurns();
                break;
            case aiTypes.UNVISITED_TURNS:
                direction = unvisitedTurns();
                break;
            case aiTypes.RIGHT_HAND:
                direction = rightHand();
                break;
            case aiTypes.LEFT_HAND:
                direction = leftHand();
                break;
            case aiTypes.DIJKSTRA:
                direction = dijkstra();
                break;
        }

        if (direction === cellStatus.NORTH) y -= 1;
        if (direction === cellStatus.SOUTH) y += 1;
        if (direction === cellStatus.WEST) x -= 1;
        if (direction === cellStatus.EAST) x += 1;
    
        if (x < 0) x = 0;
        if (x > _maze.columnCount() - 1) x = _maze.columnCount() - 1;
    
        if (y < 0) y = 0;
        if (y > _maze.rowCount() - 1) y = _maze.rowCount() - 1;

        stepsTaken++;

        drawPath(prevX, prevY);

        if (_aiSpeed === aiSpeeds.TELEPORT){
            try {
                logicLoop();
            }
            catch {
                setTimeout(function() { logicLoop(); }, _aiSpeed);
            }
        }
        else setTimeout(function() { logicLoop(); }, _aiSpeed);
    }

    this.disable = () => {
        isDisabled = true;
    }

    const showStats = () => {
        const hud = document.getElementById("hud");

        const totalMinutes = (Date.now() - startTime) / 60000;
        const minutes = Math.floor(totalMinutes);
        const totalSeconds = (totalMinutes - minutes) * 60;
        const seconds = Math.floor(totalSeconds);
        const totalMilliseconds = (totalSeconds - seconds) * 1000;
        const milliseconds = Math.floor(totalMilliseconds);

        const aiTypeKey = invertJson(aiTypes)[_aiType];
        const aiSpeedKey = invertJson(aiSpeeds)[_aiSpeed];
        const message = `<span style="color: ${spriteColor}">●</span> ${aiTypeKey} (${aiSpeedKey}): ${stepsTaken} steps — ${leadingZero(minutes)}:${leadingZero(seconds)}:${trailingZero(milliseconds)}`;
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

    const random = function () {
        var neighbors = getNeighbors();

        return neighbors[Math.floor(Math.random() * neighbors.length)];
    }

    const randomTurns = function () {
        var neighbors = getNeighbors();

        var direction = neighbors[Math.floor(Math.random() * neighbors.length)];

        if (neighbors.length === 1 && stepsTaken > 0) prevDirection = opposite(prevDirection);

        while (direction === opposite(prevDirection)) {
            direction = neighbors[Math.floor(Math.random() * neighbors.length)];
        }
        prevDirection = direction;
        
        return direction;
    }

    const unvisitedTurns = function () {
        var neighbors = getNeighbors();

        var direction = neighbors[Math.floor(Math.random() * neighbors.length)];

        if (neighbors.length === 1 && stepsTaken > 0) prevDirection = opposite(prevDirection);

        else {
            if (neighbors.every(n => cellWasStepped(n))) neighbors.forEach(n => { if (n !== opposite(prevDirection)) clearSteppedStatus(n) });
            while (direction === opposite(prevDirection) || (cellWasStepped(direction) && neighbors.some(n => !cellWasStepped(n)))) {
                direction = neighbors[Math.floor(Math.random() * neighbors.length)];
            }
        }
        prevDirection = direction;
        
        return direction;
    }

    const rightHand = function () {
        var turnOrder = [ cellStatus.NORTH, cellStatus.EAST, cellStatus.SOUTH, cellStatus.WEST ];
        var neighbors = getNeighbors();
        var direction = turnOrder[ modulo((turnOrder.indexOf(prevDirection) + 1), turnOrder.length) ];
        var turnsAttempted = 0;

        while (!neighbors.some(n => n === direction)) {
            direction = turnOrder[ modulo((turnOrder.indexOf(prevDirection) - turnsAttempted), turnOrder.length) ];
            turnsAttempted++;
        }
        
        prevDirection = direction;        
        return direction;
    }

    const leftHand = function () {
        var turnOrder = [ cellStatus.NORTH, cellStatus.EAST, cellStatus.SOUTH, cellStatus.WEST ];
        var neighbors = getNeighbors();
        var direction = turnOrder[ modulo((turnOrder.indexOf(prevDirection) - 1), turnOrder.length) ];
        var turnsAttempted = 0;

        while (!neighbors.some(n => n === direction)) {
            direction = turnOrder[ modulo((turnOrder.indexOf(prevDirection) + turnsAttempted), turnOrder.length) ];
            turnsAttempted++;
        }
        
        prevDirection = direction;        
        return direction;
    }

    const dijkstra = () => {
        let neighbors = getNeighbors();

        if (neighbors.indexOf(cellStatus.EAST) >= 0 && cells[x + 1][y].dijkstra === playerCell().dijkstra - 1)
            return cellStatus.EAST;
        if (neighbors.indexOf(cellStatus.NORTH) >= 0 && cells[x][y - 1].dijkstra === playerCell().dijkstra - 1)
            return cellStatus.NORTH;
        if (neighbors.indexOf(cellStatus.WEST) >= 0 && cells[x - 1][y].dijkstra === playerCell().dijkstra - 1)
            return cellStatus.WEST;
        if (neighbors.indexOf(cellStatus.SOUTH) >= 0 && cells[x][y + 1].dijkstra === playerCell().dijkstra - 1)
            return cellStatus.SOUTH;
    }

    const getNeighbors = function () {
        var neighbors = [];
        if (playerCell().hasStatus(cellStatus.EAST)) neighbors.push(cellStatus.EAST);
        if (playerCell().hasStatus(cellStatus.NORTH)) neighbors.push(cellStatus.NORTH);
        if (playerCell().hasStatus(cellStatus.WEST)) neighbors.push(cellStatus.WEST);
        if (playerCell().hasStatus(cellStatus.SOUTH)) neighbors.push(cellStatus.SOUTH);
        return neighbors;
    }

    const cellWasStepped = function (direction) {
        switch (direction) {
            case cellStatus.NORTH:
                return cells[x][y - 1].hasStatus(cellStatus.STEPPED);
            case cellStatus.SOUTH:
                return cells[x][y + 1].hasStatus(cellStatus.STEPPED);
            case cellStatus.WEST:
                return cells[x - 1][y].hasStatus(cellStatus.STEPPED);
            case cellStatus.EAST:
                return cells[x + 1][y].hasStatus(cellStatus.STEPPED);
        }
    }

    const clearSteppedStatus = function (direction) {
        switch (direction) {
            case cellStatus.NORTH:
                return cells[x][y - 1].removeStatus(cellStatus.STEPPED);
            case cellStatus.SOUTH:
                return cells[x][y + 1].removeStatus(cellStatus.STEPPED);
            case cellStatus.WEST:
                return cells[x - 1][y].removeStatus(cellStatus.STEPPED);
            case cellStatus.EAST:
                return cells[x + 1][y].removeStatus(cellStatus.STEPPED);
        }
    }

    const opposite = function (dir) {
        switch (dir) {
            case cellStatus.NORTH:
                return cellStatus.SOUTH;
            case cellStatus.SOUTH:
                return cellStatus.NORTH;
            case cellStatus.WEST:
                return cellStatus.EAST;
            case cellStatus.EAST:
                return cellStatus.WEST;
        }
    }

    const toggleControls = function() {
        controlsEnabled = !controlsEnabled;
    }

    const reachedGoal = function() {
        return playerCell().hasStatus(cellStatus.END);
    }

    const playerCell = function() {
        return cells[x][y];
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
    }

    const toScreenSpace = function(n)  {
        return n * (_maze.cellWidth() + _maze.wallWidth()) + _maze.wallWidth();
    }
}