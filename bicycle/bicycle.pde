
// Get the size of the canvas element 
// (CSS rule will determine the size of all canvas elements)
// (Need to write a javascript function that returns these values)

// Assign canvas size in setup

// Assign canvas size when page changed
// (Will need to define a resizeCanvas function in js file)


/*
 * Bind JavaScript
 */

interface JavaScript {
	// declare js functions used by this Processing script
} 

void bindJavascript(JavaScript js) {
	javascript = js;
}

JavaScript javascript;



/*
 * Function definitions
 */

// Draw wheel with center at (x,y)

function wheel(x,y,angle) {   
	// Draw tire
	stroke(0);
	strokeWeight(8); 
	noFill();
	ellipse(x,y, wheelDiameter,wheelDiameter);
	
	// Draw spokes 
	stroke(#4C4C4C);
	strokeWeight(2);
	float wheelRadius = wheelDiameter/2;
	
	int numSpokes = 9;	
	float nextAngle = 0;
	for (int i=0; i<numSpokes; i++) {  
		float displaceX = cos(radians(angle))*(wheelRadius - 3); //Minus strokeWeight
		float displaceY = sin(radians(angle))*(wheelRadius - 3); 
		line(x,y, x-displaceX, y-displaceY);
		angle += (360/numSpokes);
	}	
} 


// Draw frame

function frame() {
	// Main frame
	stroke(frameColor);
	strokeWeight(7);
	
	float pedalX = centerX0 + 69;
	float pedalY = centerY0 + 10.5;
	float seatX = centerX0 + 45.5;
	float seatY = centerY0 - 78.4;
	float stemX = centerX0 + 136.5;
	float stemY = centerY0 - 78.4;
	
	line(centerX0,centerY0, pedalX,pedalY);  // Back wheel to pedal
	line(centerX0,centerY0, seatX,seatY);   // Back wheel to seat
	
	stroke(#4C4C4C);
	line(seatX,seatY, seatX-2,seatY-9);	// Seat stem
	stroke(frameColor);
	line(seatX,seatY, pedalX,pedalY);      // Seat to pedal
	
	line(seatX,seatY, stemX,stemY);   // Seat to handle stem
	line(pedalX,pedalY, stemX,stemY); // Pedal to handle stem
	line(stemX,stemY, centerX1,centerY1); // Front tines
	
	// Handlebars
	stroke(#4C4C4C);  // Grey part of stem
	
	float handlebarX = stemX - 6;
	float handlebarY = stemY - 19.6;
	
	line(stemX,stemY-2, handlebarX,handlebarY);
	line(handlebarX,handlebarY, handlebarX+4,handlebarY);
	
	stroke(0);  // Handles
	strokeWeight(7);
	float arcWidth = 52;
	float arcHeight = 27;
	arc(handlebarX+10,handlebarY+(arcHeight/2), arcWidth,arcHeight, TWO_PI-PI/2,TWO_PI+1.1);
	
	// Seat
	strokeWeight(10);
	stroke(#936916);
	line(seatX-15,seatY-16, seatX+10,seatY-15);  // See seat stem measurements line 75
}

// Draw pedal

function pedal(angle) {
	
	float pedalX = centerX0 + 69;
	float pedalY = centerY0 + 10.5;
	int pedalRadius = wheelDiameter/4;
	
	stroke(#4C4C4C);
	strokeWeight(12);
	point(pedalX,pedalY);    // Center
	
	strokeWeight(3);
	arc(pedalX,pedalY, pedalRadius,pedalRadius, 0,TWO_PI);   // Outer circle
	
	// Arm
	float displaceX = cos(radians(angle))*(pedalRadius-6); //Minus strokeWeight
	float displaceY = sin(radians(angle))*(pedalRadius-6); 	
	
	strokeWeight(7);
	line(pedalX,pedalY, pedalX-displaceX, pedalY-displaceY);
	
	// Pedal
	noStroke();
	fill(50);
	rectMode(CENTER);
	rect(pedalX-displaceX,pedalY-displaceY, 21,7);

}


/*
 * Global variables
 */

float wheelDiameter = 105;
float wheelRotation = 0;
float angleDisplace = 40;

boolean cycling;

// Set back wheel's center point
float bikeLength = 160;  // Distance between wheel center points
float centerX0 = (350 - bikeLength)/2;   // NOTE: 350 is canvas width - can make this dynamic in future
float centerY0 = 240;

// Set front wheel's center point
float centerX1 = centerX0 + bikeLength;
float centerY1 = centerY0;

color frameColor = #FFD119;


/*
 * Draw
 */
 
void setup() {

	size(350,350);
	background(#CCCCCC);
	smooth();
	frameRate(10);
	cycling = false;
	noLoop();	
}


void draw() {

	background(#CCCCCC);
	
	wheel(centerX0,centerY0,wheelRotation);
	wheel(centerX1,centerY1,wheelRotation);
	frame();
	pedal(wheelRotation);
		
	wheelRotation += 10;  // Determines speed wheels appear to turn
	
	// Move the bike forward on x-axis
	centerX0 += 10;
	centerX1 += 10;
	
	// Bring bike back onscreen after it exits
	if (centerX0 > 700){
		centerX1 = -(wheelDiameter/2);
		centerX0 = -(wheelDiameter/2) - bikeLength; 
	}

}


void mouseClicked(){
	if(!cycling){
		loop();
		cycling = true;
	} else {
		noLoop();
		cycling = false;
	}
}








