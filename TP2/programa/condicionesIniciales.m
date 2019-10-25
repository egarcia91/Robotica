function [ linkTwist, linkLength, linkOffset ] = condicionesIniciales( )

	linkTwist = [
		pi/2; %alfa1
		0;
		0;
		pi/2; %alfa4
		-pi/2; %alfa5
		0;
	];

	%Dimensiones UR5
	linkLength = [
		0;
		-425; %a2
		-392; %a3
		0;
		0;
		0;
	];

	linkOffset = [
		89; %d1
		0;
		0;
		46.5; %d4
		93; %d5
		82; %d6
	];


end
