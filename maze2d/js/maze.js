import MazeCell from "./mazeCell.js";
import { cellStatus } from "./global.js";
import Random from "./random.js";

export default function Maze(seed, width = 32, height = 16, cellWidth = 30, wallWidth = 2) {
    const random = new Random(seed);
    let mazeReady = new Event('mazeReady');
    let doNotRender = false;
    let isDisabled = false;

    const onMazeReady = () => { 
        window.removeEventListener('mazeReady', onMazeReady);
        setEndCell();
        setDijkstraValues();
        render(true);
        doNotRender = true;
    }
    
    window.addEventListener('mazeReady', onMazeReady);


    let _cellWidth = cellWidth;
    let _wallWidth = wallWidth;
    let columnCount = width;
    let rowCount = height;
    let _width = columnCount * (_cellWidth + _wallWidth) + _wallWidth;
    let _height = rowCount * (_cellWidth + _wallWidth) + _wallWidth;
    let cells = [];
    let cellStack = [];
    let visitedCellCount = 0;

    for (let i = 0; i < columnCount; i++) {
        cells.push([]);
        for (let j = 0; j < rowCount; j++) {
            cells[i].push(new MazeCell(i, j));
        }
    }

    let startCell = { x: Math.floor(random.nextNormalized() * columnCount), y: 0 };
    let endCell = { x: 0, y: 0 };
    cells[startCell.x][startCell.y].status.push(cellStatus.START);

    let initPos = { x: Math.floor(random.nextNormalized() * columnCount), y: Math.floor(random.nextNormalized() * rowCount) };
    cellStack.push(initPos);
    visitedCellCount++;

    cells[initPos.x][initPos.y].status.push(cellStatus.VISITED);

    let hud = document.getElementById("hud");
    let hudStyle = window.getComputedStyle(hud);
    let max = { width: window.innerWidth - (parseInt(hudStyle.width) * 2), height: window.innerHeight - (parseInt(hudStyle.height) * 2) };

    while ((_width > max.width || _height > max.height) && _cellWidth !== 1) {
        if (--_cellWidth < _wallWidth) _wallWidth--;
        _width = columnCount * (_cellWidth + _wallWidth) + _wallWidth;
        _height = rowCount * (_cellWidth + _wallWidth) + _wallWidth;
    }

    let canvas = document.createElement("canvas");
    document.getElementById("game").appendChild(canvas);
    canvas.width = _width;
    canvas.height = _height;

    let context = canvas.getContext("2d");

    this.width = () => { return _width; }
    this.height = () => { return _height; }
    this.cells = () => { return cells; }
    this.cellWidth = () => { return _cellWidth; }
    this.wallWidth = () => { return _wallWidth; }
    this.startCell = () => { return startCell; }
    this.columnCount = () => { return columnCount; }
    this.rowCount = () => { return rowCount; }
    this.canvas = () => { return canvas; }

    let spriteColor;

    this.create = function(color, animate = true) {
        spriteColor = color;
        initRender();
        if (animate)
            createAnimate();
        else
            createInstant();
    }

    const createInstant = function() {
        while (visitedCellCount < columnCount * rowCount) {
            let neighbors = [];
    
            if (cellStack[cellStack.length - 1].y > 0 && !cells[offsetX(0)][offsetY(-1)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.NORTH);
    
            if (cellStack[cellStack.length - 1].y < rowCount - 1 && !cells[offsetX(0)][offsetY(1)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.SOUTH);
    
            if (cellStack[cellStack.length - 1].x > 0 && !cells[offsetX(-1)][offsetY(0)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.WEST);
    
            if (cellStack[cellStack.length - 1].x < columnCount - 1 && !cells[offsetX(1)][offsetY(0)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.EAST);
    
            if (neighbors.length > 0) {
                let nextCell = neighbors[Math.floor(random.nextNormalized() * neighbors.length)];
    
                switch (nextCell) {
                    case cellStatus.NORTH:
                        cells[offsetX(0)][offsetY(0)].status.push(cellStatus.NORTH);
                        cells[offsetX(0)][offsetY(-1)].status.push(cellStatus.SOUTH);
                        cellStack.push({x: offsetX(0), y: offsetY(-1)});
                        break;
                    case cellStatus.SOUTH:
                        cells[offsetX(0)][offsetY(0)].status.push(cellStatus.SOUTH);
                        cells[offsetX(0)][offsetY(1)].status.push(cellStatus.NORTH);
                        cellStack.push({x: offsetX(0), y: offsetY(1)});
                        break;
                    case cellStatus.WEST:
                        cells[offsetX(0)][offsetY(0)].status.push(cellStatus.WEST);
                        cells[offsetX(-1)][offsetY(0)].status.push(cellStatus.EAST);
                        cellStack.push({x: offsetX(-1), y: offsetY(0)});
                        break;
                    case cellStatus.EAST:
                        cells[offsetX(0)][offsetY(0)].status.push(cellStatus.EAST);
                        cells[offsetX(1)][offsetY(0)].status.push(cellStatus.WEST);
                        cellStack.push({x: offsetX(1), y: offsetY(0)});
                        break;
                }
    
                cells[offsetX(0)][offsetY(0)].status.push(cellStatus.VISITED);
                cells[offsetX(0)][offsetY(0)].x = offsetX(0);
                cells[offsetX(0)][offsetY(0)].y = offsetY(0);
                visitedCellCount++;
            }
            else {
                cellStack.pop();
            }
        }
        window.dispatchEvent(mazeReady);
    }

    const createAnimate = function() {
        if (isDisabled) return;
        if (visitedCellCount < columnCount * rowCount) {
            let neighbors = [];
    
            if (cellStack[cellStack.length - 1].y > 0 && !cells[offsetX(0)][offsetY(-1)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.NORTH);
    
            if (cellStack[cellStack.length - 1].y < rowCount - 1 && !cells[offsetX(0)][offsetY(1)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.SOUTH);
    
            if (cellStack[cellStack.length - 1].x > 0 && !cells[offsetX(-1)][offsetY(0)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.WEST);
    
            if (cellStack[cellStack.length - 1].x < columnCount - 1 && !cells[offsetX(1)][offsetY(0)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.EAST);
    
            if (neighbors.length > 0) {
                let nextCell = neighbors[Math.floor(random.nextNormalized() * neighbors.length)];
    
                switch (nextCell) {
                    case cellStatus.NORTH:
                        cells[offsetX(0)][offsetY(0)].status.push(cellStatus.NORTH);
                        cells[offsetX(0)][offsetY(-1)].status.push(cellStatus.SOUTH);
                        cellStack.push({x: offsetX(0), y: offsetY(-1)});
                        break;
                    case cellStatus.SOUTH:
                        cells[offsetX(0)][offsetY(0)].status.push(cellStatus.SOUTH);
                        cells[offsetX(0)][offsetY(1)].status.push(cellStatus.NORTH);
                        cellStack.push({x: offsetX(0), y: offsetY(1)});
                        break;
                    case cellStatus.WEST:
                        cells[offsetX(0)][offsetY(0)].status.push(cellStatus.WEST);
                        cells[offsetX(-1)][offsetY(0)].status.push(cellStatus.EAST);
                        cellStack.push({x: offsetX(-1), y: offsetY(0)});
                        break;
                    case cellStatus.EAST:
                        cells[offsetX(0)][offsetY(0)].status.push(cellStatus.EAST);
                        cells[offsetX(1)][offsetY(0)].status.push(cellStatus.WEST);
                        cellStack.push({x: offsetX(1), y: offsetY(0)});
                        break;
                }
    
                cells[offsetX(0)][offsetY(0)].status.push(cellStatus.VISITED);
                cells[offsetX(0)][offsetY(0)].x = offsetX(0);
                cells[offsetX(0)][offsetY(0)].y = offsetY(0);
                visitedCellCount++;
            }
            else {
                cellStack.pop();
            }
            render();
            setTimeout(function() {createAnimate();}, 0);
        }
        else
        {
            window.dispatchEvent(mazeReady);
        }
    }

    this.disable = () => {
        isDisabled = true;
    }

    const offsetX = function(x) {
        return cellStack[cellStack.length - 1].x + x;
    }
    
    const offsetY = function(y) {
        return cellStack[cellStack.length - 1].y + y;
    }

    const setEndCell = function () {
        let cellValues = [];
        let currentX = startCell.x;
        let currentY = startCell.y;

        for (let i = 0; i < columnCount; i++) {
            cellValues.push([]);
            for (let j = 0; j < rowCount; j++) {
                cellValues[i].push({});
            }
        }

        cellValues[currentX][currentY].distanceFromStart = 0;
        cellValues[currentX][currentY].decisionsFromStart = 0;


        let frontier = [cells[currentX][currentY]];
        while (frontier.length > 0) {
            if (cells[frontier[0].x][frontier[0].y].hasStatus(86)) {
                frontier.shift();
                continue;
            }
            
            let distanceFromStart = parseInt("0" + cellValues[frontier[0].x][frontier[0].y].distanceFromStart) + 1;
            let decisionsFromStart = parseInt("0" + cellValues[frontier[0].x][frontier[0].y].decisionsFromStart);
            if (getNeighbors(frontier[0]).length >= 3) decisionsFromStart++;
            
            let newFrontier = [];
            if (cells[frontier[0].x][frontier[0].y].hasStatus(cellStatus.EAST)  && !cells[frontier[0].x + 1][frontier[0].y].hasStatus(86)) {
                newFrontier.push(cells[frontier[0].x + 1][frontier[0].y]);
                cellValues[frontier[0].x + 1][frontier[0].y] = { distanceFromStart: distanceFromStart, decisionsFromStart: decisionsFromStart };
            }
            if (cells[frontier[0].x][frontier[0].y].hasStatus(cellStatus.NORTH) && !cells[frontier[0].x][frontier[0].y - 1].hasStatus(86)) {
                newFrontier.push(cells[frontier[0].x][frontier[0].y - 1]);
                cellValues[frontier[0].x][frontier[0].y - 1] = { distanceFromStart: distanceFromStart, decisionsFromStart: decisionsFromStart };
            }
            if (cells[frontier[0].x][frontier[0].y].hasStatus(cellStatus.WEST)  && !cells[frontier[0].x - 1][frontier[0].y].hasStatus(86)) {
                newFrontier.push(cells[frontier[0].x - 1][frontier[0].y]);
                cellValues[frontier[0].x - 1][frontier[0].y] = { distanceFromStart: distanceFromStart, decisionsFromStart: decisionsFromStart };
            }
            if (cells[frontier[0].x][frontier[0].y].hasStatus(cellStatus.SOUTH) && !cells[frontier[0].x][frontier[0].y + 1].hasStatus(86)) {
                newFrontier.push(cells[frontier[0].x][frontier[0].y + 1]);
                cellValues[frontier[0].x][frontier[0].y + 1] = { distanceFromStart: distanceFromStart, decisionsFromStart: decisionsFromStart };
            }

            cells[frontier[0].x][frontier[0].y].status.push(86);

           frontier.shift();

            newFrontier.forEach(nf => {
                nf.distanceFromStart = distanceFromStart;
                nf.decisionsFromStart = decisionsFromStart;
                frontier.unshift(nf);
            });
        }

        let bestCell = { x: 0, y: rowCount - 1 };
        let currentDecisions = 0;
        let currentDistance = 0;

        for (let i = 0; i < columnCount; i++) {
            if (cellValues[i][rowCount - 1].decisionsFromStart > currentDecisions) {
                currentDecisions = cellValues[i][rowCount - 1].decisionsFromStart;
                currentDistance = cellValues[i][rowCount - 1].distanceFromStart;
                bestCell.x = i;
            }
            else if (cellValues[i][rowCount - 1].decisionsFromStart === currentDecisions && cellValues[i][rowCount - 1].distanceFromStart > currentDistance) {
                currentDistance = cellValues[i][rowCount - 1].distanceFromStart;
                bestCell.x = i;
            }
        }

        endCell = bestCell;
        cells[endCell.x][endCell.y].status.push(cellStatus.END);
        
        /* for (let i = 0; i < rowCount; i++) {
            let toLog = "";
            for (let j = 0; j < columnCount; j++) {
                toLog += cellValues[j][i].distanceFromStart + " ";
            }
            console.log(toLog);
        }

        console.log();

        for (let i = 0; i < rowCount; i++) {
            let toLog = "";
            for (let j = 0; j < columnCount; j++) {
                toLog += cellValues[j][i].decisionsFromStart + " ";
            }
            console.log(toLog);
        } */
    }

    const setDijkstraValues = () => {
        let currentX = endCell.x;
        let currentY = endCell.y;

        let frontier = [cells[currentX][currentY]];

        cells[frontier[0].x][frontier[0].y].dijkstra = 0;

        while (frontier.length > 0) {
            if (cells[frontier[0].x][frontier[0].y].hasStatus(87)) {
                frontier.shift();
                continue;
            }
            
            let dijkstra = parseInt("0" + cells[frontier[0].x][frontier[0].y].dijkstra) + 1;
            
            let newFrontier = [];
            if (cells[frontier[0].x][frontier[0].y].hasStatus(cellStatus.EAST)  && !cells[frontier[0].x + 1][frontier[0].y].hasStatus(87)) {
                newFrontier.push(cells[frontier[0].x + 1][frontier[0].y]);
                cells[frontier[0].x + 1][frontier[0].y].dijkstra = dijkstra;
            }
            if (cells[frontier[0].x][frontier[0].y].hasStatus(cellStatus.NORTH) && !cells[frontier[0].x][frontier[0].y - 1].hasStatus(87)) {
                newFrontier.push(cells[frontier[0].x][frontier[0].y - 1]);
                cells[frontier[0].x][frontier[0].y - 1].dijkstra = dijkstra;
            }
            if (cells[frontier[0].x][frontier[0].y].hasStatus(cellStatus.WEST)  && !cells[frontier[0].x - 1][frontier[0].y].hasStatus(87)) {
                newFrontier.push(cells[frontier[0].x - 1][frontier[0].y]);
                cells[frontier[0].x - 1][frontier[0].y].dijkstra = dijkstra;
            }
            if (cells[frontier[0].x][frontier[0].y].hasStatus(cellStatus.SOUTH) && !cells[frontier[0].x][frontier[0].y + 1].hasStatus(87)) {
                newFrontier.push(cells[frontier[0].x][frontier[0].y + 1]);
                cells[frontier[0].x][frontier[0].y + 1].dijkstra = dijkstra;
            }

            cells[frontier[0].x][frontier[0].y].status.push(87);

           frontier.shift();

            newFrontier.forEach(nf => {
                nf.dijkstra = dijkstra;
                frontier.unshift(nf);
            });
        }

        /* for (let i = 0; i < rowCount; i++) {
            let toLog = "";
            for (let j = 0; j < columnCount; j++) {
                toLog += cells[j][i].dijkstra + " ";
            }
            console.log(toLog);
        }

        console.log(); */
    }
    
    const getNeighbors = function (cell) {
        let neighbors = [];
        if (cell.hasStatus(cellStatus.EAST))  neighbors.push(cellStatus.EAST);
        if (cell.hasStatus(cellStatus.NORTH)) neighbors.push(cellStatus.NORTH);
        if (cell.hasStatus(cellStatus.WEST))  neighbors.push(cellStatus.WEST);
        if (cell.hasStatus(cellStatus.SOUTH)) neighbors.push(cellStatus.SOUTH);
        return neighbors;
    }

    const initRender = () => {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, _width, _height);
        context.fillStyle = spriteColor;

        for (let x = 0; x < columnCount; x++) {
            for (let y = 0; y < rowCount; y++) {
                context.fillRect(x * (_cellWidth + _wallWidth) + _wallWidth, y * (_cellWidth + _wallWidth) + _wallWidth, _cellWidth, _cellWidth);
            }
        }
    }

    const cellInRange = (x, y) => {
        return (
            x >= cellStack[cellStack.length - 1].x - 1 &&
            x <= cellStack[cellStack.length - 1].x + 1 &&
            y >= cellStack[cellStack.length - 1].y - 1 &&
            y <= cellStack[cellStack.length - 1].y + 1
        );
    }

    const render = (drawEndCell = false) => {
        cells.forEach(col => {
            col.forEach(row => {
                
                if (row.hasStatus(cellStatus.VISITED) && (cellInRange(row.x, row.y) || drawEndCell)) {
                    let x = row.x;
                    let y = row.y;
                    context.fillStyle = "#FFFFFF";

                    if (x === cellStack[cellStack.length - 1].x && y === cellStack[cellStack.length - 1].y && visitedCellCount < columnCount * rowCount) {
                        context.fillStyle = spriteColor;
                    }

                    context.fillRect(x * (_cellWidth + _wallWidth) + _wallWidth, y * (_cellWidth + _wallWidth) + _wallWidth, _cellWidth, _cellWidth);

                    if (cells[x][y].hasStatus(cellStatus.SOUTH))
                        context.fillRect(x * (_cellWidth + _wallWidth) + _wallWidth, y * (_cellWidth + _wallWidth) + _wallWidth + _cellWidth, _cellWidth, _wallWidth);
                    
                    if (cells[x][y].hasStatus(cellStatus.EAST))
                        context.fillRect(x * (_cellWidth + _wallWidth) + _wallWidth + _cellWidth, y * (_cellWidth + _wallWidth) + _wallWidth, _wallWidth, _cellWidth);

                    if (cells[x][y].hasStatus(cellStatus.VISITED) && cells[x][y].hasStatus(cellStatus.START))
                        context.fillRect(x * (_cellWidth + _wallWidth) + _wallWidth, y * (_cellWidth + _wallWidth), _cellWidth, _wallWidth);

                    if (cells[x][y].hasStatus(cellStatus.VISITED) && cells[x][y].hasStatus(cellStatus.END))
                        context.fillRect(x * (_cellWidth + _wallWidth) + _wallWidth, y * (_cellWidth + _wallWidth) + _wallWidth + _cellWidth, _cellWidth, _wallWidth);
                }
            })
        });
    }
}