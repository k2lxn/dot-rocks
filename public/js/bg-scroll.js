var total_slides;



function set_scroll() {
	$(".scroll-trigger").height( (window.innerWidth * total_slides) + (window.innerHeight - window.innerWidth) );

	$(".scroll-trigger-container").scroll(function(){
		var offset = $(".scroll-trigger-container").scrollTop();
				
		$("#slideshow").offset({top: 0, left: -offset });
	});
}



/* READY */
$(document).ready(function(){
	total_slides = 4;
	set_scroll();
	
});

/* RESIZE */
$(window).resize(function(){

	set_scroll();
	
});