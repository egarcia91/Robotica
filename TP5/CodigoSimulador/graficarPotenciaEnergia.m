function [] = graficarPotenciaEnergia(time, tita, titaD, titap, titapD, tita2p, tita2pD, u, ptitle)

	figure;
	subplot(2,1,1)
	title(ptitle);
	plot(time,(u.*titap)');
	ylabel('Potencia [W]');
	legend({'Eje 1','Eje 2'},'FontSize',7,'Location','northwest');
	grid on;
	xlim([0 xmax]);

	subplot(2,1,2)
	plot(time,cumsum((u.*titap)'));
	ylabel('Energia [J]');
	legend({'Eje 1','Eje 2'},'FontSize',7,'Location','northwest');
	print -djpg Potencia_Energia.jpg;
	grid on;
	xlim([0 xmax]);
	xlabel('Tiempo [s]');

end
