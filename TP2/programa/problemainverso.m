function [ jointAngle ] = problemainverso( transformationMatrix, aLen, dLen, alfa)
	%Condiciones iniciales
	linkTwist = [
		pi/2; %alfa1
		0;
		0;
		pi/2; %alfa4
		-pi/2; %alfa5
		0;
	];

	%Dimensiones UR5
	linkLength = [
		0;
		425; %a2
		392; %a3
		0;
		0;
		0;
	];

	linkOffset = [
		89; %d1
		0;
		0;
		46.5; %d4
		93; %d5
		82; %d6
	];

	%Para que el robot quede en posición de la Figura 1 del TP2 con ABB
	if exist('dLen', 'var')
		linkOffset = dLen;
	end

	if exist('aLen', 'var')
		linkLength = aLen;
	end

	if exist('alfa', 'var')
		linkTwist = alfa;
	end

	n = orientacionTCP(transformationMatrix(1:3,1));
	o = orientacionTCP(transformationMatrix(1:3,2));
	a = orientacionTCP(transformationMatrix(1:3,3));
	p = orientacionTCP(transformationMatrix(1:3,4));

	%%Calculo de q1

	rosinphi = linkOffset(6)*a(2)-p(2);
	rocosphi = p(1)-linkOffset(6)*a(1);
	phi = atan2(rosinphi, rocosphi);

	denq1 = sqrt((rosinphi)^2+(rocosphi)^2-(linkOffset(4))^2);

	q1uno = atan2(linkOffset(4), denq1); %%%%%%%%%%%%%%%%%%%%%CREO QUE NO SE RESTA EL PHI

	q1dos = atan2(linkOffset(4), -denq1); %%%%%%%%%%%%%%%%%%%%%CREO QUE NO SE RESTA EL PHI

	q1 = q1uno; %%Cual nos quedamos?TODO
	%%Ya tenemos dos opciones de q1!!!!!!

	%%Calculo de q5
	numq5 = sqrt((n(1)*sin(q1)-n(2)*cos(q1))^2+(o(1)*sin(q1)-o(2)*cos(q1))^2);

	q5uno = atan2(numq5,a(1)*sin(q1)-a(2)*cos(q1));
	q5dos = atan2(-numq5,a(1)*sin(q1)-a(2)*cos(q1));

	q5 = q5dos; %%Cual nos quedamos?TODO
	%%Ya tenemos dos opciones de q5!!!!!!

	%%Calculo de q6
	%%Ojo singularidad si SENO(q5) es cero!
	q6 = atan2(-(o(1)*sin(q1)-o(2)*cos(q1))/sin(q5),(n(1)*sin(q1)-n(2)*cos(q1))/sin(q5));
	%%Ya tenemos q6!!!!!!

	%%Calculo de q2 + q3 + q4
	%%Ojo singularidad si SENO(q5) es cero!

	q234 = atan2(-a(3)/sin(q5),-(a(1)*cos(q1)+a(2)*sin(q1))/sin(q5));

	%%Ya tenemos q2 + q3 + q4!!!!!!

	%%Calculo de q2
	A = p(1)*cos(q1) + p(2)*sin(q1) - linkOffset(5)*sin(q234) + linkOffset(6)*sin(q5)*cos(q234);
	B = p(3) - linkOffset(1) + linkOffset(5)*cos(q234) + linkOffset(6)*sin(q5)*sin(q234); %%%%%%%%%%%%CAMBIE EL COSENO POR SENO

	denq2 = sqrt((4*(linkLength(2)^2)-1)*(A^2+B^2)-linkLength(2)^2+linkLength(3)^2); %%%%por las dudas puse un parentesis en ^2
	numq2=A^2+B^2+linkLength(2)^2-linkLength(3)^2;    %%%%%%%%%%ya que hay un denominador, emprolijo el código con un numerador
	
	q2uno = atan2(numq2, denq2) - atan2(A,B);
	q2dos = atan2(numq2, -denq2) - atan2(A,B);

	q2 = q2uno; %%Cual nos queda? TODO
	%%Ya tenemos dos opciones de q2!!!!!!

	%%Calculo de q2 + q3
	numq23 = (p(3)-linkOffset(1)+linkOffset(5)*cos(q234)-linkLength(2)*sin(q2)+linkOffset(6)*sin(q5)*sin(q234))/linkLength(3);
	denq23 = (p(1)*cos(q1)+p(2)*sin(q1)-linkOffset(5)*sin(q234)-linkLength(2)*cos(q2)+linkOffset(6)*sin(q5)*cos(q234))/linkLength(3);
	q23 = atan2(numq23,denq23);
	%%Ya tenemos q2 + q3!!!!!!

	q3 = q23 - q2;

	q4 = q234 - q23;

	jointAngle = [
		q1; %q1uno o q1dos
		q2; %q2uno o q2dos
		q3; %theta3
		q4; %theta4
		q5; %q5
		q6; %q6
	];

end
