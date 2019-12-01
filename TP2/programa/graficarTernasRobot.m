function [ ] = graficarTernasRobot(transformationSteps)
%Grafica las ternas elegidas segun la tabla de D-H calculada anteriormente
  Actual=eye(4);
  lastpos=[0;0;0];
  
  for i = 1:7
    Actual=Actual*cell2mat(transformationSteps(1,i));
    graphicTerna(Actual,lastpos);   
    lastpos=Actual(1:end-1,end);
  end
end