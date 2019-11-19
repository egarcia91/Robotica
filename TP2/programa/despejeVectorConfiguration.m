function [ g1, g2, g3 ] = despejeVectorConfiguration(theta, linkOffset, linkLength)
	%%Calculo de q1 ----o,d,a

%	if( sign(linkOffset(4) * sin(theta(2) + theta(3)) + linkLength(2) * cos(theta(2)) + linkLength(1)) >= 0 )
if(sign(linkLength(3)*(cos(theta(2) + theta(3))-sin(theta(2) + theta(3)))+linkLength(2)*cos(theta(2)))>= 0 )
		g1 = 1;
	else
		g1 = -1;
	end

	if ( sign(sin(theta(3))) >= 0 )
		g2 = 1;
	else
		g2 = -1;
	end

	if( sign(theta(5)) >= 0)
		g3 = 1;
	else
		g3 = -1;
	end

end
