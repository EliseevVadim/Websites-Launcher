function MySlider (id) {
    let  currentPos = 0;
    let  nextPos = 1;
    let slides = document.getElementsByClassName("slider-item");
    let prevPos = slides.length - 1;
    let rightArrow = document.getElementById('right-arrow');
    let leftArrow = document.getElementById('left-arrow');
    let indicatorsArea = document.getElementById('slider-indicators');
    let  indicators;

    this.cooldown = 3000;
    slides[currentPos].setAttribute('rel', 'active');
    slides[prevPos].setAttribute('rel', 'prev');
    slides[nextPos].setAttribute('rel', 'next');
    rightArrow.onclick = loadNext;
    leftArrow.onclick = loadPrev;

    this.createIndicators = function () {
        for (let  i = 0; i < slides.length; i++) {
            indicatorsArea.innerHTML += "<div class='slider-indicator'>";
        }
        indicators = indicatorsArea.children;
        for (let  i = 0; i < indicators.length; i++) {
            indicators[i].index = i;
            indicators[i].addEventListener('click', loadByIndex);
        }
        indicators[currentPos].setAttribute('rel', 'active');
    }
    function loadNext() {
        prepareToUpdate(true);
        if (currentPos === slides.length - 1) {
            currentPos = 0;
        }
        else {
            currentPos++;
        }
        updateIndexes();
        redraw();
    }
    
    function loadPrev() {
        prepareToUpdate(false);
        if (currentPos === 0) {
            currentPos = slides.length - 1;
        }
        else {
            currentPos--;
        }
        updateIndexes();
        redraw();
    }
    
    function  loadByIndex() {
        if (this.index !== currentPos) {
            slides[currentPos].removeAttribute('rel');
            slides[prevPos].removeAttribute('rel');
            slides[nextPos].removeAttribute('rel');
            indicators[currentPos].removeAttribute('rel');
            currentPos = this.index;
            updateIndexes();
            redraw();
        }
    }
    
    function updateIndexes () {
        if (currentPos === slides.length - 1) {
            nextPos = 0;
        }
        else {
            nextPos = currentPos + 1;
        }
        if (currentPos === 0) {
            prevPos = slides.length - 1;
        }
        else  {
            prevPos = currentPos - 1;
        }
    }
    
    function prepareToUpdate(loadNext) {
        if (loadNext) {
            slides[prevPos].removeAttribute('rel');
        }
        else  {
            slides[nextPos].removeAttribute('rel');
        }
        indicators[currentPos].removeAttribute('rel');
    }
    
    function redraw() {
        indicators[currentPos].setAttribute('rel', 'active');
        slides[currentPos].setAttribute('rel', 'active');
        slides[prevPos].setAttribute('rel', 'prev');
        slides[nextPos].setAttribute('rel', 'next');
    }
    
    this.update = function () {
        loadNext();
    }
}

window.onload = function () {
    let mySlider = new MySlider("selfMadeSlider");
    mySlider.createIndicators();
    window.timerId = window.setInterval(mySlider.update, mySlider.cooldown);
}