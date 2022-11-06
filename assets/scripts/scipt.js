const buttonList = document.getElementById("color-options");
const buttons = Array.from(buttonList.querySelectorAll("li"));
const colorBox = document.getElementById("color-box");

let currentColor = null;

const generateNewColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const color = {
        red: red,
        green: green,
        blue: blue,
    };
    return color;
};

const setUpColor = () => {
    currentColor = generateNewColor();
    colorBox.style.backgroundColor = `rgb(${currentColor.red}, ${currentColor.green}, ${currentColor.blue})`
};

setUpColor()