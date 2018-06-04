var total_slides = 4;
var slide_width;
var curr_slide;


function scroll_right(){
	var curr_scroll = $("#slideshow").offset().left;
	var scroll_to = curr_scroll - slide_width;
	var scroll_speed = slide_width * .75;

	if ( Math.abs(scroll_to) < $('#slideshow').width() ) {
		// block other clicks until animation executes (rebind click in animation callback)
		$("#scroll-left").unbind("click");
		$("#scroll-right").unbind("click");

		$('#slideshow').animate({
			left: scroll_to
		}, scroll_speed, function(){ 
			$("#scroll-left").click( scroll_left ) ;
			$("#scroll-right").click( scroll_right ) ;
		});

		curr_slide++;

		// hide/show scroll buttons
		$("#scroll-left").show();
		if ( Math.abs(scroll_to) >= ( $('#slideshow').width() - slide_width) ) {
			$("#scroll-right").hide();
		}
	}

	stage_illustrations();
}

function scroll_left(){
	var curr_scroll = $("#slideshow").offset().left;
	var scroll_to = curr_scroll + slide_width;
	var scroll_speed = slide_width * .75;

	if ( Math.abs(curr_scroll) >= slide_width ) {
		// block other clicks until animation executes (rebind click in animation callback)
		$("#scroll-left").unbind("click");
		$("#scroll-right").unbind("click");

		$('#slideshow').animate({
			left: scroll_to
		}, scroll_speed, function(){ 
			$("#scroll-left").click( scroll_left ) ;
			$("#scroll-right").click( scroll_right ) ;
		});
	}

	curr_slide--;

	// hide/show scroll buttons
	$("#scroll-right").show();
	if ( Math.abs(curr_scroll) <= slide_width ) {
		$("#scroll-left").hide();
	}

	stage_illustrations();
}

function stage_illustrations() {
	//console.log("curr_slide: " + curr_slide);
	$(".illustration").each( function() {

		var duration = slide_width * 1.5 ;
		var animation_data;
		var original_left = ( $(window).width() / 2 ) + $(this).data("left") ;		

		// disappears
		if ( $(this).data("disappearon") === curr_slide ) {
			$(this).data("reappearon", curr_slide - 1 );
			
			if ( $(this).data("left")) {
				animation_data = { left: -(original_left) };
			}
			else {
				animation_data = { opacity : 0 } ;
			}

			$(this).animate( animation_data , duration, function(){
				$(this).css("visibility", "hidden");
			});
		}

		// reappears
		else if ( $(this).data("reappearon") === curr_slide )  {
			$(this).css("visibility", "visible");

			if ( $(this).data("left")) {
				animation_data = { left: original_left };
			}
			else {
				console.log("Come back!");
				animation_data = { opacity : 1 } ;
			}

			$(this).animate( animation_data, duration );
		}
		

	});
}




/* READY */
$(document).ready(function(){
	slide_width = $('#slideshow').width() / total_slides ;
	curr_slide = 0;

	stage_illustrations();
	
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





