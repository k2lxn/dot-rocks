
$(document).ready(function() {

var bound = false;
		
function bindJavascript(){
	var pjs = Processing.getInstanceById('sketch');
	if(pjs != null){
		pjs.bindJavascript(this);
		bound = true;
		//if(bound === true){ alert("bound");}
	}
	if(!bound) { setTimeout(bindJavascript, 250); }
}

bindJavascript();


function getCanvasWidth() {
	return $("canvas").width();
};

/*
$(window).on('click', function() {
	alert("width: " + getCanvasWidth() + ", height: " + $("canvas").height());
});
*/

});