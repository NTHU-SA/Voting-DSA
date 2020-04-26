# Voting-DSA

This is a project for NTHU Voting.


## Install & Run

1. `npm install`
2. create file named 'server/config.js' and fill it accroding to file 'server/defailt-config.js'
3. `npm start`

## Docker Compose

- `cp .env.example .env` # you can modify the `.env` file
- `docker-compose config` # check the configuration
- `docker-compose build`
- `docker-compose up` / `docker-compose up -d`

how to stop?

- `Ctrl+c` twice /  `docker-compose down` # make sure your working dir has `docker-compose.yml` file

