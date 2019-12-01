function [ matriz, transformationSteps ] = matrizTransformacion(tablaParametrosDH, hasta)
%Devuelve la matriz homogenea final y las intermdias (que se usaran para graficar)

	if ~exist('hasta', 'var')
		hasta = 6;
	end

	matriz = eye(4);

	transformationSteps = { matriz };

	for i = 1:hasta

		iJoint = tablaParametrosDH(i, 1:end);
		itranformation = RotacionZ(iJoint(1))*TraslacionZ(iJoint(3))*TraslacionX(iJoint(2))*RotacionX(iJoint(4));
% 		transformationSteps(end + 1) = itranformation;
		matriz = matriz*itranformation;
	end
  matriz=MatrizProlija(matriz);
end
