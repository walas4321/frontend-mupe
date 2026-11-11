FROM node:21 AS angular

# Definir el argumento con un valor predeterminado
ARG deploy=prod

WORKDIR /app
COPY package.json /app/package.json
COPY . /app

# Instalar Bun y Angular CLI
RUN npm install -g bun
RUN bun install
RUN bun install -g @angular/cli

ENV PATH /app/node_modules/.bin:$PATH

RUN bun build:${deploy}

# nginx
FROM nginx:1.17.8-alpine
COPY --from=angular /app/dist/mesa-partes-presencial-ui/browser/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Detener el contenedor
# docker stop registro-casilla-electronica-ui

# Eliminar el contenedor
# docker rm registro-casilla-electronica-ui

# Eliminar la imagen
# docker rmi sbn/registro-casilla-electronica-ui

# Construir la imagen Docker
# docker build --build-arg deploy=desa -t sbn/registro-casilla-electronica-ui .

# Ejecutar el contenedor
# docker run -d -p 8086:80 --name registro-casilla-electronica-ui --restart always sbn/registro-casilla-electronica-ui

# Comandos útiles adicionales

# Ver logs del contenedor
# docker logs registro-casilla-electronica-ui

# Entrar al contenedor
# docker exec -it registro-casilla-electronica-ui sh


# mapas-tematicas-ui
# sbn/mapas-tematicas-ui

# 8090
