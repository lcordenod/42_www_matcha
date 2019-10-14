# 42_www_matcha
Creating a dating site using React, Node JS and MySQL

## Intro

Objective of this project is to create a complete dating website that allows users to search, discover profiles according to their preferences and geolocation, show them some love with real-time likes, notifications and chat if both profiles match.

### Stack

* Node JS (Express)
* React JS
* Materialize CSS and Material UI Front libraries
* Redux JS
* MySQL
* Axios for API requests
* Websockets (socket.io) for real-time
* Google Maps/Geolocator APIs for geolocation

## Run project

### Environment setup

To run this project, you will need a MySQL database and Node JS server already pre-configured. You can use Bitnami Mamp (MacOS) or Wamp (Windows) for the MySQL database.

The configuration is the following:
* MySQL Database -> Port `3390`
* Node JS server -> Port `8080`
* React app -> Port `3000`

For the web server, we will use an existing Node (Express) JS server, I will explain later how to start it but make sure to have Node and Express installed to run it.

### Create DB

To create the database with already existing users, you can just run the script I have created.

To do so:
* You run it from your shell using command -> `sh back/config/deploy.sh` at root of the project

### Install packages/dependencies

To run the project, you will also need to install some required packages and dependencies, in order to do so:
* Install backend packages/dependencies using command -> `npm i` inside the `back` folder
* Install frontend packages/dependencies using command -> `npm i` inside the `front` folder

### Start servers and website

After having done both previous steps, you can start both MySQL Database from Bitnami software and Node JS server/React app using the following
command -> `npm run dev` from the `back` folder, it will start both.
Then, access the website using the following URL: https://localhost:3000/users/login

Enjoy matches!
[<p align=center>Go up<p>](#42_www_matcha)
