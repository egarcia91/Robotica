MODULE Module1
   CONST robtarget Target_20:=[[400,175.592,129.913],[0,1,0,0],[0,0,-2,0],[9E+09,9E+09,9E+09,9E+09,9E+09,9E+09]];
   CONST robtarget Target_30:=[[397.465,175.592,549.913],[0,1,0,0],[0,0,-2,0],[9E+09,9E+09,9E+09,9E+09,9E+09,9E+09]];
   CONST robtarget Target_40:=[[600,-60,350],[0.70711,-0.70711,0,0],[0,0,0,0],[9E+09,9E+09,9E+09,9E+09,9E+09,9E+09]];

   PROC main()
        !Añada aquí su código
       Path_10;
       WaitTime 1;
       SetDo Do_Pinza, 1;
       Path_20;
       WaitTime 1;
       SetDo Do_Pinza, 0;
       MoveJ Target_30,v1000,z100,Pinza\WObj:=wobj0;
    ENDPROC
    PROC Path_10()
       MoveJ Target_20,v1000,z100,Pinza\WObj:=wobj0;
    ENDPROC
    PROC Path_20()
        MoveL Target_30,v1000,z100,Pinza\WObj:=wobj0;
        MoveJ Target_40,v1000,z100,Pinza\WObj:=wobj0;
    ENDPROC
ENDMODULE
