function [ angulo ] = anguloQ6( q1, q2, q3, q4, q5, n, o, a, linkLength, linkOffset, linkTwist  )
	%%Calculo de q6

	angulo = 0;
	if(abs(sin(q5)) < 1e-9)

		tablaParametrosDH = [ [q1, q2, q3, q4, q5, 0]', linkLength, linkOffset, linkTwist ];
		transformationMatrix = matrizTransformacion(tablaParametrosDH, 5);

		[ n2, o2, a2, p2 ] = noapVector( transformationMatrix );

		if(abs(norm(a-a2)) < 1e-9)
			angulo = acos(n'*n2);
		end

		%acos(o'*o2)
	else
		%El menos esta mal en el paper del orttooooo
		numerador = (o(1)*sin(q1)-o(2)*cos(q1))/sin(q5);
		denominador = (n(1)*sin(q1)-n(2)*cos(q1))/sin(q5);

		angulo = atan2(-numerador,denominador); %%%%VOLVI A PONER EL SIGNO MENOS para ver si afectaba
	end
	%%Ya tenemos q6!!!!!!
	angulo = intervaloAngulo( angulo );

end
