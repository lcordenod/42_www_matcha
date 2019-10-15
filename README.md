# 42_www_matcha
Creating a dating site using React, Node JS and MySQL

## Intro

Objective of this project is to create a complete dating website that allows users to search, discover profiles according to their preferences and geolocation, show them some love with real-time likes, notifications and chat if both profiles match.

Team of 2: Raphaël ([GitHub](https://github.com/M4sterCiel)) and I.

### Stack

* Node JS (Express)
* React JS
* Materialize CSS and Material UI Front libraries
* Redux JS
* MySQL
* JSON web tokens
* Axios for API requests
* Websockets (socket.io) for real-time
* Google Maps/Geolocator APIs for geolocation

### Features

My Matcha project handles:
* DB creation script
* User creation and authentication using token
* Pictures upload and default profile picture
* Complete user profile page with gender, bio, location, interests details...
* User profile edition (password, details, preferences)
* Profiles discovery based on matching algorithm and user preferences
* Popularity score calculated for each user based on interactions with other profiles
* Profiles search with filters (gender, interests, age and location ranges...) with immediate update
* Real-time notifications for likes, profile views and matches
* Real-time chat if two profiles match
* User ability to block or report another profile
* Email notifications for authentication and password reset (with auth key)
* Change and reset of email/forgot password with ID validation
* Profile, pictures deletion and user DB cleanup
* Responsive design from mobile to desktop/tablet
* User input and upload checks (front/backend)
* Password hashing (Whirlpool)
* HTML/Javascript/SQL injections prevention

Discover more details below.

## User account

### User creation and authentication

User input has been secured on front and back end with immediate feedback for front end input validation. Also password security has been taken seriously with multiple layers of complexity validated on the go, including:
* A lowercase letter
* A uppercase letter
* A number
* A minimum of 8 characters

Password will be hashed (sha512) with a salt for 5 iterations first before being saved in the DB.

![User creation screen with input](https://user-images.githubusercontent.com/45239771/66834597-3e23ab00-ef5e-11e9-8e8c-51e5ca62706e.png)
<p align=center><i>User creation screen with input</i></p>

Before saving user, several checks will also be runned in the background, including:
* Verifying if user already exists
* Verifying if email is already used
* Verifying (as said earlier) if input is in the right format required

Once user is created, he will be receive an email to verify his account, while account isn't validated, he wont be able to access the app (a message will be displayed to inform him).

### Forgot and change of password

If user has forgotten his password, he will be able to retrieve using his email, a password reset link will be sent to his email address entered.

The reset of password link will have a unique ID, which will be the latest link sent, others will be made deprecated. This provides security to prevent intruders from resetting someone else password.

### User profile

#### Complete profile

If user hasn't completed his profile, he will be invited to do so in order to access profiles discovery and be able to find the one.

#### Information edition

As said above, he will be invited to complete his profile from the discovery view, but he can also edit his profile at any time to change information such as:
* Gender
* Sexual Orientation
* Details like Firstname, Lastname, Bio and Birthdate
* City (list or geolocation)
* Interests tags

![User information edition](https://user-images.githubusercontent.com/45239771/66844629-e8a3ca00-ef6e-11e9-900d-68386108525d.png)
<p align=center><i>User information edition</i></p>

#### Pictures upload

User is able to upload up to 5 pictures, he needs at least one to be able to match with someone. The upload is protected against wrong input checking the picture object size and format as well as file size to avoid having wrong images.

![Pictures upload](https://user-images.githubusercontent.com/45239771/66844775-2dc7fc00-ef6f-11e9-9b1f-60e732028d6a.png)
<p align=center><i>Pictures upload</i></p>

##### Profile picture

User will necessarily have a profile picture when uploading pictures, the first picture uploaded will become the default profile one. He will also be able to edit it by clicking on the make default profile picture button above the picture he wants to.

##### Picture delete

User is able to delete a picture, if he deletes the picture set as default profile picture, it will make the closest picture the default profile one.

### User acccount settings

![Account settings](https://user-images.githubusercontent.com/45239771/66845474-58ff1b00-ef70-11e9-96d7-b5d9a84f931c.png)
<p align=center><i>Account settings</i></p>

#### Preferences

User is able to set his default discovery settings so that the matching algorithm will improve the accuracy of the profiles suggested.

#### Edit email and password

User is able to modify his email and password from the account settings modal, password will be hashed.

#### Delete account

User is able to delete his account as well, this will remove him from database and other users no longer will be available to match with him/her.

### Profiles management

User is able to see the profiles he visited, liked and blocked in order to easily retrieve them.

![Profiles management](https://user-images.githubusercontent.com/45239771/66847515-cb252f00-ef73-11e9-8ba7-6e5d5b64b159.png)
<p align=center><i>Profiles management</i></p>

## Profiles discovery

Once the user has completed his profile, he will have access to the profiles discovery feature.

![Profiles discovery](https://user-images.githubusercontent.com/45239771/66847856-5ef6fb00-ef74-11e9-8838-ad62ea2995e1.png)
<p align=center><i>Profiles discovery</i></p>

### Matching algorithm


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
