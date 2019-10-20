function [ ] = graphicTerna(trasRot,lastPos)

%Posiciones de eslabon
p0=lastPos/50; %inicial
p=(trasRot(1:end-1,end)')/50; %final

%Rotaciones de terna
n=trasRot(1:3,1);
s=trasRot(1:3,2);
a=trasRot(1:3,3);

%Dibujo ternas
quiversensor_n = quiver3(p(1),p(2),p(3),n(1),n(2),n(3));
set(quiversensor_n, 'Color', 'green');
hold on;
quiversensor_s = quiver3(p(1),p(2),p(3),s(1),s(2),s(3));
set(quiversensor_s, 'Color', 'black');
hold on;
quiversensor_a = quiver3(p(1),p(2),p(3),a(1),a(2),a(3));
set(quiversensor_a, 'Color', 'red');
hold on;
set(quiversensor_n, 'LineWidth', 1);
set(quiversensor_s, 'LineWidth', 1);
set(quiversensor_a, 'LineWidth', 1);

%Dibujo eslabon
plot3([p0(1), p(1)],[p0(2), p(2)],[p0(3), p(3)],'linewidth',10);

%Configuracion del dibujo
axis equal;
textx = text(2, 2, 2, 'UR 5');
set(textx, 'Color', 'blue');

end