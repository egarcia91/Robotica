function [ angulo ] = anguloQ5(q1, n, o, a, indice)
	%%Calculo de q5
	numerador = sqrt((n(1)*sin(q1)-n(2)*cos(q1))^2+(o(1)*sin(q1)-o(2)*cos(q1))^2);
	%numq5 = 1;
	denominador =  a(1)*sin(q1) - a(2)*cos(q1);

	angulo = atan2( indice*numerador, denominador);

	angulo = intervaloAngulo( angulo );
end
