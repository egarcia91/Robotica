function [ rotacion ] = RotacionX( angulo )
%Matriz de rotacion en X

	cosAng = 0;
	sinAng = 0;

	cosAng = cos(angulo);
	sinAng = sin(angulo);

	rotacion = [
		1,      0,       0, 0;
		0, cosAng, -sinAng, 0;
		0, sinAng,  cosAng, 0;
		0,      0,       0, 1;
	];

end
