clear all
close all

format long g

Ntests = 2;


phi = theta = psi = linspace(0, pi, Ntests);

tests = 0;
passingtests = 0;

donkeyCorner = {};

for i = 1:(Ntests)
	for j = 1:(Ntests)
		for k = 1:(Ntests)
			tests++;

			angulosIniciales = [phi(i), theta(j), psi(k)];
			angulosFinales = EulerInverso(EulerDirecto(angulosIniciales));
			if(isequal(angulosIniciales, angulosFinales))
				passingtests++;
			else
				donkeyCorner(end+1) = [angulosIniciales; angulosFinales];
			end

		end
	end
end

tests
passingtests
donkeyCorner
%
%disp('Va la comparacion del Angulo Inicial y el Final');
%disp(isequal(angulosIniciales,angulosFinales));
%
%matrizInicial = [
%	1, 0, 0;
%	0, 0, 1;
%	0, -1, 0
%];
%
%matrizFinal = EulerDirecto(EulerInverso(matrizInicial));
%%disp(matrizFinal);
%
%disp('Va la comparacion de la matriz Inicial y el Final');
%disp(isequal(matrizInicial, matrizFinal));


