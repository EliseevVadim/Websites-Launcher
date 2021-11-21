let tabs = document.getElementById('tabs');
let buttons = tabs.children;
let contents = document.getElementsByClassName('tab-content');
let currentIndex = 0;

activateContent();

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', changeContent);
}

function activateContent () {
    contents[currentIndex].classList.add('active');
    buttons[currentIndex].classList.add('active');
}

function changeContent() {
    contents[currentIndex].classList.remove('active');
    buttons[currentIndex].classList.remove('active');
    currentIndex = parseInt(this.value);
    activateContent();
}