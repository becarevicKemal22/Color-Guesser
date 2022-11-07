const buttonList = document.getElementById("color-options");
const buttons = Array.from(buttonList.querySelectorAll("li"));
const colorBox = document.getElementsByClassName("color-box")[0];
const overlayCorrect = document.querySelector(".color-box").firstElementChild;
const overlayWrong = document.querySelector(".color-box").lastElementChild;
const scoreElement = document.querySelector("main").firstElementChild;

let currentColor = null;
let correctButton = null;
let score = 0;

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

const updateScore = () => {
    scoreElement.textContent = `Score: ${score.toString()}`;
};

const colorButtons = (clickedButtonIndex) => {
    buttons[correctButton].classList.add("correct");
    buttons[correctButton].classList.add("enlarge1-1");
    if (clickedButtonIndex !== correctButton) {
        buttons[clickedButtonIndex].classList.add("incorrect");
        buttons[clickedButtonIndex].classList.add("un-hover");
    }
};

const unColorButtons = (clickedButtonIndex) => {
    buttons[correctButton].classList.remove("correct");
    buttons[correctButton].classList.remove("enlarge1-1");
    buttons.forEach((button, index, buttons) => {
        if (button.classList.contains("incorrect")) {
            button.classList.remove("incorrect");
            button.classList.remove("un-hover");
        }
    });
};

const selectionHandler = (buttonIndex) => {
    let targetTimeout = null;
    buttons[correctButton].classList.add("correct");
    if (buttonIndex === correctButton) {
        overlayCorrect.classList.toggle("visible");
        score++;
        targetTimeout = 1000;
    } else {
        overlayWrong.classList.toggle("visible");
        score = 0;
        targetTimeout = 1500;
    }
    colorButtons(buttonIndex);
    updateScore();
    setTimeout(setRound, targetTimeout);
};

const hideOverlays = () => {
    if (overlayCorrect.classList.contains("visible")) {
        overlayCorrect.classList.remove("visible");
    }
    if (overlayWrong.classList.contains("visible")) {
        overlayWrong.classList.remove("visible");
    }
};

const setGameUp = () => {
    setUpColor();

    buttons.forEach((button, index, buttons) => {
        button.addEventListener("click", selectionHandler.bind(this, index));
    });
};

const setRound = () => {
    hideOverlays();
    unColorButtons();
    setUpColor();
};

setGameUp();
