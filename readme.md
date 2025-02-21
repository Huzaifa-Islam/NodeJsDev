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

we should always put our code in try catch block

Error handling for all kind of requests can be done in app.use("/",(err,req,res,next)=>{
    //write the code to handle error in a decent way
})

Order of routes matter a lot. So please be careful..

Lets connect our application with a database
we will use Mongoose to connect application to db and for query purposes ==> npm i mongoose

So we should use async await to write the connect code to db
we have a connection string that we are using to connect to the cluster but to reference a specific database we need to write /devTinder to refer to the specific database name

So the way we have written the code to connect to db is not correct there is one issue. -> we are bringing up the server first and then connecting to db. What if while the db is not up and user tried to access some info from the db it will not be correct. So we should first establish a db connection and then start the server.
So once db connection is successfully established we will start the server in the success case

Now we will create a schema and then create a model (model name should start from a capital letter)
Now lets add a user to a db using this model
whenever we do anything in the db (like add/delete a data) it will always return a promise to use async and await
created a signup api call to add a data to user. Alwasy wrap things in try catch block to handle the errors properly.
use postmane to call the signup api and see if the data is added in the mongodb. 
devTinder(databse)--users(collection)--documents(user which gets added)--fields(name, emailId, pwd that the document contains)
Two fields _id and __v is added by mongo db on its own

How to push dynamic data to api.. Meaning the body data in the post call from the postman

Diff btw javascript object and json

To read the body data from the request -- we need a middleware (express.json) which we will use for all the apis to get the body in json format. if we dont use it and try to log req.body we will get undefined

Tried these mongoos functions -- 
User.save() --> to save the document in a db
User.find() --> to fetch document from db we can pass filters inside like User.find({emailId: userEmail})
User.findOne() --> to fetch only one document 
User.findByIdAndDelete(id) --> to delete a record by id
User.findByIdAndUpdate(id,datatoUpdate) --> to update an existing record


