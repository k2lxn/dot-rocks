var total_slides = 4;
var slide_width;
var curr_slide;

(function( $ ) {
 
    $.fn.costumeChange = function( frame ) {
 
        frame = "frame" + frame ;
        var new_style = this.data( frame + "-style" ) ;

		this.hide().attr("src", "../image_dev/new/" +  this.data(frame) ).show().attr("id", new_style) ;

 		
 		
    };
 
}( jQuery ));

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
	console.log("curr_slide: " + curr_slide);
	$(".illustration").each( function() {

		var original_left = ( $(window).width() / 2 ) + $(this).data("left") ;
		//var offstage_left =  ( slide_width / 2 ) + $(this).width() ;
		var duration = slide_width * 1.5 ;
		
		// disappears
		if ( $(this).data("disappearon") === curr_slide ) {
			$(this).data("reappearon", curr_slide - 1 );
			
			$(this).animate({
				left: -(original_left)
			}, duration, function(){
				$(this).css("visibility", "hidden");
			});
		}

		// reappears
		else if ( $(this).data("reappearon") === curr_slide )  {
			$(this).css("visibility", "visible");

			$(this).animate({
				left: original_left
			}, duration );
		}

		// costume changes
		if ( $(this).data("changeon") === curr_slide ) {
			$(this).costumeChange( curr_slide );
		}
	});
}
/*
function costume_change(frame){
	frame = "frame" + frame ;
	$(this).attr("src", "../image_dev/new/" +  $(this).data(frame) )
}
*/

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





