import p5 from "p5";

export default class backgroundNode {
    x : number;
    y : number;
    xVelocity : number;
    yVelocity : number;
    radius : number;
    color : p5.Color;
    constructor (
        _x : number, _y : number, _xVelocity : number, _yVelocity : number, _radius : number, _color : p5.Color) {
        this.x = _x;
        this.y = _y;
        this.xVelocity = _xVelocity;
        this.yVelocity = _yVelocity;
        this.radius = _radius;
        this.color = _color;
    }
}