function [ matriz ] = limpiarMatriz( matriz )
%Convierte ceros negativos y los numeros chicos en cero

	for i = 1:3
		for j=1:3
			if(abs(matriz(i,j)) < 1e-9)
				matriz(i,j) = 0;
			end
		end
	end

end
