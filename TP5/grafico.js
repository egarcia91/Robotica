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
			bezierCurve : false,
			elements : {
				line : {
					tension : 0
				},
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

	Grafico.prototype.pushData = function(lista, funcion){

		if(!lista){
			return;
		}

		this.configPlot.options.scales.yAxes[0].scaleLabel.labelString = funcion;

		this.configPlot.data.labels = [];
		this.configPlot.data.datasets = [];

		var fillLabels = true;

		for(var i = 0, key; key = Object.keys(lista)[i]; i++){
			this['datos'+key].data = [];
			for(var j = 0, ele; ele = lista[key][j]; j++){
				if(j == 0 && this.configPlot.data.labels.length != 0){
					fillLabels = false;
				}
				if(fillLabels){
					this.configPlot.data.labels.push(ele.tiempo);
				}
				this['datos'+key].data.push(ele[funcion]);
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


