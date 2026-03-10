# Image légère avec Nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier les fichiers du projet dans le répertoire web de Nginx
COPY . /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Nginx démarre automatiquement
CMD ["nginx", "-g", "daemon off;"]
