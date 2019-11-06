clear all
close all

format long g

Ntests = 10; %% va a ser este valor a la sexta. OJOOO

tol = 1e2; % Tolerancia tres digitos

passingTol = 1e-2; % Tolerancia al cero

degrad = 'RAD';

limit = pi;

theta = linspace(-limit, limit, Ntests+1);  %%Si esta en RAD prueba con pi, sino en DEG pruebacon angulos

tests = 0;
passingtests = 0;

donkeyCorner = {};

a = [
	0;
	-0.5;
	-0.4;
	0;
	0;
	0;
];

d = [
	0.1;
	0;
	0;
	0.1;
	0.1;
	0.08;
];

alfa = [
	pi/2;
	0;
	0;
	pi/2;
	-pi/2;
	0;
];

for i = 1:(Ntests)
	for j = 1:(Ntests)
		for k = 1:(Ntests)
			for m = 1:(Ntests)
				for n = 1:(Ntests)
					for p = 1:(Ntests)
						tests++;

						angulosIniciales = [theta(i); theta(j); theta(k); theta(m); theta(n); theta(p)];
						[ matrizInicial, indice ] = problemadirecto(angulosIniciales, a, d, alfa);

						matrizInicial = limpiarMatriz(matrizInicial);

						angulosFinales = problemainverso( matrizInicial, indice, a, d, alfa );
						matrizFinal = problemadirecto(angulosFinales, a, d, alfa);
						if(abs(norm(matrizFinal - matrizInicial)) < passingTol)
%						if(isequal(fix(angulosIniciales*tol)/tol, fix(angulosFinales*tol)/tol))
							passingtests++;
						end
%%			else
%%				if(abs(angulosIniciales(2)) < passingTol )
%%					sumaIniciales = abs(angulosIniciales(1)+angulosIniciales(3));
%%					sumaFinales = abs(angulosFinales(1)+angulosFinales(3));
%%					if(abs(sumaIniciales - sumaFinales) < passingTol )
%%						passingtests++;
%%					else
%%						if(sumaIniciales/limit > 1)
%%							if(abs((2 - sumaIniciales/limit) - (sumaFinales/limit)) < passingTol )
%%								passingtests++;
%%							else
%%								donkeyCorner(end+1) = [angulosIniciales; angulosFinales];
%%							end
%%						end
%%					end
%%				elseif(isequal(fix(angulosIniciales(2)/limit*tol)/tol,-1) && isequal(fix(angulosFinales(2)/limit*tol)/tol,1))
%%					sumaIniciales = abs(angulosIniciales(1)-angulosIniciales(3));
%%					sumaFinales = abs(angulosFinales(1)+angulosFinales(3));
%%					if(abs(sumaIniciales - sumaFinales) < passingTol )
%%						passingtests++;
%%					else
%%						if(sumaIniciales/limit > 1)
%%							if(abs((2 - sumaIniciales/limit) - (sumaFinales/limit)) < passingTol )
%%								passingtests++;
%%							else
%%								donkeyCorner(end+1) = [angulosIniciales; angulosFinales];
%%							end
%%						else
%%							donkeyCorner(end+1) = [angulosIniciales; angulosFinales];
%%						end
%%					end
%%				elseif(isequal(fix(angulosIniciales(2)/limit*tol)/tol,-1) && isequal(fix(angulosFinales(2)/limit*tol)/tol,-1))
%%					sumaIniciales = abs(angulosIniciales(1)-angulosIniciales(3));
%%					sumaFinales = abs(angulosFinales(1)-angulosFinales(3));
%%					if(abs(sumaIniciales - sumaFinales) < passingTol )
%%						passingtests++;
%%					else
%%						if(sumaIniciales/limit > 1)
%%							if(abs((2 - sumaIniciales/limit) - (sumaFinales/limit)) < passingTol )
%%								passingtests++;
%%							else
%%								donkeyCorner(end+1) = [angulosIniciales; angulosFinales];
%%							end
%%						else
%%							donkeyCorner(end+1) = [angulosIniciales; angulosFinales];
%%						end
%%					end
%%				else
%%					donkeyCorner(end+1) = [angulosIniciales; angulosFinales];
%%				end
					end
				end
			end
		end
	end
end

printf('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\n');
printf('||\t\t\tResultados!\t\t\t||\n');
printf('||\tCantidad total de testeos realizados:\t\t||\n');
printf('||\t\t\t\t\t %i\t\t||\n', tests);
printf('||\tCantidad total de testeos pasados:\t\t||\n');
printf('||\t\t\t\t\t %i\t\t||\n', passingtests);
printf('||\tPorcentaje de acierto:\t\t\t\t||\n');
printf('||\t\t\t\t\t %i%%\t\t||\n', round((passingtests/tests)*100));
printf('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\n');
printf('\n\n');

showDC = input('Queres ver el Donkey Corner? [yes/no]','s');

if(showDC == 'y' || showDC == 'yes')
	disp(donkeyCorner);
end
