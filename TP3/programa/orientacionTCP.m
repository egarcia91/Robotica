function [ vector ] = orientacionTCP( columna )

	tol = 1e-8;

	vector = [
		0; %x
		0; %y
		0; %z
	];

	for i = 1:3
		value = columna(i);
		if( abs(value) > tol)
			vector(i) = value;
		end
	end

end
