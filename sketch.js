var back,backI;
var ball,ballI;
var invisible,invisible2,invisible3,invisible4;
var enemy1,enemy2,enemy3,enemy4,enemy5;
var platform1,platform2;
var obstacle,obstacle2;
var star;
var enemy1I,enemy2I,enemy3I,enemy4I,enemy5I;
var platform1I,platform2I;
var obstacleI,obstacle2I;
var starsI;
var r,r2;
var platformG,enemyG,obstacleG,starG;
var gameState = play;
var play = 1;
var end = 0;
var score;
var star_s = 0;
var gameState = "play";
var end;
var over,overI,restart,restartI,overB,overBI;
var backS;
var jumpS;

function preload(){

  backI = loadImage("back.jpg");
  ballI = loadImage("red ball.png");
  enemy1I = loadImage("enemy1.png");
  enemy2I = loadImage("enemy2.png");
  enemy3I = loadImage("enemy3.png");
  enemy4I = loadImage("enemy4.png");
  enemy5I = loadImage("enemy5.png"); 
  obstacleI = loadImage("obstacle1.png");
  obstacle2I = loadImage("obstacle2.png")
  platform1I = loadImage("plateform1.png");
  platform2I = loadImage("plateform2.png");
  starsI = loadImage("star.png");
  overI = loadImage("game end.png");
  restartI = loadImage("restart.png");
  overBI = loadImage("endB.jpg");
  backS = loadSound("music.m4a");
  jumpS = loadSound("jumping.mp3");
  
}

function setup() {
  createCanvas(600,450);
  
  back = createSprite(300,170,600,450);
  back.addImage(backI);
 
  ball = createSprite(80,150,20,20);
  ball.addImage(ballI);
  ball.scale = 0.2;
  
  invisible = createSprite(300,335,600,1);
  invisible.visible = false;
  
  invisible2 = createSprite(300,-30,600,1);
  invisible2.visible = false; 
  
  invisible3 = createSprite(45,200,1,400);
  invisible3.visible = false;
  invisible4 = createSprite(95,200,1,400);
  invisible4.visible = false;
  
  overB = createSprite(300,230,10,10);
  overB.addImage(overBI);
  overB.scale = 1.5;
  overB.visible = false;

  restart = createSprite(300,200,10,10);
  restart.addImage(restartI);           
  restart.scale = 0.1;
  restart.visible = false;
  
  over = createSprite(300,70,10,10);
  over.addImage(overI);
  over.scale = 0.7;
  over.visible = false;
  
  //ball.debug = true;
  ball.setCollider("circle");
  
  platformG = new Group();
  enemyG = new Group();
  obstacleG = new Group();
  starG = new Group();
  
  score = 0;
  back.velocityX = 0;
  
  backS.play();

}

function draw() {
  background(120);
  
 if(gameState === "play"){
   
  if(back.x<0){
     back.x = back.width/2;
  }
   
   back.velocityX = -(7+1* score/100);
   ball.rotationSpeed = 10;
   ball.x = 50;
   
  if(keyDown("space")||mousePressedOver(back)) {
        ball.velocityY = -15;
        jumpS.play();    
    }
   
   if(frameCount % 5 === 0){
     score = score + 3;
  }
   
   if(ball.isTouching(starG)){
      star_s += 1;
      starG.destroyEach();
   }
  
   ball.velocityY = ball.velocityY+0.7;
  
   spawnEnemy();
   spawnObstacle();
   spawnStars();
  
 }  
  
  if(ball.isTouching(enemyG)||ball.isTouching(obstacleG)||ball.x < 0){
     gameState = end;
     enemyG.setLifetimeEach(-1);
     enemyG.setVelocityXEach(0);
     obstacleG.setLifetimeEach(-1);
     obstacleG.setVelocityXEach(0);
     platformG.setLifetimeEach(-1);
     platformG.setVelocityXEach(0);
     starG.setLifetimeEach(-1);
     starG.setVelocityXEach(0);
    
  
    
     enemyG.setVisibleEach(false);
     obstacleG.setVisibleEach(false);
     platformG.setVisibleEach(false);
     starG.setVisibleEach(false);
     back.velocityX = 0;
  }  
    
      ball.collide(invisible);
      ball.collide(invisible2);
      ball.collide(platformG);
      ball.collide(invisible3);
      ball.collide(invisible4)
  
  if(gameState === end){
    
     ball.rotationSpeed = 0;
      
    
     overB.visible = true;
     restart.visible = true;
     over.visible = true;
     
    
    
     if(mousePressedOver(restart)){
        reset();
     }
  }
  
  drawSprites();
  
  fill("orange");
  stroke("black");
  strokeWeight(3)
  textSize(17);
  text("score:" + score,500,50);
  text("stars:" + star_s,400,50)
}

function reset(){
  gameState = "play";
  score = 0;
  star_s = 0;
  overB.visible = false;
  restart.visible = false;
  over.visible = false;
  enemyG.destroyEach();
  obstacleG.destroyEach();
  platformG.destroyEach();
  starG.destroyEach();
}


function spawnEnemy(){
  if(frameCount % 100 === 0){
     r = Math.round(random (1,5));
     if(r == 1){
        enemy1 = createSprite(300,200,10,10);
        enemy1.addImage(enemy1I);
        enemy1.scale = 0.5
        enemy1.y = 305;
        enemy1.x = 600;
        enemy1.velocityX = -(7+1* score/100);
        
       enemyG.add(enemy1);
     }
      if(r == 2){
        enemy2 = createSprite(300,200,10,10);
        enemy2.addImage(enemy2I);
        enemy2.scale = 0.5
        enemy2.y = 305;
        enemy2.x = 600;
        enemy2.velocityX = -(7+1* score/100);
        
        enemyG.add(enemy2);
     }
    
      if(r == 3){
        enemy3 = createSprite(300,200,10,10);
        enemy3.addImage(enemy3I);
        enemy3.scale = 0.5
        enemy3.y = 305;
        enemy3.x = 600;
        enemy3.velocityX = -(7+1*score/100);
        
        enemyG.add(enemy3);
     }
    
      if(r == 4){
        enemy4 = createSprite(300,200,10,10);
        enemy4.addImage(enemy4I);
        enemy4.scale = 0.5
        enemy4.y = 305;
        enemy4.x = 600;
        enemy4.velocityX = -(7+1*score/100);
        
        enemyG.add(enemy4);
     }
    
      if(r == 5){
        enemy5 = createSprite(300,200,10,10);
        enemy5.addImage(enemy5I);
        enemy5.scale = 0.5
        enemy5.y = 305;
        enemy5.x = 600;
        enemy5.velocityX = -(7+1*score/100);
        
        enemyG.add(enemy5);
     }
  }  
}

function spawnObstacle(){
  if(frameCount % 230 === 0){
     obstacle = createSprite(270,200,10,10);
     obstacle.addImage(obstacleI);
     obstacle.scale = 0.5;
     obstacle.x = 600;
     obstacle.y = Math.round(random(15,300));
     obstacle.rotationSpeed = -14
     obstacle.velocityX = -(11+1*score/100);
    // obstacle.debug = true;
     obstacle.setCollider("circle",0,0,50)
    
     obstacleG.add(obstacle);
  }
  
  if(frameCount % 350 === 0){
     obstacle2 = createSprite(650,305,20,10);
     obstacle2.addImage(obstacle2I);
     obstacle2.scale = 0.6;
    obstacle2.velocityX = -(7+1*score/100);
    
     obstacleG.add(obstacle2);
    

      platform1 = createSprite(650,300,20,20);
      platform1.addImage(platform2I);
      platform1.velocityX = -(7+1*score/100);
      platform1.y = Math.round(random(180,250));
      //platform1.debug = true;
      platform1.setCollider("rectangle",0,0,270,30);
    
      platformG.add(platform1); 
     }
}

function spawnStars(){
  if(frameCount % 90 === 0){
     star = createSprite(600,200,10,10);
     star.addImage(starsI);
     star.scale = 0.12;
     star.y = Math.round(random(80,260));
     star.velocityX = -(7+1*score/100);  
    
     starG.add(star);
  }
}
  