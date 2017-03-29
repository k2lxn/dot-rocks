
/* * * VARIABLES * * */
var backgrounds = ["lavender","orange","pink","olive"];
var bg_index = 0;

function update_bg() {
	if (bg_index < (backgrounds.length - 1)) {
		bg_index++;
	} else {
		bg_index = 0;
	}
	var new_bg = backgrounds[bg_index];
	$(".content").css("background-color",new_bg);	
}

/* READY */
$(document).ready(function(){

	$(".scroll-trigger").scroll(function(){
		console.log("scrolling");
		
		var offset = $(".scroll-trigger").scrollTop();
		console.log("offset: "+offset);
		$("#slideshow").offset({top: 0, left: -offset });
		
		// Counter scroll to top
		//$(window).scrollTop(0);
		
		// Switch to next background image
		//update_bg(); 		
	});
	
});