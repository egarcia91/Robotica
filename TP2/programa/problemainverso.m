function [ jointAngle ] = problemainverso( transformationMatrix, indice, aLen, dLen, alfa)
	%Condiciones iniciales
	[ linkTwist, linkLength, linkOffset ] = condicionesIniciales();
	%Para que el robot quede en posición de la Figura 1 del TP2 con ABB
	if exist('dLen', 'var')
		linkOffset = dLen;
	end

	if ~exist('indice', 'var')
		indice = [ 1, 1, 1 ];
	end

	if exist('aLen', 'var')
		linkLength = aLen;
	end

	if exist('alfa', 'var')
		linkTwist = alfa;
	end

	[ n, o, a, p ] = noapVector( transformationMatrix );

	q1 = anguloQ1( linkOffset, a, p, indice(1) );

	q5 = anguloQ5( q1, n, o, a, indice(3) );

	q6 = anguloQ6( q1, q5, o, n );
	%%Calculo de q2 + q3 + q4
	%%Ojo singularidad si SENO(q5) es cero!

	q234 = 0;
	if(abs(sin(q5)) < 1e-9)
		disp('que hacemo');
	else
		q234 = -atan2(-a(3)/sin(q5),-(a(1)*cos(q1)+a(2)*sin(q1))/sin(q5));
	end

	%%Ya tenemos q2 + q3 + q4!!!!!!

%%	%%Calculo de q2
%%	A = p(1)*cos(q1) + p(2)*sin(q1) - linkOffset(5)*sin(q234) + linkOffset(6)*sin(q5)*cos(q234);
%%	B = p(3) - linkOffset(1) + linkOffset(5)*cos(q234) + linkOffset(6)*sin(q5)*sin(q234); %%%%%%%%%%%%CAMBIE EL COSENO POR SENO
%%
%%	%(4*(linkLength(2)^2)-1)*(A^2+B^2) %%%%por las dudas puse un parentesis en ^2
%%	%-linkLength(2)^2%%%%por las dudas puse un parentesis en ^2
%%	%linkLength(3)^2 %%%%por las dudas puse un parentesis en ^2
%%	denq2 = sqrt( ((4*(linkLength(2)^2)-1)*(A^2+B^2)) - linkLength(2)^2 + linkLength(3)^2); %%%%por las dudas puse un parentesis en ^2
%%	%denq2 = 1; %%%%por las dudas puse un parentesis en ^2
%%	numq2 = (A^2 + B^2) + linkLength(2)^2 - linkLength(3)^2;    %%%%%%%%%%ya que hay un denominador, emprolijo el código con un numerador
%%	
%%	q2uno = atan2(numq2, denq2) - atan2(A,B);
%%	q2dos = atan2(numq2, -denq2) - atan2(A,B);
%%
%%	q2Temp = [q2uno, q2dos];
%%
%%	q2 = q2Temp(indice(2)); %%Cual nos quedamos?TODO
%%%	q2 = q2dos; %%Cual nos queda? TODO
%%	%%Ya tenemos dos opciones de q2!!!!!!
%%
%%	%%Calculo de q2 + q3
%%	numq23 = (p(3)-linkOffset(1)+linkOffset(5)*cos(q234)-linkLength(2)*sin(q2)+linkOffset(6)*sin(q5)*sin(q234))/linkLength(3);
%%	denq23 = (p(1)*cos(q1)+p(2)*sin(q1)-linkOffset(5)*sin(q234)-linkLength(2)*cos(q2)+linkOffset(6)*sin(q5)*cos(q234))/linkLength(3);
%%	q23 = atan2(numq23,denq23);
%%	%%Ya tenemos q2 + q3!!!!!!
%%
%%	q3 = q23 - q2;
%%
%%	q4 = q234 - q23;

	jointAngle = [
		q1; %q1uno o q1dos
		%q2; %q2uno o q2dos
		0; %q2uno o q2dos
		%q3; %theta3
		0; %theta3
		%q4; %theta4
		0; %theta4
		q5; %q5
		q6; %q6
	];

end
