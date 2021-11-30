let button = document.getElementById('search-button');
let inputField = document.getElementById('search-field');
let resultsList = $('.results-list')[0];
let data = [];

button.onclick = function () {
    if (inputField.value.length !== 0) {
        resultsList.innerHTML = '';
        setElementsVisibility('none');
        $('#load-all').css('display', 'none');
        fetch('nicknames.json')
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                data = json.data.filter(item => item.toLowerCase().includes(inputField.value.toLowerCase()));
                if (data.length > 0) {
                    setElementsVisibility('block');
                    if (data.length > 10) {
                        for (let i = 0; i < 10; i++) {
                            resultsList.innerHTML += `<li>${data[i]}</li>`;
                        }
                        $('#load-all').css('display', 'block');
                    }
                    else {
                        for (let i = 0; i < data.length; i++) {
                            resultsList.innerHTML += `<li>${data[i]}</li>`;
                        }
                    }
                }
                else {
                    alert('Ничего не найдено')
                }
            })
    }
}

function loadAll() {
    $('#load-all').css('display', 'none');
    for (let  i = 10; i < data.length; i++) {
        resultsList.innerHTML += `<li>${data[i]}</li>`
    }
}

function setElementsVisibility(visibility) {
    $('.results-list').css('display', visibility);
    $('.results-title').css('display', visibility);
}