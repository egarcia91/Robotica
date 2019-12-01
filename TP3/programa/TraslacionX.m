function [ traslacion ] = TraslacionX( distancia )
%Matriz de traslacion en X

	traslacion = [
		1, 0, 0, distancia;
		0, 1, 0,         0;
		0, 0, 1,         0;
		0, 0, 0,         1;
	];

end
