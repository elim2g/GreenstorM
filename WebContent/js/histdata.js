const SUCCESS = true;
const FAIL = false;

//Generate a Bar Chart
function BarChartInit() {
	var fill 	= HexToRGBA('#FF2626', 0.5); 	// fill colour
	var stroke	= HexToRGBA('#BF0000', 1); 		// stroke colour
	var scale	= HexToRGBA('#000000', 0.75);	// scale line colour
	var grid	= HexToRGBA('#000000', 0.15);	// grid line colour
				
	var barChartData = {
			labels : _histLabelArray(),
			datasets : [
				{
					fillColor 	: 	fill,
					strokeColor : 	stroke,
					data 		: _histDataArray()
				}
			]
	};
	
	var barOptions = {
			animation 		: false,
			scaleLineColor 	: scale,
			scaleGridLineColor	: grid
	};
	
	ClearLegend();
	
	var target = document.getElementById("canvas");
	if(target == null) return FAIL;
	var myBar = new Chart(target.getContext("2d")).Bar(barChartData, barOptions);
	if(myBar == null) return FAIL;
	
	return SUCCESS;
}

//Generate a Line Chart
function LineChartInit() {
	var fill 	= HexToRGBA('#FF2626', 0.5); 	// fill colour
	var stroke	= HexToRGBA('#BF0000', 1); 		// stroke colour
	var point	= HexToRGBA('#D14141', 1);		// point colour
	var scale	= HexToRGBA('#000000', 0.75);	// scale line colour
	var grid	= HexToRGBA('#000000', 0.15);	// grid line colour
	
	var lineChartData = {
			labels : _histLabelArray(),
			datasets : [
				{
					fillColor 		: fill,
					strokeColor 	: stroke,
					pointColor 		: point,
					pointStrokeColor: "#fff",
					data 			: _histDataArray()
				}
			]	
	};
		
	ClearLegend();
	
	var lineOptions = {
			animation 		: false,
			scaleLineColor 	: scale,
			scaleGridLineColor	: grid
	};
	
	var target = document.getElementById("canvas");
	if(target == null) return FAIL;
	var myLine = new Chart(target.getContext("2d")).Line(lineChartData, lineOptions);
	if(myLine == null) return FAIL;
	return SUCCESS;
}

//Generate a Doughnut Chart
function DoughnutChartInit() {
	var tempData = _histDataArray();
	var dnData = [];
	
	for(var i = 0; i < tempData.length; i++) {
		var newChartObject =
		               {
		            	   value : tempData[i],
		                   color : GenClr(i)
		               };
		                 
		dnData.push(newChartObject);
	}
	
	var dnOptions = { animation : false };
	var target = document.getElementById("canvas");
	if(target == null) return FAIL;
	var myDoughnut = new Chart(target.getContext("2d")).Doughnut(dnData, dnOptions);
	if(myDoughnut == null) return FALSE;
	
	//Add legend to page
	ClearLegend();
	labelsArray = _histLabelArray();
	var legend = '<table border="1"><tr><th bgcolor="#FBFBFB">Colour</th><th bgcolor="#FBFBFB">Label</th></tr>';
	for(var i = 0; i < _histLabelArray().length; i++) {
		hexString = GenClr(i);
		legend = legend + '<tr><td bgcolor="' + hexString + '"></td>';
		legend = legend + '<td bgcolor="#FEFEFE">' + labelsArray[i] + '</td>';
	}
	legend = legend + '</table>';
	
	//Tack it on the page
	var e = $(legend);
	$('#dnut-legend').append(e);
	
	return SUCCESS;
}

//If the query is not paused (so it is running), refresh the graph
function RefreshHistogram(graphType) {
	if(!m_paused) {
		switch(graphType) {
		case 0: BarChartInit(); break;
		case 1: LineChartInit(); break;
		case 2: DoughnutChartInit(); break;
		default: throw new Error('Not a graph type'); return FAIL; break;
		}
	}
	
	return SUCCESS;
}

//Generate random hex colour string
function GenClr(index) {
	if(index < 0) throw new Error('Negative index');
	if(index > _histLabelArray().length) throw new Error('Index too large');
	var numSlice = Math.floor((256*256*256) / _histLabelArray().length);
	var intColour = numSlice * index;
	var strColour = intColour.toString(16);
	var hexString = "#";
	var hexString = hexString + strColour;
	
	return hexString;
}

//Clears the legend div
function ClearLegend() {
	$('#dnut-legend').html('');
	return true;
}

//Clears the canvas div
function ClearCanvas() {
	$('#canv-div').html('');
	return true;
}

//Resizes the canvas on the page
function ResizeCanvas(width, height) {
	ClearCanvas();
	var canvString = '<canvas id="canvas" height="'
						+ width.toString() + '" width="'
						+ height.toString() + '"></canvas>';
	var kingString = $(canvString);
	$('#canv-div').append(kingString);
	
	return true;
}

//Changes which graph is shown on the page
function ChangeGraph(graph) {
	var nameStr = '<h2>';
	switch(graph) {
		case barGraph:
			graphType = barGraph;
			RenameGraphTitle('Bar Graph');
			ResizeCanvas(600, 800);
			BarChartInit(); 
			break;
			
		case lineGraph: 
			graphType = lineGraph;
			RenameGraphTitle('Line Graph');
			ResizeCanvas(600, 800);
			LineChartInit(); 
			break;
			
		case dnutGraph:
			graphType = dnutGraph;
			RenameGraphTitle('Doughnut Graph');
			ResizeCanvas(500, 700);
			DoughnutChartInit();
			break;
			
		default:
			throw new Error('Not a graph type');
			return FAIL; //Not needed, but a failsafe because Javascript
			break;
	}
	
	return SUCCESS;
}

//Saves the specified graph to a downloadable image file
function SaveGraph() {
	var savCanvas = document.getElementById("canvas");
	if(savCanvas == null) return FAIL;
	
	Canvas2Image.saveAsPNG(savCanvas);
	
	return SUCCESS;
}

//Renames the title of the graph page. Returns the string used if successful
function RenameGraphTitle(titleStr) {
	if(typeof titleStr == 'string' || titleStr instanceof String) {
		var newName = '<h2>';
		newName = newName + titleStr + '</h2>';
		var newTitle = $(newName);
		$('#graph-name').html(newTitle);
	}
	else {
		throw new Error('Parameter not a string');
	}
	
	return newName;
}

//Returns an object containing RGB colour components from Hex
function HexToRGB(hexValue) {
	if(typeof hexValue == 'string' || hexValue instanceof String) {
		//Test for invalid hex
		if(hexValue[0] != '#') throw new Error('Missing # tag');
		var isValidHex  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hexValue);
		if(isValidHex != true) throw new Error('Invalid characters');
		
		//Generate object
		rgbObject = {
				red 	: hexToR(hexValue),
				green 	: hexToG(hexValue),
				blue 	: hexToB(hexValue)
		};
	}
	else {
		throw new Error('Parameter not a string');
	}
	
	return rgbObject;
}

//Sub functions. If HexToRGB passes tests these are considered fine
function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16);} // Red
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16);} // Green
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16);} // Blue
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h;}

//Convert Hex to RGBA string usable for JavaScript
function HexToRGBA(hexString, alpha) {
	fc = HexToRGB(hexString);
	fcString = 'rgba(' 	+ fc.red.toString()
						+ ',' + fc.green.toString()
						+ ',' + fc.blue.toString()
						+ ',' + alpha.toString() + ')';
	return fcString;
}