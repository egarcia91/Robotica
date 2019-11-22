function [ angulo ] = anguloQ234( q1, q5, a )
	%%Calculo de q2 + q3 + q4
	%%Ojo singularidad si SENO(q5) es cero!

	if(abs(sin(q5)) < 1e-9)
		q5 = -0.1; %Hardcodeado con criterio Elbio+Eze
	end

	numerador = -a(3)/sin(q5);
	denominador = -(a(1)*cos(q1)+a(2)*sin(q1))/sin(q5);
	angulo = atan2(numerador,denominador);
	%%Ya tenemos q2 + q3 + q4!!!!!!

	angulo = intervaloAngulo( angulo );

end
