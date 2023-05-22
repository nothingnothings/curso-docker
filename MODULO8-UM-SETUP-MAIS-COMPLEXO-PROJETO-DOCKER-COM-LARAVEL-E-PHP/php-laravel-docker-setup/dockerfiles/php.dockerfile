FROM php:7.4-fpm-alpine

# É UM FOLDER BEM COMUM EM WEB DEVELOPMENT/WEB SERVERS (vc tipicamente 'SERVE YOUR WEBSITE FROM THIS FOLDER')
# TOD0S OS CONTAINERS QUE USAMOS NESSE MODULE USARÃO ESSE FOLDER COMO __ O FOLDER __ QUE VAI SEGURAR NOSSA 'FINAL APPLICATION'...
WORKDIR /var/www/html

# 'docker-php-ext-install' é uma TOOL que vai existir/existe DENTRO DAQEULA IMAGE DE 'php:7.4-fpm-alpine'....  
RUN docker-php-ext-install pdo pdo_mysql









# --> SE VC __ NÃO TEM 1 COMANDO OU ENTRYPOINT AO FINAL DE SUA DOCKERFILE, 
#  __ O __ CMD OU ENTRYPOINT _ DA __ BASE __ IMAGE __ SERÁ USADO (se ela tiver algum desses comandos)