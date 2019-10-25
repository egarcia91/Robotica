function [ q1, q2, q3, q4, q5, q6 ] = despejeAngulos( linkOffset, n, o, a, p, indice, linkLength )
	%%Calculo de q1 a q6

	q1 = anguloQ1( linkOffset, a, p, indice(1) );

	q5 = anguloQ5( q1, n, o, a, indice(3) );

	q6 = anguloQ6( q1, q5, o, n );

	q234 = anguloQ234( q1, q5, a );

	q2 = anguloQ2( q1, q5, q234, p, linkLength, linkOffset, indice(2) );

	q23 = anguloQ23( q1, q2, q5, q234, p, linkLength, linkOffset );

	q3 = anguloQ3( q2, q23 );

	q4 = anguloQ4( q23, q234 );

end
