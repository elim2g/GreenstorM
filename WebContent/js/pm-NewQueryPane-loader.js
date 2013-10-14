/**
 * Loading Script for new-query-pane.txt
 * Loads particular functions/features predominately for Advanced/Custom search
 */

$('#cus-article-span').hide();
$('#cus-book-span').hide();
$('#cus-collection-span').hide();
$('#cus-list-span').hide();
$('#cus-map-span').hide();
$('#cus-music-span').hide();
$('#cus-newspaper-span').hide();
$('#cus-picture-span').hide();
$('#cus-article').hide();
$('#cus-book').hide();
$('#cus-collection').hide();
$('#cus-list').hide();
$('#cus-map').hide();
$('#cus-music').hide();
$('#cus-newspaper').hide();
$('#cus-picture').hide();

$('#cus-article-zone').change(
	function(){
		if($('#cus-article-zone').prop('checked')){
			$('#cus-article-span').show();
			$('#cus-article').show();
		} else {
			$('#cus-article-span').hide();
			$('#cus-article').hide();
		}
	}
);
$('#cus-book-zone').change(
	function(){
		if($('#cus-book-zone').prop('checked')){
			$('#cus-book-span').show();
			$('#cus-book').show();
		} else {
			$('#cus-book-span').hide();
			$('#cus-book').hide();
		}
	}
);
$('#cus-collection-zone').change(
	function(){
		if($('#cus-collection-zone').prop('checked')){
			$('#cus-collection-span').show();
			$('#cus-collection').show();
		} else {
			$('#cus-collection-span').hide();
			$('#cus-collection').hide();
		}
	}
);
$('#cus-list-zone').change(
	function(){
		if($('#cus-list-zone').prop('checked')){
			$('#cus-list-span').show();
			$('#cus-list').show();
		} else {
			$('#cus-list-span').hide();
			$('#cus-list').hide();
		}
	}
);
$('#cus-map-zone').change(
	function(){
		if($('#cus-map-zone').prop('checked')){
			$('#cus-map-span').show();
			$('#cus-map').show();
		} else {
			$('#cus-map-span').hide();
			$('#cus-map').hide();
		}
	}
);
$('#cus-music-zone').change(
	function(){
		if($('#cus-music-zone').prop('checked')){
			$('#cus-music-span').show();
			$('#cus-music').show();
		} else {
			$('#cus-music-span').hide();
			$('#cus-music').hide();
		}
	}
);
$('#cus-newspaper-zone').change(
	function(){
		if($('#cus-newspaper-zone').prop('checked')){
			$('#cus-newspaper-span').show();
			$('#cus-newspaper').show();
		} else {
			$('#cus-newspaper-span').hide();
			$('#cus-newspaper').hide();
		}
	}
);
$('#cus-picture-zone').change(
	function(){
		if($('#cus-picture-zone').prop('checked')){
			$('#cus-picture-span').show();
			$('#cus-picture').show();
		} else {
			$('#cus-picture-span').hide();
			$('#cus-picture').hide();
		}
	}
);

$(function() {
	$( "#tabs" ).tabs({
		beforeActivate: function (event, ui) {
			m_currentQueryFormPane = ui.newPanel.attr('id');
		}
	});
});
$(function() {
	$( "#adv-accordion" ).accordion({
		heightStyle: "content",
		collapsible: false,
		activate: function () {
        	m_currentZone = ($('.ui-accordion-header-active').attr('id')).replace("adv-","");
        	if(m_currentZone == "newspaper") {
        		_getNewspaperTitles();
        	}
    	}
	});
});
$(function() {
	$( "#cus-accordion" ).accordion({
		heightStyle: "content",
		collapsible: true,
		active: false,
		//need to set zones somehow
	});
});

$('#adv-newspaper-month-row').hide();
$('#adv-newspaper-year-row').hide();

$('#adv-newspaper-decade').change(
	function() {
		if($('#adv-newspaper-decade').val()) {
			$('#adv-newspaper-year-row').show();
			var startYear = parseInt($('#adv-newspaper-decade').val() + 0);
			$('#adv-newspaper-year').children().remove();
			$('#adv-newspaper-year').append('<option value="" selected></option>');
			for (var i = startYear; i < startYear+10; i++){
				$('#adv-newspaper-year').append('<option value="'+i+'">'+i+'</option>');
			}
			$('#adv-newspaper-month-row').hide();
		} else {
			$('#adv-newspaper-year-row').hide();
			$('#adv-newspaper-month-row').hide();
			$('#adv-newspaper-year').children().remove();
			$('#adv-newspaper-year').append('<option value="" selected></option>');
		}
	}
);
$('#adv-newspaper-year').change(
	function() {
		if($('#adv-newspaper-year').val()) {
			$('#adv-newspaper-month-row').show();
		} else {
			$('#adv-newspaper-month-row').hide();
		}
	}
);


$('#cus-newspaper-month-row').hide();
$('#cus-newspaper-year-row').hide();
$('#cus-newspaper-decade').change(
		function() {
			if($('#cus-newspaper-decade').val()) {
				$('#cus-newspaper-year-row').show();
				var startYear = parseInt($('#cus-newspaper-decade').val() + 0);
				$('#cus-newspaper-year').children().remove();
				$('#cus-newspaper-year').append('<option value="" selected></option>');
				for (var i = startYear; i < startYear+10; i++){
					$('#cus-newspaper-year').append('<option value="'+i+'">'+i+'</option>');
				}
				$('#cus-newspaper-month-row').hide();
			} else {
				$('#cus-newspaper-year-row').hide();
				$('#cus-newspaper-month-row').hide();
				$('#cus-newspaper-year').children().remove();
				$('#cus-newspaper-year').append('<option value="" selected></option>');
			}
		}
	);
$('#cus-newspaper-year').change(
	function() {
		if($('#cus-newspaper-year').val()) {
			$('#cus-newspaper-month-row').show();
		} else {
			$('#cus-newspaper-month-row').hide();
		}
	}
);

_getTroveContributors();
for (var i = (MINYEAR/10); i <= (MAXYEAR/10); i++){
	$('#adv-newspaper-decade').append('<option value="'+i+'">'+i+'0&apos;s</option>');
	$('#cus-newspaper-decade').append('<option value="'+i+'">'+i+'0&apos;s</option>');
	$('#adv-article-decade').append('<option value="'+i+'">'+i+'0&apos;s</option>');
	$('#cus-article-decade').append('<option value="'+i+'">'+i+'0&apos;s</option>');
	$('#adv-book-decade').append('<option value="'+i+'">'+i+'0&apos;s</option>');
	$('#cus-book-decade').append('<option value="'+i+'">'+i+'0&apos;s</option>');
	$('#adv-collection-decade').append('<option value="'+i+'">'+i+'0&apos;s</option>');
	$('#cus-collection-decade').append('<option value="'+i+'">'+i+'0&apos;s</option>');
	$('#adv-picture-decade').append('<option value="'+i+'">'+i+'0&apos;s</option>');
	$('#cus-picture-decade').append('<option value="'+i+'">'+i+'0&apos;s</option>');
	$('#adv-list-decade').append('<option value="'+i+'">'+i+'0&apos;s</option>');
	$('#cus-list-decade').append('<option value="'+i+'">'+i+'0&apos;s</option>');
	$('#adv-map-decade').append('<option value="'+i+'">'+i+'0&apos;s</option>');
	$('#cus-map-decade').append('<option value="'+i+'">'+i+'0&apos;s</option>');
	$('#adv-music-decade').append('<option value="'+i+'">'+i+'0&apos;s</option>');
	$('#cus-music-decade').append('<option value="'+i+'">'+i+'0&apos;s</option>');
}
for (var i = MINYEAR; i <= MAXYEAR; i++){
	if (i%10 == 0) {
		$('#adv-article-year').append('<option value="'+i+'">--'+i+'--</option>');
		$('#cus-article-year').append('<option value="'+i+'">--'+i+'--</option>');
		$('#adv-book-year').append('<option value="'+i+'">--'+i+'--</option>');
		$('#cus-book-year').append('<option value="'+i+'">--'+i+'--</option>');
		$('#adv-collection-year').append('<option value="'+i+'">--'+i+'--</option>');
		$('#cus-collection-year').append('<option value="'+i+'">--'+i+'--</option>');
		$('#adv-picture-year').append('<option value="'+i+'">--'+i+'--</option>');
		$('#cus-picture-year').append('<option value="'+i+'">--'+i+'--</option>');
		$('#adv-list-year').append('<option value="'+i+'">--'+i+'--</option>');
		$('#cus-list-year').append('<option value="'+i+'">--'+i+'--</option>');
		$('#adv-map-year').append('<option value="'+i+'">--'+i+'--</option>');
		$('#cus-map-year').append('<option value="'+i+'">--'+i+'--</option>');
		$('#adv-music-year').append('<option value="'+i+'">--'+i+'--</option>');
		$('#cus-music-year').append('<option value="'+i+'">--'+i+'--</option>');
	} else {
		$('#adv-article-year').append('<option value="'+i+'">'+i+'</option>');
		$('#cus-article-year').append('<option value="'+i+'">'+i+'</option>');
		$('#adv-book-year').append('<option value="'+i+'">'+i+'</option>');
		$('#cus-book-year').append('<option value="'+i+'">'+i+'</option>');
		$('#adv-collection-year').append('<option value="'+i+'">'+i+'</option>');
		$('#cus-collection-year').append('<option value="'+i+'">'+i+'</option>');
		$('#adv-picture-year').append('<option value="'+i+'">'+i+'</option>');
		$('#cus-picture-year').append('<option value="'+i+'">'+i+'</option>');
		$('#adv-list-year').append('<option value="'+i+'">'+i+'</option>');
		$('#cus-list-year').append('<option value="'+i+'">'+i+'</option>');
		$('#adv-map-year').append('<option value="'+i+'">'+i+'</option>');
		$('#cus-map-year').append('<option value="'+i+'">'+i+'</option>');
		$('#adv-music-year').append('<option value="'+i+'">'+i+'</option>');
		$('#cus-music-year').append('<option value="'+i+'">'+i+'</option>');
	}
}