function [ ] = MostrarTablaFinal(theta, m, a, d, alfa, indice )


  TablaIndices=[
    1,1,1;
    1,1,-1;
    1,-1,1;
    1,-1,-1;
    -1,1,1;
    -1,1,-1;
    -1,-1,1;
    -1,-1,-1;
    ];
  TablaFinal=horzcat(indice,theta');
  for i=1:8
    thetaTabla = problemainverso(m, TablaIndices(i,:), a, d, alfa);
    Actual=horzcat(TablaIndices(i,:),thetaTabla');
    TablaFinal=vertcat(TablaFinal,Actual);
  end

  TablaFinal

end