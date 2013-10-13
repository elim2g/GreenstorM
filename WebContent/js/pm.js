/*
* Copyright (c) 2013 The University of Queensland. This software is being developed
* for the UQ School of History, Philosophy, Religion and Classics (HPRC).
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

// The webapp base URI is set by ANT build task
var PM_URI = '@PM_PREFIX@';

var TROVE_URL = 'http://api.trove.nla.gov.au/';
var TROVE_QUERY_URL = TROVE_URL + 'result?key=';
var GOOGLE_MAPS_URL = 'http://maps.googleapis.com/maps/api/geocode/json?address=';
var TROVE_NEWS_TITLES = 'http://api.trove.nla.gov.au/newspaper/titles?key=';

var ALERT = 'Alert';
var INFO = 'Information';
var QUESTION = 'Question';
var UNDEF = 'undefined';

var MAX_FETCH_SIZE = 100;
var YEAR_OFFSET = 44;
var YEAR_PX = 4;

// names of user preference keys
var PMC_USER_ID = 'id';
var PMC_TROVE_KEY = 'key';
var PMC_USER_EMAIL = 'em';
var PMC_USER_STATUS = 'stat';

var MAIN_VIEW = 'main-view';
var MAP_VIEW = 'map-view';
var RAW_VIEW = 'raw-view';
var CLOUD_VIEW = 'cloud-view';
var HIST_VIEW = 'histogram-view';
var MAP_CANVAS = 'map-canvas';
var NEW_QUERY_PANE = 'new-query-pane';
var CURR_QUERY_PANE = 'current-query-pane';
var SAVE_QUERY_PANE = 'save-query-pane';
var PARTNERS_PANE = 'partners-pane';
var CONTACTS_PANE = 'contact-pane';
var LOCN_EDIT_PANE = 'locn-edit-pane';
var HELP_ABOUT = 'help-about';
var HELP_TROVE = 'help-trove';
var HELP_PM = 'help-pm';
var HELP_RELEASE = 'release-notes';
var TERMS_OF_USE = 'help-tou';
var RAW_RECORD = 'raw-record-container';
var Y2K_TIMELINE_BAR = 'y2k-timeline';
var Y2K_SLIDER = 'y2k-slider';
var FOOTER_BAR = 'footer-bar';
var Q_SIMPLE = 'q-simple';
var Q_ADVANCED = 'q-advanced';
var Q_CUSTOM = 'q-custom';
var Q_SAVE = 'save-query';
var Q_STORE = 'stored-queries';
var Q_STORE_TABLE = 'qstore-table';


var MINYEAR	= '1800';
var MAXYEAR	= new Date().getFullYear();
// %age ranges and associated color for timeline and map pins
var FREQ_DISTR = [
    [0,0.5, '#ffffff'], [0.5,1, '#ccccff'], [1,1.5, '#6666ff'],
    [1.5,2, '#0000ff'], [2,3, '#00cccc'], [3,5, '#009999'],
    [5,7, '#006666'], [7,9, '#ffff00'], [9,11, '#ffcc00'],
    [11,13, '#ff9900'], [13,16, '#ff6600'], [16,20, '#ff0000'],
    [20,30, '#cc0000'], [30,45, '#660000'], [45,100,'#000000']
 ];

// Schemas for TROVE zone structs have been intuited by inspection. No docs exist!
// Currently (PM V1.0) only Newspaper is supported.
var ZONE_NEWSPAPER = {
    id:'newspaper', holder:'article', dtag:'date', rtag:'relevance.score', stag:'title.id',
    tags: [
	    { tag:'id', title:'ID', isLink:false },
	    { tag:'date', title:'Date', isLink:false },
	    { tag:'title.value', title:'Source', isLink:false },
	    { tag:'category', title:'Category', isLink:false },
	    { tag:'heading', title:'Heading', isLink:false },
	    { tag:'relevance.value', title:'Score', isLink:false },
	    { tag:'relevance.score', title:'Revelance', isLink:false },
	    { tag:'page', title:'Page', isLink:false },
	    { tag:'snippet', title:'Snippet', isLink:false },
	    { tag:'text', title:'Full Text', isLink:false },
	    { tag:'troveUrl', title:'URL', isLink:true }
    ]
};
var ZONE_ARTICLE = {
    id:'article', holder:'work', dtag:'issued', rtag:'relevance.score', stag:'',
    tags: [
	    { tag:'id', title:'ID', isLink:false },
	    { tag:'title', title:'Title', isLink:false },
	    { tag:'issued', title:'Date Issued', isLink:false },
	    { tag:'isPartOf', title:'Part of', isLink:false },
	    { tag:'holdingsCount', title:'Holding', isLink:false },
	    { tag:'versionCount', title:'Version', isLink:false },
	    { tag:'relevance.value', title:'Score', isLink:false },
	    { tag:'relevance.score', title:'Revelance', isLink:false },
	    { tag:'type', title:'Type', isLink:false, mayRepeat:true },
	    { tag:'troveUrl', title:'URL', isLink:true }
    ]
};
var ZONE_BOOK = {
    id:'book', holder:'work', dtag:'issued', rtag:'relevance.score', stag:'',
    tags: [
	    { tag:'id', title:'ID', isLink:false },
	    { tag:'title', title:'Title', isLink:false },
	    { tag:'type', title:'Type', isLink:false, mayRepeat:true },
	    { tag:'issued', title:'Date Issued', isLink:false },
	    { tag:'contributor', title:'Contributor(s)', isLink:false },
	    { tag:'snippet', title:'Snippet', isLink:false },
	    { tag:'versionCount', title:'Version', isLink:false },
	    { tag:'relevance.value', title:'Score', isLink:false },
	    { tag:'relevance.score', title:'Revelance', isLink:false },
	    { tag:'troveUrl', title:'URL', isLink:true }
    ]
};
var ZONE_PICTURE = { // FIXME: how to handle array of image links?
    id:'picture', holder:'work', dtag:'issued', rtag:'relevance.score', stag:'',
    tags: [
	    { tag:'id', title:'ID', isLink:false },
	    { tag:'title', title:'Title', isLink:false },
	    { tag:'type', title:'Media Type', isLink:false, mayRepeat:true },
	    { tag:'issued', title:'Date Issued', isLink:false },
	    { tag:'snippet', title:'Snippet', isLink:false },
	    { tag:'holdingsCount', title:'Holding', isLink:false },
	    { tag:'versionCount', title:'Version', isLink:false },
	    { tag:'relevance.value', title:'Score', isLink:false },
	    { tag:'relevance.score', title:'Revelance', isLink:false },
	    { tag:'identifier[1].value', title:'Thumbnail', isLink:false },
	    { tag:'troveUrl', title:'URL', isLink:true }
	]
};
var ZONE_MAP = {
    id:'map', holder:'work', dtag:'', rtag:'relevance.score', stag:'',
    tags: [
        { tag:'id', title:'ID', isLink:false },
	    { tag:'title', title:'Title', isLink:false },
	    { tag:'type', title:'Media Type', isLink:false, mayRepeat:true },
	    { tag:'holdingsCount', title:'Holding', isLink:false },
	    { tag:'versionCount', title:'Version', isLink:false },
	    { tag:'relevance.value', title:'Score', isLink:false },
	    { tag:'relevance.score', title:'Revelance', isLink:false },
	    { tag:'troveUrl', title:'URL', isLink:true }
	]
};
var ZONE_COLLECTION = {
    id:'collection', holder:'work', dtag:'issued', rtag:'relevance.score', stag:'',
    tags: [
	    { tag:'id', title:'ID', isLink:false },
	    { tag:'title', title:'Title', isLink:false },
	    { tag:'type', title:'Media Type', isLink:false, mayRepeat:true },
	    { tag:'issued', title:'Date Issued', isLink:false },
	    { tag:'holdingsCount', title:'Holding', isLink:false },
	    { tag:'versionCount', title:'Version', isLink:false },
	    { tag:'relevance.value', title:'Score', isLink:false },
	    { tag:'relevance.score', title:'Revelance', isLink:false },
	    { tag:'troveUrl', title:'URL', isLink:true }
	]
};
var ZONE_LIST = {
    id:'list', holder:'list', dtag:'date', rtag:'relevance.score', stag:'',
    tags: [
	    { tag:'id', title:'ID', isLink:false },
	    { tag:'title', title:'Title', isLink:false },
	    { tag:'creator', title:'Creator', isLink:false },
	    { tag:'description', title:'Description', isLink:false },
	    { tag:'snippet', title:'Snippet', isLink:false },
	    { tag:'listItemCount', title:'Items in list', isLink:false },
	    { tag:'relevance.value', title:'Score', isLink:false },
	    { tag:'relevance.score', title:'Revelance', isLink:false },
	    { tag:'troveUrl', title:'URL', isLink:true }
	]
};
var ZONE_MUSIC = {
    id:'music', holder:'work', dtag:'issued', rtag:'relevance.score', stag:'',
    tags: [
	    { tag:'id', title:'ID', isLink:false },
	    { tag:'title', title:'Title', isLink:false },
	    { tag:'contributor', title:'Contributor', isLink:false },
	    { tag:'issued', title:'Date Issued', isLink:false },
	    { tag:'type', title:'Media Type', isLink:false, mayRepeat:true },
	    { tag:'snippet', title:'Snippet', isLink:false },
	    { tag:'holdingsCount', title:'Holding', isLink:false },
	    { tag:'relevence', title:'Relevence', isLink:false },
	    { tag:'versionCount', title:'Version', isLink:false },
	    { tag:'troveUrl', title:'URL', isLink:true }
    ]
};

var MARKER_Z_BASE = 26;
var PUBLISHER_MARKER = 0;
var LOCATION_MARKER = 1;
var PAUSE_QUERY = -2;
var USER_VALIDATED = 2;
var FADE_TD1 = 200;
var FADE_TD2 = 350;
var PREP_SAVE_QUERY = 'prep';

// State variables
var m_run = false;
var m_paused = false;
var m_map = null;
var m_pubCache = null;
var m_locationsCache = null;
var m_qStore = null;
var m_user = null;
var m_locnSelections = null;
var m_queryId = 0;
var m_rawRecordId = -1;
var m_restrictRawList = false;
var m_currentSaveFormPane = Q_SAVE;
var m_currentQueryFormPane = Q_SIMPLE;
var m_currentPaneSelector = _selById(MAP_VIEW);
var m_defaultViewSelector = _selById(MAP_VIEW);

// FIXME: would be nice if this was an associative array
var m_totalRecs = 0;
var m_fetchSize = 100;
var m_locationsSum = 0;
var m_fetchStart = 0;
var m_totalTime = 0;
var m_trefIndex = null;
var m_resultSet = null;
var m_yearCount = null;
var m_currentTerm = null;
var m_currentZone = null;
var m_currentQuery = null;
var m_locations = null;
var testing = false;

//Histogram global vars
var H_STARTYEAR = 1800;
var h_hashArray	= new Array(250);
var h_labels	= new Array();
h_labels[0] = " ";
var h_data = new Array();
h_data[0]	= 0;
h_bookmark = 0;

//User global variables
var rememberedUser = false;

$(document).ready(function (){ 
	//FIXME: checkbox needs to auto check if user has chosen to be remembered	
    if ($.cookie('email') !== undefined) {
	    $('#usr-info input[id=cb-remember]').attr('checked', 'checked');
    }
});

/**
* Invoked by index page onload trigger, does any required configuration.
*/
function init ()
{
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&reigon=AU&callback=_resetMap';
  document.body.appendChild(script);
  
  m_pubCache = new Array();
  m_locationsCache = new Array();

  $('button#map-zero').button();
  $('#radio-map').buttonset();
  _initSlider();
  _getUserPrefs();
  if (testing == false) {
	  getMenu(); 
  }
  
  // check for remember me cookie and log user in if found
  if ($.cookie('email') !== undefined && $.cookie('didLogout') !== 'true') {
	  rememberedUser = true;
	  doLogin('ok');
  }
   
  // pre-load some panes but don't display
  newQuery(false);
  saveQuery(false);
  currentQuery(false);
  showRawResults(false);
  locnEdit(false);
  showHistogram(false);
  showCloud(false);
}

/**
* activated by map radio buttons hides/shows marker groups
*/
function toggleMapMarkers ()
{
  if (m_resultSet !== null) {
    var mtype = _getCheckedMapButton();
    if (mtype === PUBLISHER_MARKER) {
      for (var i = 0; i < m_resultSet.length; i++) {
        if (m_resultSet[i].marker !== null) {
          m_resultSet[i].marker.setVisible(_isInTimelineRange(i));
        }
      }
      for (var locnId in m_locationsCache) {
        if (m_locationsCache[locnId].marker != null) {
          m_locationsCache[locnId].marker.setVisible(false);
        }
      }
    }
    else if (mtype === LOCATION_MARKER) {
      for (var i = 0; i < m_resultSet.length; i++) {
        if (m_resultSet[i].marker !== null) {
          m_resultSet[i].marker.setVisible(false);
        }
      }
      for (var locnId in m_locationsCache) {
        if (m_locationsCache[locnId].marker != null) {
          m_locationsCache[locnId].marker.setVisible(_isRangeOverlap(m_locationsCache[locnId].yMin, m_locationsCache[locnId].yMax));
        }
      }
    }
  }
}

/**
* Gets context adjusted menu html from server and inserts in document.
*/
function getMenu ()
{
  $.get(PM_URI + '/pm/men', function(data) { $('#menu-bar').html(data); }, 'html')
      .error(function() { alert("ajax error fetching menu content"); });
}

/**
* Logs out the user and resets the menu.
* FIXME: should zonk last query state
*/
function doLogout ()
{
  rememberedUser = false;
  $.cookie('didLogout', 'true');
	
  $.get(PM_URI + '/pm/cls', function () {
    getMenu();
    m_user = null;
    m_qStore = null;
    _resetMap();
    _resetState();
    _showPane(m_defaultViewSelector);
  }).error(function() { alert("ajax error logging out"); });
}

/**
* Manages user login/register pane.
* @param cmd Pne of cancel, ret(urning), new, or open
*/
function doLogin (cmd)
{	
  if (cmd == 'cancel') {
    $('#user-dlg').dialog('close');
  }
  else if (cmd == 'ret') {
    $('#trove-key').css({visibility:'hidden'});
    $('span#agree-opt').css({visibility:'hidden'});
    $('span#vfy-opt').css({visibility:'hidden'});
  }
  else if (cmd == 'new') {
    $('tr#trove-key').css({visibility:'visible'});
    $('span#agree-opt').css({visibility:'visible'});
    $('span#vfy-opt').css({visibility:'visible'});
  }
  else if (cmd == 'ok') {
    //var vfy = $('#usr-info input[name=usr-cb]:checked').val();
    var vfy = $('#usr-info input[id=cb-vfy]:checked').val();
    var agree = $('#usr-info input[id=cb-agree]:checked').val();
    var sel = $('#usr-selector input[name=usr-rb]:checked').val();
    var remember = rememberedUser ? 'remember' : $('#usr-info input[id=cb-remember]:checked').val();
    var email = rememberedUser ? $.cookie('email') : encodeURIComponent($('#em').val());
    var troveKey = encodeURIComponent($('#tk').val());
    var args = '?em=' + email + '&tk=' + troveKey + ((vfy == 'verify') ? '&vfy=y' : '');
    var option = (sel == 'new') ? 'add' : 'opn';
       
    if ((sel === 'new') && (agree !== 'agree')) {
      _popupDialog(ALERT, 'You must agree to the Terms of Use in order to complete registration.');
      return;
    }
     
    // add cookie if user selects 'remember me'
    if (remember === 'remember') {
    	$.cookie('email', email, { expires: 365 });
    } else {
    	$.removeCookie('email');
    	rememberedUser = false;
    } 
    $.get(PM_URI + '/pm/' + option + args, function(data, option) {
      if (data != 'ok') {
        _popupDialog(ALERT, data);
      }
      else {
        _getUserPrefs();
        $('#user-dlg').dialog('close');
        getMenu();
        _getStoredQueries();
        $.cookie('didLogout', 'false');
        
        if (option == 'add') {
          _popupDialog(INFO, '<h3>Registration Complete</h3><p>Thankyou. You are now a registered Paper Miner user.');
        }
      }
    }, 'html').error(function() { alert("ajax error login"); });
  }
  else if (cmd == 'open') {
    if ($('#user-dlg').length > 0) {
      $('#user-dlg').dialog('open');
      $('#usr-info input')
       .not(':button, :submit, :reset, :hidden')
       .val('')
       .removeAttr('checked')
       .removeAttr('selected');
    }
    else {
        var dlgOpts = {
            title:'Login or Register', resizable:false, autoOpen:false, hide:FADE_TD1, show:FADE_TD1,
            modal: 'true', minWidth: 400,
            buttons: {'Cancel':function () { $(this).dialog("close"); }, "OK" : function () { doLogin('ok'); }},
            position: [200, 200]
        };
      $.get(PM_URI + '/pm?pg=user_login', function(data) {
        $('body').append(data);
        $('#user-dlg').dialog(dlgOpts);
        $('#user-dlg').dialog('open');
        $("#user-dlg").keydown(function (event) {
          if (event.keyCode == 13) {
            $(this).siblings('.ui-dialog-buttonpane').find("button:eq(1)").click();
          }
        });
      }, 'html').error(function() { alert("ajax error fetching menu fragment user_login"); });
    }
  }
}

/**
* Manages pane allowing user to edit their settings and preferences.
*/
function doEditDetails ()
{
  $.get('/pm/mod', function(data) {
    var opts = { autoOpen:'true', show:FADE_TD1, hide: FADE_TD1,
        position: [200, 200],
        resizable: 'false',
        buttons: {'Cancel':function () { $(this).dialog("destroy"); $('#user-mod').remove(); }, 'Update' : function () {
          var vfy = $('#user-mod input[name=usr-cb]:checked').val();
          var args = '/pm/mod?id=' + $('#id').val() + '&em=' + $('#em').val() + '&tk=' + $('#tk').val() + ((vfy == 'verify') ? '&vfy=y' : '');
          $.get(PM_URI + args, function (data) {
            if (data != 'ok') {
              _popupDialog(ALERT, data);
            }
            else {
              getMenu();
              _popupDialog(INFO, '<p>Your details have been updated.');
            }
          }, 'html').error(function() { alert("ajax error user update"); });

          $(this).dialog('destroy');
          $('#user-mod').remove();
        }},
        closeOnEscape:'false',
        open: function(event, ui) { $(this).parent().children().children(".ui-dialog-titlebar-close").hide(); }
      };
    $('body').append('<div id="user-mod" style="display:none" title="Manage User Preferences">' + data + '</div>');
    $('#user-mod').dialog(opts);
    }, 'html').error(function() { alert("ajax error maint"); });
}

/**
* Reset query inputs to blank
*/
function resetQueryPane ()
{
	switch (m_currentQueryFormPane) {
		case Q_SIMPLE :
			$('input#q1').val('');
			$('select#z1').val('newspaper');
			break;
		case Q_ADVANCED :
			$('input#aq1').val('');
			$('select#z1').val('newspaper');
			break;
		case Q_CUSTOM :
			// FIXME: todo
			break;
	  }
	  _updateCurrQueryPane();
}


/**
* Show the New Query pane unless a query is running
* @param state
*/
function newQuery (show)
{
  if ($(_selById(NEW_QUERY_PANE)).length === 0) {
    var callback = function () {
      $('table#query-form button').button();
    };
    _createPane(NEW_QUERY_PANE, callback, null);
  }
  
  if (show) {
    if (m_run) {
      _popupDialog(INFO, 'Please stop the current query before starting another.');
    }
    else {
      _showPane(_selById(NEW_QUERY_PANE));
    }
  }
}

/**
* Display info about current/last query. State will update while query is runnig,
* and permits the user to abort the query.
*/
function currentQuery (show)
{
  if ($(_selById(CURR_QUERY_PANE)).length === 0) {
    var callback = function () {
      $('table#curr-query-form button').button();
      _setCurrentQueryButtonState();
    };
    _createPane(CURR_QUERY_PANE, callback, null);
  }
  
  if (show) {
    _showPane(_selById(CURR_QUERY_PANE));
    _updateCurrQueryPane();
  }
}

/**
* Displays a list of the user's stored queries
* @param show
*/
function showStoredQueries (show)
{
  if ($(_selById(SAVE_QUERY_PANE)).length === 0) {
    _createPane(SAVE_QUERY_PANE, null, null);
  }
  
  if (show) {
    _showPane(_selById(SAVE_QUERY_PANE));
    _showStoredQueryForm(Q_STORE);
  }
}

/**
* Display the normally hidden option to save the current query
* @param show
* @param opt
*/
function saveQuery (show, opt)
{
  if ($(_selById(SAVE_QUERY_PANE)).length === 0) {
    var callback = function () {
      $('table#qstore-table button').button();
      _getStoredQueries();
    };
    _createPane(SAVE_QUERY_PANE, callback, null);
  }

  if (!show) {
    return;
  }
  
  if (m_user.stat != USER_VALIDATED) {
    _popupDialog(ALERT, 'You must verify your email address before you can save queries.');
  }
  else if (m_currentQuery !== null ) {
    if (opt != null) {
      if (opt === 'can') {
        $(_selById(Q_SAVE)).toggle('fade', 'swing', FADE_TD2, function () {
          _showPane(_selById(CURR_QUERY_PANE));
        } );
      }
      else {
          $.get(PM_URI + '/pm/qsave?c=1', function (resp) {
            if (resp == 'ok') {
              $('#qd1').val($('input#q1').val().replace(/[+]/g, ' '));
              _showPane(_selById(SAVE_QUERY_PANE));
              _showStoredQueryForm(Q_SAVE);
            }
            else {
              _popupDialog(ALERT, resp);
            }
          }, 'html').error(function() { alert("ajax error on query pre-save"); });
      }
    }
    else {
      var descr = encodeURIComponent($('#qd1').val());
      var query = encodeURIComponent(m_currentQuery);
      var qType = (m_currentQueryFormPane === Q_SIMPLE) ? 's' :
                  (m_currentQueryFormPane === Q_ADVANCED) ? 'a' : 'c';
      var zones = encodeURIComponent(m_currentZone);
      if (descr.length === 0) {
        _popupDialog(ALERT, 'You must provide a description for your query.');
      }
      else {
        $.get(PM_URI + '/pm/qsave?d=' + descr + '&q=' + query + '&t=' + qType + '&n=' + m_totalRecs + '&z=' + zones, function(data) {
          if (data != 'ok') {
            _popupDialog(ALERT, data);
          }
          else {
            $(_selById(Q_SAVE)).toggle('fade', 'swing', FADE_TD2);
            _getStoredQueries();
            _popupDialog(INFO, 'Query saved');
          }
        }, 'html').error(function() { alert("ajax error saving query"); });
      }
    }
  }
}

/**
* Map initialized and displayed on startup
* @param show
*/
function showMap (show)
{
  _showPane(_selById(MAP_VIEW));
}

function showHistogram (show)
{
	if ($(_selById(HIST_VIEW)).length === 0) {
	    _createPane(HIST_VIEW, null, null);
	}

	if (show) {
		_showPane(_selById(HIST_VIEW));
	}

	$('h3#hd-bargraph-title').text("Hits versus time for search term: " + m_currentTerm);
	$('h3#hd-linegraph-title').text("Hits versus time for search term: " + m_currentTerm);
}

/**
 * Updates the Histogram page by rendering all retrieved data in the global array
 */
function _updateHistogram()
{
	//Update Histogram data
	h_labels.length = 0;
	h_data.length = 0;
	if(h_bookmark == 0) {
		for(var i = 0; i < 250; i++) {
			h_hashArray[i] = null;
		}
	}
	
	if (m_resultSet != null) {
		// Grab dates from results in the global array
		for (var i = h_bookmark; i < m_resultSet.length; i++) {
			var zoneInfo = _getZoneInfo(m_resultSet[i].zone);
			if (zoneInfo.dtag.length > 0) {
				var date = m_resultSet[i].data[zoneInfo.dtag];
				var year = date;
				// Format date to just the year
				if (year !== undefined) {
					if (year.length > 4) {
						var isoDate = /(\d\d\d\d)/;
						var mat = year.match(isoDate);
						if (mat != null) {
							year = parseInt(mat[1]);
							// Add the year as a label to the graph
							h_hashArray[year-H_STARTYEAR] += 1;
						}
					}
				}
			}
		}
		h_bookmark = m_resultSet.length;
	}
	

	
	// Group results into 8 year segments to be graphed easily
	for(var i = 0; i < 25; i++) {
		var newData = 0;
		
		// Accumulate all data across 8 year segment
		for(var j = i*8; j < i*8+8; j++) {
			if(h_hashArray[j] != null) {
				newData += h_hashArray[j];
			}
		}
		
		// Generate and add label to labels array
		var labelString = '';
		var startYear = H_STARTYEAR+(i*8);
		var endYear = H_STARTYEAR+(i*8+7);
		labelString += startYear.toString();
		labelString += ' - ';
		labelString += endYear.toString();
		
		h_labels.push(labelString);
		h_data.push(newData);
	}
}

/**
 * Returns the array used for labelling a histogram
 * @returns {Array}
 */
function _histLabelArray() 
{
	return h_labels;
}

/**
 * Returns the array used as the dataset in a chart/graph
 * @returns {Array}
 */
function _histDataArray() 
{
	return h_data;
}

function showCloud(show) {
	if ($(_selById(CLOUD_VIEW)).length === 0) {
		_createPane(CLOUD_VIEW, null, null);
	}

	if (show) {
		_showPane(_selById(CLOUD_VIEW));

		if (m_resultSet.length > 0) {
			h_handlers = [];
			labels = _histLabelArray();

			for ( var i = 0; i < labels.length; i++) {

				h_handlers
						.push({
							click : (function(j) {
								var range = labels[j].split("-");
								var startYear = range[0];
								var endYear = range[1];
								return function() {
									var filteredArray = _filterYears(startYear,
											endYear);
									showRawResults(show);
									_resetRawRecordList(filteredArray);
								};
							}(i))
						});
			}

			_updateCloud(h_labels, h_data, 'div#year-cloud', h_handlers);
			$('div#year-cloud').css('display', 'inline-block');
		} else {
			$('div#year-cloud').css('display', 'none');
		}
	}
}

/**
 * Returns array of entries from m_resultSet that only fall between specified
 * date range
 */
function _filterYears(startYear, endYear) {
	var sortedArray = _sortRaw(1);
	var filteredArray = [];
	var firstIndex = 0;
	var lastIndex = 0;

	for (var i = 0; i < sortedArray.length; i++) {
		var date = sortedArray[i].val;
		var year = _extractYearFromDate(date);

		if (year == startYear) {
			firstIndex = sortedArray.indexOf(sortedArray[i]);
			break;
		}
	}

	for (var j = firstIndex; j < sortedArray.length; j++) {
		var date = sortedArray[j].val;
		var year = _extractYearFromDate(date);

		if (year > endYear) {
			lastIndex = sortedArray.indexOf(sortedArray[j]);
			break;
		}
	}

	// FIXME: Final trim (but should fix errors in sorting function)
	for (var k = firstIndex; k < lastIndex; k++) {
		var date = sortedArray[k].val;
		var year = _extractYearFromDate(date);
		
		if (year >= startYear && year <= endYear) {
			filteredArray.push(sortedArray[k]);			
		}
	}
	return filteredArray;
}

/**
 * Creates a cloud for the current search criteria * 
 */
function _updateCloud(labelArray, weightArray, container, handlersArray) {
	var cloudArray = [];
	$(container).empty();
	
  	for (var i = 0; i < labelArray.length; i++) {
  		cloudArray[i] = {
  							text: labelArray[i], 
  							weight: weightArray[i],
  							handlers: handlersArray[i]
  						}; 
  	};	      
	
    $(function() {
      	$(container).jQCloud(cloudArray, { delayedMode: true });
    });
}

/**
* Raw results pane loaded on demand.
* @param show
*/
function showRawResults (show)
{
  if ($(_selById(RAW_VIEW)).length === 0) {
    var callback = function () {
      $('#ctl-table button').button();
      $('#ctl-table button').button('disable');
    };
    _createPane(RAW_VIEW, callback, null);
  }
  
  if (show) {
    _sortRaw(2);
    _showPane(_selById(RAW_VIEW));
  }
}

/**
* Displays the various help dialogs and panes.
* @param section
*/
function showHelp (section)
{
  if (section === 'about') {
    $.get(PM_URI + '/pm?pg=' + HELP_ABOUT, function(data) {
      _popupDialog(INFO, data, 400);
      }, 'html').error(function() { alert("ajax error help"); });
  }
  else {
    var __loadHelp = function (pane) {
      if ($(_selById(pane)).length > 0) {
        _showPane(_selById(pane));
      }
      else {
        var cb1 = function () {
          _showPane(_selById(pane));
        };
        _createPane(pane, cb1, null);
      }
    };
    switch (section) {
    case 'pm': __loadHelp(HELP_PM); break;
    case 'rel': __loadHelp(HELP_RELEASE); break;
    case 'tou': __loadHelp(TERMS_OF_USE); break;
    case 'trove': __loadHelp(HELP_TROVE); break;
    }
  }
}

function showPartners ()
{
  if ($(_selById(PARTNERS_PANE)).length === 0) {
    _createPane(PARTNERS_PANE, null, null);
  }
  _showPane(_selById(PARTNERS_PANE));
}

function showContacts ()
{
  if ($(_selById(CONTACTS_PANE)).length === 0) {
    _createPane(CONTACTS_PANE, showContacts, null);
  }
  _showPane(_selById(CONTACTS_PANE));
}

function goHome ()
{
  window.location = (PM_URI.length > 0) ? PM_URI : '/';
}


/**
* Cross-browser code prevents an event propogating any further
* @param evt
*/
function preventDefaultAction (evt)
{
  if (evt.preventDefault) {
    evt.preventDefault();
  }
  else {
    evt.returnValue = false;
  }

  if (evt.stopPropagation) {
    evt.stopPropagation();
  }
  else {
    evt.cancelBubble = true;
  }
};

/**
* Convenience and reminder button opens TROVE on record in Raw display panel for editing in a new Tab.
*/
function fixRecord ()
{
  if (m_rawRecordId >= 0) {
    var link = document.getElementById('raw-trove-link');
    var e = document.createEvent('MouseEvents');
    e.initEvent( 'click', true, true );
    link.dispatchEvent(e);
    $('button#rdv-pb2').button('enable');
  }
}

/**
* Reloads the currently viewed record. Intended for use after fixing the record in TROVE.
*/
function refreshRecord ()
{
  // FIXME: possible race condition problems here with async response
  if (m_rawRecordId >= 0) {
    var uri = TROVE_URL + m_currentZone + '/' + m_resultSet[m_rawRecordId].data.id +
        '?key=' + m_user.key +
        '&encoding=json' +
        '&include=articletext' +
        '&callback=?';
    try {
      $.getJSON(uri, function (data, status, jqXHR) {
        if (status == "success") {
          var zoneInfo = _getZoneInfo(m_currentZone);
          var record = data[zoneInfo.holder];
          if (record) {
            if (typeof record.articleText === UNDEF) {
              m_resultSet[m_rawRecordId].data.text = '&lt;nil&gt;';
            }
            else {
              var text = record.articleText.toString();
              text = text.replace(/<p>/g, '');
              text = text.replace(/<\/p>/g, '');
              m_resultSet[m_rawRecordId].data.text = text;
            }
            _displayRawDataItem(m_rawRecordId);
          }
        }
        $('input#pb-r2').attr('disabled','true');
      });
    }
    catch (err) {
      alert(err);
    }
  }
}

function locnEdit (show)
{
  if ($(_selById(LOCN_EDIT_PANE)).length === 0) {
    var callback = function () {
      $('div#location-ctl button').button();
    };
    _createPane(LOCN_EDIT_PANE, callback, null);
  }
  
  if (show) {
    _showPane(_selById(LOCN_EDIT_PANE));
    _getFullTextForLocation(m_rawRecordId);
    _updateLocationsListDisplay(m_rawRecordId);
  }
}

function locnAdd ()
{
  m_locnSelections = new Array();
  var sel = null;
  var text = "";
  if (window.getSelection) {
    text = "" + window.getSelection();
  }
  else if ((sel = document.selection) && (sel.type == "Text")) {
    text = sel.createRange().text;
  }
  
  if ($('#add-locns-dlg').length > 0) {
    $('#add-locns-dlg').html(_formatAddLocations(text));
    _formatLocationSelections();
    $('#add-locns-dlg').dialog('open');
  }
  else {
    var dlgOpts = {
        title:'Add or Insert Location', resizable:false, autoOpen:false, hide:FADE_TD1, show:FADE_TD1,
        modal: 'true', minWidth: 500, autoOpen:false,
        buttons: {'Cancel':function () { $(this).dialog("close"); },
                  'Search Locations' : function () { _findLocation(0); },
                  'Search Google Geocodes' : function () { _findLocation(1); }
        },
        position: [200, 200]
    };
    $('body').append(_formatAddLocations(text));
    $('#add-locns-dlg').dialog(dlgOpts);
    $('#add-locns-dlg').dialog('open');
  }
}

function returnToRaw ()
{
  _showPane(_selById(RAW_VIEW));
  _displayRawDataItem(m_rawRecordId);
}


// --------------------- Private Functions ------------------------

/**
* Callback for Google maps API initialization
*/
function _resetMap ()
{
  var latlngCenter = new google.maps.LatLng(-27, 135);
  var pmOptions = {
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.HYBRID, //ROADMAP
    streetViewControl: false
  };
  
  if (m_map == null) {
    m_map = new google.maps.Map(document.getElementById(MAP_CANVAS), pmOptions);
  }
  m_map.setCenter(latlngCenter);
  m_map.setOptions(pmOptions);
}

/**
* Macro turns a name into a JQuery ID selector
*/
function _selById (id)
{
  return '#' + id;
}

/**
* Get user's TROVE key and ID
*/
function _getUserPrefs ()
{
  $.getJSON(PM_URI + '/pm/info', function (data, status, jqXHR) {
    if (status == "success") {
      m_user = data;
    }
  });
}

/**
* Fetches the user's stored queries from the server and displays them
*/
function _getStoredQueries ()
{
  $.getJSON(PM_URI + '/pm/qget', function (data, status, jqXHR) {
    if (status == "success") {
      m_qStore = data;
      _updateStoreQueriesPane();
    }
  });
}

/**
* User has saved or deleted a query, so adjust the display accordingly.
*/
function _updateStoreQueriesPane ()
{
  if ($(_selById(Q_STORE)).length > 0) {
    $(_selById(Q_STORE_TABLE)).empty();
    if (m_qStore.length === 0) {
      $(_selById(Q_STORE_TABLE)).html('<tr><td>You have no Stored queries</td></tr>');
    }
    else {
      $(_selById(Q_STORE_TABLE)).html('<tr><td>You have ' + m_qStore.length + ' Stored queries</td></tr>');
      var str = '';
      str = '<tr>';
      str += '<th class="pm-hdr" colspan="2">Query Description</th>';
      str += '<th class="pm-hdr">Type</th>';
      str += '<th class="pm-hdr">Zone(s)</th>';
      str += '<th class="pm-hdr">Last Run</th>';
      str += '<th class="pm-hdr">Result count</th>';
      str += '</tr>\n';
      for (var i = 0; i < m_qStore.length; i++) {
        var clz = (i % 2) ? 'tr-odd' : 'tr-evn';
        var type = m_qStore[i].query_type == 's' ? 'Simple' : 'a' ? 'Advanced' : 'c' ? 'Custom' : ''; 
        
        var descr = m_qStore[i].descr;
        str += '<tr class="' + clz + '">\n<td class="cb-col"><input type="checkbox" id="dqcb' + i +'"></td>\n';
        str += '<td><a href="#" onClick="_openQuery(' + i + ')">' + descr + '</td>\n';
        str += '<td class="table-text" id="type' + i + '">' + "" + type + '</td>\n';
        str += '<td class="table-text" id="zone' + i + '">' + "" + m_qStore[i].zones + '</td>\n';
        str += '<td class="table-text">' + m_qStore[i].date_last_run + '</td>\n';
        str += '<td class="table-text td-num">' + m_qStore[i].total_last_run + '</td>\n';
        str += '</tr>\n';
      }
      str += '<tr><td colspan="4"><hr class="pm-button-sep"></td></tr>\n';
      str += '<tr><td></td><td colspan="3"><div class="pm-button-bar"><button id="dq-pb1" onClick="_deleteSelectedQueries()">Delete Selected</button></div></td></tr>';
      $(_selById(Q_STORE_TABLE)).html(str);
      $('#dq-pb1').button();
    }
  }
}

/**
* Deletes the selected (checked) stored queries from the server
*/
function _deleteSelectedQueries ()
{
  var str = '';
  for (var i = 0; i < m_qStore.length; i++) {
    if ($('input#dqcb' + i).is(':checked')) {
      if (str.length > 0) {
        str += ',';
      }
      str += m_qStore[i].id;
    }
  }
  if (str.length === 0) {
    _popupDialog(ALERT, 'No queries selected!');
  }
  else {
    $.get(PM_URI + '/pm/qdel?ids=' + str, function (res) {
      if (res != 'ok') {
        _popupDialog(ALERT, res);
      }
      else {
        _getStoredQueries();
        _popupDialog(INFO, 'Queries deleted Ok.');
      }
    });
  }
}

/**
* Makes the clicked query the "current" query, ready for execution or modification
* @param idx
*/
function _openQuery (idx)
{
  m_currentQuery = m_qStore[idx].query;
  switch (m_qStore[idx].query_type) {
  case 's':
    var pat = /&zone=(.+)\&q=(.+)/;
    var params = pat.exec(m_currentQuery);
    m_currentZone = params[1];
    m_currentTerm = params[2];
    $('input#q1').val(decodeURIComponent(m_currentTerm));
    newQuery(true);
    break;
  case 'a':
    $('select#z1').val(m_currentZone);
    break;
  case 'c':
    break;
  }
  
}

/**
* Swaps different forms of query
* @param id The one to make visible
*/
function _showStoredQueryForm (id){
  $('div#' + m_currentSaveFormPane).toggle('fade','swing',100,
    function () {
      if ($('div#' + id).hasClass('hidden')) {
        $('div#' + id).toggle();
        $('div#' + id).removeClass('hidden');
      }
      $('div#' + id).toggle('fade','swing',100);
      m_currentSaveFormPane = id;
    });
}

/**
* Builds the TROVE query string from user input.
*/
function _createQueryString ()
{
	var str = '';
	switch (m_currentQueryFormPane) {
		case Q_SIMPLE :
			m_currentZone = 'newspaper';
			m_currentTerm = $('input#q1').val();
			str = '&zone=' + m_currentZone +
	        	'&q=' + encodeURIComponent(m_currentTerm);
			break;
		case Q_ADVANCED:
			// Add Selected Zone
			if (!m_currentZone) {m_currentZone = "article";}
			str += '&zone=' + encodeURIComponent(m_currentZone);
			
			// Add Query
			m_currentTerm = $('input#aq1').val();
			str += '&q=' + encodeURIComponent(m_currentTerm);
			if ($('#adv-query-not').val() != '') {
				str += encodeURIComponent(' NOT ' + $('#adv-query-not').val());
			}
			
			///////////////////////////////////////////////////////////////////////////////
			// Don't Touch the logic before you've actually read how the trove api works //
			///////////////////////////////////////////////////////////////////////////////
			
			switch (m_currentZone) {
				case "article":
					if ($('#adv-article-decade').val() != '') {
						str += '&l-decade=' + encodeURIComponent($('#adv-article-decade').val());
					}
					if ($('#adv-article-year').val() != '') {
						str += '&l-year=' + encodeURIComponent($('#adv-article-year').val());
					}
					if ($('#adv-article-language').val() != '') {
						str += '&l-language=' + encodeURIComponent($('#adv-article-language').val());
					}
					if ($('#adv-article-availability').val() != '') {
						str += '&l-availability=' + encodeURIComponent($('#adv-article-availability').val());
					}
					if ($('#adv-article-australian').is(":checked")) {
						str += '&l-australian=' + encodeURIComponent($('#adv-article-australian').val());
					}
					if ($('#adv-article-vendordb').val() != '') {
						str += '&l-vendordb=' + encodeURIComponent($('#adv-article-vendordb').val());
					}
					if ($('#adv-article-vendor').val() != '') {
						str += '&l-vendor=' + encodeURIComponent($('#adv-article-vendor').val());
					}
					if ($('#adv-article-audience').val() != '') {
						str += '&l-audience=' + encodeURIComponent($('#adv-article-audience').val());
					}
					break;
				case "book":
					if ($('#adv-book-decade').val() != '') {
						str += '&l-decade=' + encodeURIComponent($('#adv-book-decade').val());
					}
					if ($('#adv-book-year').val() != '') {
						str += '&l-year=' + encodeURIComponent($('#adv-book-year').val());
					}
					if ($('#adv-book-language').val() != '') {
						str += '&l-language=' + encodeURIComponent($('#adv-book-language').val());
					}
					if ($('#adv-book-availability').val() != '') {
						str += '&l-availability=' + encodeURIComponent($('#adv-book-availability').val());
					}
					if ($('#adv-book-australian').is(":checked")) {
						str += '&l-australian=' + encodeURIComponent($('#adv-book-australian').val());
					}
					break;
				case "collection":
					if ($('#adv-collection-decade').val() != '') {
						str += '&l-decade=' + encodeURIComponent($('#adv-collection-decade').val());
					}
					if ($('#adv-collection-year').val() != '') {
						str += '&l-year=' + encodeURIComponent($('#adv-collection-year').val());
					}
					if ($('#adv-collection-language').val() != '') {
						str += '&l-language=' + encodeURIComponent($('#adv-collection-language').val());
					}
					if ($('#adv-collection-availability').val() != '') {
						str += '&l-availability=' + encodeURIComponent($('#adv-collection-availability').val());
					}
					if ($('#adv-collection-australian').is(":checked")) {
						str += '&l-australian=' + encodeURIComponent($('#adv-collection-australian').val());
					}
					if ($('#adv-collection-occupation').val() != '') {
						str += '&l-occupation=' + encodeURIComponent($('#adv-collection-occupation').val());
					}
					break;
				case "list":
					if ($('#adv-list-decade').val() != '') {
						str += '&l-decade=' + encodeURIComponent($('#adv-list-decade').val());
					}
					if ($('#adv-list-year').val() != '') {
						str += '&l-year=' + encodeURIComponent($('#adv-list-year').val());
					}
					if ($('#adv-list-availability').val() != '') {
						str += '&l-availability=' + encodeURIComponent($('#adv-list-availability').val());
					}
					break;
				case "map":
					if ($('#adv-map-decade').val() != '') {
						str += '&l-decade=' + encodeURIComponent($('#adv-map-decade').val());
					}
					if ($('#adv-map-year').val() != '') {
						str += '&l-year=' + encodeURIComponent($('#adv-map-year').val());
					}
					if ($('#adv-map-language').val() != '') {
						str += '&l-language=' + encodeURIComponent($('#adv-map-language').val());
					}
					if ($('#adv-map-availability').val() != '') {
						str += '&l-availability=' + encodeURIComponent($('#adv-map-availability').val());
					}
					if ($('#adv-map-australian').is(":checked")) {
						str += '&l-australian=' + encodeURIComponent($('#adv-map-australian').val());
					}
					if ($('#adv-map-zoom').val() != '') {
						str += '&l-zoom=' + encodeURIComponent($('#adv-map-zoom').val());
					}
					break;
				case "music":
					if ($('#adv-music-decade').val() != '') {
						str += '&l-decade=' + encodeURIComponent($('#adv-music-decade').val());
					}
					if ($('#adv-music-year').val() != '') {
						str += '&l-year=' + encodeURIComponent($('#adv-music-year').val());
					}
					if ($('#adv-music-language').val() != '') {
						str += '&l-language=' + encodeURIComponent($('#adv-music-language').val());
					}
					if ($('#adv-music-availability').val() != '') {
						str += '&l-availability=' + encodeURIComponent($('#adv-music-availability').val());
					}
					if ($('#adv-music-australian').is(":checked")) {
						str += '&l-australian=' + encodeURIComponent($('#adv-music-australian').val());
					}
					break;
				case "newspaper":
					if ($('#adv-newspaper-decade').val() != '') {
						str += '&l-decade=' + encodeURIComponent($('#adv-newspaper-decade').val());
						if ($('#adv-newspaper-year').val() != '') {
							str += '&l-year=' + encodeURIComponent($('#adv-newspaper-year').val());
							if ($('#adv-newspaper-month').val() != '') {
								str += '&l-month=' + encodeURIComponent($('#adv-newspaper-month').val());
							}
						}
					}
					if ($('#adv-newspaper-publication').val() != '') {
						str += '&l-title=' + encodeURIComponent($('#adv-newspaper-publication').val());
					}
					if ($('#adv-newspaper-category').val() != '') {
						str += '&l-category=' + encodeURIComponent($('#adv-newspaper-category').val());
					}
					if ($('#adv-newspaper-wordcount').val() != '') {
						str += '&l-wordcount=' + encodeURIComponent($('#adv-newspaper-wordcount').val());
					}
					break;
				case "picture":
					if ($('#adv-picture-decade').val() != '') {
						str += '&l-decade=' + encodeURIComponent($('#adv-picture-decade').val());
					}
					if ($('#adv-picture-year').val() != '') {
						str += '&l-year=' + encodeURIComponent($('#adv-picture-year').val());
					}
					if ($('#adv-picture-language').val() != '') {
						str += '&l-language=' + encodeURIComponent($('#adv-picture-language').val());
					}
					if ($('#adv-picture-availability').val() != '') {
						str += '&l-availability=' + encodeURIComponent($('#adv-picture-availability').val());
					}
					if ($('#adv-picture-australian').is(":checked")) {
						str += '&l-australian=' + encodeURIComponent($('#adv-picture-australian').val());
					}
					break;
				default:
					alert("Please click a zone to continue...");
					break;
				}
			// END SWITCH - Zone Type
			break;
		case Q_CUSTOM:
			break;
	}
  	return str;
}

/**
* Reset all state vars to initial values for execution of a new query.
*/
function _resetState ()
{
	if (testing == false) {
	  _resetMap();
	  
	  if (m_resultSet !== null) {
	    for (var i = 0; i < m_resultSet.length; i++) {
	      if (m_resultSet[i].marker !== null) {
	        m_resultSet[i].marker.setPosition(null);
	        m_resultSet[i].marker = null;
	      }
	    }
	  }
	  
	  if (m_locationsCache !== null) {
	    for (var lid in m_locationsCache) {
	      var locn = m_locationsCache[lid];
	      if (locn.listener != null) {
	        google.maps.event.removeListener(locn.listener);
	        locn.listener = null;
	      }
	      if (locn.popup != null) {
	        locn.popup.close();
	        locn.popup = null;
	      }
	      if (locn.marker !== null) {
	        locn.marker.setVisible(false);
	        locn.marker.setPosition(null);
	        locn.marker = null;
	      }
	    }
	  }
	  
	  m_queryId++;
	  m_run = true;
	  m_paused = false;
	  m_totalRecs = 0;
	  m_fetchSize = 4;
	  m_fetchStart = 0;
	  m_totalTime = 0;
	  m_rawRecordId = -1;
	  m_locationsSum = 0;
	  h_bookmark = 0;
	  m_trefIndex = new Array();
	  m_resultSet = new Array();
	  m_yearCount = new Array();
	  m_locations = new Array();
	  m_rawDateIndex = new Array();
	  m_locationsCache = new Array();
	  m_currentQuery = _createQueryString();
	  $('div#raw-list-container').html('');
	  $('div#raw-record-container').html('');
	  $('#ctl-table button').button('disable');
	  $('#cc-pb11').button('option', 'label', 'Pause Query');
	  $('#cc-pb11').button('disable');
	  $('img#img-pause').attr('src', 'images/button_grey_pause.png');
	  var rbGroup = $('input[name="raw-sort-rb"]');
	  rbGroup.prop('checked', false);
	  rbGroup[1].checked = true;
	  $('div#y2k-timeline div').remove();
	}
}

function _updateTimeDisplay ()
{
  var currMillis = new Date().getTime();
  var qTime = currMillis - m_fetchStart;
  m_totalTime += qTime;
  var tsecs = Math.round(m_totalTime / 1000);
  var secs = tsecs % 60;
  var tmins = Math.floor(tsecs / 60);
  var mins = tmins % 60;
  var hrs = Math.floor(tmins / 3600);
  $('td#n13').html((hrs < 10 ? '0' : '') + hrs + ':' + (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs);
}

/**
* Sends off a trove query using the data in the bew query form, starting at the position passed.
* Clears form if position < zero.
* @param pos position in TROVE result set
*/
function _doQuery (pos){
  if (pos === 0) {
    _resetState();
    $('#cc-pb11').button('enable');
    $('div#progress-container').css('visibility', 'visible');
  }
  var queryId = m_queryId;
  if (m_fetchSize < MAX_FETCH_SIZE) {
    m_fetchSize = Math.min(MAX_FETCH_SIZE, m_fetchSize * 2);
  }
  var uri = TROVE_QUERY_URL + m_user.key + m_currentQuery +
            '&s=' + pos + '&n=' + m_fetchSize +
            '&encoding=json' +
            '&callback=?';
  $.getJSON(uri, function (data, status, jqXHR) {
      try {
        if (status == "success") {
          _updateTimeDisplay();
          _processData(data, pos, queryId);
        }
        else {
          alert('getJSON Error: ' + JSON.stringify(jqXHR));
        }
      }
      catch (ex) {
        alert(ex);
      }
    }).error(function(jqXHR, textStatus, errorThrown) {
      var msg = 'PaperMiner has detected an error on the TROVE server:<br>' + errorThrown +
        '<p>As this may impact your results, we suggest you stop and reexecute your query.' +
        'If the error persists, it may be due to server load, so wait a while. then tryb again.';
      _popupDialog(ALERT, msg, 400);
    });
  m_fetchStart = new Date().getTime();
  $('#busy-box').activity();
  _updateCurrQueryPane();
}

(function($){
    $.extend({
        // Case insensative inArray
        inArrayIn: function(elem, arr, i){
            // not looking for a string anyways, use default method
            if (typeof elem !== 'string'){
                return $.inArray.apply(this, arguments);
            }
            // confirm array is populated
            if (arr){
                var len = arr.length;
                    i = i ? (i < 0 ? Math.max(0, len + i) : i) : 0;
                elem = elem.toLowerCase();
                for (; i < len; i++){
                    if (i in arr && arr[i].toLowerCase() == elem){
                        return i;
                    }
                }
            }
            // stick with inArray/indexOf and return -1 on no match
            return -1;
        }
    });
})(jQuery);


/**
* Extracts records from a TROVE response placing them in global array.
* Sends next query if more records exist and (re)starts processing of map pins.
* If position is negative, the query is aborted and any pending fetch ignored when/if it arrives
* @param data TROVE JSON response
* @param pos start location in overall set for this group; or negative to stop the madness
*/
function _processData (data, pos, id)
{
  if (pos === PAUSE_QUERY) {
    if (m_paused) {
      m_paused = false;
      m_run = true;
      $('#busy-box').activity(true);
      $('#cc-pb11').button('option', 'label', 'Pause Query');
      $('img#img-pause').attr('src', 'images/button_grey_pause.png');
      _doQuery(m_resultSet.length);
    }
    else {
      m_run = false;
      m_paused = true;
      $('#busy-box').activity(false);
      $('#cc-pb11').button('option', 'label', 'Resume query');
      $('img#img-pause').attr('src', 'images/button_grey_play.png');
    }
    _updateCurrQueryPane();
  }
  else if (m_run && (id === m_queryId)) {

	  /**
	   * Upgraded to handle multiple zones
	   * will stall at the end of search query and not complete...
	   * requires further investigation
	   * @author - Josh Wright
	   */
	  var _currentZones = m_currentZone.split(',');
	  var zoneResults = data.response.zone;
	  var zoneResult = null;
	  var zoneInfo = null;
	  
	  for (var i = 0; i < _currentZones.length; i++){
		  zoneInfo = _getZoneInfo(_currentZones[i]);
		  for (var j = 0; j < _currentZones.length; j++){
			  if (zoneResults[j].name == zoneInfo.id) {
				  zoneResult = zoneResults[j].records[zoneInfo.holder];
				  if (zoneResult) {
					  var tempPos = pos + (m_fetchSize * i);
					  for (var k = 0; k < zoneResult.length; k++) {
						  m_resultSet[tempPos + k] = { zone: zoneInfo.id, data: zoneResult[k], marker:null };
						  m_resultSet[tempPos + k].data.text = null;
						  m_trefIndex[zoneResult[k]['id']] = tempPos + k;
						  // TODO: check this for loop, pretty sure its redundant now?? JW
						  for (var m = 0; m < zoneInfo.tags.length; m++) {
							  var value = m_resultSet[tempPos + k].data;
							  if (jQuery.inArrayIn(zoneInfo.tags[m].title, value) == -1) {
								  //alert(zoneInfo.tags[m].title); 
							  }
						  }
					  }
				  }	 
			  }
		  }
	  }
	  if (m_totalRecs === 0) {
		  for (var m  = 0; m < zoneResults.length; m++) {
			  m_totalRecs += parseInt(zoneResults[m].records.total);
		  }
	  }
	  // get next chunk underway before doing local housekeeping
      if (m_resultSet.length < m_totalRecs) {
        _doQuery(m_resultSet.length);
      }
      else {
        $('#busy-box').activity(false);
        $('#cc-pb11').button('disable');
        $('div#progress-container').css('visibility', 'hidden');
        m_run = false;
        ++m_queryId;
      }
      _updateLocationRefs(pos);
      _updateMapDisplay(pos);
      _updateCurrQueryPane();
      _updateHistogram();
      //_updateCloud();

      // swap view on first response unless user already chnged it
      if ((pos === 0) && (m_currentPaneSelector === _selById(NEW_QUERY_PANE))) {
        currentQuery(true);
      }
    }
 }



/**
* Flips the currently visible pane
* @param id Selector for pane to display
*/
function _showPane (id)
{
  if ((id != m_currentPaneSelector) && ($(id).length > 0)) {
    $(m_currentPaneSelector).toggle('fade', 'swing', FADE_TD2, function () {
      $(id).toggle('fade', 'swing', FADE_TD2);
    });
    m_currentPaneSelector = id;
  }
}

/**
* A popup dialog (non-modal)
* @param dtype QUESTION, INFO or ALERT
* @param html formatted content for popup
*/
function _popupDialog (dtype, html, width)
{
  var errOpts = {
    autoOpen:'true', show:FADE_TD1, hide: FADE_TD1,
    position: [140, 140],
    resizable:'false',
    buttons: {'OK' : function () { $(this).dialog('destroy'); $('#user-popup').remove(); }},
    closeOnEscape:'true',
    open: function(event, ui) { $(this).parent().children().children(".ui-dialog-titlebar-close").hide(); }
  };
  var icon = (dtype == ALERT) ? 'ui-icon-alert' : (dtype === INFO) ? 'ui-icon-info' : (dtype === QUESTION) ? 'ui-icon-help' : '';
  $('body').append('<div id="user-popup" style="display:none" title="' + dtype +
      '"><p><span class="ui-icon ' + icon + '" style="float:left; margin:0 7px 20px 0;"></span></p>'+html+'</div>');
  $('#user-popup').dialog(errOpts);
  if (width !== UNDEF) {
    $('#user-popup').dialog('option', 'width', width);
  }
}

/**
* If the nominated pane does not exist, get its content from the server and create it as hidden,
* then fade it out, removing the hidden when the fade is done. Pane will be made visible on next toggle.
* @param id Pane selector
* @param cssName optional class(es) to apply to new pane
*/
function _createPane (id, callback, cssName)
{
  if ($(_selById(FOOTER_BAR)).length > 0) {
    var selector = _selById(id);
    $(_selById(FOOTER_BAR)).before('<div id="' + id + '" class="hidden"></div');
    $(selector).toggle('fade', 'swing', 0, function () {
      $(selector).toggleClass('hidden ' + cssName);
    });
    // do fetch asynch as Webkit has race condition isuues
    $.ajax({
      url: PM_URI + '/pm?pg=' + id,
      asynch: true,
      dataType: 'text',
      success: function (data) {
        $(selector).html(data);
        if (callback !== null) {
          callback();
        }
      },
      error: function (jqXHR, textStatus, errorThrown ) { alert('ajax error fetching html for ' + id + '\n' + errorThrown); }
    });
  }
}

/**
* Checks if a record is inside the timeline range slider markers
* @param idx Index of record
* @returns {Boolean} true if in range
*/
function _isInTimelineRange(idx)
{
  var inRange = false;
  var span = $(_selById(Y2K_SLIDER)).slider('value').split(';');
  var ystart = parseInt(span[0]);
  var yend = parseInt(span[1]);
  var zoneInfo = _getZoneInfo(m_resultSet[idx].zone);
  if (zoneInfo.dtag.length > 0) {
    //var date = eval('m_resultSet[idx].data.' + zoneInfo.dtag);
    var date = m_resultSet[idx].data[zoneInfo.dtag];
    var year = date;
    if (year.length > 4) {
      var isoDate = /(\d\d\d\d)-\d\d-\d\d/;
      var mat = year.match(isoDate);
      if (mat != null) {
        year = parseInt(mat[1]);
      }
    }
    inRange = (year >= ystart) && (year <= yend);
  }
  return inRange;
}

/**
* Configure the default Y2K slider
*/
function _initSlider ()
{
  $(_selById(Y2K_SLIDER)).slider({
    from: 1800,
    to: 2000,
    heterogeneity: ['25/1850', '75/1950'],
    scale: [1800, 1825, 1850, 1875, 1900, 1925, 1950, 1975, 2000],
    limits: false,
    step: 1,
    dimension: '',
    callback: function( value ){ toggleMapMarkers(); }
  });
}

/**
* Creates a Google map marker for a record and sets its initial visibility from
* the timeline range markers. Hover text will be set to the source if zone is newspaper.
* @param idx Index of record
* @param data
*/
function _insertPublisherMapMarker (idx, data)
{
  var pos = new google.maps.LatLng(data.latitude, data.longitude);
  var pin = new google.maps.Marker( { position: pos, map: m_map, } );
  var isViz = (_getCheckedMapButton() === PUBLISHER_MARKER);
  pin.setTitle(data.title);
  pin.setVisible(isViz && _isInTimelineRange(idx));
  pin.setIcon('images/int16.png');
  m_resultSet[idx].marker = pin;
}

/**
* returns currently checked map marker button.
*/
function _getCheckedMapButton ()
{
  return parseInt($('#map-options input[name=radio-map]:checked').val());
}

/**
* Adds timeline markers and map publisher pins for new records just received
* starting at pos in global result array until the end.
* The color of all timeline entries are revised based on the current
* percentile groupings.
* @param pos array offset.
*/
function _updateMapDisplay (pos)
{
  var _addMarker = function (idx)
  {
    // FIXME: only newspaper will have this
    var pubId = eval(m_resultSet[idx].data.title.id);
    //var pubId = m_resultSet[idx].data.title.id;
    var info = m_pubCache[pubId];
    if (typeof info !== UNDEF) {
      _insertPublisherMapMarker(idx, info);
    }
    else {
      var uri = PM_URI + '/pub/info?id=' + pubId;
      $.getJSON(uri, function (data, status, jqXHR) {
        if (status == "success") {
          m_pubCache[pubId] = data;
          _insertPublisherMapMarker(idx, data);
        }
      });
    }
  };
  
  for (var i = pos; i < m_resultSet.length; i++) {
    var zoneInfo = _getZoneInfo(m_resultSet[i].zone);
    //var year = eval('m_resultSet[i].data.' + zoneInfo.dtag);
    var year = m_resultSet[i].data[zoneInfo.dtag];
    if (typeof year != 'undefined') {
      if (typeof year == 'number') {
        year = year.toString();
      }
      else {
        var isoDate = /(\d\d\d\d)-\d\d-\d\d/;
        var mat = year.match(isoDate);
        if (mat != null) {
          year = mat[1];
        }
        else {
          continue;
        }
      }
      if (m_yearCount[year] != null) {
        m_yearCount[year].cnt++;
        m_yearCount[year].refs.push(m_resultSet[i].data.id);
      }
      else {
        m_yearCount[year] = { cnt:1, refs: new Array() };
        m_yearCount[year].refs.push(m_resultSet[i].data.id);
      }
      
      _addMarker(i);
    }
  }
  _updateTimelineMarkerColors();
}

/**
* (re)set the color of all map markers based on hit count percentage per year
*/
function _updateTimelineMarkerColors ()
{
  var __innerCreate = function (idx, year, leftPos, color) {
    var topPos = $(_selById(Y2K_TIMELINE_BAR)).offsetTop;
    var css1 = { 'background-color': color, 'left': leftPos, 'top': topPos };
    $(_selById(Y2K_TIMELINE_BAR)).append($('<div class="year-marker info" id="y' + idx + '">' +
        '<a href="#" onClick="_viewRawByYear(' + idx + ')" class="timeline-hotspot">' +
        '<span>' + year + '</span></a></div>'));
    $('div#y' + idx).css(css1);
  };
  
  for (var key in m_yearCount) {
    var yearVal = parseInt(key);
    if (! isNaN(yearVal) && yearVal > 0) {
      var cnt = m_yearCount[key].cnt;
      var color = '';
      var pct = 100 * cnt / m_resultSet.length;
      for (var idx = 0; idx < FREQ_DISTR.length; idx++) {
        if (pct > FREQ_DISTR[idx][0] && pct <= FREQ_DISTR[idx][1]) {
          color = '#' + FREQ_DISTR[idx][2] + ';';
          break;
        }
      }
      var id = 'div#y' + key;
      if ($(id).length > 0) {
        $(id).css({ 'background-color': color });
      }
      else {
        var px = ((yearVal - 1800) * YEAR_PX) + YEAR_OFFSET;
        __innerCreate(key, yearVal, px, color);
        //$(_selById(Y2K_TIMELINE_BAR)).append($('<div class="year-marker info" id="y' + key + '">' +
            //'<span>' + yearVal + '</div>'));
        //$(id).css({ 'background-color': color, 'left': px, 'top': $(_selById(Y2K_TIMELINE_BAR)).offsetTop });
      }
    }
  }
}

/**
* Gets references to PM GS data for all TROVE IDs in result set starting at <pos>,
* then fetches actual GS data for those we don't already have cached.
* @param pos
*/
function _updateLocationRefs (pos)
{
  var arg = '';
  for (var i = pos; i < m_resultSet.length; i++) {
    //var zoneInfo = _getZoneInfo(m_resultSet[i].zone);
    //var troveId = eval('m_resultSet[i].data.id' + zoneInfo.tags[0].tag);
    var troveId = m_resultSet[i].data.id;
    arg += ',' + troveId;
    m_locations[troveId] = { pos: i, list: new Array() };
  }
  arg = arg.substring(1);
  
  var uri = PM_URI + '/loc/ref?lst=' + arg;
  $.getJSON(uri, function (data, status, jqXHR) {
    if (status == "success") {
      if (data.refs != UNDEF) {
        // associative array 'tmp' tracks duplicate location refs for unloaded locations
        var tmp = new Array();
        var list = data.refs;
        for (var troveRef in list) {
          for (var k = 0; k < list[troveRef].length; k++) {
            m_locations[troveRef].list.push(list[troveRef][k]);
          }
          for (var i = 0; i < m_locations[troveRef].list.length; i++) {
            var locnId = m_locations[troveRef].list[i][0];
            if (! (locnId in m_locationsCache)) {
              tmp[locnId] = '';
              m_locationsCache[locnId] = {
                  info: null,
                  marker: null,
                  popup: null,
                  tids: new Array(troveRef),
                  total: parseInt(m_locations[troveRef].list[i][1]),
                  yMin: parseInt(m_resultSet[m_trefIndex[troveRef]].data.date.substring(0,4)),
                  yMax: parseInt(m_resultSet[m_trefIndex[troveRef]].data.date.substring(0,4))
              };
              m_locationsSum += m_locationsCache[locnId].total;
            }
            else {
              var obj = m_locationsCache[locnId];
              obj.total += parseInt(m_locations[troveRef].list[i][1]);
              obj.tids = obj.tids.concat(troveRef);
              var yr = parseInt(m_resultSet[m_trefIndex[troveRef]].data.date.substring(0,4));
              obj.yMin = Math.min(yr, obj.yMin);
              obj.yMax = Math.max(yr, obj.yMax);
              if (obj.marker != null) {
                var isViz = (_getCheckedMapButton() === LOCATION_MARKER);
                obj.marker.setVisible(isViz && _isRangeOverlap(obj.yMin, obj.yMax));
              }
            }
          }
        }
        var locnIds = '';
        for (var lid in tmp) {
          locnIds += ',' + lid;
        }
        locnIds = locnIds.substring(1);
        if (locnIds.length > 0) {
          _getLocationData(locnIds);
        }
      }
    }
  });
}

/**
* Fetches actual GS data by its DB id and stores it in our cache
* Creates google map marker for location.
* @param list
*/
function _getLocationData (list)
{
  var uri = PM_URI + '/loc/gs?lst=' + list;
  $.getJSON(uri, function (data, status, jqXHR) {
    if (status == "success") {
      if (data.locns !== UNDEF) {
        var locnData = data.locns;
        for (var locnId in locnData) {
          m_locationsCache[locnId].info = locnData[locnId];
          _createMapLocationMarker(locnId);
          _createMarkerPopup(locnId);
        }
      }
      _updateLocationMarkerColors();
    }
  });
}

/**
* Creates a map marker from location data, setting title and visibility with a default pin color
* @param locnId index of location in cache
* @returns {google.maps.Marker}
*/
function _createMapLocationMarker (locnId)
{
  var info = m_locationsCache[locnId].info;
  var pos = new google.maps.LatLng(info.latitude, info.longitude);
  var pin = new google.maps.Marker( { position: pos, map: m_map, } );
  var isViz = (_getCheckedMapButton() === LOCATION_MARKER);
  var title = info.name;
  if ((info.state_sn !== UNDEF) && (info.state_sn.length > 0)) {
    title += ', ' + info.state_sn;
  }
  pin.setTitle(title);
  pin.setVisible(isViz && _isRangeOverlap(m_locationsCache[locnId].yMin, m_locationsCache[locnId].yMax));
  pin.setIcon('images/int1.png');
  m_locationsCache[locnId].marker = pin;
}

/**
* Creates the google Info Window popup for a specific location, and provides dynamic content
* when the info window is opened.
* Note! This is a separate function because of closure requirements.
* @param locId Index into the location cache array.
*/
function _createMarkerPopup (locId)
{
  m_locationsCache[locId].popup = new google.maps.InfoWindow({ content: '', disableAutoPan: true });
  m_locationsCache[locId].listener = google.maps.event.addListener(m_locationsCache[locId].marker, 'click', function () {
    var k1 = m_locationsCache[locId].total > 1 ? ' times in ' : ' time in ';
    var k2 = m_locationsCache[locId].tids.length > 1 ? ' records.' : ' record.';
    var html = '<div class="marker-popup">' + m_locationsCache[locId].info.name +
            ((m_locationsCache[locId].info.state_sn.length > 0) ? ', ' + m_locationsCache[locId].info.state_sn : '') +
            '<br>Occurs ' + m_locationsCache[locId].total + k1 + m_locationsCache[locId].tids.length + k2 +
            '<p><button id="loc-pb' + locId + '" onClick="_viewLocationRecords(' + locId + ')">View Records...</button></div>';
    m_locationsCache[locId].popup.setContent(html);
    m_locationsCache[locId].popup.open(m_map, m_locationsCache[locId].marker);
    $('button#loc-pb' + locId).button();
  });
}

/**
* Marks the location(s) for a specific trove ID as deleted. Updates data structs to
* remove location, its hit count, and zonks the marker if the count reaches zero.
* @param locnList
* @param troveId
*/
function _strikeOutLocations (locnList, troveId)
{
  var uri = PM_URI + '/loc/rm?lid=' + locnList.join(',') + '&tid=' + troveId + '&uid=' + m_user.id;
  $.getJSON(uri, function (data, status, jqXHR) {
    var cnt = 0;
    if (status == "success") {
      cnt = parseInt(data.rm);
    }
    
    if (cnt !== locnList.length) {
      _popupDialog(ALERT, "delete failed");
    }
    else {
      var locnSet = new Array();
      for (var i = 0; i < locnList.length; i++) {
        locnSet[locnList[i]] = null;
      }
      var stack = new Array();
      var locnEntry = m_locations[troveId];
      for (var i = 0; i < locnEntry.list.length; i++) {
        var lid = locnEntry.list[i][0];
        if (! (lid in locnSet)) {
          stack.push(locnEntry.list[i]);
        }
        else {
          m_locationsSum -= locnEntry.list[i][1];
          m_locationsCache[lid].total -= locnEntry.list[i][1];
          for (var k = 0; k < m_locationsCache[lid].tids.length; k++) {
            if (m_locationsCache[lid].tids[k] === troveId) {
              m_locationsCache[lid].tids.splice(k, 1);
              break;
            }
          }
          _resetLocationMaxMinYear(lid);
          if (m_locationsCache[lid].total <= 0) {
            m_locationsCache[lid].marker.setVisible(false);
          }
        }
      }
      locnEntry.list = (stack.length > 0) ? stack : null;
      _updateLocationsListDisplay(m_rawRecordId);
      _updateLocationMarkerColors();
    }
  });
}

/**
* Resets the year range for TROVE results referring to this location ID
* @param locnId
*/
function _resetLocationMaxMinYear (locnId)
{
  if (m_locationsCache[locnId].tids.length === 0) {
    m_locationsCache[locnId].yMin = 0;
    m_locationsCache[locnId].yMax = 0;
  }
  else {
    for (var i = 0; i < m_locationsCache[locnId].tids.length; i++) {
      var troveId = m_locationsCache[locnId].tids[i];
      var idx = m_locations[troveId].pos;
      var data = m_resultSet[idx].data;
      var yr = parseInt(data.date.substring(0,4));
      if (i === 0) {
        m_locationsCache[locnId].yMin = yr;
        m_locationsCache[locnId].yMax = yr;
      }
      else {
        m_locationsCache[locnId].yMin = Math.min(yr, m_locationsCache[locnId].yMin);
        m_locationsCache[locnId].yMax = Math.max(yr, m_locationsCache[locnId].yMax);
      }
    }
  }
}

/**
* Prepares a list of trove records referenced by a mined location and sets them up is sorted data order
* in the Raw View pane.
* @param locnId Index into the location cache array.
*/
function _viewLocationRecords (locnId)
{
  m_locationsCache[locnId].popup.close();
  var tmp = new Array();
  for (var i = 0; i < m_locationsCache[locnId].tids.length; i++) {
    var tref = m_locationsCache[locnId].tids[i];
    var j = m_trefIndex[tref];
    var zoneInfo = _getZoneInfo(m_resultSet[j].zone);
    var date = eval('m_resultSet[j].data.' + zoneInfo.dtag);
    tmp[i] = { idx: j, val: date, hover: '' };
  }
  
  tmp.sort(function(a,b) {
    return a.val > b.val ? 1 :
           a.val < b.val ? -1 : 0;
  });
  
  $('div#raw-list-container').html('');
  $('div#raw-record-container').html('');
  _resetRawRecordList (tmp);
  _showPane(_selById(RAW_VIEW));
  var rbGroup = $('input[name="raw-sort-rb"]');
  rbGroup.prop('checked', false);
  rbGroup[0].checked = true;
}

/**
* Adjust all 'active' location map marker icon colors based on the BOM color scale and percentage
* the frequency total for each is of the total location hit count.
*/
function _updateLocationMarkerColors ()
{
  for (var locn in m_locationsCache) {
    var cnt = m_locationsCache[locn].total;
    var color = 'images/int';
    var pct = 100 * cnt / m_locationsSum;
    for (var i = 0; i < FREQ_DISTR.length; i++) {
      if (pct > FREQ_DISTR[i][0] && pct <= FREQ_DISTR[i][1]) {
        color += (i + 1);
        m_locationsCache[locn].marker.setZIndex(i + MARKER_Z_BASE);
        break;
      }
    }
    m_locationsCache[locn].marker.setIcon(color + '.png');
  }
}

/**
* Checks if a range of years lies all or part within the current timelime marker positions
* @param ymin
* @param ymax
* @returns {Boolean}
*/
function _isRangeOverlap (ymin, ymax)
{
  var span = $(_selById(Y2K_SLIDER)).slider('value').split(';');
  var ystart = parseInt(span[0]);
  var yend = parseInt(span[1]);
  var res = (ymax >= ystart) && (ymin <= yend);
  return res;
}

function _setCurrentQueryButtonState ()
{
  //$('button#cc-pb11').button((m_run ? 'enable' : 'disable')); // || (m_resultSet == null) || (m_totalRecs > 0 && m_resultSet.length >= m_totalRecs)));
  $('button#cc-pb12').button((m_currentQuery == null ? 'disable' : 'enable'));
  $('button#cc-pb13').button((m_currentQuery == null ? 'disable' : 'enable'));
}

/**
* Populate details about the current query progress
*/
function _updateCurrQueryPane ()
{
  if ($(_selById(CURR_QUERY_PANE)).length > 0) {
    switch (m_currentQueryFormPane) {
    case Q_SIMPLE :
      _updateSearchProgressFields();
      _setCurrentQueryButtonState();
      break;
    case Q_ADVANCED :
     _updateSearchProgressFields();
        _setCurrentQueryButtonState();
      break;
    case Q_CUSTOM :
      // FIXME: todo
      break;
    }
  }
}

/**
* Updates the fields on all (currently current query page and master page)
* with new numbers for the amount of results processed, etc.
* @author Rob Dempsey
*/
function _updateSearchProgressFields() {
    $('td#q11').html(m_currentTerm);
    $('td#z11').html(m_currentZone);
    $('td#n11').html(m_totalRecs);
    $('td#n12').html(m_resultSet == null ? 0 : m_resultSet.length);
    $('span#progress').html(m_resultSet == null ? "" : m_resultSet.length + " / " + m_totalRecs + "<br>retrieved</br>");
}

/**
* Creates a new list of identifiers for trove records in the scrollable left hand panel
* of the Raw View pane.
* @param list Structure of identifiers, link indicies, and optional hover text.
*/
function _resetRawRecordList (list)
{
  if (list != null) {
    var listData = '';
    var prefix = '';
    var len = list.length;
    var remainder = len % MAX_FETCH_SIZE;
    var pageCount = ((len - remainder) / MAX_FETCH_SIZE) + 1;
    var currentPage = 0;
    var lastPage = pageCount - 1;
    var pgStart = 0;
    var pgEnd = len;
      
    document.getElementById("page-count-message").innerHTML = "Showing results 1- " + remainder;
   
    if (document.getElementById("page-options") != null) {
     currentPage = document.getElementById("page-options").selectedIndex;
     $('#page-options').remove();
    }

    if (len > MAX_FETCH_SIZE) {
     _paginateResults(pageCount, currentPage, remainder);
     $("#page-options").on("change", function() {
     _resetRawRecordList(list);
     });
        pgStart = currentPage * MAX_FETCH_SIZE;
        pgEnd = pgStart + MAX_FETCH_SIZE;
    }
         
    if (currentPage == lastPage) {
     pgEnd = pgStart + remainder;
    }
    
    for (var idx = pgStart; idx < pgEnd; idx++) {
      listData += prefix + '<a class="raw-data-selector info" href="#" onClick="_displayRawDataItem(' + list[idx].idx + ')">';
      if (list[idx].hover.length > 0) {
        listData += '<span>' + list[idx].hover + '</span>';
      }
      listData += list[idx].val + '</a>\n';
      prefix = '<br>';
    }
    $('div#raw-list-container').html(listData);
    $('input#pb-r1').attr('disabled','true');
    $('input#pb-r2').attr('disabled','true');
    if (list.length === 1) {
      _displayRawDataItem(list[0].idx);
    }
    else {
      $('div#raw-record-container').html('');
      $('button#rdv-pb3').button('disable');
    }
  }
}

/**
* Splits raw results into pages
*
* @param pgCount: The number of pages to construct
* @param currentPage: The current selected page
* @param remainder: The result count for the final page
*/
function _paginateResults(pgCount, currentPage, remainder) {
document.getElementById("page-count-message").innerHTML = "Showing results ";
var pageOptions = '<select id="page-options">';
var lastPage = pgCount - 1;
    //build page numbers
    for (var i = 0; i < pgCount; i++) {
     var initialIndex = i * MAX_FETCH_SIZE + 1;
     var finalIndex = initialIndex + (MAX_FETCH_SIZE);
     if (i == lastPage) {
     finalIndex = initialIndex + remainder;
     }
    
     var range = initialIndex + '-' + finalIndex;
     if (i == currentPage) {
     pageOptions += '<option class="pg-number" selected="selected">' + range + '</option>';
     } else {
     pageOptions += '<option class="pg-number">' + range + '</option>';
     }
    
    }
    pageOptions += '</select>';
$('span#raw-page-numbers').html(pageOptions);
}

/**
* Returns a structure giving the *possible* structure of a trove JSON response
* (TROVE has no schema for these!)
* @param zone
* @returns
*/
function _getZoneInfo (zone)
{
  var zoneInfo = null;
  switch (zone) {
  case 'newspaper': zoneInfo = ZONE_NEWSPAPER; break;
  case 'article': zoneInfo = ZONE_ARTICLE; break;
  case 'picture': zoneInfo = ZONE_PICTURE; break;
  case 'map': zoneInfo = ZONE_MAP; break;
  case 'list': zoneInfo = ZONE_LIST; break;
  case 'music': zoneInfo = ZONE_MUSIC; break;
  case 'collection': zoneInfo = ZONE_COLLECTION; break;
  case 'book': zoneInfo = ZONE_BOOK; break;
  }
  return zoneInfo;
}

/**
* Display info contained in a response
* @param id Index in result set of record
*/
function _displayRawDataItem (id)
{
  var rec = m_resultSet[id];
  var zoneInfo = _getZoneInfo(rec.zone);
  var html = '<table id="raw-record"><tr><td class="td-crud-name">Zone:</td><td>' + rec.zone + '</td></tr>';
  for (var i = 0; i < zoneInfo.tags.length; i++) {
    // have to eval this as tag may be double level dotted ref
    var value = eval('m_resultSet[' + id + '].data.' + zoneInfo.tags[i].tag);
    if ((value === null) && (zoneInfo.tags[i].tag == 'text')) {
      html += '<tr><td class="td-crud-name">' + zoneInfo.tags[i].title + ':</td><td><button id="rdv-pbx" onClick="refreshRecord()">Load full text</button></td></tr>';
    }
    else if (zoneInfo.tags[i].isLink) {
    	html += '<tr class="hidden"><td>' + zoneInfo.tags[i].title + ':</td><td>' +
    	'<a id="raw-trove-link" href="' + value + '" target="_blank">' + value + '</a></td></tr>';
    }
    else {
     if(zoneInfo.tags[i].title == 'Thumbnail') {
    	 value = eval('m_resultSet[' + id + '].data.' + zoneInfo.tags[9].tag);
    	 html += '<tr><td class="td-crud=name">' + zoneInfo.tags[9].title + '</td><td>' + '<img src="' + value + '" alt=" --- Loading ---"></td></tr>';
     } else {
    	 html += '<tr><td class="td-crud-name">' + zoneInfo.tags[i].title + ':</td><td>' + value + '</td></tr>';
  
     }
    }
  }
  
  html += '</table>';
  $(_selById(RAW_RECORD)).html(html);
  m_rawRecordId = id;
  if (m_currentZone === 'newspaper') {
    $('button#rdv-pb1').button('enable');
  }
  
  $('button#rdv-pb3').button('enable');
}

/**
* Retrieve full text and display in Location editor Pane
*/
function _getFullTextForLocation ()
{
  if (m_resultSet[m_rawRecordId].data.text != null) {
    _displayLocationEditText(m_rawRecordId);
  }
  else {
    var uri = TROVE_URL + m_currentZone + '/' + m_resultSet[m_rawRecordId].data.id +
    '?key=' + m_user.key +
    '&encoding=json' +
    '&include=articletext' +
    '&callback=?';
    $.getJSON(uri, function (data, status, jqXHR) {
      if (status == "success") {
        var record = data['article'];
        if (record) {
          if (typeof record.articleText === UNDEF) {
            m_resultSet[m_rawRecordId].data.text = '&lt;nil&gt;';
          }
          else {
            var text = record.articleText.toString();
            text = text.replace(/<p>/g, '');
            text = text.replace(/<\/p>/g, '');
            m_resultSet[m_rawRecordId].data.text = text;
          }
          _displayLocationEditText(m_rawRecordId);
        }
      }
    });
  }
}

/**
* Display snipped and full text (or button) for location editing.
* @param id
*/
function _displayLocationEditText (id)
{
  var text = m_resultSet[id].data.text;
  var html = '<table id="raw-record"><tr><td class="td-crud-name">ID:</td><td>' + m_resultSet[id].data.id + '</td></tr>' +
             '<td class="td-crud-name">Source:</td><td>' + m_resultSet[id].data.title.value + '</td></tr>' +
             '<td class="td-crud-name">Snippet:</td><td>' + m_resultSet[id].data.snippet + '</td></tr>' +
             '<tr><td class="td-crud-name">Full Text:</td><td>';
  html += ((text === null) ? '<button id="rdv-pbx" onClick="_getFullTextForLocation()">Load full text</button>' : text);
  html += '</td></tr></table>';
  $(_selById('record-text-container')).html(html);
}

/**
* Builds a table showing location names (with state/country as appropriate) for a TROVE record
* with a checkbox for deletion selection and displays it in the edit locations pane.
* @param id
*/
function _updateLocationsListDisplay (id)
{
  var tref = m_resultSet[id].data.id;
  var html = '<table><tr><td>No Locations set</td></tr>';
  if (tref in m_locations) {
    var locns = m_locations[tref];
    if (locns.list !== null) {
      html = '<table>';
      for (var i = 0; i < locns.list.length; i++) {
        var locnId = locns.list[i][0];
        var info = m_locationsCache[locnId].info;
        var sfx = (info.state_sn.length > 0) ? ', ' + info.state_sn :
                  (info.iso_ln !== UNDEF) ? ' (' + info.iso_ln + ')' : '';
        html += '<tr><td class="cb-col"><input type="checkbox" id="x' + locnId + '"></td><td>' + info.name + sfx + '</td></tr>';
      }
      html += '</table>';
    }
  }
  $(_selById('location-list-container')).html(html);
}

/**
* Builds a sorted index by type into the raw data array
* @param sortType 1..4 (date, relevance, source, unsorted)
*/
function _sortRaw (sortType)
{
  var isInRange = function (idx) {
    var inRange = true;
    if (m_restrictRawList) {
      inRange = _isInTimelineRange(idx);
    }
    return inRange;
  };
  
  var tmp = new Array();
  try {
    switch (sortType) {
    case 0:
      m_restrictRawList = $('input#raw-select-cb').is(':checked');
      break;
    case 1:
    case 4:
      for (var i = 0, j = 0; i < m_resultSet.length; ++i) {
        var zoneInfo = _getZoneInfo(m_resultSet[i].zone);
        if ((zoneInfo.dtag.length > 0) && isInRange(i)) {
          var date = eval('m_resultSet[i].data.' + zoneInfo.dtag);
          tmp[j++] = { idx: i, val: date, hover: '' };
        }
      }
      break;
    case 2:
      for (var i = 0, j = 0; i < m_resultSet.length; ++i) {
        var zoneInfo = _getZoneInfo(m_resultSet[i].zone);
        if ((zoneInfo.rtag.length > 0) && isInRange(i)) {
          var score = eval('m_resultSet[i].data.' + zoneInfo.rtag);
          var tval = parseFloat(score);
          tmp[j++] = { idx: i, val: tval, hover: '' };
        }
      }
      break;
    case 3:
      for (var i = 0, j = 0; i < m_resultSet.length; ++i) {
        var zoneInfo = _getZoneInfo(m_resultSet[i].zone);
        if ((zoneInfo.stag.length > 0) && isInRange(i)) {
          var srcId = eval('m_resultSet[i].data.' + zoneInfo.stag);
          var lab = (typeof m_pubCache[srcId] !== UNDEF) ? m_pubCache[srcId].title : '';
          var srcid = '000000' + srcId;
          tmp[j++] = { idx: i, val: srcid.substring(srcid.length - 6, srcid.length), hover: lab };
        }
      }
    }
  }
  catch (err) {
    // FIXME: debug stop
  }
  
  if (tmp.length > 0) {
    if (sortType === 2) {
      tmp.sort(function(a,b) {
        return a.val > b.val ? -1 :
               a.val < b.val ? 1 : 0;
      });
    }
    else if (sortType !== 4) {
      tmp.sort(function(a,b) {
        return a.val > b.val ? 1 :
               a.val < b.val ? -1 : 0;
      });
    }
    if (document.getElementById("page-options") != null) {
     $("select#page-options").prop('selectedIndex', 0);
    }
    _resetRawRecordList (tmp);
    return tmp;
  }
}

/**
* Action when a timeline marker clicked builds a list of records for that year and activates RAW view
* @param idx Index into year array.
*/
function _viewRawByYear (idx)
{
  var tmp = new Array();
  for (var i = 0; i < m_yearCount[idx].refs.length; i++) {
    var rsi = m_trefIndex[m_yearCount[idx].refs[i]];
    var zoneInfo = _getZoneInfo(m_resultSet[rsi].zone);
    var date = eval('m_resultSet[rsi].data.' + zoneInfo.dtag);
    tmp[i] = { idx: rsi, val: date, hover: '' };
  }

  tmp.sort(function(a,b) {
  return a.val > b.val ? 1 :
         a.val < b.val ? -1 : 0;
  });
  
  $('div#raw-list-container').html('');
  $('div#raw-record-container').html('');
  _resetRawRecordList (tmp);
  _showPane(_selById(RAW_VIEW));
  var rbGroup = $('input[name="raw-sort-rb"]');
  rbGroup.prop('checked', false);
  rbGroup[0].checked = true;
}

/**
* Basic layout for add location dailog
* @param text User-selected text to display
* @returns {String}
*/
function _formatAddLocations (text)
{
  var html = '<div id="add-locns-dlg">' +
      '<table id="add-locn-find"><tr><th>Place Name</th><th>State</th><th>Country</th></tr><tr>' +
      '<td><input id="add-locn-name" type="text" value="' + text + '"></td>' +
      '<td><input id="add-locn-state" type="text" value=""></td>' +
      '<td><input id="add-locn-cntry" type="text" value=""></td></tr></table>' +
      '<br>&nbsp;<table id="add-locns"></table' +
      '</div>';
  return html;
}

/**
* Find a location name (optionally with state and/or country) from our database, or google geocode service.
* The location data is appended to the array of locations found since the add dialog was opened.
* @param src
*/
function _findLocation (src)
{
  var __getNames = function(list, tag) {
    var res = { sn:'', ln:'' };
    for (var i = 0; i < list.length; i++) {
      for (var j = 0; j < list[i].types.length; j++) {
        if (list[i].types[j] === tag) {
          res.sn = list[i].short_name;
          res.ln = list[i].long_name;
          break;
        }
      }
    }
    return res;
  };

  var ln = $('#add-locn-name').val();
  var sn = $('#add-locn-state').val();
  var cn = $('#add-locn-cntry').val();
  if (src === 0) {
    var uri = PM_URI + '/loc/q?ln=' + ln + '&sn=' + sn + '&cn=' + cn;
    $.getJSON(uri, function (data, status, jqXHR) {
      if (status == "success") {
        if (data.length === 0) {
          _popupDialog(INFO, 'Location not in the Paper Miner database.');
          return;
        }
        for (var i = 0; i < data.length; i++) {
          m_locnSelections.push(data[i]);
        }
        _formatLocationSelections();
      }
    });
  }
  else {
    var uri = GOOGLE_MAPS_URL + ln +
    (sn.length > 0 ? '+' + sn : '') +
    (cn.length > 0 ? '+' + sn : '') +
    '&sensor=false';
    $.getJSON(uri, function (data, status, jqXHR) {
      if (status == "success") {
        if ( data.results.length === 0) {
          _popupDialog(INFO, 'No results from Google Maps for this Location.');
          return;
        }
        try {
          var list = new Array();
          for (var i = 0; i < data.results.length; i++) {
            var obj = data.results[i];
            var state = __getNames(obj.address_components, 'administrative_area_level_1');
            var cntry = __getNames(obj.address_components, 'country');
            var tmp = {
                id: "0",
                state_sn: state.sn,
                state_ln: state.ln,
                iso_sn: cntry.sn,
                iso_ln: cntry.ln,
                name: obj.address_components[0].long_name,
                latitude: obj.geometry.location.lat,
                longitude: obj.geometry.location.lng,
                box_nw_lat: obj.geometry.bounds.northeast.lat,
                box_nw_lng: obj.geometry.bounds.northeast.lng,
                box_se_lat: obj.geometry.bounds.southwest.lat,
                box_se_lng: obj.geometry.bounds.southwest.lng,
            };
            list.push(tmp);
          }
          m_locnSelections = m_locnSelections.concat(list);
        }
        catch (ex) {
          _popupDialog(ALERT, "The results are ambiguous. Please try specifying a state, and/or Country.");
        }
      }
      _formatLocationSelections();
    });
  }
}

/**
* Formates the list of locations "found" since the add location dialog was opened
* and displayes them in the dialog.
*/
function _formatLocationSelections ()
{
  var tdat = '';
  for (var i = 0; i < m_locnSelections.length; i++) {
    var locn = m_locnSelections[i];
    tdat += '<tr><td class="sel-name">' + locn.name +
            '</td><td class="sel-state">' + locn.state_sn +
            '</td><td class="sel-cntry">' + locn.iso_ln +
            '</td><td class="sel-accept"><button onClick="_addNewLocation(' + i + ')">Accept</button></td></tr>';
  }
  $('#add-locns').html(tdat);
}

/**
* Adds the selected location to the current trove record
* @param idx Index of selected location element
*/
function _addNewLocation(idx)
{
  $('#add-locns-dlg').dialog('close');

  var re = new RegExp($('#add-locn-name').val(), 'ig');
  var hits = m_resultSet[m_rawRecordId].data.text.match(re);
  var freq = (hits === null) ? 1 : hits.length;
  if (m_locnSelections[idx].id > 0) {
    _addReference(m_resultSet[m_rawRecordId].data.id, m_locnSelections[idx], freq);
  }
  else {
    _addLocation(m_resultSet[m_rawRecordId].data.id, m_locnSelections[idx], freq);
  }
}

/**
* Adds a new reference to an existing location for a TROVE id with a frequency count.
* @param troveId The Trove ID
* @param locnId The index in the locations cache
* @param freq Occurence count for the location in the TROVE record
*/
function _addReference (troveId, obj, freq)
{
  var locnId = obj.id;
  var uri = PM_URI + '/loc/add?uid=' + m_user.id + '&tid=' + troveId + '&lid=' + locnId + '&freq=' + freq;
  $.getJSON(uri, function (data, status, jqXHR) {
    if (status === "success") {
      if (data.res !== "ok") {
        _popupDialog(ALERT, "Unable to add location for this record");
      }
      else {
        if (typeof m_locationsCache[locnId] === UNDEF) {
          m_locationsCache[locnId] = {
              info: obj,
              total: 0,
              yMin: parseInt(m_resultSet[m_locations[troveId].pos].data.date.substring(0,4)),
              yMax: parseInt(m_resultSet[m_locations[troveId].pos].data.date.substring(0,4)),
              tids: new Array(),
              popup: null,
              marker: null,
              listener: null
          };
          _createMapLocationMarker(locnId);
          _createMarkerPopup(locnId);
        }
        var isViz = (_getCheckedMapButton() === LOCATION_MARKER) &&
                     _isRangeOverlap(m_locationsCache[locnId].yMin, m_locationsCache[locnId].yMax);
        m_locationsSum += freq;
        m_locationsCache[locnId].total += freq;
        m_locationsCache[locnId].tids.push(troveId);
        m_locationsCache[locnId].marker.setVisible(isViz);
        m_locations[troveId].list.push([locnId, freq.toString()]);
        _resetLocationMaxMinYear(locnId);
        _updateLocationMarkerColors();
        _updateLocationsListDisplay(m_locations[troveId].pos);
      }
    }
  });
}

/**
* Adds a new location and a new reference to it.
* @param troveId The record referencing the new location
* @param obj The info details for the new location
* @param freq Count of occurences of location in record
*/
function _addLocation (troveId, obj, freq)
{
  var uri = PM_URI + '/loc/ins?uid=' + m_user.id + '&tid=' + troveId + '&freq=' + freq +
            '&nm=' + obj.name +
            '&ssn=' + obj.state_sn +
            '&sln=' + obj.state_ln +
            '&csn=' + obj.iso_sn +
            '&cln=' + obj.iso_ln +
            '&lat=' + obj.latitude +
            '&lng=' + obj.longitude +
            '&nwlat=' + obj.box_nw_lat +
            '&nwlng=' + obj.box_nw_lng +
            '&selat=' + obj.box_se_lat +
            '&selng=' + obj.box_se_lng;
  $.getJSON(uri, function (data, status, jqXHR) {
    if (status == "success") {
      var locnId = parseInt(data.lid);
      if (locnId <= 0) {
        _popupDialog(ALERT, "Unable to insert location for this record");
      }
      else {
        m_locationsSum += freq;
        obj.id = locnId;
        m_locations[troveId].list.push([locnId, freq]);
        m_locationsCache[locnId] = {
            info: obj,
            total: freq,
            yMin: parseInt(m_resultSet[m_locations[troveId].pos].data.date.substring(0,4)),
            yMax: parseInt(m_resultSet[m_locations[troveId].pos].data.date.substring(0,4)),
            tids: [ troveId ],
            popup: null,
            marker: null,
            listener: null
        };
        _createMapLocationMarker(locnId);
        _createMarkerPopup(locnId);
        _resetLocationMaxMinYear(locnId);
        _updateLocationMarkerColors();
        _updateLocationsListDisplay(m_locations[troveId].pos);
      }
    }
  });
}

/**
* Deletes selected locations from currently selected/displayed raw record.
*/
function locnDel ()
{
  var tmp = new Array();
  var cbs = $('#location-list-container input');
  for (var i = 0, j = 0; i < cbs.length; i++) {
    var id = cbs[i].id;
    if ($('input#'+id).is(':checked')) {
      tmp[j++] = id.substring(1);
    }
  }
  
  if (tmp.length === 0) {
    _popupDialog(ALERT, "No locations marked for removal!");
  }
  else {
    _strikeOutLocations(tmp, m_resultSet[m_rawRecordId].data.id);
  }
}

/*
 *  Function for converting all data retrieved into a csv file and export so users
 *  can have a copy of data on their computer
 */
function downloadCsv(){
	var tempNewsArray = 'ID\tDate\tSource\tCategory\tHeading\tScore\tRelevance\tPage\tSnippet\tFullText\tURL\r\n';
	//var tempPicArray = 'ID\tTitle\tMediaType\tDateIssued\tSnippet\tHolding\tVersion\tScore\tRelevance\tThumbnail\tURL\r\n';
	var tempPicArray = 'ID\tTitle\tMediaType\tDateIssued\tSnippet\tHolding\tVersion\tScore\tRelevance\tURL\r\n';
	var tempBookArray = 'ID\tTitle\tType\tDateIssued\tContributor(s)\tSnippet\tVersion\tScore\tRelevance\tURL\r\n';
	var tempArticleArray = 'ID\tTitle\tDateIssued\tPartOf\tHolding\tVersion\tScore\tRelevance\tType\tURL\r\n';
	var tempMapsArray = 'ID\tTitle\tMediaType\tHolding\tVersion\tScore\tRelevance\tURL\r\n';
	var tempMusicArray = 'ID\tTitle\tContributor\tDateIssued\tMediaType\tSnippet\tHolding\tRelevance\tVersion\tURL\r\n';
	var tempCollectionArray = 'ID\tTitle\tMediaType\tDateIssued\tHolding\tVersion\tScore\tRelevance\tURL\r\n';
	var tempListArray = 'ID\tTitle\tCreator\tDescription\tSnippet\tItems_in_list\tScore\tRelevance\tURL\r\n';
	var zoneInfo;
	for(var e = 0; e < m_resultSet.length; e++){
		zoneInfo = _getZoneInfo(m_resultSet[e].zone);
		//alert(JSON.stringify(zoneInfo.tags));
		
		switch(zoneInfo.id){
			case 'newspaper':
				for (var f = 0; f < zoneInfo.tags.length; f++) {
					tempNewsArray += eval('m_resultSet[' + e + '].data.' + zoneInfo.tags[f].tag) + "\t";
				}
				tempNewsArray += '\r\n';
				break;
			case 'picture':
				for (var g = 0; g < zoneInfo.tags.length; g++) {
					if(zoneInfo.tags[g].title != 'Thumbnail') {
						tempPicArray += eval('m_resultSet[' + e + '].data.' + zoneInfo.tags[g].tag) + '\t';
					}
				}
				tempPicArray += '\r\n';
				break;
			case 'book':
				for (var h = 0; h < zoneInfo.tags.length; h++) {
					tempBookArray += eval('m_resultSet[' + e + '].data.' + zoneInfo.tags[h].tag) + "\t";
				}
				tempBookArray += '\r\n';
				break;
			case 'article':
				for (var i = 0; i < zoneInfo.tags.length; i++) {
					tempArticleArray += eval('m_resultSet[' + e + '].data.' + zoneInfo.tags[i].tag) + "\t";
				}
				tempArticleArray += '\r\n';
				break;
			case 'music':
				for (var j = 0; j < zoneInfo.tags.length; j++) {
					tempMusicArray += eval('m_resultSet[' + e + '].data.' + zoneInfo.tags[j].tag) + "\t";
				}
				tempMusicArray += '\r\n';
				break;
			case 'map':
				for (var k = 0; k < zoneInfo.tags.length; k++) {
					tempMapsArray += eval('m_resultSet[' + e + '].data.' + zoneInfo.tags[k].tag) + "\t";
				}
				tempMapsArray += '\r\n';
				break;
			case 'collection':
				for (var l = 0; l < zoneInfo.tags.length; l++) {
					tempCollectionArray += eval('m_resultSet[' + e + '].data.' + zoneInfo.tags[l].tag) + "\t";
				}
				tempCollectionArray += '\r\n';
				break;
			case 'list':
				for (var m = 0; m < zoneInfo.tags.length; m++) {
					tempListArray += eval('m_resultSet[' + e + '].data.' + zoneInfo.tags[m].tag) + "\t";
				}
				tempListArray += '\r\n';
				break;
		}
	}
	
	if(tempNewsArray != "ID\tDate\tSource\tCategory\tHeading\tScore\tRelevance\tPage\tSnippet\tFullText\tURL\r\n"){
		var a = document.createElement('a');
		a.href     = 'data:attachment/csv,' + encodeURIComponent(tempNewsArray);
		a.target   = '_blank';
		a.download = 'pm-newspapers.csv';
		document.body.appendChild(a);
		a.click();
	}
	
	if(tempPicArray != "ID\tTitle\tMediaType\tDateIssued\tSnippet\tHolding\tVersion\tScore\tRelevance\tURL\r\n"){
		var a = document.createElement('a');
		a.href     = 'data:attachment/csv,' + encodeURIComponent(tempPicArray);
		a.target   = '_blank';
		a.download = 'pm-picture.csv';
		document.body.appendChild(a);
		a.click();
	}	
	
	if(tempBookArray != "ID\tTitle\tType\tDateIssued\tContributor(s)\tSnippet\tVersion\tScore\tRelevance\tURL\r\n"){
		var a = document.createElement('a');
		a.href     = 'data:attachment/csv,' + encodeURIComponent(tempBookArray);
		a.target   = '_blank';
		a.download = 'pm-books.csv';
		document.body.appendChild(a);
		a.click();
	}
	
	if(tempArticleArray != "ID\tTitle\tDateIssued\tPartOf\tHolding\tVersion\tScore\tRelevance\tType\tURL\r\n"){
		var a = document.createElement('a');
		a.href     = 'data:attachment/csv,' + encodeURIComponent(tempArticleArray);
		a.target   = '_blank';
		a.download = 'pm-article.csv';
		document.body.appendChild(a);
		a.click();
	}
	
	if(tempMusicArray != "ID\tTitle\tContributor\tDateIssued\tMediaType\tSnippet\tHolding\tRelevance\tVersion\tURL\r\n"){
		var a = document.createElement('a');
		a.href     = 'data:attachment/csv,' + encodeURIComponent(tempMusicArray);
		a.target   = '_blank';
		a.download = 'pm-music.csv';
		document.body.appendChild(a);
		a.click();
	}
	
	if(tempMapsArray != "ID\tTitle\tMediaType\tHolding\tVersion\tScore\tRelevance\tURL\r\n"){
		var a = document.createElement('a');
		a.href     = 'data:attachment/csv,' + encodeURIComponent(tempMapsArray);
		a.target   = '_blank';
		a.download = 'pm-maps.csv';
		document.body.appendChild(a);
		a.click();
	}
	
	if(tempCollectionArray != "ID\tTitle\tMediaType\tDateIssued\tHolding\tVersion\tScore\tRelevance\tURL\r\n"){
		var a = document.createElement('a');
		a.href     = 'data:attachment/csv,' + encodeURIComponent(tempCollectionArray);
		a.target   = '_blank';
		a.download = 'pm-collections.csv';
		document.body.appendChild(a);
		a.click();
	}
	
	if(tempListArray != "ID\tTitle\tCreator\tDescription\tSnippet\tItems_in_list\tScore\tRelevance\tURL\r\n"){
		var a = document.createElement('a');
		a.href     = 'data:attachment/csv,' + encodeURIComponent(tempListArray);
		a.target   = '_blank';
		a.download = 'pm-lists.csv';
		document.body.appendChild(a);
		a.click();
	}
}

//--------------- TEST FUNCTION   -------------------- //
function test() {
	_getUserPrefs();
	_doQuery(0);
}

/** 
 * Gets a list of newspaper titles from trove and populates the appropriate select box
 */
function _getNewspaperTitles() {
	var queryStr = TROVE_NEWS_TITLES + m_user.key;
	queryStr += '&encoding=json&callback=?';
	$.getJSON(queryStr,function(result){
		var output = result.response.records.newspaper;
	    $.each(output, function (i, field){
	    	$('#adv-newspaper-publication').append('<option value="'+ this.id +'">'+ this.title +'</option>');
	    	$('#cus-newspaper-publication').append('<option value="'+ this.id +'">'+ this.title +'</option>');
	    });
    });
	$("#adv-newspaper-publication").css("width", "100%");
	$("#cus-newspaper-publication").css("width", "100%");
}

/** 
 * Gets a list of newspaper titles from trove and populates the appropriate select box
 */
function _getTroveContributors() {
	var queryStr = "http://api.trove.nla.gov.au/contributor?encoding=json&callback=?&key=" + m_user.key;
	$.getJSON(queryStr,function(result){
		var output = result.response.contributor;
	    $.each(output, function (i, field){
	    	$('#ind-nuc').append('<option value="'+ this.id +'">'+ this.name +'</option>');
	    	$('#ind-nuc-not').append('<option value="'+ this.id +'">'+ this.name +'</option>');
	    });
    });
}

function _extractYearFromDate(date) {
	if (date === undefined) {
		return "unknown date";
	}
	var isoDate = /(\d\d\d\d)/;
	date = date.toString();
	var mat = date.match(isoDate);

	if (mat != null) {
		year = parseInt(mat[1]);
		return year;
	}
}



// EOF
