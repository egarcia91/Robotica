% Parámetros dinámicos para el eslabón 1
% calculados al origen de la terna del eslabón.
% Cuando se incluyan los motores,  suponer que el motor 2
% está fijado al eslabón 1.
global I01zz Xg1 Yg1 m1;
I01zz = (Igl1zz + ml1 * (Xgl1^2+Ygl1^2));
Xg1 = Xgl1;
Yg1 = Ygl1;
m1 = ml1;

global I02zz Xg2 Yg2 m2;
