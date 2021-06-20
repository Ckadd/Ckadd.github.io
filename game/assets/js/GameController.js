
/**
 * If you have completely understood whats going on here in the code then
 * your next challenge is to recreate this game in Object Oriented Style.
 * Also you can add some more effects like moving clouds, birds, sounds to game.
 */

//these are global variables because they need to be accessed by multiple functions.
var score = 0,
    highScore = 0,
    time = 60,
    timeStartGame = 3,
    timerStartGame,
    timerEndGame,
    timer,
    idleTime=0,
    countClick=0,
    maxrank1 = 20,
    maxrank2 = 24,
    maxrank3 = 25,    
    point1=1,
    point2=2,
    heart=0,
    checkinStart=50,
    checkin1=8.3,
    checkin2=10;

var IsPlaying = false,
    IsSound = true;
var timeBoard = document.getElementById('time'),
    scoreBoard = document.getElementById('score'),
    btnStart = document.getElementById('btn'),
    numberClick = document.getElementById('numberclick'),
    imgBoom =document.getElementById('boom'),
    imgCar =document.getElementById('car'),
    dispHeart = document.getElementById('dispHeart'),
    checkin =document.getElementById('checkin')
    ;

    var myGameWhell;
    var myObstacles = [];
    var mySound;
    var myMusic;

getRandomCar();


function startGame() {

    // myGameWhell = new component(30, 30, "red", 10, 120);
    // mySound = new sound("bounce.mp3");
    myMusic = new sound("assets/sound/background.mp3");
    myMusic.play();
    myGameArea.start();

    // document.getElementById('showpoint').innerText = checkin.offsetLeft;
    // btnStart.disabled = "disabled";
    // time = 60;
    // timeStartGame = 3;
    // timeBoard.innerText = time;
    // document.getElementById('countdown').src = 'assets/images/'+timeStartGame+'.png'
    // document.getElementById('countdown').style.display = 'block'
    // playSound('countdown.wav');
    // timerStartGame = setInterval(countDownStartGame,1000);
    // document.getElementById('heart1').style.display = 'block';
    // document.getElementById('heart2').style.display = 'block';
    // document.getElementById('heart3').style.display = 'block';

}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


/**
เริ่มคลิก
 */
function fix() {
    if (!IsPlaying) {
        return;
    }
    idleTime = 0; //ถ้าคลิก
    countClick +=1; //นับจำนวนที่คลิก

    // จำนวนที่กด 1-20 +1  ,21-24 +2 เหลือง, 25 แดง
    if (score < maxrank1){
        score = score + point1;
    }else{
        score = score + point2;
    }
    playSound('coin.wav');
    showCoin();

    setColor();

    renderScore();

}

function showCoin() {

    if (countClick <= maxrank1){
        
       coin= document.getElementById('coin1');
       
    }else if (countClick <= maxrank2){
        coin= document.getElementById('coin2');     
    }
    coin.style.display = 'block';
    hideCoin(coin);
}
function hideCoin(coin) {
    
    setTimeout(function () {
        coin.style.display = 'none';
    }, 501);
}

/**
ซ่อนรูป boom
 */
function hideBoom() {

    IsPlaying = false;
    document.getElementById('heart'+heart).style.display = 'none';
    heart -=1;    
    countClick =1;
    playSound('boom.wav');
    timerEndGame = setTimeout(function () {
                     
        renderScore();
        // setColor();
        
        getRandomCar();        
        imgBoom.style.display = 'none';             
        
        IsPlaying= true;
    }, 1000);

    if (heart <=0){
        time =1;
        // heart = 0;
    }
    dispHeart.innerText = heart;

 
}

// แสดงคะแนน
function renderScore() {
    scoreBoard.innerText = score;
    document.getElementById('countClick').innerText = countClick;
}




// ถ้าไม่มีการคลิก รูปจะเปลี่ยน
function timerIdle() {
    idleTime = idleTime + 1;
    if (idleTime > 1 && score >0 && checkinStart != checkin.offsetLeft) {
        countClick =1;
        renderScore();
        // setColor();
        getRandomCar();
              
    }
}

function countDownStartGame() {
    timeStartGame = timeStartGame - 1;
    if (timeStartGame>0){
        document.getElementById('countdown').src = 'assets/images/'+timeStartGame+'.png'
    }
    
    // timeBoard.innerText = time;
    if (timeStartGame == 0) {
        clearInterval(timerStartGame);        
        document.getElementById('countdown').style.display = 'none'
        
        IsPlaying = true;
        heart=3;
        dispHeart.innerText = heart;
        renderScore();
        timer = setInterval(countDown, 1000);
    
        idleInterval = setInterval(timerIdle, 1000); // 1 วิถ้าไม่คลิกจะเปลี่ยนภาพ
            
        
    }
}

function countDown() {
    time = time - 1;
    timeBoard.innerText = time;
    if (time <= 0) {        
        clearInterval(timer);
        playSound('over.wav');
        endGame();
    }
}

function getRandomCar() {
    min = 1;
    max = 7;
    idleTime =0;  
    carNumber = 1;
    carNumber =  Math.floor(Math.random() * (max - min + 1) + min); 
    imgCar.src = "assets/images/"+carNumber+"/car"+carNumber+".png";
    checkin.style.left = checkinStart+'px';   
    document.getElementById('showpoint').innerText = checkin.offsetLeft +' xx '+checkin.offsetLeft +' xx '+ idleTime +' x '+score;
}

function setColor(){
    
    if (countClick <= maxrank1){        
        checkin.style.left =(checkin.offsetLeft+checkin1)+'px';        
    }else if (countClick <= maxrank2){    
        if (checkin.offsetLeft < 215)checkin.style.left = '215px';
        checkin.style.left =(checkin.offsetLeft+checkin2)+'px';        
    }else if (countClick >= maxrank3){
        checkin.style.left ='260px';
        imgBoom.src ="assets/images/"+carNumber+"/boom.png";
        imgBoom.style.display = 'inline-block';
        
        hideBoom();
    }
    document.getElementById('showpoint').innerText = checkin.offsetLeft;
}

function playSound(soundfile) {
    document.getElementById("soundGame").innerHTML=
      "<embed src=\"assets/sound/"+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
}

function playAudio() { 
    
    var myAudio = document.getElementById('myAudio');

    if (myAudio.duration > 0 && !myAudio.paused) {

       myAudio.pause();
       console.log(1)

    } else {
        console.log(2)
        // myAudio.play(); 
        myAudio.play();

    }
  } 
  
function endGame() {
    
    IsPlaying = false;
    
    playSound('over.wav');
    clearInterval(timerEndGame);
    clearInterval(idleInterval);

    alert("Your score is " + score);
    
    score = 0;
    // time = 60;
    heart=0;
    timeStartGame = 3;

    checkin.style.left = checkinStart+'px';
    imgBoom.style.display = 'none';   
    btnStart.removeAttribute('disabled');
}


