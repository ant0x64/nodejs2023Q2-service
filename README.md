# Home Library REST API Service

Home Library REST API servcice built with the [Nest.js framework](https://github.com/nestjs/nest) and adhering to best practices, enables users to seamlessly execute CRUD operations on Artists, Tracks, and Albums. Additionally, there is implemented Observer events using [RxJS](https://github.com/ReactiveX/rxjs), enhancing real-time data interactions. The API is comprehensively documented with [Swagger](https://github.com/swagger-api/swagger-ui), providing users with clear and accessible insights into its capabilities and endpoints.


## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)


## How to install

1. Clone the respository
   ```bash
   git clone -b dev git@github.com:ant0x64/nodejs2023Q2-service.git
2. Go to the project directory
    ```bash
    cd nodejs2023Q2-service
    ```
3. Install dependencies
    ```bash
    npm ci
    ```
4. Setup the ENV
   
    You can change the ports used in the configuration file `<root>/.env`.

    Base configuration:
    ```env
    PORT=4000
    ```
5. Run the Application
   ```bash
   npm start # default mode
   npm run start:dev # dev mode
   npm run start:prod # prod mode
   npm test # execute testing scripts
   ```

## How to use

Open your web browser and navigate to the following URL: `http://localhost:PORT/doc` (replace `PORT` with the actual port number your project is running on). 

This URL contains the OpenAPI Schema documentation. You can explore and interact with the API endpoints using the Swagger UI.
