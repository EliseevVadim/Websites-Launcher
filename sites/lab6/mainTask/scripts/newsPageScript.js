let newsList = [];
let buttonsArea = document.getElementById('nav-buttons');
let newsArea = document.querySelector('main');
const newsPerPage = 5;
buttonsArea.innerHTML = '';
let currentPage;
let pageCount;
let modalArea = document.getElementById('modal-area');
let closeButton = document.getElementById('close-button');
let modalContent = modalArea.querySelector('#modal-window>main');
let content = {
    "title": modalContent.children[0],
    "image": modalContent.children[1],
    "text": modalContent.children[2]
}
let navButtons;
let currentButton;
let prevButton;
let nextButton;

let searchButton = document.getElementById('search-button');
let searchField = document.getElementById('search-field');
let resultList;

let searchUsed = false;

searchButton.onclick = searchNews;
closeButton.onclick = closeNewsWindow;

window.onload = function () {
    fetch('news.json')
        .then((response)=> {
            return response.json();
        })
        .then((json)=> {
            newsList = json.data;
            pageCount = Math.ceil(newsList.length / newsPerPage);
            drawButtonsForList(newsList);
            currentPage = 1;
            prepareButtons();
            loadNewsForCurrentPage(newsList);
        })
}

function loadNewsForCurrentPage(inputList) {
    newsArea.innerHTML = '';
    redrawButtons();
    if (currentPage * newsPerPage <= inputList.length) {
        for (let i = (currentPage - 1) * newsPerPage; i < currentPage * newsPerPage; i++) {
            newsArea.innerHTML += `
                <div class="news-card">
                    <div class="news-title">
                        ${inputList[i].title}
                    </div>
                    <img src="${inputList[i].image}" alt="#">
                    <p>${inputList[i].body.split(' ').slice(0, 50).join(' ')}...</p>
                    <a href="javascript://" rel = ${i} onclick="showNewsWindow(rel)">More info</a>
                </div>
            `
        }
    }
    else {
        for (let i = (currentPage - 1) * newsPerPage; i < inputList.length; i++) {
            newsArea.innerHTML += `
                <div class="news-card">
                    <div class="news-title">
                        ${inputList[i].title}
                    </div>
                    <img src="${inputList[i].image}" alt="#">
                    <p>${inputList[i].body.split(' ').slice(0, 50).join(' ')}...</p>
                    <a href="javascript://" rel = ${i} onclick="showNewsWindow(rel)">More info</a>
                </div>
            `
        }
    }
}

function loadPage(value) {
    currentPage = parseInt(value);
    navButtons[currentPage].classList.add('disabled-button');
    getNews();
    window.scrollTo(0, 0);
}

function loadPrevPage() {
    currentPage--;
    getNews();
    window.scrollTo(0, 0);
}

function loadNextPage() {
    currentPage++;
    getNews();
    window.scrollTo(0, 0);
}

function showNewsWindow (i) {
    i = parseInt(i);
    if (searchUsed) {
        content.title.textContent = resultList[i].title;
        content.image.setAttribute('src', resultList[i].image);
        content.text.textContent = resultList[i].body;
    }
    else {
        content.title.textContent = newsList[i].title;
        content.image.setAttribute('src', newsList[i].image);
        content.text.textContent = newsList[i].body;
    }
    modalArea.setAttribute('rel', 'active');
    modalContent.scrollTo(0, 0);
}

function closeNewsWindow () {
    modalArea.removeAttribute('rel');
}

function redrawButtons() {
    prevButton.classList.remove('disabled-button');
    nextButton.classList.remove('disabled-button');
    currentButton.classList.remove('disabled-button');
    currentButton = navButtons[currentPage];
    currentButton.classList.add('disabled-button');
    if (currentPage === 1) {
        prevButton.classList.add('disabled-button');
    }
    if (currentPage === navButtons.length - 2) {
        nextButton.classList.add('disabled-button');
    }
}

function searchNews() {
    resultList = newsList.filter(function (item) {
        return item.body.toLowerCase().includes(searchField.value.toString().toLowerCase());
    })
    currentPage = 1;
    pageCount = Math.ceil(resultList.length / newsPerPage);
    drawButtonsForList(resultList);
    prepareButtons();
    loadNewsForCurrentPage(resultList);
    window.scrollTo(0, 0);
    searchUsed = true;
}

function drawButtonsForList(inputList) {
    buttonsArea.innerHTML = '';
    buttonsArea.innerHTML = '<button onclick="loadPrevPage()">Prev</button>';
    for (let i = 1; i <= pageCount; i++) {
        buttonsArea.innerHTML += `<button value="${i}" onclick="loadPage(value)">${i}</button>`;
    }
    buttonsArea.innerHTML += '<button style="margin: 0" onclick="loadNextPage()">Next</button>';
}

function getNews() {
    if (searchUsed) {
        loadNewsForCurrentPage(resultList);
    }
    else {
        loadNewsForCurrentPage(newsList);
    }
}

function prepareButtons() {
    navButtons = buttonsArea.children;
    prevButton = navButtons[0];
    nextButton = navButtons[navButtons.length - 1];
    currentButton = navButtons[currentPage];
}