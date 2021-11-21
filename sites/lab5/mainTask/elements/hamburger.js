let hamburger = document.getElementById('hamburger-menu');
let hamburgerButton = document.getElementById('hamburger-icon');
let itemContainer = hamburger.querySelector('ul');
let items = hamburger.querySelectorAll('li');
const collapseQuery = window.matchMedia('(max-width: 800px)');
const expandQuery = window.matchMedia('(min-width: 1000px)');
let initialHtml = itemContainer.innerHTML;
let updatedHtml = ''

for (let i = 0; i < items.length; i++) {
    updatedHtml += items[i].outerHTML;
}

hamburgerButton.onclick = expandHamburger;

function updateHamburger (query) {
    if (query.matches) {
        hamburger.setAttribute('rel', 'collapsed');
    }
}

function returnHamburger(query) {
    if(query.matches) {
        hamburger.removeAttribute('rel');
        itemContainer.innerHTML = initialHtml;
    }
}

function expandHamburger() {
    if (hamburger.getAttribute('rel') === 'expanded') {
        itemContainer.innerHTML = initialHtml;
        hamburger.setAttribute('rel', 'collapsed');
    }
    else {
        hamburger.setAttribute('rel', 'expanded');
        itemContainer.innerHTML = updatedHtml;
    }
}

collapseQuery.addListener(updateHamburger);
updateHamburger(collapseQuery);

expandQuery.addListener(returnHamburger);
returnHamburger(expandQuery);
