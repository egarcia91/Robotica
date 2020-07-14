(function(){
	function Paginado(div,config){
		HtmlWidget.call(this,div,config);

		this.cantidadPaginas = this.c.cantidadPaginas;
		this.indexPaginados = this.c.indice || 0;
		this.modificador = 1;
		this.mostrar();
	}

	Paginado.prototype = Object.create(HtmlWidget.prototype);
	Paginado.prototype.constructor = "Paginado";

	Paginado.prototype.thisClick = function(event,t,that){
		var name = t.getAttribute('data-evt');
		switch(name){

			case "siguiente":
				this.drawSig();
				return true;
				break;

			case "primero":
				return true;
				break;

			case "ultimo":
				return true;
				break;

			case "modificar":
				console.log(t.value);
				this.modificador = parseInt(t.value,10);
				return true;
				break;

			case "anterior":
				this.drawAnt();
				return true;
				break;

			default:
				return true;
				break;
		}
		return true;
	};

	Paginado.prototype.drawAnt = function(){
		if(this.indexPaginados > 0){
			this.indexPaginados = this.indexPaginados-this.modificador;
			this.draw(this.indexPaginados);
		}
	};

	Paginado.prototype.drawSig = function(){
		if(this.indexPaginados < (this.cantidadPaginas-this.modificador)){
			this.indexPaginados = this.indexPaginados+this.modificador;
			this.draw(this.indexPaginados);
		}
	};

	Paginado.prototype.recargarInfo = function(value){
		this.cantidadPaginas = value || this.c.cantidadPaginas;
		this.indexPaginados = 0;
		this.mostrar();
	};

	Paginado.prototype.draw = function(indice){
		this.mostrar();
		var desde = this.indexPaginados;
		var hasta = this.indexPaginados + this.modificador;
		this.emit('quierenCambiarPagina', desde, hasta);
	};

	Paginado.prototype.mostrar = function(){
		var template = TrimPath.processDOMTemplate('paginado',{
			pag : this.indexPaginados,
			cantidadPaginas : new Array(this.cantidadPaginas)
		});

		this.d.innerHTML = template;
	};

	window.Paginado = Paginado;
})();


