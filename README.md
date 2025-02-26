# Invoice PDF Parser
This project parses a PDF with a specific structure, normalizes it and the register it into a database.

# Running

## Setup
First of all setup the database using:
```sh
docker compose up -d
```

Install dependencies, create database and synchronize entities with tables with:
```sh
yarn
yarn db:create
yarn db:migrate
```

## Start
If you've completed the setup section, then run:
```sh
yarn dev
```
