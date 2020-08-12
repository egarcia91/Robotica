(function(){
	function Grafico(div,config){
		HtmlWidget.call(this,div,config);

		this.basicDraw();
	}

	Grafico.prototype = Object.create(HtmlWidget.prototype);
	Grafico.prototype.constructor = "Grafico";

	Grafico.prototype.configPlot = {
		type : 'scatter',
		data : {
			labels : [],
			datasets : []
		},
		options : {
			bezierCurve : false,
			elements : {
				line : {
					tension : 0
				},
				point : {
					radius : 0
				}
			},
//			legend : {
//				display : false
//			},
			responsive : false,
			scales : {
				xAxes : [{
//					ticks: {
//						stepSize : 0.2
//					},
					display : true,
					scaleLabel : {
						display : true,
						labelString : "tiempo [t]"
					}
				}],
				yAxes : [{
//					ticks: {
//						stepSize : 0.2
//					},
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
		label : "Ideal",
		backgroundColor : "green",
		borderColor : "green",
		data : [],
		fill : false
	};

	Grafico.prototype.datosReal = {
		label : "Real",
		backgroundColor : "red",
		borderColor : "red",
		data : [],
		fill : false
	};

	Grafico.prototype.clear = function(){
	};

	Grafico.prototype.pushData = function(lista, funcion, listaSecundaria){
		var funcionTiempo = true;

		if(!lista){
			return;
		}

		this.configPlot.options.scales.yAxes[0].scaleLabel.labelString = funcion;

		if(listaSecundaria){
			funcionTiempo = false;
			this.configPlot.options.scales.xAxes[0].scaleLabel.labelString = "X";
			this.configPlot.options.scales.yAxes[0].scaleLabel.labelString = "Y";
		}


		this.configPlot.data.labels = [];
		this.configPlot.data.datasets = [];

		var fillLabels = true;

		for(var i = 0, key; key = Object.keys(lista)[i]; i++){
			this['datos'+key].data = [];
			for(var j = 0, ele; ele = lista[key][j]; j++){
				var ejeX = 0;
				var ejeY = 0;
				if(j == 0 && this.configPlot.data.labels.length != 0){
					fillLabels = false;
				}
				if(fillLabels){
					if(funcionTiempo){
						ejeY = ele[funcion]
						ejeX = ele.tiempo;
					} else {
						ejeY = listaSecundaria[key][j][funcion];
						ejeX = ele[funcion]
					}
				}
				this['datos'+key].data.push({
					y : ejeY,
					x : ejeX
				});
			}
			this.configPlot.data.datasets.push(this['datos'+key]);
		}

	};

	Grafico.prototype.show = function(bool){

		var divPlot = this.getElementsByClassName("trayectoria")[0];
		var width = divPlot.clientWidth;
		var heigth = divPlot.clientHeight;

		divPlot.innerHTML = "<canvas name=\"tiempo\" width=\""+width+"\" height=\""+heigth+"\" class=\"tray\"></canvas>";

		var plot = this.getElementsByClassName("tray")[0].getContext("2d");
		if(bool){
			var myChart = new Chart(plot, JSON.parse(JSON.stringify(this.configPlot)));
		}

	};

	Grafico.prototype.basicDraw = function(){
		var template = TrimPath.processDOMTemplate('grafico',{});
		this.d.innerHTML = template;
	};

	window.Grafico = Grafico;
})();


