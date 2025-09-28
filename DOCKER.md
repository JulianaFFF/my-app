# 🐳 Docker Deployment Guide

## Descripción

Esta aplicación de biblioteca ha sido configurada para ejecutarse completamente en contenedores Docker, incluyendo frontend (Next.js), backend (Spring Boot) y base de datos (PostgreSQL).

## Estructura de Docker

```
my-app/
├── Dockerfile              # Configuración del contenedor del frontend
├── .dockerignore          # Archivos excluidos del contexto Docker
├── docker-compose.yml     # Orquestación de todos los servicios
├── .env.docker           # Variables de entorno para Docker
├── start-docker.bat      # Script de inicio para Windows
└── start-docker.sh       # Script de inicio para Linux/Mac
```

## Servicios

### Frontend (Next.js)
- **Puerto**: 3000
- **Imagen**: Node.js 18 Alpine
- **Build**: Standalone para optimización
- **Variables**: NEXT_PUBLIC_API_URL configurada para comunicación con backend

### Backend (Spring Boot)
- **Puerto**: 8080
- **Configuración**: Perfil Docker activado
- **Dependencias**: PostgreSQL para persistencia

### Base de Datos (PostgreSQL)
- **Puerto**: 5432
- **Credenciales**: postgres/password
- **Volumen**: Datos persistentes en `postgres_data`

## Comandos de Docker

### Inicio rápido
```bash
# Windows
./start-docker.bat

# Linux/Mac
./start-docker.sh

# O manualmente
docker-compose up --build -d
```

### Scripts de npm
```bash
# Construir imagen del frontend
npm run docker:build

# Levantar todos los servicios
npm run docker:up

# Ver logs en tiempo real
npm run docker:logs

# Detener servicios
npm run docker:down
```

### Comandos manuales
```bash
# Construir y levantar
docker-compose up --build

# Solo levantar (sin reconstruir)
docker-compose up -d

# Ver logs
docker-compose logs -f [servicio]

# Detener servicios
docker-compose down

# Limpiar volúmenes (⚠️ elimina datos)
docker-compose down -v
```

## URLs de Acceso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **PostgreSQL**: localhost:5432

## Configuración del Backend

Si aún no tienes el backend dockerizado, necesitarás:

1. **Crear Dockerfile en el backend**:
```dockerfile
FROM openjdk:17-jre-slim
COPY target/library-backend.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

2. **Configurar application-docker.properties**:
```properties
spring.datasource.url=jdbc:postgresql://db:5432/library
spring.datasource.username=postgres
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
```

3. **Actualizar docker-compose.yml**:
```yaml
backend:
  build:
    context: ../backend  # Ruta a tu backend
    dockerfile: Dockerfile
  # ... resto de configuración
```

## Variables de Entorno

### Desarrollo
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Producción/Docker
```bash
NEXT_PUBLIC_API_URL=http://backend:8080/api
DATABASE_URL=postgresql://postgres:password@db:5432/library
```

## Troubleshooting

### Puerto ocupado
```bash
# Verificar puertos en uso
netstat -tlnp | grep :3000
netstat -tlnp | grep :8080

# Cambiar puertos en docker-compose.yml si es necesario
```

### Logs de errores
```bash
# Ver logs específicos
docker-compose logs frontend
docker-compose logs backend
docker-compose logs db

# Seguir logs en tiempo real
docker-compose logs -f --tail=100
```

### Reconstruir contenedores
```bash
# Forzar reconstrucción completa
docker-compose up --build --force-recreate

# Limpiar caché de Docker
docker system prune -a
```

### Conexión a base de datos
```bash
# Conectar a PostgreSQL desde contenedor
docker-compose exec db psql -U postgres -d library

# O desde host
psql -h localhost -p 5432 -U postgres -d library
```

## Deployment en Producción

Para deployment real, considera:

1. **Variables de entorno seguras**
2. **Configuración de nginx como proxy reverso**
3. **SSL/TLS certificates**
4. **Backup automatizado de base de datos**
5. **Monitoreo y logging centralizados**

## Próximos Pasos

1. ✅ Frontend dockerizado
2. ⏳ Backend dockerizado (si aplica)
3. ⏳ CI/CD pipeline
4. ⏳ Deployment en cloud (AWS, GCP, Azure)