# Etapa 1: build do app
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: servir o app com nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Remove o arquivo default do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a configuração customizada do nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
