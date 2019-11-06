function [ transformationMatrix, indice ] = problemadirecto(theta, aLen, dLen, alfa )
	%Condiciones iniciales
	[ linkTwist, linkLength, linkOffset ] = condicionesIniciales();

	%Para que el robot quede en posición de la Figura 1 del TP2 con ABB
	jointAngle = [
		0; %theta1
		-pi/2; %theta2
		pi/2; %theta3
		pi; %theta4
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

	transformationMatrix = matrizTransformacion(tablaParametrosDH);

	[ g1, g2, g3 ] = despejeVectorConfiguration(jointAngle, linkOffset, linkLength);

	indice = [ g1, g2, g3 ];

end
