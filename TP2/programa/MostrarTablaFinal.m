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
  TablaFinal=horzcat(TablaFinal,theta(2)+theta(3)+theta(4));
  TablaFinal=horzcat(TablaFinal,theta(2)+theta(3));
  for i=1:8
    thetaTabla = problemainverso(m, TablaIndices(i,:), a, d, alfa);
	  sumaQ234 = thetaTabla(2) + thetaTabla(3) + thetaTabla(4);
	  sumaQ234 = intervaloAngulo( sumaQ234 );
  	sumaQ23 = thetaTabla(2) + thetaTabla(3);
    sumaQ23 = intervaloAngulo( sumaQ23 );
    Actual = horzcat(TablaIndices(i,:),thetaTabla');
	  Actual = horzcat(Actual,sumaQ234);
    Actual = horzcat(Actual,sumaQ23);
    TablaFinal=vertcat(TablaFinal,Actual);
  end

  TablaFinal

end
