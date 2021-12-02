let button = document.getElementById('search-button');
let inputField = document.getElementById('search-field');
let resultsList = $('.results-list')[0];
let loadStep;
let data = [];

const recordsPerStep = 10;
let needAll = false;

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
                if (data.length === 0) {
                    alert("Ничего не найдено");
                    return;
                }
                setElementsVisibility('block');
                loadStep = 1;
                console.log(data.length)
                loadOnStep();
            })
    }
}

function displayRecords(count, isNeeded) {
    console.log(count);
    let lowerBound = (loadStep - 1) * recordsPerStep;
    let upperBound = isNeeded ? data.length : (loadStep * recordsPerStep);
    for (let i = lowerBound; i < upperBound; i++) {
        resultsList.innerHTML += `<li>${data[i]}</li>`;
    }
    return new Promise(function (resolve, reject) {
        return isNeeded ? reject() : resolve();
    });
}

function loadAll() {
    loadOnStep();
}

function loadOnStep() {
    needAll = loadStep * recordsPerStep > data.length;
    displayRecords(needAll ? data.length : recordsPerStep, needAll).then((data) => {
        loadStep++;
        $('#load-all').css('display', 'block');
    }).catch(() => {
        $('#load-all').css('display', 'none');
    })
} 

function setElementsVisibility(visibility) {
    $('.results-list').css('display', visibility);
    $('.results-title').css('display', visibility);
}