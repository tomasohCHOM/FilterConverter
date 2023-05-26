"use strict";

import Color from './color'
import Solver from './solver'

function hexToRgb(hex: string): number[] {
    const shortHandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shortHandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
    });
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
     ] : null;
}

function RgbToArray(rgb: string): number[] {
    // const rgbArray = rgb.replace(/[^\d,]/g, "").split(",");
    // return rgbArray ? [
    //     parseInt(rgbArray[1]),
    //     parseInt(rgbArray[2]),
    //     parseInt(rgbArray[3])
    // ] : null;
    return rgb.match(/\d+/g).map(Number);
}

const performConvertion = document.querySelector(".perform-convertion");
const target: HTMLInputElement = document.querySelector(".target");
const rgbOrHexSelection: HTMLSelectElement = document.getElementById("select-color-type") as HTMLSelectElement;
const placeholders = {
    rgb: "e.g 'rgb(121, 201, 176)'",
    hex: "e.g '00a4d3' or '#00a4d3'"
}

let isHexSelected = false;

rgbOrHexSelection.addEventListener("change", ()=> {
    let selectedValue = rgbOrHexSelection.options[rgbOrHexSelection.selectedIndex].value;
    console.log(selectedValue);
    isHexSelected = selectedValue === "hex";
    target.placeholder = isHexSelected ? (placeholders.hex) : (placeholders.rgb);
});

// Event Listener for performing the Convertion
performConvertion.addEventListener("click", () => {
    const rgb: number[] = isHexSelected ? hexToRgb(target.value) : RgbToArray(target.value);

    if (rgb == null || rgb.length !== 3) {
        alert("Invalid format!");
        return;
    }
    const color = new Color(rgb[0], rgb[1], rgb[2]);
    const solver = new Solver(color);
    const result = solver.solve();

    const actualPixel: HTMLElement = document.querySelector(".actual-pixel");
    actualPixel.style.backgroundColor = color.toString();

    let lossMessage: string;
    let resultLoss: number = result.loss;

    if (resultLoss < 1)
        lossMessage = "This is an almost perfect result.";
    else if (resultLoss < 5)
        lossMessage = "This is close enough.";
    else if (resultLoss < 15)
        lossMessage = "The color is somewhat off. Consider running it again.";
    else 
        lossMessage = "The color is extremely off. Run it again!";

    const filteredPixel: HTMLDivElement = document.querySelector(".filtered-pixel");
    filteredPixel.style.filter = result.filterRaw;

    const filterDetail: HTMLElement = document.querySelector(".filter-detail");
    filterDetail.innerText = result.filter;
    document.querySelector(".loss-detail").innerHTML = `Loss: ${result.loss.toFixed(1)}. <b>${lossMessage}</b>`;
});

// Toggle Sidebar On/Off
const openBtn = document.getElementById("open-more-info");
const closeBtn = document.getElementById("close-more-info");
const moreInfoBar = document.querySelector(".more-info");

openBtn.addEventListener("click", () => {
    moreInfoBar.classList.add("show");
});

closeBtn.addEventListener("click", () => {
    moreInfoBar.classList.remove("show");
});