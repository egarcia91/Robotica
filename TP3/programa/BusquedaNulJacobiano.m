function [ indices ] = BusquedaNulJacobiano( a,d,Ntest,tol )
%Devuelve la configuracion de angulos que anulan el determinante del
%Jacobiano para realizar un analisis posterior

%Establece el vector de angulos a recorrer por cada eje
limit=pi;

q2 = CrearAngulos( limit, Ntest );
q3 = CrearAngulos( limit, Ntest );
q4 = CrearAngulos( limit, Ntest );
q5 = CrearAngulos( limit, Ntest );

%Inicio del analisis
indices=[0,0,0,0];
p=0;
progreso=0;
fprintf('Progreso Jacobiano:\n');

for i=1:Ntest
     for j=1:Ntest
        for k=1:Ntest
             for l=1:Ntest         
                if(abs(detJacobiano(q2(i),q3(j),q4(k),q5(l),a,d))<tol)
                    indices=vertcat(indices,[q2(i),q3(j),q4(k),q5(l)]);
                end
                
                %Barra de progreso del codigo (ver la ventana de comandos
                %en el tiempo de ejecucion)
                p=p+1;
                resto=mod(p,(Ntest^4)/10);
                if resto==0
                    progreso=progreso+10;
                    fprintf('%% %d ',progreso);
                end
                
             end                
        end
     end
 end
 
fprintf(' \n');
end

