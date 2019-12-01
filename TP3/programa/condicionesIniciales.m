function [ linkTwist, linkLength, linkOffset ] = condicionesIniciales( )
%Dimensiones Universal Robot modelo UR5
%LinkTwist es el parametro alfa
%LinkLength es el parametro a
%LinkOffset es el parametro d

	linkTwist = [
		pi/2;
		0;
		0;
		pi/2;
		-pi/2;
		0;
	];

	linkLength = [
		0;
		-425;
		-392;
		0;
		0;
		0;
	];

	linkOffset = [
		89;
		0;
		0;
		46.5;
		93;
		82;
	];

end
