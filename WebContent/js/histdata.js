const SUCCESS = true;
const FAIL = false;

//Generate a Bar Chart
function BarChartInit() {
	var barChartData = {
			labels : _histLabelArray(),
			datasets : [
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					data : _histDataArray()
				}
			]
	};
	
	var barOptions = {animation : false };
	
	ClearLegend();
	
	var target = document.getElementById("canvas");
	if(target == null) return FAIL;
	var myBar = new Chart(target.getContext("2d")).Bar(barChartData, barOptions);
	if(myBar == null) return FAIL;
	return SUCCESS;
}

//Generate a Line Chart
function LineChartInit() {
	var lineChartData = {
			labels : _histLabelArray(),
			datasets : [
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					data : _histDataArray()
				}
			]	
	};
		
	ClearLegend();
	
	var lineOptions = { animation : false };
	
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
	var legend = '<table border="1"><tr><th>Colour</th><th>Label</th></tr>';
	for(var i = 0; i < _histLabelArray().length; i++) {
		hexString = GenClr(i);
		legend = legend + '<tr><td bgcolor="' + hexString + '"></td>';
		legend = legend + '<td>' + labelsArray[i] + '</td>';
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
			nameStr = nameStr + "Bar Graph" + '</h2>';
			var newName = $(nameStr);
			$('#graph-name').html(newName);
			ResizeCanvas(600, 800);
			BarChartInit(); 
			break;
			
		case lineGraph: 
			graphType = lineGraph;
			nameStr = nameStr + "Line Graph" + '</h2>';
			var newName = $(nameStr);
			$('#graph-name').html(newName);
			ResizeCanvas(600, 800);
			LineChartInit(); 
			break;
			
		case dnutGraph:
			graphType = dnutGraph;
			nameStr = nameStr + "Doughnut Graph" + '</h2>';
			var newName = $(nameStr);
			$('#graph-name').html(newName);
			ResizeCanvas(500, 700);
			DoughnutChartInit();
			break;
			
		default:
			throw new Error('Not a graph type');
			return FAIL;
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