PROJECT_NAME ?= reachout-backend
DOCKER_DEV_COMPOSE_FILE := docker/dev/docker-compose.yml
DOCKER_TEST_COMPOSE_FILE := docker/test/docker-compose.yml

# a variable that stores application's container id if the container is running
CONTAINER_ID := $(shell docker-compose -f docker/dev/docker-compose.yml ps -q app)
ifeq ($(CONTAINER_ID),)
	CONTAINER := $(shell docker-compose -f docker/dev/docker-compose.yml ps -q app)
else
	CONTAINER := $(shell docker ps -q --no-trunc | grep $$(docker-compose -f docker/dev/docker-compose.yml ps -q app))
endif

start: 
	@${INFO} "Creating postgresql database volume"
	@ docker volume create --name=reachout_data > /dev/null
	@ echo "  "
	@ ${INFO} "Building required docker images"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) build app
	@ ${INFO} "Build Completed successfully"
	@ echo " "
	@ ${INFO} "Starting local development server"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) up

test:
	@${INFO} "Preparing required docker images"
	@ docker-compose -f ${DOCKER_TEST_COMPOSE_FILE} build test
	${INFO} "Running local reachout test suites"
	@ docker-compose -f ${DOCKER_TEST_COMPOSE_FILE} run --rm test
	${INFO} "Stop and remove docker containers"
	@ docker-compose -f $(DOCKER_TEST_COMPOSE_FILE) down
	${SUCCESS} "Docker containers successfully removed"

## run migrations, the application needs to be running using make start
migrate:
ifeq ($(CONTAINER),)
	$(call container_err)
else
	${INFO} "Running travela migrations"
	@docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) exec app yarn db:migrate
	${SUCCESS} "Migration executed successfully"
endif

## Remove all development containers and volumes
clean:
	${INFO} "Cleaning your local environment"
	${INFO} "Note all ephemeral volumes will be destroyed"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) down -v
	# @ docker-compose -f $(DOCKER_TEST_COMPOSE_FILE) down -v
	@ docker volume rm reachout_data
	@ docker images -q -f label=application=$(PROJECT_NAME) | xargs -I ARGS docker rmi -f ARGS
	${INFO} "Removing dangling images"
	@ docker images -q -f dangling=true -f label=application=$(PROJECT_NAME) | xargs -I ARGS docker rmi -f ARGS
	@ docker system prune
	${INFO} "Clean complete"


# COLORS
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
NC := "\e[0m"
RESET  := $(shell tput -Txterm sgr0)

# Shell Functions
INFO := @bash -c 'printf "\n"; printf $(YELLOW); echo "===> $$1"; printf "\n"; printf $(NC)' SOME_VALUE
SUCCESS := @bash -c 'printf "\n"; printf $(GREEN); echo "===> $$1"; printf "\n"; printf $(NC)' SOME_VALUE
