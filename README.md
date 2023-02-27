# AssetPlus Load Balanced Service Starter

A starter app to go from nodejs code all the way to a production deployment.

-----------
## Project config

### Core libraries:
- `NodeJS`
- `ExpressJS`
- `TypeScript`

### Additional libraries:

- `cors` - to enable CORS access
- `helmet` - for basic protection
- `morgan` - for logging
- `dotenv` - to load environment files (only used in local development)

----------

## Local Development

Uses docker compose to run the project locally. Also uses ts-node-dev to monitor typescript file changes and restart the process. The commands have been put in a makefile for ease of use

To start:

```bash
docker-compose up --build -d
```


To stop:

```bash
docker-compose down
```

## Deployment Preparation

We use copilot to deploy our application.

### Application

All services will be deployed in the same application - `platform`

### Environments

There are 2 environments available - `test` and `prod`

### Service

Each project is deployed as a service in the same application - `platform`

---
To create a new service:

```bash
copilot init -a platform -d "./Dockerfile" -t "Load Balanced Web Service" -n {{NAME}}
# Give No when prompted to deploy
```
Then go to `manifest.yml` and change `http-path` to `'/'`
```yaml
http:
  path: '/'
```

---
To deploy/re-deploy the service:

```bash
# In Test
copilot deploy -e test

# In Prod
copilot deploy -e prod
```

----
To delete a service

```bash
# In Test
copilot svc delete -e test -n {{NAME}}

# In Prod
copilot svc delete -e prod -n {{NAME}}
```


### Environment variables

The following command allows us to add a new env var.
```
copilot secret init
```
It will end with instructions to modify the `manifest.yml` file.

After updating the env variable, need to redeploy the service.

## Gitlab CI/CD

Ensure the following Env Variables are added in gitlab

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_DEFAULT_REGION
```