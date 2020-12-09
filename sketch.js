var serve=1;
var PLAY=2;
var END=0;
var gamestate=PLAY;
var score=0
var time=0

var bg,bgI
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage,obstacleImage1; 
var bbGroup,obstacleGroup,obstacleGroup1;
var resetI,reset;
var deadI,dead;
var mdi,md;
 var monkeysound
function preload(){
  
  bgI=loadImage("background.png")
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
resetI=loadImage("reset.png")
monkeysound=loadSound("monkey1.mp3")
 deadI=loadImage("die.png")
obstacleImage1=loadImage("unnamed.png")

}
function setup() {
  createCanvas(550,500);
  
  bg=createSprite(0,200)
  bg.addImage(bgI)
  bg.velocityX=-(5+score/5)
  bg.x=bg.width/2
  bg.scale=1
  
  reset=createSprite(270,345)
  reset.addImage(resetI)
  reset.scale=0.2
  reset.visible=true
  
  dead=createSprite(270,145)
  dead.addImage(deadI)
  dead.scale=0.6
  dead.visible=true
  
monkey=createSprite(60,355)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.15
  //monkey.setCollider("rectangle",0,0,2400,monkey.width)
 // monkey.debug=true;
  

  
   ground=createSprite(80,405,1000,10)
  ground.visible=false
  
   

  bbGroup=new Group ();
   obstacleGroup=new Group();
obstacleGroup1=new Group();

}
function draw() {
  
  
  background("white")
  //reset=createSprite(270,345)
  //reset.addImage(resetI)
  //reset.scale=0.2
  //reset.visible=false
  
if (gamestate===PLAY){
  
  reset.visible=false
  dead.visible=false
  //reset.destroy();
   bg.velocityX=-5
 // reset.x=670
      //reset.y=845
   if(bg.x<0){
  bg.x=bg.width/2
     
     //reset.visible=false;
  }
}
  if (gamestate===END){
    obstacleGroup.setVelocityXEach(0)
    bbGroup.setVelocityXEach(0)
    if (mousePressedOver(reset)){
      Reset();
      //reset.destroy();
      
    }}
   if (keyDown("space") && monkey.y >= 300){ 
  monkey.velocityY=-22
     }
  monkey.velocityY=monkey.velocityY+0.8
  
    monkey.collide(ground)
  
  if (bbGroup.isTouching(monkey)){
   bbGroup.destroyEach();
    score=score+1
  }
  
  if (obstacleGroup.isTouching(monkey)){
     gamestate=END
    obstacleGroup.destroyEach();
    bbGroup.destroyEach();
    reset.visible=true;
    dead.visible=true
    bg.velocityX=0
    obstacleGroup.setVelocityXEach(0)
    bbGroup.setVelocityXEach(0)
    monkey.destroy()
    monkeysound.play();
    }
 Banana();
  Obstacle();
 // Obstacle000();
   drawSprites();
  textSize(15);
   fill ("red")
  text("BANANA'S EATEN :"+score,350,425)
  
  fill ("red")
  text ("SURVIVAL TIME :"+time+" s",50,425)
  time=time+1
    
}
function Banana(){
    if (frameCount % 90 === 0) {
  banana=createSprite(600,Math.round(random(2,200)));
  banana.addImage(bananaImage);
  banana.scale=0.1
  banana.velocityX=-(5+score/1)
  banana.lifetime=120
  banana.depth=monkey.depth
  monkey.depth=monkey.depth+1
  bbGroup.add(banana)  
 }
}
function Reset(){
gamestate=PLAY
  monkey=createSprite(80,330)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.15
  score=0
  time=0
  //reset.destroy()
  //reset.visible=false
  //reset.x=670
    //  reset.y=845
  
} 
function Obstacle(){     
    if (frameCount % 200 === 0) {
     obstacle=createSprite(650,365);
     obstacle.addImage(obstacleImage);
     obstacle.velocityX=-(8+score/1)
     obstacle.scale=0.3  
     obstacleGroup.add(obstacle)
      
}}
