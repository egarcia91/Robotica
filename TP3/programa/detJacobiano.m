function [detjaco]=detJacobiano(q2,q3,q4,q5,a,d)

  primero=a(2)*a(3)*sin(q3)*sin(q5);
  segundo=a(3)*cos(q2+q3)+a(2)*cos(q2)+d(5)*sin(q2+q3+q4);
  detjaco=primero*segundo;
end