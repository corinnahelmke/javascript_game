/*

The Final Game 

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isFinished;

var clouds;
var mountains;
var trees
var collectables;
var canyons;

var game_score;
var flagpole;
var lives;
var heart;

var platforms;
var enemies;


var jumpSound;
var failingSound;
var fallingSound;
var collectSound;
var completeSound;
var gameSound;


function preload(){
    
    //Loading Sound
    soundFormats('mp3','wav');
    
    jumpSound = loadSound('assets/jump.wav');
    failingSound = loadSound('assets/fail.wav');
    fallingSound = loadSound('assets/falling.wav');
    collectSound = loadSound('assets/collect.wav');
    completeSound = loadSound('assets/completlevel.wav');
    gameSound = loadSound('assets/gameMusic.wav');
    
    
    jumpSound.setVolume(0.1);
    failingSound.setVolume(0.1);
    fallingSound.setVolume(0.1);
    collectSound.setVolume(0.1);
    completeSound.setVolume(0.2);
    gameSound.setVolume(0.2);
    
    //Loading Heart Image for Game_Score Visual
    heart = loadImage('assets/heart.png');    
}


function setup(){

	createCanvas(1024, 576);
    floorPos_y = height * 3/4;
    
    game_score = 0;
    lives = 3;
    startGame();
    gameSound.loop();
}

function startGame(){


	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    textSize(20);
    

//--------------------------
// Variable to control the background scrolling.l
//-------------------------
	
    scrollPos = 0;
    
    
//--------------------------
// Variable to store the real position of the gameChar in the game
// world. Needed for collision detection.
//-------------------------
	gameChar_world_x = gameChar_x - scrollPos;
    
    
//--------------------------
// Boolean variables to control the movement of the game character
//-------------------------

	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
    isFound = false;
    
//--------------------------
// Initialise arrays of scenery objects.
//-------------------------
    
    trees =[
        {x_pos: -100,  y_pos: height/2},
        {x_pos:  100,  y_pos: height/2},
        {x_pos:  300,  y_pos: height/2},
        {x_pos:  600,  y_pos: height/2},
        {x_pos:  1025, y_pos: height/2},
        {x_pos:  1500, y_pos: height/2},
        {x_pos:  1800, y_pos: height/2},
        {x_pos:  2000, y_pos: height/2},
        {x_pos:  2250, y_pos: height/2},
        {x_pos:  2500, y_pos: height/2}, 
         ]; 
        
    
    clouds = [
        {x_pos: 100,  y_pos: 200, size: 60, radius: 70},
        {x_pos: 400,  y_pos: 100, size: 50, radius: 70},
        {x_pos: 600,  y_pos: 150, size: 60, radius: 70}, 
        {x_pos: 900,  y_pos: 200, size: 50, radius: 70},
        {x_pos: 1050, y_pos: 120, size: 80, radius: 90},
        {x_pos: 0,    y_pos: 220, size: 50, radius: 70},
        {x_pos: -300, y_pos: 120, size: 50, radius: 70},
        {x_pos: 1270, y_pos: 250, size: 50, radius: 70},
        {x_pos: 1220, y_pos: 50, size: 45,  radius: 70},
        {x_pos: 1550, y_pos: 120, size: 60, radius: 70}, 
        {x_pos: 1700, y_pos: 250, size: 50, radius: 70},
        {x_pos: 1850, y_pos: 40, size: 80,  radius: 90},
        {x_pos: 2200, y_pos: 200, size: 50, radius: 70},
        {x_pos: 2400, y_pos: 100, size: 80, radius: 100},
        {x_pos: 2600, y_pos: 50, size: 50,  radius: 70},
        {x_pos: 2900, y_pos: 250, size: 80, radius: 100}
    ];
        
    mountains = [
        {x_pos:- 200, y_pos: 0},
        {x_pos: 100,  y_pos: 0}, 
        {x_pos: 1700, y_pos: 0}, 
        {x_pos: 2000, y_pos: 0}, 
        {x_pos: 2300, y_pos: 0}
        
        
    ];
    
    canyons = [
        {x_pos: -300,y_pos: 432, width: 100, height: 144},
        {x_pos: 600, y_pos: 432, width: 100, height: 144}, 
        {x_pos: 800, y_pos: 432, width: 100, height: 144},
        {x_pos: 1000,y_pos: 432, width: 100, height: 144}, 
        {x_pos: 1200,y_pos: 432, width: 100, height: 144}
            
    ];
     
    collectables = [
        {x_pos: -150, y_pos: 332, size:  332},
        {x_pos: 340,  y_pos: 400, size:  400},
        {x_pos: 715,  y_pos: 332, size:  332},
        {x_pos: 875,  y_pos: 400, size:  400},
        {x_pos: 1050, y_pos: 332, size:  332},        
        {x_pos: 1250, y_pos: 400, size:  400},
        {x_pos: 1700, y_pos: 332, size:  332},
        {x_pos: 1800, y_pos: 332, size:  332},  
        {x_pos: 1900, y_pos: 332, size:  332},
        {x_pos: 2000, y_pos: 400, size:  400}      
     ];

    game_score = 0;
    
    flagpole = {isReached: false, x_pos: 3000};

    platforms = [];
    platforms.push(createPlatforms(700,floorPos_y - 80,100));
    platforms.push(createPlatforms(1000,floorPos_y - 80,100));
    
    
    enemies = [];
    enemies.push(new Enemy(100, floorPos_y - 10, 100));


    
}




// ---------------------------------------------------------------//
//                        Draw Function                           //
// ---------------------------------------------------------------//

function draw(){
   
    
 //--------------------------
// Drawing the sky and ground
//-------------------------   

    background(230, 230, 250); 
    noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4);

 //--------------------------
// Display Game Score
//-------------------------

    strokeWeight(1);
    stroke(0);
    fill(0);
    text("Score: " + game_score, 20, 20)
    text("Lives: " + lives,      110, 20)
    noStroke();
    
//--------------------------
// Calling push and draw scenery 
//-------------------------
    
    push();
    translate(scrollPos, 0);
    

    drawClouds();
    drawMountains();
    drawTrees();
    
//--------------------------
// draw Platforms
//-------------------------
for(var i = 0; i < platforms.length; i++)
    {
        platforms[i].draw();
    }
    
//--------------------------
// draw and check Collectables 
//-------------------------
    for(var i = 0; i < collectables.length; i++)
    {
        if(!collectables[i].isFound)
            {
                drawCollectable(collectables[i]);
                checkCollectable(collectables[i]);
            }
    }
    
//--------------------------
// draw and check Canyon
//-------------------------
    for(var i = 0; i <canyons.length; i++)
        {
            drawCanyon(canyons[i]);
            checkCanyon(canyons[i]);
        }
//--------------------------
// Calling checkFlagpole
//-------------------------
    if(!checkFlagpole.isReached)
        {
            checkFlagpole(flagpole);
            drawFlagpole(flagpole);
        }

    pop();
    
//--------------------------
// Draw Game Character
//-------------------------
    drawGameChar();
    checkPlayerDie();
  
    
if(lives < 1){
    push();
    fill(174,194,220);
    strokeWeight(1);
    stroke(0);
    textSize(50);
    text("GAME OVER. Press Space to continue.", 100, height/2-100);
    pop();
    if(keyCode == 32){
        startGame();
        lives = 3;
        game_score = 0;
    }
    return;
}

if(flagpole.isReached){
    push();
    fill(174,194,220);
    strokeWeight(1);
    stroke(0);
    textSize(50);
    text("LEVEL COMPLETE. Press space to continue.", 50, height/2-100);
    pop();
    
    /*
    if(keyCode == 32){
        startGame();
        lives = 3;
        game_score = 0;
        }
        */
    return;
}

	
 // --------------------------------------------------------------//
//   Logic to make the game character move or the background scroll  //    
// ---------------------------------------------------------------//

	if(isLeft){

		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight){

		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; 
		}
	}


//--------------------------
// Logic to make the game character rise and fall
//-------------------------
   
    //Platform contact
    if(gameChar_y < floorPos_y){   
        var isContact = false;
            for(var i = 0; i < platforms.length; i ++)
                {
                    if(platforms[i].checkContact(gameChar_world_x, gameChar_y - 20) == true)
                        {
                            isContact = true;
                            break;
                        }
                        
                }
            if(isContact == false)
                {
                    gameChar_y += 2;
                    isFalling = true;
                }

        }
    else{

            isFalling = false;
        
    }
    
    if(isPlummeting){

            gameChar_y += 5;
            fallingSound.play()

        }
    

    
//--------------------------
// Update real position of gameChar for collision detection
//------------------------- 
	gameChar_world_x = gameChar_x - scrollPos;
}


    
// ---------------------------------------------------------------//
//                        Key control functions                      //
// ---------------------------------------------------------------//




function keyPressed(){
 
    if(key == "A" || keyCode == 37)
        {
            isLeft = true;
        }
    if(key == "D" || keyCode == 39)
        {
            isRight = true;
        }
    
    if(keyCode == 32 && gameChar_y == floorPos_y || key == "W" && gameChar_y == floorPos_y)
        {
            if(!isFalling)
                {
                    gameChar_y -= 100; 
                    jumpSound.play();
                }
        }
 
}

function keyReleased(){
    if(key == "A" || keyCode == 37)
        {
            isLeft = false;
        }
    
    if(key == "D" || keyCode == 39)
        {
            isRight = false;
        }
}


// --------------------------------------------------------------//
//                      Game character render function                //
// ---------------------------------------------------------------//

function drawGameChar()
{
	// draw game character
	if(isRight && isFalling)
	{
		// add your jumping-right code
        fill(141, 102, 69);
        //body
        ellipse(gameChar_x, gameChar_y - 40 , 15, 27);
        //head
        ellipse(gameChar_x, gameChar_y - 55 , 20, 16);
        //ear
        ellipse(gameChar_x -10, gameChar_y - 60 , 10, 10);
        //ear2
        ellipse(gameChar_x + 10, gameChar_y - 60 , 10, 10);
        //leg left
        ellipse(gameChar_x -4, gameChar_y - 25 , 7, 15);
        //right leg
        ellipse(gameChar_x + 6, gameChar_y - 26 , 7, 15);

         //left arm
        ellipse(gameChar_x +7, gameChar_y - 40 , 15, 7);
        //right arm
        ellipse(gameChar_x +10, gameChar_y - 48 , 15, 7);

        //outline
        fill(191, 152, 119);
        //head
        ellipse(gameChar_x, gameChar_y - 52 , 7, 4);
        fill(111, 72, 39);
        //ear
        ellipse(gameChar_x -10, gameChar_y - 60 , 5, 5);
        //ear2
        ellipse(gameChar_x + 10, gameChar_y - 60 , 5, 5);

        fill(0);
        //nose
        ellipse(gameChar_x, gameChar_y - 53 , 1, 1)

        //eyes
        fill(0);
        ellipse(gameChar_x - 6, gameChar_y - 55 , 3, 3);
        ellipse(gameChar_x + 6, gameChar_y - 55 , 3, 3);

        //eyeballs
        fill(255);
        ellipse(gameChar_x - 6, gameChar_y - 56 , 1.5, 1.5);
        ellipse(gameChar_x + 6, gameChar_y - 56 , 1.5, 1.5);

        fill(191, 152, 119);
        //left arm
        ellipse(gameChar_x +13, gameChar_y - 40 , 3, 5);
        //right arm
        ellipse(gameChar_x +15, gameChar_y - 48 , 3, 5);

    
        

	}
	else if(isLeft && isFalling)
        
	{
		// add your jumping-left code
        
        fill(141, 102, 69);
        //body
        ellipse(gameChar_x, gameChar_y - 40 , 15, 27);
        //head
        ellipse(gameChar_x, gameChar_y - 55 , 20, 16);
        //ear
        ellipse(gameChar_x -10, gameChar_y - 60 , 10, 10);
        //ear2
        ellipse(gameChar_x + 10, gameChar_y - 60 , 10, 10);
        //leg left
        ellipse(gameChar_x -5, gameChar_y - 25 , 7, 15);
        //right leg
        ellipse(gameChar_x + 4, gameChar_y - 25 , 7, 15);

         //left arm
        ellipse(gameChar_x -9, gameChar_y - 40 , 15, 7);
        //right arm
        ellipse(gameChar_x -7, gameChar_y - 48 , 15, 7);


        //outline
        fill(191, 152, 119);
        //head
        ellipse(gameChar_x, gameChar_y - 52 , 7, 4);
        fill(111, 72, 39);
        //ear
        ellipse(gameChar_x -10, gameChar_y - 60 , 5, 5);
        //ear2
        ellipse(gameChar_x + 10, gameChar_y - 60 , 5, 5);

        fill(191, 152, 119);
        //left arm
        ellipse(gameChar_x -15, gameChar_y - 40 , 3, 5);
        //right arm
        ellipse(gameChar_x -13, gameChar_y - 48 , 3, 5);


        fill(0);
        //nose
        ellipse(gameChar_x, gameChar_y - 53 , 1, 1)

        //eyes
        fill(0);
        ellipse(gameChar_x - 6, gameChar_y - 55 , 3, 3);
        ellipse(gameChar_x + 6, gameChar_y - 55 , 3, 3);

        //eyeballs
        fill(255);
        ellipse(gameChar_x - 6, gameChar_y - 56 , 1.5, 1.5);
        ellipse(gameChar_x + 6, gameChar_y - 56 , 1.5, 1.5);


	}
	else if(isLeft)
	{
		// add your walking left code
        fill(141, 102, 69);
        //body
        ellipse(gameChar_x, gameChar_y - 20 , 15, 27);
        //head
        ellipse(gameChar_x, gameChar_y - 35 , 20, 16);

        //ear
        ellipse(gameChar_x -10, gameChar_y - 40 , 10, 10);
        //ear2
        ellipse(gameChar_x + 10, gameChar_y - 40 , 10, 10);

        //leg left
        ellipse(gameChar_x -4, gameChar_y - 5 , 7, 15);
        //right leg
        ellipse(gameChar_x + 3, gameChar_y - 5 , 7, 15);

         //left arm
        ellipse(gameChar_x -9, gameChar_y - 20 , 15, 7);
        //right arm
        ellipse(gameChar_x -7, gameChar_y - 26 , 15, 7);

        //outline
        fill(191, 152, 119);
        //head
        ellipse(gameChar_x, gameChar_y - 32 , 7, 4);

        fill(0);
        //nose
        ellipse(gameChar_x, gameChar_y - 33 , 1, 1)

        fill(111, 72, 39);
        //ear
        ellipse(gameChar_x -10, gameChar_y - 40 , 5, 5);
        //ear2
        ellipse(gameChar_x + 10, gameChar_y - 40 , 5, 5);


        fill(191, 152, 119);
        //left arm
        ellipse(gameChar_x -15, gameChar_y - 20 , 3, 5);
        //right arm
        ellipse(gameChar_x -13, gameChar_y - 26 , 3, 5);

        //eyes
        fill(0);
        ellipse(gameChar_x - 6, gameChar_y - 35 , 3, 3);
        ellipse(gameChar_x + 6, gameChar_y - 35 , 3, 3);

        //eyeballs
        fill(255);
        ellipse(gameChar_x - 6, gameChar_y - 36 , 1.5, 1.5);
        ellipse(gameChar_x + 6, gameChar_y - 36 , 1.5, 1.5);



	}
	else if(isRight)
	{
		// add your walking right code
        fill(141, 102, 69);
        //body
        ellipse(gameChar_x, gameChar_y - 20 , 15, 27);
        //head
        ellipse(gameChar_x, gameChar_y - 35 , 20, 16);
        //ear
        ellipse(gameChar_x -10, gameChar_y - 40 , 10, 10);
        //ear2
        ellipse(gameChar_x + 10, gameChar_y - 40 , 10, 10);
        //leg left
        ellipse(gameChar_x -3, gameChar_y - 5 , 7, 15);
        //right left
        ellipse(gameChar_x + 4, gameChar_y - 5 , 7, 15);

         //leg arm
        ellipse(gameChar_x +7, gameChar_y - 20 , 15, 7);
        //right arm
        ellipse(gameChar_x +9, gameChar_y - 26 , 15, 7);

        //outline
        fill(191, 152, 119);
        //head
        ellipse(gameChar_x, gameChar_y - 32 , 7, 4);

         fill(0);
        //nose
        ellipse(gameChar_x, gameChar_y - 33 , 1, 1)

        //ear
        fill(111, 72, 39);
        ellipse(gameChar_x -10, gameChar_y - 40 , 5, 5);
        //ear2
        ellipse(gameChar_x + 10, gameChar_y - 40 , 5, 5);

        fill(191, 152, 119);
        //left arm
        ellipse(gameChar_x +13, gameChar_y - 20 , 3, 5);
        //right arm
        ellipse(gameChar_x +15, gameChar_y - 26 , 3, 5);

        //eyes
        fill(0);
        ellipse(gameChar_x - 6, gameChar_y - 35 , 3, 3);
        ellipse(gameChar_x + 6, gameChar_y - 35 , 3, 3);

        //eyeballs
        fill(255);
        ellipse(gameChar_x - 6, gameChar_y - 36 , 1.5, 1.5);
        ellipse(gameChar_x + 6, gameChar_y - 36 , 1.5, 1.5);


	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
                
        fill(141, 102, 69);
        //body
        ellipse(gameChar_x, gameChar_y - 40 , 15, 27);

        //head
        ellipse(gameChar_x, gameChar_y - 55 , 20, 16);

        //ear
        ellipse(gameChar_x -10, gameChar_y - 60 , 10, 10);
        //ear2
        ellipse(gameChar_x + 10, gameChar_y - 60 , 10, 10);

        //left leg
        ellipse(gameChar_x -5, gameChar_y - 24 , 7, 16);
        //right leg

        ellipse(gameChar_x + 5, gameChar_y - 24 , 7,16);
         //left arm
        ellipse(gameChar_x -9, gameChar_y - 44 , 15, 7);
        //right arm
        ellipse(gameChar_x +9, gameChar_y - 44 , 15, 7);

        //outline
        fill(191, 152, 119);
        //body
        ellipse(gameChar_x, gameChar_y - 38, 9, 17);
        //head
        ellipse(gameChar_x, gameChar_y - 52 , 7, 4);


        //left arm
        ellipse(gameChar_x -15, gameChar_y - 44 , 3, 5);
        //right arm
        ellipse(gameChar_x +15, gameChar_y - 44 , 3, 5);

        fill(0);
        //nose
        ellipse(gameChar_x, gameChar_y - 53 , 1, 1);

        fill(111, 72, 39);
        ellipse(gameChar_x -10, gameChar_y - 60, 5, 5);
        //ear
        ellipse(gameChar_x +10, gameChar_y - 60 , 5, 5);
        //ear2

        //eyes
        fill(0);
        ellipse(gameChar_x - 6, gameChar_y - 55 , 3, 3);
        ellipse(gameChar_x + 6, gameChar_y - 55 , 3, 3);

        //eyeballs
        fill(255);
        ellipse(gameChar_x - 6, gameChar_y - 56 , 1.5, 1.5);
        ellipse(gameChar_x + 6, gameChar_y - 56 , 1.5, 1.5);


	}
	else
	{
		// add your standing front facing code
         //outer body
        fill(141, 102, 69);
        //body
        ellipse(gameChar_x, gameChar_y - 20 , 15, 27);
        //head
        ellipse(gameChar_x, gameChar_y - 35 , 20, 16);
        //ear
        ellipse(gameChar_x -10, gameChar_y - 40 , 10, 10);
        //ear2
        ellipse(gameChar_x + 10, gameChar_y - 40 , 10, 10);
        //left leg
        ellipse(gameChar_x -4, gameChar_y - 5 , 7, 15);
        //right leg
        ellipse(gameChar_x + 4, gameChar_y - 5 , 7, 15);
         //left arm
        ellipse(gameChar_x -9, gameChar_y - 22 , 15, 7);
        //right arm
        ellipse(gameChar_x +9, gameChar_y - 22 , 15, 7);

        //******outline
        fill(191, 152, 119);
        //body
        ellipse(gameChar_x, gameChar_y - 18 , 9, 17);
        //head
        ellipse(gameChar_x, gameChar_y - 33 , 7, 4);
         //left arm
        ellipse(gameChar_x -15, gameChar_y - 22 , 3, 5);
        //right arm
        ellipse(gameChar_x +15, gameChar_y - 22 , 3, 5);

        fill(0);
        //nose
        ellipse(gameChar_x, gameChar_y - 34 , 1, 1);

        //eyes
        ellipse(gameChar_x - 6, gameChar_y - 36 , 3, 3);
        ellipse(gameChar_x + 6, gameChar_y - 36 , 3, 3);

        //eyeballs
        fill(255);
        ellipse(gameChar_x - 6, gameChar_y - 37 , 1.5, 1.5);
        ellipse(gameChar_x + 6, gameChar_y - 37 , 1.5, 1.5);


        fill(111, 72, 39);
        ellipse(gameChar_x + 10, gameChar_y - 40 , 5, 5);
        //ear
        ellipse(gameChar_x -10, gameChar_y - 40 , 5, 5);
        //ear2    
	}

}

//----------------------------------------------------------------//
//                      Background render functions                  //
// ---------------------------------------------------------------//


/* ---------------------------
   Function to draw cloud objects.
 ---------------------------*/

function drawClouds(){
    for(var i = 0; i < clouds.length; i++)
    {
        fill(255, 255, 255);
        ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].size + 20, clouds[i].radius + 50);
        ellipse(clouds[i].x_pos - 40, clouds[i].y_pos,clouds[i].size,  clouds[i].radius);
        ellipse(clouds[i].x_pos + 40, clouds[i].y_pos,clouds[i].size,  clouds[i].radius );
        ellipse(clouds[i].x_pos + 40, clouds[i].y_pos,clouds[i].size + 20,clouds[i].radius + 50);
        ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].size, clouds[i].radius);
        ellipse(clouds[i].x_pos + 80, clouds[i].y_pos,clouds[i].size, clouds[i].radius);

        }
}

/* ---------------------------
   Function to draw mountains objects.
 ---------------------------*/
function drawMountains(){
    for(var i = 0; i < mountains.length; i++)
    {
        //1st mountain
        fill(119, 136, 153);
        triangle(mountains[i].x_pos + 275,mountains[i].y_pos + 432,mountains[i].x_pos + 350, mountains[i].y_pos + 156, mountains[i].x_pos +  440, mountains[i].y_pos + 432);

        fill(119, 136, 153, 220);
        triangle(mountains[i].x_pos + 210,mountains[i].y_pos + 432,mountains[i].x_pos + 270, mountains[i].y_pos + 220, mountains[i].x_pos +  440, mountains[i].y_pos + 432);


        //second moundtain
        fill(129, 146, 163);
        triangle(mountains[i].x_pos + 350, mountains[i].y_pos + 156, mountains[i].x_pos + 440, mountains[i].y_pos + 432, mountains[i].x_pos + 510, mountains[i].y_pos + 432);   
        triangle(mountains[i].x_pos + 260, mountains[i].y_pos + 432, mountains[i].x_pos + 270, mountains[i].y_pos  + 220, mountains[i].x_pos + 440, mountains[i].y_pos + 432);


        //third mountain
        fill(119, 136, 153);
        triangle(mountains[i].x_pos + 320,mountains[i].y_pos + 432,mountains[i].x_pos + 450,mountains[i].y_pos + 120,mountains[i].x_pos + 530,mountains[i].y_pos + 432);

        fill(129, 146, 163);
        triangle(mountains[i].x_pos + 500,mountains[i].y_pos + 432,mountains[i].x_pos + 450,mountains[i].y_pos + 120,mountains[i].x_pos + 575,mountains[i].y_pos + 432);

        }
};


// ---------------------------------
// Function to draw trees objects
// ---------------------------------

function drawTrees(){
    for(var i = 0; i < trees.length; i++)
    {
        //tree trunk
        fill(120, 100, 40);

        ellipse(trees[i].x_pos + 25,trees[i].y_pos + 85 ,70,120);

        rect(trees[i].x_pos, trees[i].y_pos - 5, 50, 150);

        //branches
        fill(0,100,0);

        triangle(trees[i].x_pos - 30, trees[i].y_pos + 50, trees[i].x_pos + 30, trees[i].y_pos - 50, trees[i].x_pos + 90, trees[i].y_pos + 50);

        triangle(trees[i].x_pos - 20, trees[i].y_pos, trees[i].x_pos + 30, trees[i].y_pos - 100, trees[i].x_pos + 80, trees[i].y_pos);

        triangle(trees[i].x_pos - 60, trees[i].y_pos + 118, trees[i].x_pos + 30, trees[i].y_pos + 12, trees[i].x_pos + 120, trees[i].y_pos + 118);
        }
}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------


function drawCanyon(t_canyon){
    //Drawing the sky 
    fill(230, 230, 250);
    rect(t_canyon.x_pos + 105, t_canyon.y_pos, t_canyon.width, t_canyon.height + 6);
        
    //green rect dimension
    fill(46,139,  87);
    rect(t_canyon.x_pos + 80, t_canyon.y_pos, t_canyon.width - 70, t_canyon.height);
     rect(t_canyon.x_pos + 195,t_canyon.y_pos, t_canyon.width - 90, t_canyon.height);
}



// ---------------------------------
// Function to check character is over a canyon.
// ---------------------------------
// 

function checkCanyon(t_canyon){
    if(gameChar_world_x < (t_canyon.x_pos + 95 + t_canyon.width) && gameChar_world_x > t_canyon.x_pos + 95 && gameChar_y >= floorPos_y)

        {
            console.log("I am falling"); 
            
            fill(0);
            isPlummeting = true;
            
            if (gameChar_y >= 600)
            {   
                gameChar_x = width/2;
                gameChar_y = floorPos_y;
                isPlummeting = false;
                
                
            }
        }
}

// ---------------------------------
// Flagpole functions
// ---------------------------------

function drawFlagpole(t_flagpole){  
    push();
    strokeWeight(5);
    stroke(220);
    line(t_flagpole.x_pos, floorPos_y, t_flagpole.x_pos, floorPos_y - 150); 
    pop();

 
    if (t_flagpole.isReached)
        {      fill(255, 0, 0);
            noStroke();
            triangle(t_flagpole.x_pos, floorPos_y - 150, t_flagpole.x_pos, floorPos_y - 100, t_flagpole.x_pos + 50, floorPos_y - 125);
            
            ellipse(t_flagpole.x_pos, floorPos_y - 150, 10, 10)
        }
 
    else
        {      fill(255, 0, 0);
            noStroke();
            triangle(t_flagpole.x_pos, floorPos_y - 50, t_flagpole.x_pos, floorPos_y, t_flagpole.x_pos + 50, floorPos_y - 25);
            
            ellipse(t_flagpole.x_pos, floorPos_y - 150, 10, 10)
        }

}



// ----------------------------------
// check Flagpole functions
// ----------------------------------
function checkFlagpole(t_flagpole){
    var distance = abs(gameChar_world_x - t_flagpole.x_pos);
    if(distance < 15)
        {
            t_flagpole.isReached = true;
        }
}

// ----------------------------------
// Platforms
// --------------------------------

function createPlatforms(x,y,length){
    var plat =
        {   x: x,
            y: y,
            length:  length,
            draw: function()
            {
            fill(255,0,255);
            rect(this.x, this.y, this.length, 10);
                
        },
            checkContact: function(gc_x, gc_y)
            {
            if(gc_x > this.x && gc_x < this.x + this.length)
            {
              var dist_plat = this.y - gc_y
              if(dist_plat >= 0 && dist_plat < 5)
                  {
                      return true;
                  }
                return false;
        }
            
        }
    }
    return plat;
}
// ----------------------------------
// checkPlayer Die function
// ----------------------------------

function checkPlayerDie(){
       if(gameChar_y > height){
            
           lives -= 1;
            
            if(lives >= 1){
                    startGame();
                }
            else if(lives < 1){
                lives = 0;
            }   
        }

      //drawing Heart Score Visual
        for(let i = 0; i < lives; i++){
            image(heart, 180 + 25 * i, 5, 15, 15);
            }   
}

 
// ----------------------------------
// enemy function
// ----------------------------------
function Enemy(x, y, range){
    this.x = x;
    this.y = y;
    this.range = range;
    
    this.currentX = x;
    this.increment = 1;
    
    this.update = function()
    {
        currentX += this.increment
        
        if(this.currentX >= this.x + this.range)
            {
                this.increment = -1;
            }
        else if(this.currentX < this.x)
            {
                this.inc = 1;
            }
        this.draw = function()
        {   this.update();
            fill(255,160,122)
            ellipse(this.x, this.y, 20, 20)
         /*
            
            //drawing the body
            noStroke();
            fill(0);
            ellipse(this.x, this.y - 35, 23, 25); //draw head
            ellipse(this.x, this.y - 20, 33, 40); // draw body
            
            fill(255);
            ellipse(this.x, this.y - 14.5, 23.5, 28); //draw belly
            
            noStroke();
            ellipse(this.x, this.y -10, 24, 20); //drawing belly outline
            
            noStroke();
            smooth();
            fill(255,160, 122);
            triangle(this.x - 5, this.y - 34, this.x + 5, this.y - 34, this.x, this.y - 26); // drawing the mouth
            
            fill(255,255,240);
            ellipse(this.x - 2.5, this.y - 38,   7, 8 ); //draw eyes
            ellipse(this.x + 2.5, this.y - 37.3, 7, 5.5 ); //draw eyes 2
            
            fill(0);
            ellipse(this.x - 2.5, this.y - 38, 1 , 2); //draw iris
            ellipse(this.x + 2.5, this.y - 38, 1 , 2); //draw iris 2
            
            fill(255,160,122)
            stroke(0);
            strokeWeight(0.2);
            arc(this.x - 5, this.y + 2, 10, 10, PI, 2*PI);//draw feet
            arc(this.x + 5, this.y + 2, 10, 10, PI, 2*PI);//draw feet
            
            fill(128)
            noStroke();
            arc(this.x - 14, this.y - 20, 5, 20, 1.2*PI/2, 3*PI/2); //draw arm
            arc(this.x + 15, this.y - 20, 5, 20, 3*PI/2, 0.8*PI/2); //draw arm  
         
         
         */
        }
    }
}
//        
//        this.checkContact = function(
//        {
//            
//        }
    
    

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

function drawCollectable(t_collectable){
    // middle button
    fill (218, 122, 214);
    triangle(t_collectable.x_pos, t_collectable.y_pos, t_collectable.x_pos +  10, t_collectable.y_pos + 20, t_collectable.x_pos + 20, t_collectable.size);

    fill (218, 112, 214);
    triangle(t_collectable.x_pos, t_collectable.y_pos, t_collectable.x_pos +  10, t_collectable.y_pos - 20, t_collectable.x_pos + 20, t_collectable.size);

    //top right traingle
    fill(238, 130, 238);
    triangle(t_collectable.x_pos - 10, t_collectable.y_pos, t_collectable.x_pos + 10, t_collectable.y_pos - 20, t_collectable.x_pos, t_collectable.size);

    //bottom
    fill(238, 140, 238);
    triangle(t_collectable.x_pos - 10, t_collectable.y_pos, t_collectable.x_pos + 10, t_collectable.y_pos + 20, t_collectable.x_pos, t_collectable.size);

    //left top triangle
    fill(186, 85, 211);
    triangle(t_collectable.x_pos + 20, t_collectable.y_pos, t_collectable.x_pos + 10, t_collectable.y_pos - 20, t_collectable.x_pos +30, t_collectable.size);

    //bottom
    fill(186, 95, 211);
    triangle(t_collectable.x_pos + 20, t_collectable.y_pos, t_collectable.x_pos + 10, t_collectable.y_pos + 20, t_collectable.x_pos + 30, t_collectable.size);
}


// ----------------------------------
// Function to check character has collected an item.
// ----------------------------------

function checkCollectable(t_collectable){
    if(dist(gameChar_world_x, gameChar_y, t_collectable.x_pos + 20, t_collectable.y_pos) <=45)
    {
            t_collectable.isFound = true;
            console.log("Yeah. Score!");
            game_score += 1;
        collectSound.play();
        }
}

