FROM node 


WORKDIR /app 


COPY package.json .


RUN npm install 


COPY . . 


EXPOSE 80

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
CMD ["npm", "start"]