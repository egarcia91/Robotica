function [ mat, indice ] = ParseParams( params )

	mat = zeros(3,3);
	indice = 1;


	dim = size(params);

	if(dim(1) == 3 && dim(2) == 3)
		mat = params;
	elseif(dim(1) == 2 && dim(2) == 1)
		tmp = cell2mat(params(1));
		dimM = size(tmp);
		if(dimM(1) == 3 && dimM(2) == 3)
			mat = tmp;
		else
			disp('pasa bien los parametros');
		end

		tmp = cell2mat(params(2));
		dimM = size(tmp);
		if(dimM(1) == 1 && dimM(2) == 1)
			indice = tmp;
		else
			disp('pasa bien los parametros');
		end
	else
		disp('pasa bien los parametros');
	end
end
