# Stage 1: Build
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom and download dependencies (caching)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source and build
COPY src ./src
RUN mvn package -DskipTests


# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the built jar
COPY --from=build /app/target/scentcepts-0.0.1-SNAPSHOT.jar app.jar

# Configuration for database
ENV SPRING_PROFILES_ACTIVE=docker
ENV DB_URL=jdbc:postgresql://db:5432/scentcepts_db
ENV DB_USER=scentcepts_user
ENV DB_PASS=scentcepts

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
