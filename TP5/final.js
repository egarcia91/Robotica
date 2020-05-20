var configPlot = {
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

var datosIdeal = {
	backgroundColor : "green",
	borderColor : "green",
	data : [],
	fill : false
};

var datosReal = {
	backgroundColor : "blue",
	borderColor : "blue",
	data : [],
	fill : false
};

(function(){
	window.addEventListener('load', function(){
		new Main(document.getElementById('main'),{});
	});
})();

function loadData(){

	document.getElementById('calc').addEventListener('click',function(){
		calculate();
	});

};

function calculate(){

	datosIdeal.data = [];
	datosReal.data = [];
	configPlot.data.labels = [];

	getData();

//	configPlot.data.labels.push(0);
//	configPlot.data.labels.push(tiempo);
//	datosIdeal.data.push(xinicial);
//	datosIdeal.data.push(xfinal);
//	configPlot.data.datasets.push(datosIdeal);
//	graficar(true);

};

function getData() {
	var datos = document.getElementsByClassName('datos');
	for(var i = 0; dato = datos[i]; i++){
		console.log(dato.getAttribute('data-name'));
	}
//	xfinal = parseFloat(document.getElementById('Xfin').value,10);
//	xinicial = parseFloat(document.getElementById('Xini').value,10);
//	tiempo = parseFloat(document.getElementById('tiempo').value,10);
};

function graficar(bool) {

	var divPlot = document.getElementById("trayectoria");
	width = divPlot.clientWidth;
	heigth = divPlot.clientHeight;
	divPlot.innerHTML = "<canvas name=\"tiempo\" width=\""+width+"\" height=\""+heigth+"\" id=\"tray\"></canvas>";
	var plot = document.getElementById("tray").getContext("2d");

	if(bool){
		var myChart = new Chart(plot, configPlot);
	}

};

function linspace(a,b,n) {
	if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
	if(n<2) { return n===1?[a]:[]; }
	var i,ret = Array(n);
	n--;
	for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
	return ret;
};
