
//캔버스Setting
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameoverImage;
let gameover=false;
let score=0;
let spaceshipx = canvas.width/2-32;
let spaceshipy = canvas.height-64;

let bulletList=[];
function bullet(){
    this.x=0;
    this.y=0;
    this.init = function(){
        this.x=spaceshipx+15;
        this.y=spaceshipy;
        this.alive=true
        bulletList.push(this);
    }

    this.update = function () { 
        this.y -= 7;
    }

    this.checkHit=function(){
        for(let i=0; i<enemyList.length;i++){
        if(this.y <=enemyList[i].y && this.x>=enemyList [i].x && this.x<=enemyList[i].x+32)
            {
                score++;
                this.alive =false
                enemyList.splice(i,1);
           }
        }
    }
}

function generateRandomValue(max,min){
    let randomNum =Math.floor(Math.random()*(max-min+1))+min
    return randomNum
}

let enemyList=[];
function enemy (){
    this.x=0;
    this.y=0;
    this.init=function(){
        this.y=0
        this.x=generateRandomValue(canvas.width-32, 0)
        enemyList.push(this);
    };
    this.update=function(){
        this.y +=5;
    
        if(this.y >=canvas.height-36){
            gameover=true;
            console.log("gameover");
        }
    };
}

function loadImage(){

    backgroundImage = new Image();
    backgroundImage.src="images/background.jpg";

    spaceshipImage = new Image();
    spaceshipImage.src="images/spaceship.png";

    bulletImage = new Image();
    bulletImage.src="images/bullet.png";

    enemyImage = new Image();
    enemyImage.src="images/enemy.png";

    gameoverImage = new Image();
    gameoverImage.src="images/gameover.jpg";
}
let keyDown={};
function setupKeyboardListener(){
    document.addEventListener("keydown",function(event){
        
        
        keyDown[event.keyCode] = true;
        console.log("키다운객체에 들어간 값은?",keyDown);
    });
    document.addEventListener("keyup",function(event){
        delete keyDown[event.keyCode];
        console.log("버튼",keyDown);
    
        if(event.keyCode==32){
            createBullet();
        }
    });
} 

function createBullet(){
     console.log("총알 생선!")
    let b=new bullet();
    b.init();
    console.log("새로운 총알 리스트",bulletList)
}

function createEnemy(){
    const interval = setInterval(function(){
        let e = new enemy();
            e.init();
    },1000)
}

function update(){
    if(39 in keyDown){
        spaceshipx+= 5;
    }
    if(37 in keyDown){
        spaceshipx-= 5;
    }

    if(68 in keyDown){
        spaceshipx+= 5;
    }
    if(65 in keyDown){
        spaceshipx-= 5;
    }

    if(83 in keyDown){
        spaceshipy+= 5;
    }
    if(87 in keyDown){
        spaceshipy-= 5;
    }

    if(40 in keyDown){
        spaceshipy+= 5;
    }
    if(38 in keyDown){
        spaceshipy-= 5;
    }

    if(spaceshipx<=0){
        spaceshipy=0;
    }
    if(spaceshipx>= canvas.width-32){
        spaceshipx=canvas.width-32;
    }
    



    for (let i=0;i<bulletList.length;i++){
        if (bulletList[i].alive){
        bulletList[i].update();
        bulletList[i].checkHit();
        }
    }

    for(let i=0;i<enemyList.length;i++){
        enemyList[i].update();
        
    }
}

function render(){

    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipx, spaceshipy);
    ctx.fillText(`Score:${score}`,20, 20);
    ctx.fillStyle="White";
    ctx.font = "20px Arial"
for (let i=0;i<bulletList.length;i++){
    if(bulletList[i].alive){
    ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y);
     }
    }

    for (let i=0;i<enemyList.length;i++){
        ctx.drawImage(enemyImage,enemyList[i].x,enemyList[i].y);
    }

    
}



function main(){
    if(!gameover){
        update();
        render();
        console.log("animation calls function");
        requestAnimationFrame(main);
    }else{
        ctx.drawImage(gameoverImage,10,100,380,380);
    }
}
loadImage();
setupKeyboardListener();
createEnemy();
main();

