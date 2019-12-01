function [ ] = singularidadBrazo( a, d, alfa, R, indice )

%Analisis de singularidad del brazo

angulos=problemainverso( R, indice, a, d, alfa);
angulosSingularBrazo=(180/pi)*angulos

%Analisis del nul del Jacobiano
q2=angulos(2);
q3=angulos(3);
q4=angulos(4);
q5=angulos(5);

J=getJacobianMatrix(q2,q3,q4,q5,a,d)

nulJ=null(J)

isempty(nulJ);
if(isempty(nulJ)==0)
    fprintf('Hay null de Jaco\n');
end

%Analisis del Jacobiano transpuesto
nulJT=null(J')

isempty(nulJT);
if(isempty(nulJT)==0)
    fprintf('Hay null de Jaco TRANSP\n');
end

%Corroboramos que el det(jacobiano)=0 
detJaco=detJacobiano(q2,q3,q4,q5,a,d)

end

