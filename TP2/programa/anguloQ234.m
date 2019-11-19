function [ angulo ] = anguloQ234( q1, q5, a )
	%%Calculo de q2 + q3 + q4
	%%Ojo singularidad si SENO(q5) es cero!

	angulo = 0;
	if(abs(sin(q5)) < 1e-9)
		disp('que hacemo');
	else
		numerador = -a(3)/sin(q5);
   		denominador = -(a(1)*cos(q1)+a(2)*sin(q1))/sin(q5);
		angulo = atan2(numerador,denominador); %%EZE: porque un signo menos?
	end
	%%Ya tenemos q2 + q3 + q4!!!!!!end

	angulo = intervaloAngulo( angulo );

end
