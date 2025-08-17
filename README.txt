Anime Review

Projeto de estudo que permite avaliar animes, com foco em colocar em prática conhecimentos de Front-end com Next.js e Back-end com Spring Boot.

Tecnologias Utilizadas:
Front-end: Next.js, React, CSS/Styled Components
Back-end: Spring Boot, Java
Banco de dados: PostgreSQL
ORM: Hibernate/JPA

Objetivo:
O principal objetivo deste projeto é consolidar habilidades de desenvolvimento fullstack, integrando front-end e back-end, além de manipular dados em um banco PostgreSQL.

Funcionalidades:

Listar animes disponíveis
Avaliar animes com notas
Visualizar avaliações de cada anime
CRUD básico de animes (opcional para estudo)

Configuração do Banco de Dados:

No arquivo application.properties do Spring Boot, configure seu PostgreSQL da seguinte forma:

spring.datasource.username=<seu username>
spring.datasource.password=<sua senha>
spring.datasource.url=jdbc:postgresql://localhost:5432/<nome do banco>

spring.jpa.generate-ddl=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080

OBS : Lembre-se de substituir <seu username>, <sua senha> e <nome do banco> pelas informações corretas do seu PostgreSQL.