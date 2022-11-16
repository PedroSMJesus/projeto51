var PLAY = 1
var END = 0;
var gameState = PLAY;

var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var edges;
var life = 3;
var lifeImg, lifeImg2, lifeImg3;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  lifeImg = loadImage("assets/heart_3.png")
  lifeImg2 = loadImage("assets/heart_2.png")
  lifeImg3 = loadImage("assets/heart_1.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicione a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//crie o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg);
   player.scale = 0.3;
   player.debug = true;
   player.setCollider("rectangle",0,0,300,300);

//criar vida
 life = createSprite(width-1200, height-580, 15, 15);
 life.addImage(lifeImg);
 //life.addImage(lifeImg2);
 //life.addImage(lifeImg3);
 life.scale = 0.5
  zombieGroup = new Group();
}

function draw() {
  background(bgImg); 

  if (gameState === PLAY) {
    //mova o jogador para cima e para baixo e torne o jogo compatível com dispositivos móveis usando touches (toques)
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+30
 }
 if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-30
 }

//colisões 
//player.collide(edges);
//zombieGroup.bounceOff(edges);

if (zombieGroup.isTouching(player)) {
  //life -=1;
 // life.changeAnimation(lifeImg2)
}
//libere as balas e mude a imagem do atirador para a posição de tiro quando a tecla espaço for pressionada
if(keyWentDown("space")){
  player.addImage(shooter_shooting)
}

//o jogador volta à imagem original quando pararmos de pressionar a tecla espaço
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


spawZombieGroup();
  }
  
edges = createEdgeSprites();
drawSprites();

}

function spawZombieGroup() {
  if (frameCount % 55 === 0) {
    zombie = createSprite(width, random(300,600), 55, 55);
    zombie.addImage("villan", zombieImg);
    zombie.scale = 0.15;
    zombie.velocityX = -3;
    zombie.debug = true;
    zombie.setCollider("rectangle",0,0,60,60);
    zombie.lifetime = 300;
    zombieGroup.add(zombie)
  } 
}