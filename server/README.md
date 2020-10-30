# Boilerplate API

## Configuration

After checkout of a repository, please perform the following steps in exact sequence:

1. Create `.env` file from `.env.dist`
    ```
    $ cp .env.dist .env
    ```

    Remember to fill up required values in `.env`

2. Run `npm i`

3. Run `npm run docker-build`

4. Run watch - `npm run watch`

## Dev setup

This app is fully dockerized, so in order to use it you have to have docker and docker-compose installed. What's more you need to have npm in order to run npm scripts.

1. In order to run the whole app type:

    ```
    npm run start
    ```

2. In order to watch files for dev purpose type:

    ```
    npm run watch
    ```

3. If you need to close all containers run:

    ```
    npm run down
    ```

4. To get into Docker container's shell:

    ```
    npm run shell
    ```

## Code generation

We're using Plop for routes, models, actions, graphql (queries and mutations), commands and handlers generation.

```
npm run plop
```

## Code style

We're using Prettier and ESLint to keep code clean. In order to reformat/check code run:

```
npm run lint
npm run format
```

## Database migrations

Migrations should be stored inside migrations directory.

Easiest way to create a migration is to generate it from entity/ies:

```
npm run generate-migration -- <migration-name>
```

This should generate a migration for all connected entities.

## Adminer setup

Adminer is configured in `docker-compose.override.yml` and should work out of the box on port 8080. To login to adminer use the following values:
```
Database type: postgres
Server: postgres
User: postgres
Password: password
Database: app
```

Of course, if any of this is changed via configuration or otherwise, then these changes must be reflected here as well.

## Tests

There are two types of tests:

- integration: `npm run integration`
- units: `npm run units`