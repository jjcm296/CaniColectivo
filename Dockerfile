# 1) Etapa de construcción
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copiamos descriptor y descargamos dependencias primero (para cache)
COPY back/pom.xml .
RUN mvn -B dependency:go-offline

# Ahora copiamos el código fuente
COPY back/src ./src

# Empaquetamos (saldrá un .jar dentro de /target)
RUN mvn -B package -DskipTests

# 2) Etapa de runtime
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copiamos el jar desde la etapa de build
COPY --from=build /app/target/*.jar app.jar

# Variable de entorno típica de Spring
ENV SPRING_PROFILES_ACTIVE=prod

# Puerto que expone tu app (ajusta si usas otro)
EXPOSE 8080

# Comando de arranque
ENTRYPOINT ["java","-jar","/app/app.jar"]
