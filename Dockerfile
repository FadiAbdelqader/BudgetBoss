FROM node:18-alpine

# Copier les fichiers de l'application dans le conteneur
WORKDIR /app
COPY . .

# Installer les dépendances pour l'application Express.js
RUN cd backend && npm install

# Installer les dépendances pour l'application Vue.js
RUN cd frontend && npm install

# Exposer le port 3000 pour l'application Express.js
EXPOSE 2002

# Exposer le port 8080 pour l'application Vue.js
EXPOSE 8004

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories

RUN apk update
RUN apk add mongodb
RUN apk add mongodb-tools

RUN mongo --version
# Démarrer MongoDB en arrière-plan
RUN mkdir -p /data/db

CMD sh -c mongod --bind_ip_all --fork --logpath /var/log/mongodb.log & cd backend && node server & cd frontend && npm start 