function [] = graficarTorques(time, tita, titaD, titap, titapD, tita2p, tita2pD, u, ptitle)

	% Gráfico de torques vs. posición de ejes
	figure
	plot(time,u);
	title(strcat(ptitle, ' - Torques'));
	ylabel('Torques [Nm]');
	legend({'Eje 1','Eje 2'},'FontSize',7,'Location','northwest');
	print -djpg Torques.jpg;
	grid on;
	xlim([0 xmax]);
	xlabel('Tiempo [s]');

end
