function [ angulo ] = anguloQ1(linkOffset, a, p, indice)
	%%Calculo de q1

	rosinphi = linkOffset(6)*a(2)-p(2);
	rocosphi = p(1)-linkOffset(6)*a(1);
	phi = atan2(rosinphi, rocosphi);

	denq1 = sqrt((rosinphi)^2+(rocosphi)^2-(linkOffset(4))^2);
	%denq1 = 1;

	angulo = atan2(linkOffset(4), -indice*denq1) - phi;

	angulo = intervaloAngulo( angulo );
end
