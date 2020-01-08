function [] = graficarCurvas(time, tita, titaD, titap, titapD, tita2p, tita2pD, u, ptitle)
	%graficarCurvas Función para graficar los resultados completos de
	%simulaciones, valor medido vs. valor deseado, incluyendo: Torques,
	%Posiciones, Velocidades y Aceleraciones, para ambos ejes.
	%
	%Parametros:
	% time: Vector de tiempo para todos los gráficos
	% tita: Matriz de posiciones para ambos ejes, fila 1 corresponde a eje 1
	% titaD: Matriz de posiciones deseadas para ambos ejes
	% titap: Matriz de velocidades para ambos ejes
	% titapD: Matriz de velocidades deseadas para ambos ejes
	% tita2p: Matriz de aceleraciones para ambos ejes
	% tita2pD: Matriz de aceleraciones deseadas para ambos ejes
	% u: Matriz de torques para ambos ejes
	% ptitle: Título de la simulación que genera los gráficos

	xmax = max(time);

	graficarTorques(time, tita, titaD, titap, titapD, tita2p, tita2pD, u, ptitle);

	% Gráfico de posiciones, velocidades y aceleraciones, theta 2
	for i=1:2

		graficarPosicionesVelocidadesAceleracion(i, time, tita, titaD, titap, titapD, tita2p, tita2pD, u, ptitle);

	end

	graficarPotenciaEnergia(time, tita, titaD, titap, titapD, tita2p, tita2pD, u, ptitle);

end
