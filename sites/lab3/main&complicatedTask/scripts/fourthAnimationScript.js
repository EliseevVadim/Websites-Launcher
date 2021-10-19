let writeableSpan = document.getElementById('field');
let leftArrow = document.getElementById('leftArrow');
let  rightArrow = document.getElementById('rightArrow');

function leftArrowClick() {

    if (leftArrow.getAttribute('rel')==='common') {
        leftArrow.setAttribute('rel', '');
        let value = parseInt(writeableSpan.textContent);
        value--;
        writeableSpan.textContent = String(value);
        if (writeableSpan.textContent === '1'){
            leftArrow.setAttribute('rel', 'disabled');
        }
        if (writeableSpan.textContent === '4'){
            rightArrow.setAttribute('rel', 'enabled');
            setTimeout(()=>rightArrow.setAttribute('rel', 'common'), 1000);
        }
        if (leftArrow.getAttribute('rel')!=='disabled') {
            setTimeout(()=>leftArrow.setAttribute('rel', 'common'), 100);
        }
    }
}

function rightArrowClick() {
    if (rightArrow.getAttribute('rel')==='common') {
        rightArrow.setAttribute('rel', '');
        let value = parseInt(writeableSpan.textContent);
        value++;
        writeableSpan.textContent = String(value);
        if (writeableSpan.textContent === '5'){
            rightArrow.setAttribute('rel', 'disabled');
        }
        if (writeableSpan.textContent === '2'){
            leftArrow.setAttribute('rel', 'enabled');
            setTimeout(()=>leftArrow.setAttribute('rel', 'common'), 1000);
        }
        if (rightArrow.getAttribute('rel')!=='disabled') {
            setTimeout(()=>rightArrow.setAttribute('rel', 'common'), 100);
        }
    }
}

leftArrow.addEventListener('click', leftArrowClick);
rightArrow.addEventListener('click', rightArrowClick);
