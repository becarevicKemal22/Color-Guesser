const buttons = Array.from(document.getElementById("color-options").querySelectorAll("li"));
const colorBox = document.getElementsByClassName("color-box")[0];
const overlayCorrect = document.querySelector(".color-box").firstElementChild;
const overlayWrong = document.querySelector(".color-box").lastElementChild;
const scoreElement = document.querySelector("main").firstElementChild;

let currentColor = null;
let correctButton = null;
let clickedButtonIndex = null;
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

const updateBoxColor = () => {
    const color = generateNewColor();
    colorBox.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
    return color;
}

const setButtonTexts = (correctButtonIndex) => {
    buttons[correctButtonIndex].textContent = `rgb (${currentColor.red}, ${currentColor.green}, ${currentColor.blue})`;
    buttons.forEach((button, index, buttons) => {
        if (index === correctButtonIndex) {
            return;
        }
        const rndmColor = generateNewColor();
        button.textContent = `rgb (${rndmColor.red}, ${rndmColor.green}, ${rndmColor.blue})`;
    });
}

const applyColors = () => {
    currentColor = updateBoxColor();
    correctButton = Math.floor(Math.random() * 3);
    setButtonTexts(correctButton);
};

const updateScoreElement = () => {
    scoreElement.textContent = `Score: ${score.toString()}`;
};

const toggleCorrectButtonHighlight = () => {
    buttons[correctButton].classList.toggle("correct");
    buttons[correctButton].classList.toggle("enlarge1-1");
}

const toggleButtonHiglights = () => {
    toggleCorrectButtonHighlight();
    if (clickedButtonIndex !== correctButton) {
        console.log(clickedButtonIndex)
        buttons[clickedButtonIndex].classList.toggle("incorrect");
        buttons[clickedButtonIndex].classList.toggle("un-hover");
    }
};

const buttonSelectionHandler = (index) => {
    clickedButtonIndex = index;
    let targetTimeout = null;
    if (clickedButtonIndex === correctButton) {
        overlayCorrect.classList.toggle("visible");
        score++;
        targetTimeout = 1000;
    } else {
        overlayWrong.classList.toggle("visible");
        score = 0;
        targetTimeout = 1500;
    }
    toggleButtonHiglights();
    updateScoreElement();
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
    applyColors();

    buttons.forEach((button, index, buttons) => {
        button.addEventListener("click", buttonSelectionHandler.bind(this, index));
    });
};

const setRound = () => {
    hideOverlays();
    toggleButtonHiglights();
    applyColors();
};

setGameUp();
