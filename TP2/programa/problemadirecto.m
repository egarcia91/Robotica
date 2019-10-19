function [ transformationMatrix ] = problemadirecto(theta, aLen, dLen, alfa )
	%Condiciones iniciales
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
		425; %a2
		392; %a3
		0;
		0;
		0;
	];

	linkOffset = [
		89; %d1
		0;
		0;
		93/2; %d4
		93; %d5
		82; %d6
	];

	%Para que el robot quede en posición de la Figura 1 del TP2 con ABB
	jointAngle = [
		0; %theta1
		-pi/2; %theta2
		pi/2; %theta3
		pi/2; %theta4
		-pi/2; %theta5
		0; %theta6
	];

	if exist('theta', 'var')
		jointAngle = theta;
	end

	if exist('dLen', 'var')
		linkOffset = dLen;
	end

	if exist('aLen', 'var')
		linkLength = aLen;
	end

	if exist('alfa', 'var')
		linkTwist = alfa;
	end

	tablaParametrosDH = [ jointAngle, linkLength, linkOffset, linkTwist ];

%	tablaParametrosDH = [
%		theta_1, 0, d1, alfa1;
%		theta_2, a2, 0, alfa2;
%		theta_3, a3, 0, alfa3;
%		theta_4, 0, d4, alfa4;
%		theta_5, 0, d5, alfa5;
%		theta_6, 0, d6, alfa6;
%	];

	transformationMatrix = eye(4);

	for i = 1:6

		iJoint = tablaParametrosDH(i, 1:end);

		transformationMatrix *= RotacionZ(iJoint(1))*TraslacionZ(iJoint(2))*TraslacionX(iJoint(3))*RotacionX(iJoint(4));

	end

end
