# Simple CRUD NodeJS API docs

## Prerequisite

   - Node.js version 20 LTS

   ## User interface

    {
      "id": string,
      "username": string,
      "age": number,
      "hobbies": Array of string or empty array
    }

  - `id` — unique identifier (`string`, `uuid`) generated on server side
  - `username` — user's name (`string`, **required**)
  - `age` — user's age (`number`, **required**)
  - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)



## Install
  - Clone repository: `git clone https://github.com/VladimirM89/CRUD_Simple_App.git`
  - Switch to branch **develop** - `git checkout develop`
  - Install dependencies: `npm install`
  - Create in the project root directory file `.env` with **PORT=4000** or another port you want


## Run the app
   - To start app in **developer** mode enter `npm run start:dev`
   - To start app in **production** mode enter `npm run start:prod`
   - To build app in **production** mode enter `npm run build`


## Run the tests

  - To test enter `npm run test`

# REST API Documentation

  The REST API **Simple CRUD NodeJS app** is described below.
  Server will start on address: **http://localhost:PORT**

## Get all users

### Request

`GET /api/users`

### Response

    CODE: 200

    Returned value:
    [
      {
        "id": "96b0f1d8-812e-44d5-9687-6c69e57b8854",
        "username": "Vladimir",
        "age": 23,
        "hobbies": ["node.js"]
      }
    ]
      or
    []

## Get specific user

### Request

`GET /api/users/{userID}`  userId should be in uuid format

**EXAMPLE:** `/api/users/96b0f1d8-812e-44d5-9687-6c69e57b8854`

### Response

    CODE: 200

    Returned value:
    {
      "id": "96b0f1d8-812e-44d5-9687-6c69e57b8854",
      "username": "Vladimir",
      "age": 23,
      "hobbies": ["node.js"]
    }

  **If user not exist:**

    CODE: 404

    Returned value:
    {
     "message": "User not found"
    }

## Create a new user

### Request

`POST /api/users/`

    Request:
    {
      "username": "John",
      "age": 34,
      "hobbies": []
    }

### Response

    CODE: 201

    Returned value:
    {
      "id": "699efcb8-ff48-4cac-9573-8f90c665931c",
      "username": "John",
      "age": 34,
      "hobbies": []
    }

  ### In case data in request is not contained required fields:

  ### Request

`POST /api/users/`

    Request:
    {
      "username": "John",
      "age": 34,
    }

### Response

    CODE: 400

    Returned value:
    {
      "message": "Fields 'username', 'age' and 'hobbies' are required"
    }

## Update user

### Request

`PUT /api/users/{userID}`  userId should be in uuid format

**EXAMPLE:** `/api/users/699efcb8-ff48-4cac-9573-8f90c665931c`

    Request:
    {
      "username": "John Dir",
      "age": 18,
    }

### Response

    CODE: 200

    Returned value:
    {
      "id": "699efcb8-ff48-4cac-9573-8f90c665931c",
      "username": "John Dir",
      "age": 18,
      "hobbies": []
    }
    
  **If user not exist:**

    CODE: 404

    Returned value:
    {
     "message": "User not found"
    }



## Delete user

### Request

`DELETE /api/users/{userID}`  userId should be in uuid format

**EXAMPLE:** `/api/users/699efcb8-ff48-4cac-9573-8f90c665931c`

### Response

    CODE: 204

    No returned value

  **If user not exist:**

    CODE: 404

    Returned value:
    {
     "message": "User not found"
    }

## Common cases

## User id in invalid format

In case executing PUT, GET (specific user), DELETE methods **userID** in wrong format:
### Response

    CODE: 400

    Returned value:
    {
     "message": "Invalid format ID"
    }


## Data in request invalid format

In case data in request in PUT, POST methods in wrong format:

### Request

**EXAMPLE:** 

    Request:
    {
      "username": "John Dir"
      age: 18
    }

### Response 

    CODE: 400

    Returned value:
    {
     "message": "Invalid request format"
    }


## Server error

In case something went wrong on server side:


### Response

    CODE: 500

    Returned value:
    {
     "message": "Internal server error"
    }






