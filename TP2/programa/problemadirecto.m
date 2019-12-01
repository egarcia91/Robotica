function [ transformationMatrix, indice ] = problemadirecto(theta, a, d, alfa, graficar )
%Problema directo! Universal Robot UR5
	tablaParametrosDH = [ theta, a, d , alfa ];

	[transformationMatrix,transformationSteps] = matrizTransformacion(tablaParametrosDH);
  
  if (graficar==1)
    figure()
    graficarTernasRobot(transformationSteps);
  end
  
	[ g1, g2, g3 ] = despejeVectorConfiguration(theta, d, a);

	indice = [ g1, g2, g3 ];

end
