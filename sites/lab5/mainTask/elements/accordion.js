let accordionButtons = document.getElementsByClassName('menu-title');
let menuContent = document.getElementsByClassName('menu-content');

menuContent[0].style.maxHeight = menuContent[0].scrollHeight + "px";
let expandedContent = menuContent[0];

setTimeout(()=> {
        for (let i = 0; i < menuContent.length; i++) {
            menuContent[i].style.transition = 'max-height 1s';
        }
    }, 1000
)

function expandContent() {
    expandedContent.style.maxHeight = '0';
    let content = this.nextElementSibling;
    content.style.maxHeight = content.scrollHeight + "px";
    expandedContent = content;
}

for (let button of accordionButtons) {
    button.onclick = expandContent;
}
