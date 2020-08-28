var helicopterIMG, helicopterSprite, packageIMG;
var ground,groundSprite
var packageBody=[]
var packageSprite=[];
var index=0;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var first=false;
second=true;
function preload() {
    helicopterIMG = loadImage("helicopter.png")
    packageIMG = loadImage("package.png")
}

function setup() {
    createCanvas(800, 700);
    rectMode(CENTER);
    creatingWorld()
}


function draw() {
    rectMode(CENTER);
    Engine.update(engine);
    background(0);
    packageSprite[index].x = packageBody[index].position.x
    packageSprite[index].y = packageBody[index].position.y
    drawSprites();
}

function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        // Look at the hints in the document and understand how to make the package body fall only on

        if(first&&second) {
            second=false
            index++;
            creatingWorld()
            Matter.Body.setStatic(packageBody[index], false)
            console.log("hi")
            setTimeout(function() {
                second=true
            },2000)
        }else{
            Matter.Body.setStatic(packageBody[index], false)
            console.log("hin")
            setTimeout(function() {
                first=true
            },2000)
        }
    } else {
        console.log("nope")
    }
}

function mousePressed() {
    var d = dist(World.mouseX, World.mouseY, helicopterSprite.x, helicopterSprite.y)
    if (d < helicopterSprite.width && d < helicopterSprite.height) {
        console.log("clicked");
    } else {
        console.log("not clicked")
    }
}

function creatingWorld(){
    packageSprite.push(createSprite(width / 2, 80, 10, 10));
    packageSprite[index].addImage(packageIMG)
    packageSprite[index].scale = 0.2

    helicopterSprite = createSprite(width / 2, 200, 10, 10);
    helicopterSprite.addImage(helicopterIMG)
    helicopterSprite.scale = 0.6

    groundSprite = createSprite(width / 2, height - 35, width, 30);
    groundSprite.shapeColor = color(255)


    engine = Engine.create();
    world = engine.world;

    packageBody.push(Bodies.circle(width / 2, 200, 5, {restitution: 0.5, isStatic: true}));
    World.add(world, packageBody[index]);


    //Create a Ground
    ground = Bodies.rectangle(width / 2, 650, width, 30, {isStatic: true});
    World.add(world, ground);


    Engine.run(engine);
}