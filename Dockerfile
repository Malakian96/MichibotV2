# Usa una imagen base ligera de Node.js compatible con ARM (como Raspberry Pi)
FROM node:18-bullseye-slim

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código (excluido lo que está en .dockerignore)
COPY . .

# Compila el código TypeScript
RUN npm run build

# Define el comando para ejecutar la aplicación
CMD ["npm", "run", "start"]
