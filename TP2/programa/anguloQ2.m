function [ angulo ] = anguloQ2( q1, q3, q5, q234, p, a, d)
	%%Calculo de q2
	angulo = 0;

	A = p(1)*cos(q1) + p(2)*sin(q1) - d(5)*sin(q234) + d(6)*sin(q5)*cos(q234);
	B = p(3) - d(1) + d(5)*cos(q234) + d(6)*sin(q5)*sin(q234);

	divisor = a(2)*a(2) + a(3)*a(3) + 2*a(2)*a(3)*cos(q3);
	numerador = (B*a(2) + B*a(3)*cos(q3) - A*a(3)*sin(q3))/(divisor);
	denominador = (A*a(2) + A*a(3)*cos(q3) + B*a(3)*sin(q3))/(divisor);
	angulo = atan2(numerador, denominador);

	angulo = intervaloAngulo( angulo );
end
