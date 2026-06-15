# === FASE 1: Compilación (Build) ===
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./
COPY tsconfig.json ./

# Instalamos todas las dependencias (incluyendo devDependencies para compilar)
RUN npm install --include=dev

# Copiamos el código fuente
COPY src/ ./src/

# Compilamos TypeScript a JavaScript (creará la carpeta /dist)
RUN npm run build

# === FASE 2: Ejecución (Runtime de Producción) ===
FROM node:20-alpine AS runner

WORKDIR /app

# Definimos variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Copiamos solo los manifiestos de dependencias
COPY package*.json ./

# Instalamos ÚNICAMENTE las dependencias de producción para mantener el contenedor ultra-liviano
RUN npm ci --only=production

# Copiamos el código JavaScript compilado desde la fase anterior
COPY --from=builder /app/dist ./dist

# Exponemos el puerto de red del contenedor
EXPOSE 3000

# Comando para iniciar tu microservicio en modo hilo único (1 CPU)
CMD ["node", "dist/index.js"]