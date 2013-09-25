//Generate a Bar Chart
function BarChartInit() {
	var barChartData = {
			labels : _histLabelArray(),
			datasets : [
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					data : _histDataArray(),
				}
			]
	};
	
	$('#dnut-legend').html('');
	
	var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Bar(barChartData);
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
					data : _histDataArray(),
				}
			]	
	};
		
	$('#dnut-legend').html('');
	
	var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData);
}

//Generate a Doughnut Chart
function DoughnutChartInit() {
	var tempData = _histDataArray();
	var dnData = [];
	//var dnColours = GenClrs(tempData);
	
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
	
	$('#dnut-legend').html('');
	for(var i = 0; i < _histLabelArray().length; i++) {
		var e = $('<div>mad</div>');
		$('#dnut-legend').append(e);
	}
}

//If the query is not paused (so it is running), refresh the graph
function RefreshHistogram(graphType) {
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
	var hexString = "#";
	var red = (index * 5) % 99;
	var green = Math.round((index * 12) % 99);
	var blue = Math.round((index * 16) % 99);
	
	hexString += red.toString();
	hexString += green.toString();
	hexString += blue.toString();
	
	return hexString;
}