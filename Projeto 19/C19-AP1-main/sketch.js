var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var invisibleBlockGroup_1, invisibleBlock_1;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  ghost = createSprite(400,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.5;
  invisibleBlockGroup = new Group();
  invisibleBlockGroup_1 = new Group();
}

function draw() {
  background(200);

  if(gameState=="play"){
    if(tower.y > 600){
        tower.y = 0;
      }

    if(keyDown("space")){
        ghost.velocityY = -10;
    }
  
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 4;
    } 

  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 4;
    }

    if(ghost.isTouching(invisibleBlockGroup)){
      gameState = "end";
    }

    spawnDoors();

    spawnClimbers();

    spawnInvisible_blocks();

    spawnInvisible_blocks_1()
    

    ghost.collide(invisibleBlockGroup_1);

    //gravidade do fantasma
    ghost.velocityY = ghost.velocityY + 0.5;

    if(ghost.y>550){
      gameState = "end";
    }
  }

   drawSprites();

  if(gameState == "end"){
    tower.velocityY = 0;
    ghost.velocityY = 0;
    doorsGroup.setVelocityYEach(0);
    climbersGroup.setVelocityYEach(0);
    invisibleBlockGroup.setVelocityYEach(0);
    invisibleBlockGroup_1.setVelocityYEach(0);
    textSize(40);
    fill("black");
    text("Fim de jogo",200,300);
  }


}

function spawnDoors(){
  if(frameCount%300 == 6){
    door = createSprite(random(100,500),0,40,10);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.scale = 0.9;
    door.y = -(door.height/2);
    door.lifetime = 800/door.velocityY+70;
    door.depth = ghost.depth;
    ghost.depth = ghost.depth +1;
    doorsGroup.add(door);
  }
  
}

function spawnClimbers(){
  if(frameCount%300 == 6){
    climber = createSprite(door.x,door.y+60,40,10);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.scale = 0.6;
    climber.lifetime = 800/climber.velocityY+70;
    climbersGroup.add(climber);
  }
  
}

function spawnInvisible_blocks(){
  if(frameCount%300 == 6){
    invisibleBlock = createSprite(climber.x,climber.y+5,95,20);
    invisibleBlock.velocityY = 1;
    invisibleBlock.scale = 0.6;
    invisibleBlock.lifetime = 800/invisibleBlock.velocityY+70;
    invisibleBlock.visible = false;
    invisibleBlockGroup.add(invisibleBlock);
  }
  
}

function spawnInvisible_blocks_1(){
  if(frameCount%300 == 6){
    invisibleBlock_1 = createSprite(climber.x,climber.y-5,95,2);
    invisibleBlock_1.velocityY = 1;
    invisibleBlock_1.scale = 0.6;
    invisibleBlock_1.lifetime = 800/invisibleBlock_1.velocityY+70;
    invisibleBlock_1.visible = false;
    invisibleBlockGroup_1.add(invisibleBlock_1);
  }
  
}

