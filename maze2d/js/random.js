export default function Random(seed) {
    var _seed = seed % 2147483647;
    if (_seed <= 0) _seed += 2147483646;

    this.next = () => {
        _seed = _seed * 16807 % 2147483647;
        return _seed;
    }

    this.nextNormalized = () => {
        _seed = _seed * 16807 % 2147483647;
        return (_seed - 1) / 2147483646;
    }
}