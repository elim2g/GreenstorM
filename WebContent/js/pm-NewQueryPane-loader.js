/**
 * Loading Script for new-query-pane.txt
 * Loads particular functions/features predominately for Advanced/Custom search
 */

$(function() {
	$("cus-article-check").button();
	$("cus-book-check").button();
	$("cus-collection-check").button();
	$("cus-list-check").button();
	$("cus-map-check").button();
	$("cus-music-check").button();
	$("cus-newspaper-check").button();
	$("cus-picture-check").button();
});
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