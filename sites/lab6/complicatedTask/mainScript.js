let searchButton = document.getElementById('search-button');
let resultsList = document.getElementById('results-list');
let dateField = document.getElementById('date-holder');
let weekField = document.getElementById('week-holder');
let searchField = document.getElementById('search-field');

let coursesSelect = document.getElementById('course');
let groupsSelect = document.getElementById('group');
let daysSelect = document.getElementById('day');

let courses;
let weekNumber;
let selectedCourseIndex = 2;
let selectedCourse;
let selectedGroupIndex = 0;
let selectedGroup;
let currentSubjects;
let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
let date = new Date();
let operationalDate = date;
let todayIndex = date.getDay();
let selectedDayIndex = date.getDay();
let requiredDay = days[selectedDayIndex];
let dateInLine = getDateLine();
let bells;

let scheduleRecords;
let explanations;
let expandedContent = undefined;

dateField.textContent = dateInLine;
weekField.textContent = isHighWeek() ? "верхняя неделя" : "нижняя неделя";
weekField.setAttribute('content', weekNumber.toString());
searchButton.onclick = searchSubjects;

coursesSelect.onchange = function () {
    selectedCourseIndex = coursesSelect.options.selectedIndex;
}

groupsSelect.onchange = function () {
    selectedGroupIndex = groupsSelect.options.selectedIndex;
}

daysSelect.onchange = function () {
    selectedDayIndex = parseInt(daysSelect.value);
    requiredDay = days[selectedDayIndex];
    date.setDate(date.getDate() + selectedDayIndex - todayIndex);
    operationalDate = date;
    date = new Date();
    dateInLine = getDateLine();
}

window.onload = function () {
    daysSelect.options.selectedIndex = selectedDayIndex - 1;
    groupsSelect.options.selectedIndex = parseInt(readCookie('groupIndex'));
    coursesSelect.options.selectedIndex = parseInt(readCookie('courseIndex'));
    selectedCourseIndex = coursesSelect.options.selectedIndex;
    selectedGroupIndex = groupsSelect.options.selectedIndex;
    fetch('bells.json')
        .then((response)=>{
            return response.json();
        })
        .then((json)=> {
            bells = json.data;
            fetch('schedule.json')
                .then((response)=>{
                    return response.json();
                })
                .then((json)=> {
                    courses = json.courses;
                    displaySubjectsByChoice();
                });
        });
}

function isHighWeek () {
    let currentDate = new Date();
    let pivot = new Date(currentDate.getFullYear(),7,30); // понедельник перед началом учебного года
    let numberOfDays = Math.floor((currentDate - pivot) / (24 * 60 * 60 * 1000));
    let result = Math.ceil((numberOfDays) / 7);
    weekNumber = result;
    return result % 2 === 1;
}

function displayOneSubject(subject) {
    resultsList.innerHTML += `
                    <li class="schedule-record">
                        <div class="date-field">
                            <span class="day">${requiredDay}</span>
                            <span class="date">${dateInLine}</span>
                        </div>
                        <div class="time-field">
                            <span class="pair-number">${subject.pairNumber} пара</span>
                            <span class="time">${bells[subject.pairNumber - 1].time}</span>
                        </div>
                        <div class="subject-field">
                            <span class="subject-name">${subject.name}</span>
                            <span class="teachers-info">${subject.teacher}</span>
                        </div>
                        <div class="place-field">
                            <span>${subject.location}</span>
                        </div>
                    </li>
                    <li class="explanation">
                        <h1>Информация</h1>
                        <div class="explanation-pair">
                            <span class="property">Название</span>
                            <span class="value">${subject.name}</span>
                        </div>
                        <div class="explanation-pair">
                            <span class="property">Номер пары</span>
                            <span class="value">${subject.pairNumber}</span>
                        </div>
                        <div class="explanation-pair">
                            <span class="property">Время пары</span>
                            <span class="value">${bells[subject.pairNumber - 1].time}</span>
                        </div>
                        <div class="explanation-pair">
                            <span class="property">Преподаватель</span>
                            <span class="value">${subject.teacher}</span>
                        </div>
                        <div class="explanation-pair">
                            <span class="property">Место проведения</span>
                            <span class="value">${subject.location}</span>
                        </div>
                    </li>`;
}

function displaySubjectsByChoice(needToFilter) {
    selectedCourse = courses[selectedCourseIndex];
    selectedGroup = selectedCourse.groups[selectedGroupIndex];
    getSubjects(needToFilter);
    try {
        for (let i = 0; i < currentSubjects.length; i++) {
            if (!Array.isArray(currentSubjects[i])) {
                displayOneSubject(currentSubjects[i]);
            }
            else {
                let subject = isHighWeek() ? currentSubjects[i][0] : currentSubjects[i][1];
                displayOneSubject(subject);
            }
        }
        scheduleRecords = document.getElementsByClassName('schedule-record');
        explanations = document.getElementsByClassName('explanation');
        for (let i = 0; i < explanations.length; i++) {
            explanations[i].style.transition = 'max-height 1s';
        }
        for (let record of scheduleRecords) {
            record.onclick = expandContent;
        }
    }
    catch (e) {
        
    }
}

function searchSubjects() {
    resultsList.innerHTML = '';
    document.cookie = `dayIndex = ${selectedDayIndex - 1}`;
    document.cookie = `groupIndex = ${selectedGroupIndex}`;
    document.cookie = `courseIndex = ${selectedCourseIndex}`;
    if (searchField.value === '') {
        displaySubjectsByChoice(false);
    }
    else {
        displaySubjectsByChoice(true);
    }
}

function getDateLine() {
    return `${operationalDate.getDate().toString()}.${(operationalDate.getMonth() + 1).toString()}.${operationalDate.getFullYear().toString()}`;
}

function  getSubjects(needToFilter) {
    try {
        currentSubjects = selectedGroup.days.filter(function (day) {
            return day.daysName === requiredDay;
        })[0].subjects;
        if (needToFilter) {
            currentSubjects = currentSubjects.filter(function (subject) {
                try {
                    return subject.name.toLowerCase().includes(searchField.value.toLowerCase());
                }
                catch (e) {
                    return false;
                }
            })
        }
    }
    catch (e) {
        currentSubjects = undefined;
    }
}

function expandContent () {
    try {
        expandedContent.style.maxHeight = '0';
    }
    catch (e) {

    }
    let content = this.nextElementSibling;
    if (content !== expandedContent) {
        content.style.maxHeight = content.scrollHeight + "px";
        expandedContent = content;
    }
    else {
        expandedContent = undefined;
    }
}

function readCookie(name) {
    let cookName = name + "=";
    let cookList = document.cookie.split(";");
    for (let i = 0; i < cookList.length; i++) {
        let c = cookList[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(cookName) === 0) {

            return c.substring(cookName.length, c.length);
        }
    }
    return null;
}
