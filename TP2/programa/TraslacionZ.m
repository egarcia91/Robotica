function [ traslacion ] = TraslacionZ( distancia )

	traslacion = [
		1, 0, 0, 0;
		0, 1, 0, 0;
		0, 0, 1, distancia;
		0, 0, 0, 1;
	];

end
