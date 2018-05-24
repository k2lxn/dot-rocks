var total_slides = 4;
var slide_width;
var curr_slide;

function scroll_right(){
	var curr_scroll = $("#slideshow").offset().left;
	var scroll_to = curr_scroll - slide_width;
	var scroll_speed = slide_width * .75;

	if ( Math.abs(scroll_to) < $('#slideshow').width() ) {
		//$("#slideshow").offset({top: 0, left: scroll_to });
		$('#slideshow').animate({
			left: scroll_to
		}, scroll_speed );

		curr_slide++;

		// hide/show scroll buttons
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

	curr_slide--;

	// hide/show scroll buttons
	$("#scroll-right").show();
	if ( Math.abs(curr_scroll) <= slide_width ) {
		$("#scroll-left").hide();
	}
}

function stage_illustrations() {
	console.log("curr_slide: " + curr_slide);
	$(".illustration").each( function() {

		var offstage_left =  ( slide_width / 2 ) + $(this).width() ;
		var duration = slide_width * 1.5 ;
		
		// disappears
		if ( $(this).data("disappearon") === curr_slide ) {
			$(this).data("reappearon", curr_slide - 1 );
			
			$(this).animate({
				left: -(offstage_left)
			}, duration, function(){
				$(this).css("visibility", "hidden");
			});
		}

		// reappears
		else if ( $(this).data("reappearon") === curr_slide )  {
			$(this).css("visibility", "visible");

			$(this).animate({
				left: $(this).data("left")
			}, duration );
		}
		
	});
}


/* READY */
$(document).ready(function(){
	slide_width = $('#slideshow').width() / total_slides ;
	curr_slide = 0;

	stage_illustrations();
	
	$("#scroll-right").click( function() { 
		scroll_right(); 
		stage_illustrations();
	} );
	$("#scroll-left").click( function() { 
		scroll_left(); 
		stage_illustrations();
	} );
});


/* RESIZE */
$(window).resize(function(){
	var old_slide_width = slide_width ;
	slide_width = $('#slideshow').width() / total_slides ;

	// snap to slide edge
	var slide_index = total_slides * ( Math.abs( document.getElementById("slideshow").offsetLeft ) / (old_slide_width * total_slides) ) ;
	$("#slideshow").offset({top: 0, left: -( slide_index * slide_width ) });
	
});





