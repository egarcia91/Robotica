function [m]=MatrizProlija(m)
  %%Pone en 0 los valores de la matriz que sean muy chicos
  [x,y]=size(m);
	for i = 1:x
		for j=1:y
			if(abs(m(i,j)) < 1e-9)
				m(i,j) = 0;
			end
		end
	end

end