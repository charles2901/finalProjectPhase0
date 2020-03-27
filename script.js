const windowHeight = window.innerHeight
const windowWidth = window.innerWidth
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d")
canvas.width = 1000
canvas.height = 600
const scaleBoardWidth = 25;
const scaleBoardHeight = canvas.height / 4;

var score = {
    playerOne : 0,
    playerTwo : 0
}

window.addEventListener('load', function(){

    this.window.addEventListener('keydown', function(e){
        if(e.key == 'Escape'){
            document.getElementById('info-games').style = 'visibility: hidden;'
            document.getElementById('start-game').style = 'visibility: unset;'
            var playerOne = new PlayerOne()
            var playerTwo = new PlayerTwo()
            var ball = new Ball()
            var interval = this.window.setInterval(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                playerOne.draw()
                playerTwo.draw()
                ball.update()
                ball.draw()
                ball.checkPlayerOne(playerOne)
                ball.checkPlayerTwo(playerTwo)
                if(score.playerOne == 5 || score.playerTwo == 5){
                    if(score.playerOne == 5){
                        document.getElementById('win-message').innerHTML = 'PLAYER 1 WIN';
                    }
                    else{
                        document.getElementById('win-message').innerHTML = 'PLAYER 2 WIN';
                    }
                    document.getElementById('win-message').style = 'padding: 50px';
                    creatingInfoMess()
                    
                    this.clearInterval(interval)
                    this.window.addEventListener('keydown', function(e){
                        if(e.code == 'Enter'){
                            window.location.reload()
                        }
                    })
                }
            }, 100)
            
            this.window.addEventListener('keydown', ((evt) => {
                const directionPlayerOne = evt.key
                playerOne.changePosition(directionPlayerOne)
                const directionPlayerTwo = evt.key.replace('Arrow', '')
                playerTwo.changePosition(directionPlayerTwo)
                if(evt.code == 'Space' && ball.xSpeed == 0 && ball.ySpeed == 0){
                    let randomXSpeed = randomNumber()*25
                    let randomYSpeed = randomNumber()*25
                    ball.xSpeed += randomXSpeed
                    ball.ySpeed += randomYSpeed
                    document.getElementById('start-game').style = 'visibility: hidden;'
                }
            }))
        }
    })

    
})
function randomNumber(){
    let random = Math.floor(Math.random()*3) - 1
    if(random == 0){
        return randomNumber  ()
    }
    return random
}
function creatingInfoMess(){
    let winMessage = document.querySelector('#win-message')
    let createDiv = document.createElement('div')
    let mainDivAttrId = document.createAttribute('id')
    mainDivAttrId.value = 'info'
    createDiv.setAttributeNode(mainDivAttrId)
    winMessage.appendChild(createDiv)
    document.getElementById('info').innerHTML = "Press 'Enter' to play again"
    document.getElementById('info').style = 'font-size: 20px'
}
function Ball(){
    this.rad = 10;
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.xSpeed = 0;
    this.ySpeed = 0;

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x + this.rad, this.y, 10, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
    } 
    this.update = function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if(this.y < 0 + this.rad){
            this.y = 0 + this.rad
            this.ySpeed = -this.ySpeed
        }
        else if(this.y > canvas.height - this.rad){
            this.y = canvas.height - this.rad
            this.ySpeed = -this.ySpeed
        }
    }
    this.checkPlayerOne = function(playerOne){
        if(this.x < scaleBoardWidth*2){
            if(this.y > playerOne.y && this.y < playerOne.y + scaleBoardHeight){
                this.x = scaleBoardWidth*2  
                this.xSpeed = -this.xSpeed
            }
            else{
                this.x = canvas.width/2;
                this.y = canvas.height/2;
                this.xSpeed = 0;
                this.ySpeed = 0;
                score.playerTwo++
                document.getElementById('scoreplayertwo').innerHTML = score.playerTwo;
            }
        }
    }
    this.checkPlayerTwo = function(playerTwo){{
        if(this.x > canvas.width - 3*scaleBoardWidth){
            if(this.y > playerTwo.y && this.y < playerTwo.y + scaleBoardHeight){
                this.x = canvas.width - scaleBoardWidth*2
                this.xSpeed = -this.xSpeed
            }
            else{
                this.x = canvas.width/2;
                this.y = canvas.height/2;
                this.xSpeed = 0;
                this.ySpeed = 0;
                score.playerOne++
                document.getElementById('scoreplayerone').innerHTML = score.playerOne;
            }
        }
    }}
}

function PlayerOne(){
    this.x = scaleBoardWidth    
    this.y = (canvas.height-scaleBoardHeight)/2
    this.speed = 30

    this.draw = function(){
        ctx.fillRect(this.x, this.y, scaleBoardWidth, scaleBoardHeight)
    }
    this.changePosition = function(direction){
        switch(direction){
            case 'w':
                this.y -= this.speed;
                break;
            case 's':
                this.y += this.speed;
                break;
        }
        if(this.y < 0){
            this.y = 0
        }
        else if(this.y > canvas.height - scaleBoardHeight){
            this.y = canvas.height - scaleBoardHeight
        }
    }
}

function PlayerTwo(){
    this.x = canvas.width - 2*scaleBoardWidth
    this.y = (canvas.height-scaleBoardHeight)/2
    this.speed = 25
    
    this.draw = function(){
        ctx.fillRect(this.x, this.y, scaleBoardWidth, scaleBoardHeight)
    }
    this.changePosition = function(direction){
        switch(direction){
            case 'Up':
                this.y -= this.speed;
                break;
            case 'Down':
                this.y += this.speed;
                break;
        }
        if(this.y < 0){
            this.y = 0
        }
        else if(this.y > canvas.height - scaleBoardHeight){
            this.y = canvas.height - scaleBoardHeight
        }
    }
}