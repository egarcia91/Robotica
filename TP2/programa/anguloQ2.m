function [ angulo ] = anguloQ2(q1, q5, q234, p, a, d, indice )

	%%Calculo de q2
	angulo = 0;

	A = p(1)*cos(q1) + p(2)*sin(q1) - d(5)*sin(q234) + d(6)*sin(q5)*cos(q234);

	B = p(3) - d(1) + d(5)*cos(q234) + d(6)*sin(q5)*sin(q234);

	psi = atan2(A, B);

	sumaABCuadrado = A*A + B*B;

	nu = sqrt(sumaABCuadrado);

	numerador = (sumaABCuadrado + a(2)*a(2) - a(3)*a(3)) / (2*a(2)*nu);
	denominador = sqrt(1 - numerador*numerador);

	angulo = atan2(numerador, -indice*denominador) - psi;

	angulo = intervaloAngulo( angulo );
end
