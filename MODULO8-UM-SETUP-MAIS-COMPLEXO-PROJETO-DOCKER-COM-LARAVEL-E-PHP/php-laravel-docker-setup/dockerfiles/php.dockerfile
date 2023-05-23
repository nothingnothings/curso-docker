FROM php:8-fpm-alpine

# É UM FOLDER BEM COMUM EM WEB DEVELOPMENT/WEB SERVERS (vc tipicamente 'SERVE YOUR WEBSITE FROM THIS FOLDER')
# TOD0S OS CONTAINERS QUE USAMOS NESSE MODULE USARÃO ESSE FOLDER COMO __ O FOLDER __ QUE VAI SEGURAR NOSSA 'FINAL APPLICATION'...
WORKDIR /var/www/html

## com isso, ficamos com 1 SNAPSHOT DE NOSSO CÓDIGO SRC, DENTRO DO CONTAINER (o que será usado na hora de DEPLOY nosso CONTAINER)....
COPY src .

# 'docker-php-ext-install' é uma TOOL que vai existir/existe DENTRO DAQEULA IMAGE DE 'php:7.4-fpm-alpine'....  
RUN docker-php-ext-install pdo pdo_mysql


# 'www-data' É O DEFAULT USER DESSA IMAGE DE '8-fpm-alpine', E USAMOS O 'chown' PARA DEFINIR NOSSAS PASTAS DO WORKDIR COMO PERTENCENTES A ELE (para que então SEJA POSSÍVEL TER READ E WRITE ACCESS AOS CONTEÚDOS que SÃO copiadOS para DENTRO DE NOSSO CONTAINER, no workdir de '/var/www/html')...
RUN chown -R www-data:www-data /var/www/html



# --> SE VC __ NÃO TEM 1 COMANDO OU ENTRYPOINT AO FINAL DE SUA DOCKERFILE,
#  __ O __ CMD OU ENTRYPOINT _ DA __ BASE __ IMAGE __ SERÁ USADO (se ela tiver algum desses comandos)