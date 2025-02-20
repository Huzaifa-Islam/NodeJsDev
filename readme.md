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
case 4 - next is given before res.send in the first route handler -- error will come just as case 2 but the response will be send from second route handler becase next is given before the res.send in the first route handler
case 5 - there are couple of route handlers but res.send is not given anywhere so the request will hang just like case 1
case 6 - next is given in all the route handlers but res.send is not given (in case 5 the next was not given in the last route hanlder so the request got hanged) but in this case since next is there in the last route handler as well, we will get 404 path not found bcz next is given in the last router and there is not res.send so it will try to find the next route handler which if missing will lead to this 404 resp from server

we can make route handlers as array as well.. app.use("/route, [routehandler1, routehandler2], routehandler3, [routehandler4, routehandler5])

Anothe way/syntax of write route handlers

what is a middleware? How expressJs handles request behind the scene

Check the diff btw app.use and app.all