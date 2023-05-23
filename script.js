"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Color = /** @class */ (function () {
    function Color(r, g, b) {
        this.r = this.clamp(r);
        this.g = this.clamp(g);
        this.b = this.clamp(b);
    }
    Color.prototype.toString = function () {
        return "rgb(".concat(Math.round(this.r), ", ").concat(Math.round(this.g), ", ").concat(Math.round(this.b), ")");
    };
    Color.prototype.hsl = function () {
        var r = this.r / 255;
        var g = this.g / 255;
        var b = this.b / 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h = 0, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0;
        }
        else {
            var d = max - min;
            s = (l > 0.5) ? (d / (2 - max - min)) : (d / (max + min));
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return {
            h: h * 100,
            s: s * 100,
            l: l * 100
        };
    };
    Color.prototype.clamp = function (value) {
        if (value > 255) {
            value = 255;
        }
        else if (value < 0) {
            value = 0;
        }
        return value;
    };
    return Color;
}());
