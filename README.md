# Home Library REST API Service

The service is powered by the [Nest.js framework](https://github.com/nestjs/nest), implementing a CRUD RESTful API with a focus on modularity and architectural coherence. The application utilizes [RxJS](https://github.com/ReactiveX/rxjs) to enable reactive programming principles and [TypeORM](https://github.com/typeorm/typeorm) to define and manage database entities and relationships using object-relational mapping (ORM) techniques.

[Swagger](https://github.com/swagger-api/swagger-ui) facilitates comprehensive API documentation, offering a clear and structured overview of available endpoints and associated functionalities.

To streamline the development and deployment process, environment configuration, Docker containers, and orchestration files are included in the repository.

## Prerequisites

Before installing and running the Home Library REST API service, ensure that the following prerequisites are met:

#### Using Docker
- [Docker](https://www.docker.com/) CLI
- [Docker Scout](https://docs.docker.com/scout/install/) (optional: to scan images for vulnerabilities)

#### Local Machine Environment
- [Node.js](https://nodejs.org/en/download/) with [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/download/)


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


## How to use

### Using Docker

**Caution**: the DockerHub image of the application contains **only production ENV**

```bash
# set required ENV
export POSTGRES_HOST=home_library_service_db
export POSTGRES_DB=database
export POSTGRES_USER=user
export POSTGRES_PASSWORD=password

# create Network
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
  -e POSTGRES_HOST=$POSTGRES_HOST \
  -e POSTGRES_DB=$POSTGRES_DB \
  -e POSTGRES_USER=$POSTGRES_USER \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
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
# run
docker-compose -f docker-compose.prod.yml up -d

# down
docker-compose -f docker-compose.prod.yml down --volumes
```

#### Development ENV
**Caution**: application image is built locally based on `Dockerfile.app`

*Note*: `src` directory is automatically bind as a container's volume, and the application restarts upon any changes made to it.

```bash
# run
docker-compose -f docker-compose.dev.yml up -d

# down
docker-compose -f docker-compose.dev.yml down --volumes
```

### Local Machine Environment

**Caution**: Postgres database must be pre-installed and available

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

```bash
npm run typeorm:migration:generate Name #generate
npm run typeorm:migrate #run
```


## Docker Scout Testing

To test Docker images using [Docker Scout](https://docs.docker.com/scout/install/), follow these steps:

   1. **Installation**: Ensure Docker Scout is installed in your development environment.

   2. **Run Docker Scout**: Execute Docker Scout, specifying the Docker image you wish to test.

      ```bash
      docker scout cves <image_name>
      ```

      Replace `<image_name>` with the name of the Docker image you want to test.

   3. **Monitor Results**: Docker Scout will analyze the image and provide insights into its performance, security, and best practices compliance.

   4. **Act on Findings**: Review the test results and take necessary actions to address any issues or improvements identified.


## Testing Scripts

The source code includes testing scripts that can be executed from the root directory after launching the application. Simply run the command `npm test` to initiate the testing process.

## Swagger Documentation

Access the Swagger documentation by navigating to `http://localhost:{PORT}/doc` in your web browser, replacing `{PORT}` with your application's port number. Explore and interact with API endpoints using the Swagger UI for detailed documentation and testing capabilities.





