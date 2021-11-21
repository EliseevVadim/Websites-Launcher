let openButton = document.getElementById('show-button');
let closeButton = document.getElementById('close-button');
let modalArea = document.getElementById('modal-area');

openButton.onclick = openWindow;
closeButton.onclick = closeWindow;

function openWindow () {
    modalArea.setAttribute('rel', 'active');
}

function closeWindow() {
    modalArea.removeAttribute('rel');
}