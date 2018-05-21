var total_slides = 4;
var slide_width;

function scroll_right(){
	var curr_scroll = $("#slideshow").offset().left;
	var scroll_to = curr_scroll - slide_width;
	var scroll_speed = slide_width * .75;

	if ( Math.abs(scroll_to) < $('#slideshow').width() ) {
		//$("#slideshow").offset({top: 0, left: scroll_to });
		$('#slideshow').animate({
			left: scroll_to
		}, scroll_speed );

		$("#scroll-left").show();
		
		if ( Math.abs(scroll_to) >= ( $('#slideshow').width() - slide_width) ) {
			$("#scroll-right").hide();
		}
	}
}

function scroll_left(){
	var curr_scroll = $("#slideshow").offset().left;
	var scroll_to = curr_scroll + slide_width;
	var scroll_speed = slide_width * .75;

	if ( Math.abs(curr_scroll) >= slide_width ) {
		//$("#slideshow").offset({top: 0, left: scroll_to });
		$('#slideshow').animate({
			left: scroll_to
		}, scroll_speed );
	}

	$("#scroll-right").show();
	
	if ( Math.abs(curr_scroll) <= slide_width ) {
		$("#scroll-left").hide();
	}
}


/* READY */
$(document).ready(function(){
	slide_width = $('#slideshow').width() / total_slides ;
	
	$("#scroll-right").click( scroll_right );
	$("#scroll-left").click( scroll_left );
});


/* RESIZE */
$(window).resize(function(){
	var old_slide_width = slide_width ;
	slide_width = $('#slideshow').width() / total_slides ;

	// snap to slide edge
	var slide_index = total_slides * ( Math.abs( document.getElementById("slideshow").offsetLeft ) / (old_slide_width * total_slides) ) ;
	$("#slideshow").offset({top: 0, left: -( slide_index * slide_width ) });
	
});





