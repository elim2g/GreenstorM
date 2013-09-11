//Create the initial barchart
function BarChartInit() {
	var barChartData = {
			labels : _histLabelArray(),
			datasets : [
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					data : _histDataArray(),
					animation : false
				}
			]
			
		}
	var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Bar(barChartData);
}

//Create the initial line chart
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
					animation : false
				}
			]
			
		}
		
	var myLine = new Chart(document.getElementById("canvas2").getContext("2d")).Line(lineChartData);
}

//If the query is not paused (so it is running), refresh the graph
function RefreshHistogram() {
	if(!m_paused){
		BarChartInit();
		LineChartInit();
	}
}


