score = 0;
cross = true;
touched = false

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = (e) => {
    if (touched==false) {
        if (e.keyCode == 38) {
            dino = document.querySelector('.dino')
            dino.classList.add('animateDino')
            setTimeout(() => {
                dino.classList.remove('animateDino')
            }, 700)
        }
        if (e.keyCode == 39) {
            dino = document.querySelector('.dino')
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
            dino.style.left = dinoX + 112 + 'px';
        }
        if (e.keyCode == 37) {
            dino = document.querySelector('.dino')
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
            dino.style.left = dinoX - 112 + 'px';
        }
    }
}

setInterval(() => {
    dino = document.querySelector('.dino')
    gameOver = document.querySelector('.gameOver')
    obstacle = document.querySelector('.obstacle')

    dx = window.getComputedStyle(dino, null).getPropertyValue('left')
    dy = window.getComputedStyle(dino, null).getPropertyValue('top')

    ox = window.getComputedStyle(obstacle, null).getPropertyValue('left')
    oy = window.getComputedStyle(obstacle, null).getPropertyValue('top')
    offsetX = Math.abs(dx.toString().substring(0, dx.length - 2) - ox.toString().substring(0, ox.length - 2))
    offsetY = Math.abs(dy.toString().substring(0, dy.length - 2) - oy.toString().substring(0, oy.length - 2))
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over Reload Again to play."
        obstacle.classList.remove('obstacleAni')
        touched = true
        audiogo.play()
        setTimeout(() => {
            audiogo.pause()
            audio.pause()
        }, 1000)
    }
    else if (offsetX < 145 && cross) {
        score += 1
        updateScore(score)
        cross = false
        setTimeout(() => {
            cross = true
        }, 1000)
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('.animate-duration'))
            newDur = aniDur - 0.1
            obstacle.style.animationDuration = newDur + 's'

        }, 500)
    }
}, 10)

function updateScore(score) {
    scoreCont.innerHTML = "Your Score : " + score
}