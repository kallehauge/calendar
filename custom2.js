jQuery(document).ready(function($) {

	$date = $('.date');
	$month = $('.month');
	$year = $('.year');

	date = new Date();
	cl = date.getDay();
	// cl = date.toLocaleDateString();
	console.log(cl);


	$("button").click(function() {
		val = $("p").text();
		val = parseInt(val);
		$("p").html(val+1);
	});

});