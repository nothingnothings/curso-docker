FROM composer:2.4

WORKDIR /var/www/html

# É O COMANDO QUE SEMPRE SERÁ EXECUTADO QUANDO RODAMOS 'docker-compose run composer'...
ENTRYPOINT ["composer", "--ignore-platform-reqs"]





# POR FIM,

# PRECISAMOS ASSEGURAR QUE NOSSO SOURCE CODE DIRECTORY SEJA EXPOSTO A ESSA IMAGE 

# do 

# 'composer'... -->  ISSO PARA QUE ESSA IMAGE CONSIGA TRABALHAR NO NOSSO 'SOURCE CODE'

# DIRETAMENTE --> TUDO PARA QUE 


# QUANDO USARMOS ESSA IMAGE PARA 

# INSTALAR O LARAVEL E SETTAR 1 LARAVEL PROJECT,
# ELE FAÇA ISSO NO NOSSO SOURCE FOLDER... --> É POR ISSO QUE PRECISAMOS DE 1 BIND MOUNT, lá no docker-compose...