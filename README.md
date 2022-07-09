# Birthday Service

## Built With

* Express
* Typescript
* Agenda
* Knex


## Getting Started

### Prerequisites
- Mysql Database
- MongoDB

### Installation
- set `.env` file accordingly
- run `yarn install`
- run `yarn migrate`
- run `yarn build`
- run `yarn start`


### Usage

#### API
- POST `/user`
    ```bash
    curl --request POST \
        --url http://localhost:8080/user \
        --header 'Content-Type: application/json' \
        --data '{
        	"firstName": "Jhon",
        	"lastName": "Doe",
        	"date": "09-06-2022",
        	"zone": "Asia/Makassar"
          }'
    ```
    _`zone` use IANA code for time zone and `date` use `dd-mm-yyyy` format_

- DELETE `/user/{id}`