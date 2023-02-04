FROM node 


WORKDIR /app 


COPY package.json .


RUN npm install 


COPY . . 


EXPOSE 80

# QUEREMOS QUE APENAS OS ARQUIVOS DENTRO DO FOLDER DE 'feedback' sejam permanentes... (ou seja, que existam no lado de FORA do container)..
VOLUME ["/app/feedback"]


CMD ["node", "server.js"]