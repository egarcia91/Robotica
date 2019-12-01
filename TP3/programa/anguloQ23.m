function [ angulo ] = anguloQ23( q1, q2, q5, q234, p, a, d )
	%%Calculo de q2 + q3
	angulo = 0;

	numerador = (p(3)-d(1)+d(5)*cos(q234)-a(2)*sin(q2)+d(6)*sin(q5)*sin(q234))/a(3);
	denominador = (p(1)*cos(q1)+p(2)*sin(q1)-d(5)*sin(q234)-a(2)*cos(q2)+d(6)*sin(q5)*cos(q234))/a(3);

	angulo = atan2( numerador, denominador );

	angulo = intervaloAngulo( angulo );
end
