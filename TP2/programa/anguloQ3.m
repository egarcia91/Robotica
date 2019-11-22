function [ angulo ] = anguloQ3( q1, q5, q234, p, a, d, indice )
	%%Calculo de q3
	angulo = 0;

	A = p(1)*cos(q1) + p(2)*sin(q1) - d(5)*sin(q234) + d(6)*sin(q5)*cos(q234);
	B = p(3) - d(1) + d(5)*cos(q234) + d(6)*sin(q5)*sin(q234);

	denominador = (A*A + B*B - a(2)*a(2) - a(3)*a(3))/(2*a(2)*a(3));
	numerador = sqrt(1 - denominador*denominador);
	angulo = atan2(indice*(numerador), denominador);

	angulo = intervaloAngulo( angulo );
end
