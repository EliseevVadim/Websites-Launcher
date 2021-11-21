let ranger = document.getElementById('ranger');
let borders = document.getElementsByClassName('border-value');
let leftBar = document.getElementById('first-bar');
let rightBar = document.getElementById('second-bar');
let leftSpan = document.getElementById('left-value');
let rightSpan = document.getElementById('right-value');
let scrollField = document.getElementById('scroll-field');

let minValue = parseInt( ranger.getAttribute('startValue'));
let maxValue = parseInt(ranger.getAttribute('endValue'));

let currentValue;

let coefficient = (maxValue - minValue)/(scrollField.clientWidth - leftBar.clientWidth);

const minimalGap = 5;

let leftPixels = 0;
let rightPixels = scrollField.clientWidth;

leftBar.onmousedown = selectFirstBar;
leftBar.onmouseup = releaseFirstBar;
rightBar.onmousedown = selectSecondBar;
rightBar.onmouseup = releaseSecondBar;
scrollField.onmousemove = moveBars;

leftBar.value = minValue;
leftBar.selected = false;
rightBar.value = maxValue;
rightBar.selected = false;

leftSpan.textContent = minValue.toString();
rightSpan.textContent = maxValue.toString();

borders[0].textContent = minValue.toString();
borders[1].textContent = maxValue.toString();

function selectFirstBar () {
    leftBar.selected = true;
}

function releaseFirstBar () {
    leftBar.selected = false;
}

function selectSecondBar () {
    rightBar.selected = true;
}

function releaseSecondBar () {
    rightBar.selected = false;
}

function moveBars(e) {
    let rectangle = scrollField.getBoundingClientRect();
    let x = e.clientX - rectangle.left;
    if (mouseInElementArea(e, rectangle)) {
        releaseAll();
    }
    else {
        currentValue = Math.round(x * coefficient);
        if (leftBar.selected && leftBar.value <= rightBar.value - minimalGap && leftBar.value >= minValue) {
            currentValue = Math.max(currentValue, minValue);
            if (currentValue > parseInt(rightBar.value) - minimalGap) {
                leftBar.value = rightBar.value - minimalGap;
            }
            else {
                leftBar.value = currentValue;
            }
            leftSpan.textContent = leftBar.value;
            leftPixels = (leftBar.value / coefficient);
            leftBar.style.left = leftPixels + 'px';
            console.log('linear-gradient(to right, red '+ (leftBar.value / coefficient) +'px, blue 100px)')
            scrollField.style.background = 'linear-gradient(to right, green '+ leftPixels +'px, brown ' +  leftPixels + 'px, brown '+ rightPixels + 'px, green '+ rightPixels +'px)';
        }
        else if (rightBar.selected && leftBar.value <= rightBar.value - minimalGap && rightBar.value <= maxValue) {
            currentValue = Math.min(currentValue, maxValue);
            if (currentValue > parseInt(leftBar.value) + minimalGap) {
                rightBar.value = currentValue;
            }
            else {
                rightBar.value = leftBar.value + minimalGap;
            }
            rightSpan.textContent = rightBar.value.toString();
            rightPixels = (rightBar.value / coefficient);
            rightBar.style.left = rightPixels + 'px';
            scrollField.style.background = 'linear-gradient(to right, green '+ leftPixels +'px, brown ' +  leftPixels + 'px, brown '+ rightPixels + 'px, green '+ rightPixels +'px)';
        }
    }
}

function mouseInElementArea(e, element) {
    return e.clientX < element.left || e.clientY < element.top || e.clientX > element.right || e.clientY > element.bottom
}

function releaseAll () {
    leftBar.selected = false;
    rightBar.selected = false;
}