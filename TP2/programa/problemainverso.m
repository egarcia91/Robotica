function [ jointAngle ] = problemainverso( transformationMatrix, indice, aLen, dLen, alfa, q6Actual)
%Problema Inverso Universal Robot UR5

	[ linkTwist, linkLength, linkOffset ] = condicionesIniciales();

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
		q1;
		q2;
		q3;
		q4;
		q5;
		q6;
	];

end
