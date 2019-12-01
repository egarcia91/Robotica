function J = getJacobianMatrix(q2,q3,q4,q5,a,d)

a1=a(1);
a2=a(2);
a3=a(3);
a4=a(4);
a5=a(5);
a6=a(6);

d1=d(1);
d2=d(2);
d3=d(3);
d4=d(4);
d5=d(5);
d6=d(6);

J=[ (d6*cos(q2 + q3 - q5))/2 + d4*cos(q2 + q3) + (d6*cos(q2 + q3 + q5))/2,      d5*cos(q4) + a2*sin(q3) + d6*sin(q4)*sin(q5),      d5*cos(q4) + d6*sin(q4)*sin(q5), d5*cos(q4) + d6*sin(q4)*sin(q5), -d6*cos(q4)*cos(q5),        0;
    - (d6*sin(q2 + q3 - q5))/2 - d4*sin(q2 + q3) - (d6*sin(q2 + q3 + q5))/2, a3 + a2*cos(q3) + d5*sin(q4) - d6*cos(q4)*sin(q5), a3 + d5*sin(q4) - d6*cos(q4)*sin(q5), d5*sin(q4) - d6*cos(q4)*sin(q5), -d6*cos(q5)*sin(q4),        0;
    (d6*sin(q2 + q3 + q4 + q5))/2 - a3*cos(q2 + q3) - a2*cos(q2) - (d6*sin(q2 + q3 + q4 - q5))/2 - d5*sin(q2 + q3 + q4),                                                 0,                                    0,                               0,         -d6*sin(q5),        0;
    sin(q2 + q3 + q4),                                                 0,                                    0,                               0,                   0, -sin(q5);
    0,                                                 1,                                    1,                               1,                   0,  cos(q5);
    -cos(q2 + q3 + q4),                                                 0,                                    0,                               0,                   1,        0];
end