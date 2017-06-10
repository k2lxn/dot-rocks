
// Initialize colorChoice variable to a nice yellow
var colorChoice = "ywFFD119";

var pjs = Processing.getInstanceById('sketch');

$(document).ready(function() {
	var bound = false;
		
	function bindJavascript(){
		pjs = Processing.getInstanceById('sketch');
		if(pjs != null){
			pjs.bindJavascript(this);
			bound = true;
			//if(bound === true){ alert("bound");}
		}
	
		if(!bound) { setTimeout(bindJavascript, 250); }
	}
	
	bindJavascript();
	
});

// Change colorChoice to swatch's color onclick
function setColor(id) {
	colorChoice = id;
	pjs.setFrameColor();
	pjs.redraw();	
}

function getColor() {
	return colorChoice;
}


$(window).load(function() { 

	// Initialize swatches array to assign all swatch elements in the DOM an onclick
	var swatches = document.getElementsByClassName('swatch');
	
	for(var i=0; i < swatches.length; i++) {
		var id = swatches[i].id;
		swatches[i].setAttribute("onclick","setColor(this.id);");
	}

});


