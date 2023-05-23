FROM nginx:stable-alpine

WORKDIR /etc/nginx/conf.d

COPY nginx/nginx.conf .

# ISSO VAI RENOMEAR 'nginx.conf' PARA 'default.conf'...
RUN mv nginx.conf default.conf 


# ISSO VAI TROCAR O WORKDIR, que antes era '/etc/nginx/conf.d' (esse folder aí) PARA O FOLDER DE '/var/www/html', que é onde NOSSO SOURCE CODE RESIDIRÁ....
WORKDIR /var/www/html

#copia todo o conteúdo de 'src' (folder de 'src', na nossa local host machine) PARA DENTRO De '/VAR/WWW/HTMl'..
COPY src .