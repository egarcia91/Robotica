(function(){
	function Main(div,config){
		HtmlWidget.call(this,div,config);

		this.basicDraw();

		var divParametros = this.getElementsByClassName('parametros')[0];
		this.parametro = new Parametro(divParametros,{});
		this.parametro.addEventListener('calcule',this.onCalc.bind(this));
		this.parametro.addEventListener('animate',this.onAnimation.bind(this));

		this.diagramaRobot = new DiagramaRobot(undefined,{});

		this.graficos = [];

		this.getElementsByClassName('graficos', (function(e){
			var grafico = new Grafico(e,{});
			this.graficos.push(grafico);
		}).bind(this));

		this.res = {};
	}

	Main.prototype = Object.create(HtmlWidget.prototype);
	Main.prototype.constructor = "Main";
	Main.prototype.vistas = [
		['trayectorias','posicion','x'],
		['trayectorias','velocidad','x'],
		['trayectorias','aceleracion','x'],
		['motores','angulo','t1'],
		['distanciaTrayectorias',null,'x'],
		['fuerzas',null,'u1'],
		['trayectorias','posicion','y'],
		['trayectorias','velocidad','y'],
		['trayectorias','aceleracion','y'],
		['motores','angulo','t2'],
		['distanciaTrayectorias',null,'y'],
		['fuerzas',null,'u2']
	];

	Main.prototype.basicDraw = function(){
		var template = TrimPath.processDOMTemplate('mainPage',{});
		this.d.innerHTML = template;
	};

	Main.prototype.onAnimation = function(){

		console.log(this.res);
//		new Animacion({
//			theta1 : res["motor1"],
//			theta2 : res["motor2"]
//		});
	};

	Main.prototype.onCalc = function(data){

		this.diagramaRobot.ejecutar(data);

		this.res = this.diagramaRobot.getTrayectoria();
		this.mostrarDatos();
		this.parametro.enableAnimation();

	};

	Main.prototype.mostrarDatos = function(){
		var res = this.res || {};

		for(var i = 0, vista; vista = this.vistas[i]; i++){
			this.graficos[i].subirData(res,vista[0],vista[1],vista[2]);
			this.graficos[i].show(true);
		}

	};

	window.Main = Main;
})();


