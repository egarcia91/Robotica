function [ q ] = CrearAngulos( limit, Ntest )

    q = linspace(-limit, limit, Ntest+1);
    if(rem(Ntest,2)==0)
        q((Ntest/2)+1)=0;%Correccion del -0.0000 que genera un mal proceso
    end
end

