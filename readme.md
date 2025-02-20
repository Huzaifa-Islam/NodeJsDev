Lets create a new project for dev tinder backend  mircroservice
now lets create a src folder and inside it create app.js
give a simple console.log("hello") in app.js
To run this file run this command in terminal and a log will appear--> node src/app.js

Lets create a server
instead of using http module provided by node, we will use Express which is wrapped over that http module and makes things easier
To install --> npm i express

Install nodemon so that server restart automatically on any change--> npm i -g nodemon 

Route Handlers scenarios:
case 1 - where request will hang in btw as the res.send is not given to send back the response
case 2 - next is given and in the second route handler the res.send is given 
case 3 - next is given but res.send is given in the first route handler as well (next is given after res.send) - error will come in the console althought he server will respond properly 