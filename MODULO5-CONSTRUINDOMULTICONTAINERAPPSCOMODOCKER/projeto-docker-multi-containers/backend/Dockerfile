FROM node 


WORKDIR /app 


COPY package.json .


RUN npm install 


COPY . . 


EXPOSE 80


# 'root' ficaria como value DEFAULT dessa variable, que SERÁ PASSADO SE NÃO COLOCARMOS NENHUM VALUE NO PARÂMETRO DE '-e MONGODB_USERNAME' quando rodamos o container do backend... (ver aula 'Volumes, Bind Mounts e o polimento do...')
# 'root' ficaria como value DEFAULT dessa variable, que SERÁ PASSADO SE NÃO COLOCARMOS NENHUM VALUE NO PARÂMETRO DE '-e MONGODB_USERNAME' quando rodamos o container do backend... (ver aula 'Volumes, Bind Mounts e o polimento do...')
ENV MONGODB_USERNAME=root
ENV MONGODB_PASSWORD=senha

CMD ["npm", "start"]