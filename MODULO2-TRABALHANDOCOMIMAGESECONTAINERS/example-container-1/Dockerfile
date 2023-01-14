# ESCOLHEMOS A 'BASE IMAGE', lá do docker hub, que DEVE SER USADA COMO BASE PARA ESSA NOSSA CUSTOM IMAGE (que é o Dockerfile INTEIRO)...
FROM node




# POR DEFAULT, O DOCKER VAI RODAR OS COMANDOS NO 'ROOT' DE SEU PROJETO (e isso não será '/app', o que é um problema) ---> para DEFINIR QUE ESSES COMANDOS SEJAM RODADOS EM ALGUMA OUTRA PASTA QUE NÃO O ROOT, VOCÊ PRECISA DO COMANDO 'WORKDIR'
WORKDIR /app




# AQUI DEFINIMOS, COM 2 PARÂMETROS (''2 pontos'', às vezes), ''''O CAMINHO DAS FILES QUE SERÃO COPIADAS PARA DENTRO DA IMAGE/CONTAINER''''  E ''O CAMINHO EM QUE VIVERÃO ESSES ARQUIVOS, DENTRO DO DOCKER CONTAINER/IMAGE'' (aqui, colocamos 'app')...

#  um 'ponto' no primeiro parâmetro significa que PEGAMOS TODOS OS ARQUIVOS AO REDOR DA NOSSA DOCKER FILE... e 1 'ponto' no segundo parâmetro significa que queremos que OS ARQUIVOS VIVAM NO ROOT do docker container/image...
# COPY . /app

# --> AQUI, COLOCAMOS './'  COMO SEGUNDO PARÂMETRO DO COPY, PQ QUEREMOS QUE __ TODOS OS ARQUIVOS SEJAM COPIADOS PARA DENTRO DO 'WORKING DIRECTORY' dentro do nosso docker container, que no caso é '/app' (definido por 'WORKDIR /app')...
# COPY . ./


# com '/app', ESCLARECEMOS _ DE FORMA ABSOLUTA (absolute path) QUAL É O CAMINHO EM QUE DEVEM SER DEPOSITADOS OS ARQUIVOS (dentro de '/app' folder)...

COPY . /app


# RUN roda quaisquer comandos (aqui, precisamos de npm install) --> POR DEFAULT, O DOCKER VAI RODAR OS COMANDOS NO 'ROOT' DE SEU PROJETO (e isso não será '/app', o que é um problema) ---> para DEFINIR QUE ESSES COMANDOS SEJAM RODADOS EM ALGUMA OUTRA PASTA QUE NÃO O ROOT, VOCÊ PRECISA DO COMANDO 'WORKDIR'

# OBS --> 'RUN' é usado para __ DEFINIR __ O AMBIENTE DE SEU PROJETO ___ NO CONTEXTO DA IMAGE, E NÃO DO CONTAINER... --> para rodar comandos no SEU CONTAINER (a instancia criada com base na image), USE 'CMD'...
RUN npm install





# O 'CMD' executa COISAS _ DENTRO DO SEU CONTAINER --> é lá que tipicamente queremos 'RODAR 1 SERVER', por exemplo... (e não no contexto da IMAGE, com 'RUN')...
# no 'CMD', seus comandos devem ser passados DENTRO DE 1 ARRAY... (splittados em 1 array)...
# agora sempre que 1 container for criado com base nessa nossa image, rodaremos esse comando de 'node server.js'...



### o __ EXPOSE__ dos PORTS _deve acontecer __ ANTES_ DO RUN DE COMANDOS NO CONTAINER (com 'CMD')...

#### para conseguirmos EXPOR ESSA PORT A NOSSA 'LOCAL MACHINE', precisamos rodar '''docker run -p port_da_maquina_local_que_queremos_mappear:80 ''''

EXPOSE 80


### OBS: o 'CMD' SEMPRE DEVE SER RODADO __ POR ÚLTIMO__ nos seus Dockerfile...
 CMD ["node", "server.js"]