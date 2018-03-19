var total_slides;
var scroll_direction;
var last_scrollTop;

function set_scroll_direction( last, curr ) {
	if ( last > curr ) {
		scroll_direction = "left";
	}
	else {
		scroll_direction = "right";
	}
	console.log("scroll_direction: " + scroll_direction );

	//last_scrollTop = curr;
}


function set_scroll() {
	$(".scroll-trigger").height( (window.innerWidth * total_slides) + (window.innerHeight - window.innerWidth) );

	$(".scroll-trigger-container").scroll(function(){
		var offset = $(".scroll-trigger-container").scrollTop();
				
		$("#slideshow").offset({top: 0, left: -offset });

		set_scroll_direction( last_scrollTop, offset );

		last_scrollTop = offset;
	});
}


/* READY */
$(document).ready(function(){
	total_slides = 4;
	scroll_direction = "right";
	last_scrollTop = 0;

	set_scroll();
	
});

/* RESIZE */
$(window).resize(function(){

	set_scroll();
	
});