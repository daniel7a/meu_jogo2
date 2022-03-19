var fundo,player;
var fundoImg,playerImg1
var car,police1,police2;

var carImg;
var pol2Img;
var pol1Img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOver, restart;

function preload(){
 fundoImg = loadImage("Road.png");
 playerImg1 = loadAnimation("ladrao.png","ladrao_run2.png");
 carImg = loadImage("carro.png");
 pol1Img = loadImage("police.png");
 pol2Img = loadImage("police2.png");
 gameOverImg = loadImage("fimdejogo.png");
}

function setup() {

  player = createSprite(100,160)
  player.scale=0.05
 
 createCanvas(1000,400);
 fundo=createSprite(100,150);
 fundo.addImage(fundoImg);
 fundo.velocityX = -5;

 fimdejogo = createSprite(650,150);
 fimdejogo.addImage(gameOverImg);
 fimdejogo.scale = 0.8;
 fimdejogo.visible = false;  

 pol1Group = new Group();
 pol2Group = new Group();
 carGroup = new Group();
}

function draw() {
 background(0);
  
 drawSprites();
    
 if(gameState===PLAY){

  player.y = World.mouseY;
    
 edges= createEdgeSprites();

 if(fundo.x < 0 ){
    fundo.x = width/2;
  }
  var select_police = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_police == 1) {
      criarPolice2();
    } else if (select_police == 2) {
      criarPolice1();
    } else {
      criarCarro();
    }
  }
  if(pol1Group.isTouching(player)){
    gameState = END;
    pol1.velocityY = 0;
   }
   if(pol2Group.isTouching(player)){
    gameState = END;
    pol2.velocityY = 0;
   }
   if(carGroup.isTouching(player)){
    gameState = END;
    car.velocityY = 0;
   }
}
   else if (gameState === END) {
    fimdejogo.visible = true;

    fundo.velocityX = 0;
    player.velocityY = 0;

    carGroup.setVelocityXEach(0);
    carGroup.setLifetimeEach(-1);
    carGroup.destroyEach();

    pol2Group.setVelocityXEach(0);
    pol2Group.setLifetimeEach(-1);
    pol2Group.destroyEach();

    pol1Group.setVelocityXEach(0);
    pol1Group.setLifetimeEach(-1);
    pol1Group.destroyEach();
 }
}
function criarCarro(){
    car =createSprite(1100,Math.round(random(50, 250)));
    car.scale =0.06;
    car.setLifetime=170;
    carGroup.add(car);
}

function criarPolice1(){
    pol1 =createSprite(1100,Math.round(random(50, 250)));
    pol1.scale =0.06;
    pol1.setLifetime=170;
    pol1Group.add(pol1);
}

function criarPolice2(){
    pol2 =createSprite(1100,Math.round(random(50, 250)));
    pol2.scale =0.06;
    pol2.setLifetime=170;
    pol2Group.add(pol2);
}
