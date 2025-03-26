#### Explanation:

`services:` Defines the services (containers) to be run.

`mongodb:` Defines the MongoDB service.

`image: mongo:latest:` Specifies the MongoDB image to use (latest version). You can also specify a specific version.

`container_name: mongodb:` Assigns a name to the container.

`restart: always:` Ensures the container restarts automatically if it crashes.

`environment:` Sets environment variables for the MongoDB container.

-  `MONGO_INITDB_ROOT_USERNAME:` Sets the root username.
-  `MONGO_INITDB_ROOT_PASSWORD:` Sets the root password.

`ports:` Maps the container's port (27017) to the host's port.

`volumes:` Creates a persistent volume for the MongoDB data.

- `mongodb_data:/data/db:` Maps the named volume `mongodb_data` to the `/data/db` directory inside the container.

- `volumes:` Defines the named volume `mongodb_data`

#### How to Use

1. Save the ode as `compose.yaml`.

2. Open a terminal and navigate to the directory where you saved the `compose.yaml` files.

3. Execute the command `docker compose up -d` to start the MongoDB container in detached mode.

4. You can connect to the MongoDB instance using `mongo` command: `mongo --username admin --password password pp authenticationDatabase admin --host localhost`

#### Notes

- Replace `admin` and `password` with your desired username and password.

- You can use `docker compose down` to stop the containers.

- You can use `docker compose ps` to check the status of the containers.

- You can use `docker compose logs` to check the logs of the containers.