import { isPaused } from "./global.js";

export default function LayerManager () {
    const _cycleSpeed = 500;
    var _isCycling = false;
    var _trailLayers = [];
    var _spriteLayers = [];

    this.addTrail = function (canvas) {
        _trailLayers.push(canvas);
        if (_trailLayers.length > 1 && !_isCycling) {
            _isCycling = true;
            cycleLayers();
        }
    }

    this.addSprite = function (canvas) {
        _spriteLayers.push(canvas);
        if (_spriteLayers.length > 1 && !_isCycling) {
            _isCycling = true;
            cycleLayers();
        }
    }

    this.clearLayers = () => {
        _isCycling = false;
        _trailLayers.forEach(tLayer => {
            tLayer.remove();
        });
        _trailLayers = [];
        
        _spriteLayers.forEach(sLayer => {
            sLayer.remove();
        });
        _spriteLayers = [];

        let mazeCanvas = document.getElementsByTagName("canvas")[0];
        if (mazeCanvas) mazeCanvas.remove();
    }

    const cycleLayers = function () {
        if (!_isCycling || isPaused()) return;

        var zIndex = 1;

        _trailLayers.push(_trailLayers.shift());
        _spriteLayers.push(_spriteLayers.shift());

        _trailLayers.forEach(layer => {
            layer.style.zIndex = zIndex++;
        })

        _spriteLayers.forEach(layer => {
            layer.style.zIndex = zIndex++;
        })

        setTimeout(() => { cycleLayers(); }, _cycleSpeed);
    } 
}