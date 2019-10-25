function [ angulo ] = anguloQ3( q2, q23 )
	%%Calculo de q3

	angulo = q23 - q2;

	angulo = intervaloAngulo( angulo );

end
