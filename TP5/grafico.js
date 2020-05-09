(function(){
	function Grafico(div,config){
		HtmlWidget.call(this,div,config);

		this.basicDraw();
	}

	Grafico.prototype = Object.create(HtmlWidget.prototype);
	Grafico.prototype.constructor = "Grafico";

	Grafico.prototype.configCopy = {
		type : 'line',
		data : {
			labels : [],
			datasets : []
		},
		options : {
			legend : {
				display : false
			},
			responsive : false,
			scales : {
				xAxes : [{
					display : true,
					scaleLabel : {
						display : true,
						labelString : "tiempo [t]"
					}
				}],
				yAxes : [{
					display : true,
					scaleLabel : {
						display : true,
						labelString : "posicion"
					}
				}]
			}
		}
	};

	Grafico.prototype.clear = function(){
	};

	Grafico.prototype.show = function(){
//	var divPlot = document.getElementById("trayectoria");
//	width = divPlot.clientWidth;
//	heigth = divPlot.clientHeight;
//	divPlot.innerHTML = "<canvas name=\"tiempo\" width=\""+width+"\" height=\""+heigth+"\" id=\"tray\"></canvas>";
//	var plot = document.getElementById("tray").getContext("2d");
//
//	if(bool){
//		var myChart = new Chart(plot, configPlot);
//	}

	};

	Grafico.prototype.basicDraw = function(){
		var template = TrimPath.processDOMTemplate('grafico',{});
		this.d.innerHTML = template;
	};

	window.Grafico = Grafico;
})();


