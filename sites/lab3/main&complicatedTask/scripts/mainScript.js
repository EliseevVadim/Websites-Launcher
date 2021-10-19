let skyButton = document.getElementById('sky-button');

function rollBack() {
    skyButton.setAttribute('rel', 'rollBack');
}

skyButton.addEventListener("click", rollBack);