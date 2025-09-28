@echo off

REM Script para levantar la aplicación completa con Docker en Windows

echo Iniciando aplicación con Docker Compose...

REM Construir y levantar los contenedores
docker-compose up --build -d

echo.
echo Aplicación iniciada exitosamente!
echo.
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:8080/api
echo PostgreSQL: localhost:5432
echo.
echo Para ver los logs:
echo   docker-compose logs -f
echo.
echo Para detener:
echo   docker-compose down

pause