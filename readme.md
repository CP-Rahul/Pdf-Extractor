# PDF Extractor 

## Description
This web application allows users to upload a PDF file and extract certain pages from it to create a new PDF. Users have the flexibility to select which pages they want to include in the new PDF.

## Setup the project

- Download project from github and open it in your favourite text editor.

### Requirements

- Node.js (v12 or higher)
- MySql

### backend

- Go inside the backend folder and execute the following command:

```
npm install
```

- In the root directory create a `.env` file and add the following env variables
  example:
  ```
      PORT=3000
      SALT=8
      JWTSECRET='mysecret'
      JWTEXPIRY='1h'
  ```
- In the root directory create a public folder inside public folder add a temp folder
- go inside the `src` folder and execute the following command:
  ```
    npx sequelize init
  ```
- By executing the above command you will get migrations and seeders folder along with a config.json inside the config folder.
- If you're setting up your development environment, then write the username of your db, password of your db and in dialect mention whatever db you are using for ex: mysql, mariadb etc
  example:
  ```
  {
  "development": {
    "username": "root",
    "password": "db_password",
    "database": "database_name",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
  }
   ```
- To run the server execute

```
npm start
```

### frontend

- Go inside the frontend folder and execute the following command:

```
npm install
```

- To run the client execute

```
npm run dev
```
### Folder Structure - Backend

`src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests.

Lets take a look inside the `src` folder

 - `config` -> In this folder anything and everything regarding any configurations or setup of a library or module will be done. For example: setting up `dotenv` so that we can use the environment variables anywhere in a cleaner fashion, this is done in the `server-config.js`. One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here. 

 - `routes` -> In the routes folder, we register a route and the corresponding middleware and controllers to it. 

 - `middlewares` -> they are just going to intercept the incoming requests where we can write our validators, authenticators etc. 

 - `controllers` -> they are kind of the last middlewares as post them you call you business layer to execute the budiness logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output. 

 - `repositories` -> this folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM queries will go here.

 - `services` -> contains the buiness logic and interacts with repositories for data from the database

 - `utils` -> contains helper methods, error classes etc.

 - `public` -> contains the static files.

 ### Folder Structure - Frontend

 `src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests.

Lets take a look inside the `src` folder

 - `components` -> This folder contains all the reusable UI components.
 - `utils` -> contains helper methods and constant etc.




