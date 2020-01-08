clear all
close all
more off

parametros;

% **************************************************************
% Simulador
% **************************************************************
% Siempre arranca desde pdest(:,1) con velocidad nula y termina deteniéndose en el ultimo punto 
% Se usa la función pinvScara, que sirve para calcular el problema inverso
% Calculo los objetivos del nuevo segmento
%thetaA = pinvScara(pdest(:,1));
thetaA = zeros(2,1);
thetaB = thetaA;

% Inicializo los estados del sistema
theta = thetaA;
thetap = zeros(size(theta));

[ acum_tr, acum_theta, acum_thetaD, acum_thetap, acum_thetapD, acum_theta2p, acum_theta2pD, acum_u ] = simulacion(tacc, Tm, Kp, Kd, Km, theta, thetap, odeOptions, n_ejes, N, tr );
% Calculo las trayectorias
%[ pos_ref,config_ref ] = pDirecto(acum_thetaD(:,2:end),DH);
%[ pos,config ] = pDirecto(acum_theta(:,1:end-1),DH);

% Grafica de resultados
graficarCurvas(acum_tr, acum_theta, acum_thetaD, acum_thetap, acum_thetapD, acum_theta2p, acum_theta2pD, acum_u, "Pendulo doble");

%%%%%%%figure()
%%%%%%%plot(pos(:,1),pos(:,2));
%%%%%%%hold on
%%%%%%%plot(pos_ref(:,1),pos_ref(:,2));
%%%%%%%legend('Ref','Real','Location','southwest');
%%%%%%%title('Trayectoria');
%%%%%%%ylabel('Y [m]');xlabel('X [m]'); grid on
%%%%%%%axis('equal');
%%%%%%
%%%%%%%figure;
%%%%%%%delta_pos = pos-pos_ref;
%%%%%%%error = sqrt(delta_pos(:,1).^2+delta_pos(:,2).^2);
%%%%%%%plot(acum_tr(1:end-1),error*1000);
%%%%%%%title('Error de seguimiento');
%%%%%%%ylabel('Error [mm]');xlabel('Tiempo [s]'); grid on
%%%%%%
%%%%%%%mean(error)*1000
%%%%%%%std(error)*1000
