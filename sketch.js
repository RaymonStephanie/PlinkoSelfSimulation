const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
var plinkos = [];
var divisions = [];

var particle;
var divisionHeight=300;
var score = 0;
var turn = 0;
var end = 0;
var start = 1;
var gs = start;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 75; j <=width; j=j+50) {
     plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50) {
    plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50) {
    plinkos.push(new Plinko(j,275));
  }

  for (var j = 50; j <=width-10; j=j+50) {
    plinkos.push(new Plinko(j,375));
  }

}
 


function draw() {

  background("black");
  textSize(20)
  
  Engine.update(engine);
  
  if (gs == start) {
    createText();
    text("Score : "+score,20,30);
  }

  for (var i = 0; i < plinkos.length; i++) {   
    plinkos[i].display(); 
  }
  
  for (var k = 0; k < divisions.length; k++) { 
    divisions[k].display();
  }
  
  if (particle != null && particle.body.position.x < 0 || particle != null && particle.body.position.x > 800) {
    particle = null;
    turn = turn-1;
  }

  if (particle != null) {
    particle.display();
    if (particle.body.position.x > 0 && particle != null) {
      if (particle.body.position.x < 300 && particle.body.position.y > 760) {
        score = score+500;
        particle = null;
        if (turn >= 5) {
          gs = end;
        }
      }

      if (particle != null) {
        if (particle.body.position.x < 600 && particle.body.position.x > 301 && particle.body.position.y > 760) {
          score = score+100;
          particle = null;
          if (turn >= 5) {
            gs = end;
          }
        }
      }

      if (particle != null) {
        if (particle.body.position.x < 900 && particle.body.position.x > 601 && particle.body.position.y > 760) {
          score = score+200;
          particle = null;
          if (turn >= 5) {
            gs = end;
          }
        }
      }
    }
  }

  if (gs == end) {
    End();
  }

}

mousePressed = () => {
  if (gs != end && turn <= 4 && particle== null) {
    turn = turn + 1;
    particle = new Particle(mouseX,0,15,15);
  }
}

createText = () => {
  text("500",20,520);
  text("500",100,520);
  text("500",180,520);
  text("500",260,520);
  text("100",340,520);
  text("100",340,520);
  text("100",420,520);
  text("100",500,520);
  text("200",580,520);
  text("200",660,520);
  text("200",740,520);
}

var End = () => {
  particle = null;
  plinkos = [];
  divisions = [];
  textSize(20);
  text("YOU HECKIN WON!",300,475);
  text("SCORE : "+score,340,500);
}
