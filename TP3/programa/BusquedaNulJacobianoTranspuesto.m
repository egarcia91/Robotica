function [ indices, Maximo ] = BusquedaNulJacobianoTranspuesto( a,d,Ntest,tol )
    
limit=pi;

q2 = linspace(-limit, limit, Ntest+1);
q3 = linspace(-limit, limit, Ntest+1);
q4 = linspace(-limit, limit, Ntest+1);
q5 = linspace(-limit, limit, Ntest+1);

indices=[0,0,0,0,0];

Maximo=0;

p=0;
progreso=0;

fprintf('Progreso Jacobiano Transpuesto:\n');
 for i=1:Ntest
     for j=1:Ntest
        for k=1:Ntest
             for l=1:Ntest
                 Actual=abs(detJacobiano(q2(i),q3(j),q4(k),q5(l),a,d));
                if(Actual > tol)%&&(Actual > Maximo))
                    indices=vertcat(indices,[q2(i),q3(j),q4(k),q5(l),Actual]);% se puede poner rad2deg(q4(k)) en cada valor para que devuelva los angulos
%                     indices=[q2(i),q3(j),q4(k),q5(l)];% se puede poner rad2deg(q4(k)) en cada valor para que devuelva los angulos
                    Maximo=Actual;
                end
                
                p=p+1;
                resto=mod(p,(Ntest^4)/10);
                if resto==0
                    progreso=progreso+10;
                    fprintf('%% %d ',progreso);
                end
%                 if(Actual > tol)
%                     indices=vertcat(indices,[q2(i),q3(j),q4(k),q5(l)]);% se puede poner rad2deg(q4(k)) en cada valor para que devuelva los angulos
%                     Actual;
%                 end
             end                
        end
     end
 end

end

