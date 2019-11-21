function [ jointAngle ] = problemainverso( transformationMatrix, indice, aLen, dLen, alfa, q6Actual)
	%Condiciones iniciales
	[ linkTwist, linkLength, linkOffset ] = condicionesIniciales();
	%Para que el robot quede en posición de la Figura 1 del TP2 con ABB
	if exist('dLen', 'var')
		linkOffset = dLen;
	end

	if ~exist('indice', 'var')
		indice = [ 1, 1, 1 ];
	end

	if ~exist('q6Actual', 'var')
		q6Actual = 0;
	end

	if exist('aLen', 'var')
		linkLength = aLen;
	end

	if exist('alfa', 'var')
		linkTwist = alfa;
	end

	[ n, o, a, p ] = noapVector( transformationMatrix );

	[ q1, q2, q3, q4, q5, q6 ] = despejeAngulos( linkOffset, n, o, a, p, indice, linkLength, linkTwist );

	jointAngle = [
		q1; %q1uno o q1dos
		q2; %q2uno o q2dos
		q3; %theta3
		q4; %theta4
		q5; %q5
		q6; %q6
	];

end
