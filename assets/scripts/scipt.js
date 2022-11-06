const buttonList = document.getElementById("color-options");
const buttons = Array.from(buttonList.querySelectorAll("li"));
const colorBox = document.getElementById("color-box");

let currentColor = null;
let correctButton = null;

const generateNewColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return {
        red: red,
        green: green,
        blue: blue,
    };
};

const setUpColor = () => {
    currentColor = generateNewColor();
    correctButton = Math.floor(Math.random() * 3);
    buttons.forEach((button, index, buttons) => {
        if(index === correctButton){
            button.textContent = `rgb (${currentColor.red}, ${currentColor.green}, ${currentColor.blue})`;
        }else{
            const rndmColor = generateNewColor();
            button.textContent = `rgb (${rndmColor.red}, ${rndmColor.green}, ${rndmColor.blue})`
        }
    });
    colorBox.style.backgroundColor = `rgb(${currentColor.red}, ${currentColor.green}, ${currentColor.blue})`;
};

const buttonClickHandler = (buttonIndex) => {
    console.log(buttonIndex, correctButton);
    if(buttonIndex === correctButton){
        console.log("Correct!");
        setUpColor();
    }else{
        console.log("Not correct!");
    }
}

setUpColor();

buttons.forEach((button, index, buttons) => {
    button.addEventListener('click', buttonClickHandler.bind(this, index));
})