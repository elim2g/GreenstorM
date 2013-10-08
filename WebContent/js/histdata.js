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
	
	$('#dnut-legend').html('');
	
	var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Bar(barChartData, barOptions);
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
		
	$('#dnut-legend').html('');
	
	var lineOptions = { animation : false };
	
	var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData, lineOptions);
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
	var myDoughnut = new Chart(document.getElementById("canvas").getContext("2d")).Doughnut(dnData, dnOptions);
	
	//Add legend to page
	$('#dnut-legend').html('');
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
}

//If the query is not paused (so it is running), refresh the graph
function RefreshHistogram(graphType) {
	_updateHistogram();
	if(!m_paused){
		switch(graphType) {
		case 0: BarChartInit(); break;
		case 1: LineChartInit(); break;
		case 2: DoughnutChartInit(); break;
		}
	}
}

//Generate random hex colour string
function GenClr(index) {
	var numSlice = Math.round((256*256*256) / _histLabelArray().length);
	var intColour = numSlice * index;
	var strColour = intColour.toString(16);
	var hexString = "#";
	var hexString = hexString + strColour;
	
	return hexString;
}