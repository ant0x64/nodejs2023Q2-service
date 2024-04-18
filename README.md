# Home Library Node REST API Service

The service is powered by the [Nest.js framework](https://github.com/nestjs/nest), implementing a CRUD RESTful API with a focus on modularity and architectural coherence. The application utilizes [RxJS](https://github.com/ReactiveX/rxjs) to enable reactive programming principles and [TypeORM](https://github.com/typeorm/typeorm) to define and manage database entities and relationships using object-relational mapping (ORM) techniques.

[Swagger](https://github.com/swagger-api/swagger-ui) facilitates comprehensive API documentation, offering a clear and structured overview of available endpoints and associated functionalities.

To streamline the development and deployment process, environment configuration, Docker containers, and orchestration files are included in the repository.

Task Assignments:
1. [REST API Service](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md)
2. [Containerization, Docker and Database & ORM](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/containerization-database-orm/assignment.md)
3. [Logging & Error Handling, Authentication, Authorization](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/logging-error-authentication-authorization/assignment.md)


## Prerequisites

Before installing and running the application ensure that the following prerequisites are met:

#### Local Machine Environment
- [Node.js](https://nodejs.org/en/download/) with [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/download/)

#### Using Docker
- [Docker](https://www.docker.com/) CLI
- [Docker Scout](https://docs.docker.com/scout/install/) (optional: to scan images for vulnerabilities)


## How to use

### Using Docker

**Caution**: the DockerHub image of the application contains **only production ENV**

```bash
# set required ENV
export POSTGRES_HOST=home_library_service_db
export POSTGRES_DB=database
export POSTGRES_USER=user
export POSTGRES_PASSWORD=password
export LOG_LEVEL=debug
export CRYPT_SALT=10
export JWT_SECRET_KEY=secret123123
export JWT_SECRET_REFRESH_KEY=secret123123

# create network
docker network create home_library_service

# run database container
docker run --detach \
  --hostname $POSTGRES_HOST \
  -e POSTGRES_DB=$POSTGRES_DB \
  -e POSTGRES_USER=$POSTGRES_USER \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  --network home_library_service \
  ant0x64/nodejs-service_db:latest

# run application
docker run --detach \
  -p 4000:4000 \
  -e  CRYPT_SALT=$CRYPT_SALT \
  -e JWT_SECRET_KEY=$JWT_SECRET_KEY \
  -e JWT_SECRET_REFRESH_KEY=$JWT_SECRET_REFRESH_KEY \
  -e POSTGRES_HOST=$POSTGRES_HOST \
  -e POSTGRES_DB=$POSTGRES_DB \
  -e POSTGRES_USER=$POSTGRES_USER \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  -e LOG_LEVEL=$LOG_LEVEL \
  --network home_library_service \
  ant0x64/nodejs-service_app:latest
```

### Using Docker Compose files

```bash
# clone repository and cd to the working dir
git clone -b containerization git@github.com:ant0x64/nodejs2023Q2-service.git
cd nodejs2023Q2-service

# create .env from the example and configure it
cp .env.example .env
```

#### Production ENV
```bash
# up
docker-compose -f docker-compose.prod.yml up -d

# down
docker-compose -f docker-compose.prod.yml down --volumes
```

#### Development ENV
**Caution**: this method involves buiding the application image locally based on `Dockerfile.app`

*Note*: `src` directory is automatically bound as a container's volume, and the application restarts upon any changes made to it.

```bash
# up
docker-compose -f docker-compose.dev.yml up -d

# down
docker-compose -f docker-compose.dev.yml down --volumes
```

### Local Machine Environment

**Caution**: Postgres database must be pre-installed and accessible on the configured `POSTGRES_PORT`

#### Installation
```bash
# clone repository and cd to the working dir
git clone -b containerization git@github.com:ant0x64/nodejs2023Q2-service.git
cd nodejs2023Q2-service

# create .env from the example and configure it
cp .env.example .env

# install dependencies
npm ci
```

#### Running DEV
```bash
npm run start:dev
```

#### Running Production
```bash
npm run build
npm run start:prod
```

#### TypeORM Migrations

*Note*: The source is located at the path `<root_dir>/typeorm/source.ts`

```bash
# generate
npm run typeorm:generate <name>

#run
npm run typeorm:migrate
```

## Environment Configuration

|  Name    |  Default value  |   Description   |
| ---- | ---- | ---- |
| `PORT`    |  `4000`   |   port on which the application will listen for incoming requests   |
| `NODE_ENV`    |   `development`   |   mode for the application (development or production).   |
| `POSTGRES_HOST`    |   `localhost`   |  hostname of the PostgreSQL database   |
| `POSTGRES_PORT`    |   `5432`   |   port of the PostgreSQL database   |
| `POSTGRES_DB`    |  -  |   name of the PostgreSQL database   |
| `POSTGRES_USER`    |   -   |   user of the PostgreSQL database   |
| `POSTGRES_PASSWORD`    |  -  |   password of the PostgreSQL database   |
| `POSTGRES_LOG_DIR`    |   `/var/log/postgres`   |   the directory for storing PostgreSQL log files (**only for the Docker ENV**)   |
| `LOG_LEVEL`    |  `warn`  |   Nest.js logging level   |
| `LOG_FILE_SIZE`    |  `32`  |   max size of the log file in `kB`   |
| `CRYPT_SALT`    |  -  |      |
| `JWT_SECRET_KEY`    |  -  |      |
| `JWT_SECRET_REFRESH_KEY`    |  -  |     |
| `TOKEN_EXPIRE_TIME`    |  `1h`  |      |
| `TOKEN_REFRESH_EXPIRE_TIME`    |  `24h`  |      |


## Vulnerabilities Testing using Docker Scout

To test Docker images follow these steps:

### Installation 

Ensure Docker Scout is installed in your local environment alongside [Docker Desktop](https://www.docker.com/products/docker-desktop/) or install it manually using the [documentation](https://docs.docker.com/scout/install/).

Additionally you can use [Docker Scount CLI image](https://hub.docker.com/r/docker/scout-cli) to run the application in a container:
```bash
docker run -it \
  -e DOCKER_SCOUT_HUB_USER=<your Docker Hub user name> \
  -e DOCKER_SCOUT_HUB_PASSWORD=<your Docker Hub PAT>  \
  docker/scout-cli <sub command>
```


### Run Docker Scout: 
- To simplify scanning the app's images you can run the npm command:
     ```bash
     npm run docker:scout
     ```
- or test manually specifying Docker images you wish:  
     ```bash
     docker scout cves <image_name>
     ```


## Application Testing Scripts

The source code includes testing scripts that can be executed from the root directory after launching the application. Simply run the command `npm test:auth` to initiate the testing process.

## Swagger Documentation

Access the Swagger documentation by navigating to `http://localhost:{PORT}/doc` in your web browser, replacing `{PORT}` with your application's port number. Explore and interact with API endpoints using the Swagger UI for detailed documentation and testing capabilities.
