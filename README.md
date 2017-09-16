# project_templates-node-js-api
NodeJS api, project template to get started.


## Pre-requisite
* NodeJS installed and set up on class path of your system

## Things to implement
* `app/lib/auth.js`
  * Specify user types (roles) you want to use, in the order from less to more rights in `ROLE_LEVEL` array.
  * Implement your user retrieval code inside `findUserByCredential` function.
* `app/routes/routes.js`
  * Login endpoint and some test endpoints to demostrate how to have an open endoint or a endpoint restricted to specific role types.
  * Add more endpoitns as per your needs.

## How to run?
* Open terminal in your project directory
* Install all required dependencies with `npm install` command.
* Run server with `node app.js` command, or to run in background run `npm start` command.

## How to contribute?
Report any bugs at https://github.com/inpratik13/project_templates-node-js-api/issues  
Contribute to code by creating new branch, and submit the pull request with detailed descriptions of improvements your code makes or the bugs fixed in it.


**Thanks**
