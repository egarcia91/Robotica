function [] = graficarPosicionesVelocidadesAceleracion(time, tita, titaD, titap, titapD, tita2p, tita2pD, u, ptitle)

	strTitle = [ptitle ' - Eje ' num2str(i)];

	figure;

	subplot(3,1,1);
	plot(time,(180/pi)*([tita(i,:);titaD(i,:)]));
	title(strTitle);
	ylabel('Pos [{\circ}]');
	legend({'Theta','Theta ref'},'FontSize',7,'Location','northwest');
	grid on;
	xlim([0 xmax]);

	subplot(3,1,2);
	plot(time,[titap(i,:);titapD(i,:)]);
	ylabel('Vel [{\circ}/s]');
	legend({'Vel','Vel ref'},'FontSize',7,'Location','northwest');
	grid on;
	xlim([0 xmax]);

	subplot(3,1,3);
	plot(time,[tita2p(i,:);tita2pD(i,:)]);
	ylabel('Acel [{\circ}/s^2]'); 
	legend({'Acel','Acel ref'},'FontSize',7,'Location','northwest');

	print(strTitle, "-djpg");
	grid on;
	xlim([0 xmax]);
	xlabel('Tiempo [s]');

end
