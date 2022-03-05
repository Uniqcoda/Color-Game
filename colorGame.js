let numCircles = 3;
let colors = [];
let pickedColor;
let circles = document.querySelectorAll('.circle');
let colorDisplay = document.getElementById('colorDisplay');
let messageDisplay = document.querySelector('#message');
let h2 = document.querySelector('h2');
let resetButton = document.querySelector('#reset');
let modeButtons = document.querySelectorAll('.mode');
let tipsButton = document.querySelector('.tips-button');
let tipsContainer = document.querySelector('.tips-container');

function init() {
    setupModeButtons();
    setupCircles();
    displayTips();
    reset();
}

function setupModeButtons() {
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function () {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            this.classList.add('selected');
            this.textContent === 'Beginner' ? (numCircles = 3) : (numCircles = 6);
            reset();
        });
    }
}

function setupCircles() {
    for (let i = 0; i < circles.length; i++) {
        //add click listeners to circles
        circles[i].addEventListener('click', function () {
            //grab color of clicked circles
            let clickedColor = this.style['background-color'];
            //compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = 'Correct!';
                resetButton.textContent = 'Play Again?';
                changeColors(clickedColor);
                h2.style['background-color'] = clickedColor;
            } else {
                this.style['background-color'] = '#232323';
                messageDisplay.textContent = 'Try Again';
            }
        });
    }
}

function reset() {
    colors = generateRandomColors(numCircles);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = 'New Colors';
    messageDisplay.textContent = '';
    //change colors of circles
    for (let i = 0; i < circles.length; i++) {
        if (colors[i]) {
            circles[i].style.display = 'block';
            circles[i].style['background-color'] = colors[i];
        } else {
            circles[i].style.display = 'none';
        }
    }
    h2.style['background-color'] = 'steelblue';
}

resetButton.addEventListener('click', function () {
    reset();
});

function changeColors(color) {
    //loop through all circles
    for (let i = 0; i < circles.length; i++) {
        //change each color to match given color
        circles[i].style['background-color'] = color;
    }
}

function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    let arr = [];
    //repeat num times
    for (let i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor());
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick a "red" from 0 - 255
    let r = Math.floor(Math.random() * 256);
    //pick a "green" from  0 -255
    let g = Math.floor(Math.random() * 256);
    //pick a "blue" from  0 -255
    let b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function displayTips() {
    //add click listeners to tips button
    tipsButton.addEventListener('click', function () {
        if (tipsContainer.style.display === 'none' || tipsContainer.style.display === '') {
            tipsContainer.style.display = 'flex';
            tipsButton.textContent = 'Hide Tips?';
        } else {
            tipsContainer.style.display = 'none';
            tipsButton.textContent = 'Show Tips?';
        }
    });
}

init();
