function [ rotacion ] = RotacionZ( angulo )
	cosAng = 0;
	sinAng = 0;

	cosAng = cos(angulo);
	sinAng = sin(angulo);

	rotacion = [
		cosAng, -sinAng, 0, 0;
		sinAng,  cosAng, 0, 0;
		     0,       0, 1, 0;
		     0,       0, 0, 1;
	];

end
