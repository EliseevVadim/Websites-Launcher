let leftBall = document.getElementById('leftCircle');
let  rightBall = document.getElementById('rightCircle');
let balls = document.getElementsByClassName('circle');

function ballClick () {
    leftBall.setAttribute('rel', 'running');
    rightBall.setAttribute('rel', 'running');
    setTimeout(()=> {
        leftBall.removeAttribute('rel');
        rightBall.removeAttribute('rel');
    }, 16000);
}

for (let i = 0; i < balls.length; i++) {
    balls[i].addEventListener('click', ballClick);
}