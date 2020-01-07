RPM = 2*pi/60;

% **************************************************************
% Instrucciones de movimiento
% **************************************************************
% Matriz de puntos destinos. Los puntos destino se agregan como columnas a la matriz
pdest = [
	0, -0.6999, 1, 1;
	0.5576, 0.2553, 1, 1;
	0, -0.6999, 1, 1;
	0, -0.6999, 1, 1
]';
% Los tiempos deseados de cada movimiento se ingresan en un vector columna

TDeseado = [
	0, 1, 0.5, 1, 1
];
