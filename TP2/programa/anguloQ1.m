function [ angulo ] = anguloQ1(linkOffset, a, p, indice)
	%%Calculo de q1

	rosinphi = linkOffset(6)*a(2)-p(2);
	rocosphi = p(1)-linkOffset(6)*a(1);
	phi = atan2(rosinphi, rocosphi);

	denq1 = sqrt((rosinphi)^2+(rocosphi)^2-(linkOffset(4))^2);
	%denq1 = 1;

	q1uno = atan2(linkOffset(4), denq1) - phi;

	q1dos = atan2(linkOffset(4), -denq1) - phi;

	q1Temp = [ q1uno, q1dos ];

	angulo = q1Temp(indice); %%Cual nos quedamos?TODO

	angulo = intervaloAngulo( angulo );
end
