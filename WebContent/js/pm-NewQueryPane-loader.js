// Loads NewQueryPane features

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

$('#adv-newspaper-month-row').hide();
$('#adv-newspaper-year-row').hide();

_addDecades('#adv-article-decade');
_addDecades('#adv-book-decade');
_addDecades('#adv-collection-decade');
_addDecades('#adv-list-decade');
_addDecades('#adv-map-decade');
_addDecades('#adv-music-decade');
_addDecades('#adv-newspaper-decade');
_addDecades('#adv-picture-decade');

_addDecades('#custom-facet-decade-search');
_addDecades('#custom-index-decade-search');

_addYears('#adv-article-year');
_addYears('#adv-book-year');
_addYears('#adv-collection-year');
_addYears('#adv-list-year');
_addYears('#adv-map-year');
_addYears('#adv-music-year');
_addYears('#adv-newspaper-year');
_addYears('#adv-picture-year');

_addYears('#custom-facet-year-search');
_addYears('#custom-facet-year_newspaper-search');

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


_customHideCriteria(ShowNone);

_datePicker("#custom-index-lastupdated-search_start");
_datePicker("#custom-index-lastupdated-search_finish");
_datePicker("#custom-index-taglastupdated-search_start");
_datePicker("#custom-index-taglastupdated-search_finish");
_datePicker("#custom-index-commentlastupdated-search_start");
_datePicker("#custom-index-commentlastupdated-search_finish");

$(function() {
	var availableYears = new Array();
	var minYear = 1880;
	var maxYear = new Date().getFullYear();
	for (var i= minYear; i <= maxYear; i++){
		availableYears.push(i.toString());
	}
	$('#custom-index-date-search_start').autocomplete({source:availableYears});
	$('#custom-index-date-search_finish').autocomplete({source:availableYears});
});

$("#custom-zone-article").change(function(){_zoneCheck("#custom-zone-article");});
$("#custom-zone-book").change(function(){_zoneCheck("#custom-zone-book");});
$("#custom-zone-collection").change(function(){_zoneCheck("#custom-zone-collection");});
$("#custom-zone-list").change(function(){_zoneCheck("#custom-zone-list");});
$("#custom-zone-map").change(function(){_zoneCheck("#custom-zone-map");});
$("#custom-zone-music").change(function(){_zoneCheck("#custom-zone-music");});
$("#custom-zone-newspaper").change(function(){_zoneCheck("#custom-zone-newspaper");});
$("#custom-zone-picture").change(function(){_zoneCheck("#custom-zone-picture");});

_getTroveContributors('#custom-index-nuc-search');
