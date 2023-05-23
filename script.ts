"use strict";
class Color {
    r: number;
    g: number;
    b: number;

    constructor(r: number, g: number, b: number) {
        this.r = this.clamp(r);
        this.g = this.clamp(g);
        this.b = this.clamp(b);
    }
    toString() {
        return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`
    }
    hsl() { // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
        let r: number = this.r / 255;
        let g: number = this.g / 255;
        let b: number = this.b / 255;
        let max: number = Math.max(r, g, b);
        let min: number = Math.min(r, g, b);
        let h: number = 0, s: number, l: number = (max + min) / 2;

        if(max === min) {
            h = s = 0;
        } else {
            let d = max - min;
            s = (l > 0.5) ? (d / (2 - max - min)) : (d / (max + min));
            switch(max) {
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
    }
    clamp(value: number) {
        if (value > 255) { value = 255; }
        else if (value < 0) { value = 0; }
        return value;
    }
}

export {}