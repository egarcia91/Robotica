function [ matriz ] = matrizTransformacion(tablaParametrosDH, hasta)

	if ~exist('hasta', 'var')
		hasta = 6;
	end

	matriz = eye(4);

	transformationSteps = { matriz };

%	figure();
%	lastPos = transformationMatrix(1:end-1,end)';
%	graphicTerna(transformationMatrix,lastPos);


	for i = 1:hasta

%		lastPos = transformationMatrix(1:end-1,end)';
		iJoint = tablaParametrosDH(i, 1:end);

		itranformation = RotacionZ(iJoint(1))*TraslacionZ(iJoint(3))*TraslacionX(iJoint(2))*RotacionX(iJoint(4));

		transformationSteps(end + 1) = itranformation;

		matriz = matriz*itranformation;

%		graphicTerna(transformationMatrix,lastPos);

	end


end
