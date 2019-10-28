function [ angulo ] = anguloQ6( q1, q5, o, n )
	%%Calculo de q6
	%%Ojo singularidad si SENO(q5) es cero!

	angulo = 0;
	if(abs(sin(q5)) < 1e-9)
		disp('que hacemo');
	else
		%El menos esta mal en el paper del orttooooo
		y = (o(1)*sin(q1)-o(2)*cos(q1))/sin(q5);

		angulo = atan2(y,(n(1)*sin(q1)-n(2)*cos(q1))/sin(q5));
	end
	%%Ya tenemos q6!!!!!!
	angulo = intervaloAngulo( angulo );

end
