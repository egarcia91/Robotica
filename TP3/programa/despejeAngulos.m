function [ q1, q2, q3, q4, q5, q6 ] = despejeAngulos( linkOffset, n, o, a, p, indice, linkLength, linkTwist )
	%%Calculo de q1 a q6

	q1 = anguloQ1( linkOffset, a, p, indice(1) );

	q5 = anguloQ5( q1, n, o, a, indice(3) );

	q234 = anguloQ234( q1, q5, a );

	q3 = anguloQ3( q1, q5, q234, p, linkLength, linkOffset, indice(2) );

	q2 = anguloQ2( q1, q3, q5, q234, p, linkLength, linkOffset );

	q4 = anguloQ4( q2, q3, q234);

	q6 = anguloQ6( q1, q2, q3, q4, q5, n, o, a, linkLength, linkOffset, linkTwist );

end
