function [ listaThetasInversos] = testeo(listaThetas,a,d,alfa)
%Aplica el problema directo y el inverso para una tabla de angulos theta
  graficar=0;
  [m,n]=size(listaThetas);
  listaThetasInversos = zeros(m,n);

  for i=1:length(listaThetas)
    [m0, indice0] = problemadirecto(listaThetas(i,:)', a, d, alfa,graficar);
    listaThetasInversos(i,:)=problemainverso( m0, indice0, a, d, alfa);
  end

end