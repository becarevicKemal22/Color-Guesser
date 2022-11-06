const buttonList = document.getElementById("color-options");
const buttons = Array.from(buttonList.querySelectorAll("li"));
const colorBox = document.getElementById("color-box");
const overlayCorrect = document.querySelector('#color-box .overlay-correct');
const overlayWrong = document.querySelector('#color-box .overlay-wrong');

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
        if (index === correctButton) {
            button.textContent = `rgb (${currentColor.red}, ${currentColor.green}, ${currentColor.blue})`;
        } else {
            const rndmColor = generateNewColor();
            button.textContent = `rgb (${rndmColor.red}, ${rndmColor.green}, ${rndmColor.blue})`;
        }
    });
    colorBox.style.backgroundColor = `rgb(${currentColor.red}, ${currentColor.green}, ${currentColor.blue})`;
};

const buttonClickHandler = (buttonIndex) => {
    console.log(buttonIndex, correctButton);
    if (buttonIndex === correctButton) {
        overlayCorrect.classList.toggle('visible');
        setTimeout(setRound, 1000);
    } else {
        overlayWrong.classList.toggle('visible');
        setTimeout(setRound, 1000);
    }
};

const hideOverlays = () => {
    if(overlayCorrect.classList.contains('visible')){
        overlayCorrect.classList.remove('visible');
    }
    if(overlayWrong.classList.contains('visible')){
        overlayWrong.classList.remove('visible');
    }
}

const setGameUp = () => {
    setUpColor();

    buttons.forEach((button, index, buttons) => {
        button.addEventListener("click", buttonClickHandler.bind(this, index));
    });
};

const setRound = () => {
    hideOverlays();
    setUpColor();
}

setGameUp();