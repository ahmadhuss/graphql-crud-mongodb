// Docker Command notes:

// Build our docker image
docker build -t gql:latest .

// Run our docker image that resides on the container
docker run -d -p 3000:3000 gql

// I want to see the output in the console so start containers without detach mode
docker compose up

// I don't want to see the output in the console so start containers without detach mode
docker compose up -d

// Docker process status only show the status of running containers, it will not show stop containers
docker ps

// Docker process status with `-a` flag will also show the running containers + stop containers
docker ps  -a

// Docker delete the stop or both containers
docker rm containerId

# Bring down all the or stopped all the containers
docker compose down

// After deleting both docker containers, our mongodb data will be persisted if we rerun the containers
// docker compose up

# Build the docker containers again without cached
docker compose down # stop all the containers
docker compose build # rebuild the both containers in yml
docker compose up # rerun the build containers



