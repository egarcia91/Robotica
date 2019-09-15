clear all
close all

format long g

Ntests = 16; %% va a ser este valor al cubo. OJOOO

tol = 1e5; % Tolerancia tres digitos

degrad = 'RAD';

limit = 0;

if(degrad == 'RAD')
	limit = pi;
elseif(degrad == 'DEG')
	limit = 180;
end

phi = theta = psi = linspace(0, limit, Ntests);  %%Si esta en RAD prueba con pi, sino en DEG pruebacon angulos

tests = 0;
passingtests = 0;

donkeyCorner = {};

for i = 1:(Ntests)
	for j = 1:(Ntests)
		for k = 1:(Ntests)
			tests++;

			angulosIniciales = [phi(i), theta(j), psi(k)];
			angulosFinales = EulerInverso(EulerDirecto(angulosIniciales, degrad), degrad);
			if(isequal(fix(angulosIniciales*tol)/tol, fix(angulosFinales*tol)/tol))
				passingtests++;
			else
				donkeyCorner(end+1) = [angulosIniciales; angulosFinales];
			end

		end
	end
end

printf('||||||||||||||||||||||||||||||||||||||||||||||||||||||||\n');
printf('||\t\t\tResultados!\t\t\t||\n');
printf('||\tCantidad total de testeos realizados:\t\t||\n');
printf('||\t\t\t\t\t %i\t\t||\n', tests);
printf('||\tCantidad total de testeos pasados:\t\t||\n');
printf('||\t\t\t\t\t %i\t\t||\n', passingtests);
printf('||\tPorcentaje de acierto:\t\t\t\t||\n');
printf('||\t\t\t\t\t %i%%\t\t||\n', round((passingtests/tests)*100));
printf('||||||||||||||||||||||||||||||||||||||||||||||||||||||||\n');
printf('\n\n');

showDC = input('Queres ver el Donkey Corner? [yes/no]','s');

if(showDC == 'y' || showDC == 'yes')
	disp(donkeyCorner);
end
