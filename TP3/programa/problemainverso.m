function [ jointAngle ] = problemainverso( transformationMatrix, indice, aLen, dLen, alfa)
%Problema Inverso Universal Robot UR5

	[ n, o, a, p ] = noapVector( transformationMatrix );

	[ q1, q2, q3, q4, q5, q6 ] = despejeAngulos( dLen, n, o, a, p, indice, aLen, alfa );

	jointAngle = [
		q1;
		q2;
		q3;
		q4;
		q5;
		q6;
	];

end
