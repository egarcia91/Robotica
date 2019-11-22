function [ angulo ] = anguloQ6( q1, q2, q3, q4, q5, n, o, a, linkLength, linkOffset, linkTwist  )
	%%Calculo de q6
	angulo = 0;

	if(abs(sin(q5)) < 1e-9)

		[ n2, o2, a2, p2 ] = noapVector( matrizTransformacion([ [q1, q2, q3, q4, 0, 0]', linkLength, linkOffset, linkTwist ], 5) );

		if(abs(norm(a-a2)) < 1e-9)
			if(sign(a'*cross(n, n2)) >= 0)
				signo = 1;
			else
				signo = -1;
			end
			angulo = -signo*acos(n'*n2);
		end

	else

		numerador = (o(1)*sin(q1)-o(2)*cos(q1))/sin(q5);
		denominador = (n(1)*sin(q1)-n(2)*cos(q1))/sin(q5);
		angulo = atan2(-numerador,denominador);

	end

	angulo = intervaloAngulo( angulo );
end
