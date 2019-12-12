export default function MazeCell (x = 0, y = 0) {
    this.status = [];
    this.hasStatus = (s) => { return this.status.indexOf(s) >= 0; }
    this.removeStatus = s => { var i = this.status.indexOf(s); if (i >= 0) this.status.splice(i, 1); }
    this.x = x;
    this.y = y;
}