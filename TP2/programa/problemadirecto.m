function [ transformationMatrix ] = problemadirecto( )

	%Condiciones iniciales
	alfa1 = pi/2;
	alfa2 = 0;
	alfa3 = 0;
	alfa4 = pi/2;
	alfa5 = -pi/2;
	alfa6 = 0;

	%Dimensiones UR5
	a2 = 425;
	a3 = 392;
	d1 = 89;
	d4 = 93/2;
	d5 = 93;
	d6 = 82;

	%Para que el robot quede en posición de la Figura 1 del TP2 con ABB
	theta_1 = 0;
	theta_2 = -pi/2;
	theta_3 = pi/2;
	theta_4 = pi/2;
	theta_5 = -pi/2;
	theta_6 = 0;

	tablaParametrosDH = [
		theta_1, 0, d1, alfa1;
		theta_2, a2, 0, alfa2;
		theta_3, a3, 0, alfa3;
		theta_4, 0, d4, alfa4;
		theta_5, 0, d5, alfa5;
		theta_6, 0, d6, alfa6;
	];

	transformationMatrix = eye(4);

	for i = 1:6

		iJoint = tablaParametrosDH(i, 1:end);

		transformationMatrix *= RotacionZ(iJoint(1))*TraslacionZ(iJoint(2))*TraslacionX(iJoint(3))*RotacionX(iJoint(4));

	end

end
