function [ ] = SingularidadCodoMunieca(Theta,a,d )

q2=Theta(2);
q3=Theta(3);
q4=Theta(4);
q5=Theta(5);

%Analisis del Jacobiano
J=getJacobianMatrix(q2,q3,q4,q5,a,d)
nulJ=null(J)*180/pi
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
detJ=detJacobiano(q2,q3,q4,q5,a,d)


end

