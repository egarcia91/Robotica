(function(){
	function Grafico(div,config){
		HtmlWidget.call(this,div,config);

		this.basicDraw();
	}

	Grafico.prototype = Object.create(HtmlWidget.prototype);
	Grafico.prototype.constructor = "Grafico";

	Grafico.prototype.configPlot = {
		type : 'line',
		data : {
			labels : [],
			datasets : []
		},
		options : {
			elements : {
				point : {
					radius : 0
				}
			},
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

	Grafico.prototype.datosIdeal = {
		backgroundColor : "green",
		borderColor : "green",
		data : [],
		fill : false
	};

	Grafico.prototype.datosReal = {
		backgroundColor : "red",
		borderColor : "red",
		data : [],
		fill : false
	};

	Grafico.prototype.clear = function(){
	};

	Grafico.prototype.pushData = function(lista){
		this.configPlot.data.labels = [];
		this.datosIdeal.data = [];
		this.datosReal.data = [];
		this.configPlot.data.datasets = [];

		for(var i = 0, ele; ele = lista[i]; i++){
			this.configPlot.data.labels.push(ele[0]);
			this.datosIdeal.data.push(ele[1]);
			this.datosReal.data.push(ele[2]);
		}
		this.configPlot.data.datasets.push(this.datosIdeal);
		this.configPlot.data.datasets.push(this.datosReal);
	};

	Grafico.prototype.show = function(bool){

		console.log(bool);
		var divPlot = this.getElementsByClassName("trayectoria")[0];
		var width = divPlot.clientWidth;
		var heigth = divPlot.clientHeight;

		divPlot.innerHTML = "<canvas name=\"tiempo\" width=\""+width+"\" height=\""+heigth+"\" class=\"tray\"></canvas>";

		var plot = this.getElementsByClassName("tray")[0].getContext("2d");
		if(bool){
			var myChart = new Chart(plot, this.configPlot);
		}

	};

	Grafico.prototype.basicDraw = function(){
		var template = TrimPath.processDOMTemplate('grafico',{});
		this.d.innerHTML = template;
	};

	window.Grafico = Grafico;
})();


