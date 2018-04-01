var total_slides = 4;
var slide_width;
var scroll_direction;
var last_scrollTop;
var snap_to;

function set_scroll_direction( last, curr ) {
	if ( last > curr ) {
		scroll_direction = "right";
	}
	else {
		scroll_direction = "left";
	}
}


function set_snap_to() {
	if ( scroll_direction === "left" ) {
		for ( i=1; i < total_slides + 1 ; i++ ) {	
			if ( slide_width * i > last_scrollTop ) {
				return ( slide_width * i ) ;
			}
		}
	} else {
		// do an inverse calculation
	}
}


function scroll_to_snap() {
	$(".scroll-trigger-container").unbind("scroll"); // temporarily disable scrolling

	var scroll_speed = slide_width * .75;

	$('#slideshow').animate({
		left: -(snap_to)
	}, scroll_speed, function(){
		$(".scroll-trigger-container").scrollTop( snap_to );
		// reenable scrolling after a short timeout
		setTimeout(function(){
			set_scroll();
		}, 1000);
	});
}

function set_scroll() {
	$(".scroll-trigger").height( (window.innerWidth * total_slides) + (window.innerHeight - window.innerWidth) );

	$(".scroll-trigger-container").scroll(function(){
		var offset = $(".scroll-trigger-container").scrollTop();

		set_scroll_direction( last_scrollTop, offset );
		last_scrollTop = offset;

		$("#slideshow").offset({top: 0, left: -offset });

		// if offset is within a certain distance of snap_to, snap_to
		snap_to = set_snap_to();
		if ( offset >= snap_to - slide_width * .9 ) {
			scroll_to_snap();
		}
		
	});
}


/* READY */
$(document).ready(function(){
	slide_width = $('#slideshow').width() / total_slides ;
	scroll_direction = "left";
	last_scrollTop = 0;

	snap_to = set_snap_to();

	set_scroll();
	
});

/* RESIZE */
$(window).resize(function(){
	slide_width = $('#slideshow').width() / total_slides ;

	snap_to = set_snap_to();
	set_scroll();
	
});





