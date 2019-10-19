function [ traslacion ] = TraslacionX( distancia )

	traslacion = [
		1, 0, 0, distancia;
		0, 1, 0,         0;
		0, 0, 1,         0;
		0, 0, 0,         1;
	];

end
