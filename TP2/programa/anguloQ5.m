function [ angulo ] = anguloQ5(q1, n, o, a, indice)
	%%Calculo de q5
	numerador = sqrt((n(1)*sin(q1)-n(2)*cos(q1))^2+(o(1)*sin(q1)-o(2)*cos(q1))^2);
	%numq5 = 1;
	denominador =  a(1)*sin(q1) - a(2)*cos(q1);

	q5uno = atan2( numerador, denominador);
	q5dos = atan2( -numerador, denominador);

	q5Temp = [q5uno, q5dos];

	angulo = q5Temp(indice); %%Cual nos quedamos?TODOend

	angulo = intervaloAngulo( angulo );
end
