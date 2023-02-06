FROM node 



WORKDIR /app 


COPY package.json .


RUN npm install 


COPY . . 




# QUEREMOS QUE APENAS OS ARQUIVOS DENTRO DO FOLDER DE 'feedback' sejam permanentes... (ou seja, que existam no lado de FORA do container)..
# ---> ESSE COMANDO SIMPLES --> ADICIONA 1 'ANONYMOUS VOLUME' (é o primeiro tipo de volume) ---> O OUTRO TIPO DE VOLUME É 'NAMED VOLUME'
# VOLUME ["/app/feedback"]


### PARA ADICIONAR __ NAMED __ VOLUMES (geralmente mais úteis do que UNNAMED VOLUMES)
###  __ ao contexto de seus __ CONTAINERS, vocÊ deve fazer isso EXTERNAMENTE (e naõ dentro de cada container...)

# CMD ["node", "server.js"] ---- trocamos pela versão do NODEMON...


### queremos que ele realmente seja anônimo (vinculado a cada container, e não a outras coisas/containers)

#### PREFIRA ESCREVER seus ANON VOLUMES diretamente no terminal, como flag do 'docker run', pq _ aí a coisa de 'LONG PATH' VS 'SHORT PATH' é respeitada (volumes mais específicos se sobrepõem aos mais gerais, mais gerais como 'bind mounts') 
# VOLUME [ "/app/temp" ] 

### queremos que o NODEMON seja iniciado, e não o 'node' puro..








## é quase 'inception' de arguments/environment variables, pq essa variable é usada logo abaixo, com 'ENV'...
ARG DEFAULT_PORT=80 



##É ASSIM QUE DEFINIMOS ENVIRONMENT VARIABLES, como 'process.env.PORT' --> essas variables são então ACESSADAS DENTRO DO CÓDIGO de 'server.js' (ou de seu container, em termos gerais)...
# ENV PORT $DEFAULT_PORT
ENV PORT 80

##COM ISSO, DEFINIMOS QUE A ENVIRONMENT VARIABLE de 'process.env.PORT' vai render 1 value de '80' quando for escrita...




# EXPOSE 80
#### com isso, conseguimos fazer 'EXPOSE' de 1 port dinâmico (environment variable)


#### E COLOCAMOS '$' NA FRENTE DA REFERÊNCIA A 'PORT' pq O DOCKER EXIGE ISSO; É O SINAL QUE COMUNICA A ELE QUE AQUI ESTAMOS REFERENCIANDO UMA 'VARIABLE', UMA ENVIRONMENT VARIABLE...  
EXPOSE $PORT


CMD ["npm", "start"]












### EXEMPLO COMPLETO DE DOCKER RUN, COM VOLUMES E O PASS DE VALUES PARA A ENVIRONMENT VARIABLE DE 'PORT' definida no dockerFIle...:










# docker run -d -p 3000:80 --rm --name feedback-app 
# --env PORT=8000
# -v feedback-volume-2:/app/feedback 
# -v "/home/arthur/Desktop/PROJETO-DOCKER/curso-docker/MODULO3-ENTENDENDODOCKERVOLUMES-E-TRABALHANDO-COM-DATA-EM-IMAGES-E-CONTAINERS/projeto-volumes-node:/app" 
# -v /app/temp
# -v /app/node_modules b3656e44241d
