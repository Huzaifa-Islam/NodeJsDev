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
whenever we do anything in the db (like add/delete a data) it will always return a promise so use async and await
created a signup api call to add a data to user. Alwasy wrap things in try catch block to handle the errors properly.
use postman to call the signup api and see if the data is added in the mongodb. 
devTinder(databse)--users(collection)--documents(user which gets added)--fields(name, emailId, pwd that the document contains)
Two fields _id and __v is added by mongo db on its own

How to push dynamic data to api.. Meaning the body data in the post call from the postman

Diff btw javascript object and json

To read the body data from the request -- we need a middleware (express.json) which we will use for all the apis to get the body in json format. if we dont use it and try to log req.body we will get undefined

Tried these mongoose functions -- 
User.save() --> to save the document in a db
User.find() --> to fetch document from db we can pass filters inside like User.find({emailId: userEmail})
User.findOne() --> to fetch only one document 
User.findByIdAndDelete(id) --> to delete a record by id
User.findByIdAndUpdate(id,datatoUpdate) --> to update an existing record

Lets do some data sanitization and put some validations as  our database is vulnerable.. User can insert any data into our db
we can put strict checks in the schema only (read mongoose docs)
used these validation things -- minLength, maxLenght, min, max, required, unique, validate, lowercase, trim, default
validate dont work on the patch api to make it work we have to set runValidators as true as a parameter in the findByIdAndUpdate function.
In the schema there can be another parameter where we can set timestamps as true so as to see when the user signed up or updated the info.

we can use validator library from npm to validate strings only like email, strong pwd, etc. Refer to doc. 
npm install validator 

lets encrypt the password-- we will use npm pacakge bcrypt
created signup api and store hashed password
then created login api and handle error scenarios properly. In the error msg never leak any sensitive info like email do not exist in DB. give generic messages like invalid creds.

Lets use some advanced authentication techniques like JWT token. How cookies is used. cookie parser (to read a cookie at the server side). Create an auth middleware. Validata users.
Whenver user logs in, server will create a jwt token store it inside a cookie and send it back via a response. expiry time for the token can be set. Now whenever a user makes a new call, this token has to be a part of the req coming from the client and server will validate the token first. If success the user req will be served or else the user will be redirected to the login page.

npm i cookie-parser
we need this to read the cookie at the server just like we need express.json to read the json request

Lets install the jsonwebtoken -- npm i jsonwebtoken
jwt.sign(<give the user id>, <SecretKey>) it will create a new token
jwt.verify(<tokenThatComesAsCookie>, <SecretKey>) it will verify the token and give the object containing user id and iat (added by jwt).
Then we can find the user by id 
To expire a toke, jwt.sign recieves a third argument as expiresIn there we can give the time till when the token should be active
Cookies can also be expired and we can pass other options like httpOnly in res.cookies read the documen on expressjs.com
Lets write an auth middleware

Lets offload few thigns like creating a token to model file called as schema methods.

Lets list down list of apis that we will to build
Group multiple routes under respective routers
we will use express Router

Schema Validation - "pre" function which is called before .save happens. So we can also use schema validations just like we use schema methods. again in shcema validation use older funciton method not the arrow function

Read about logical queries $or, $and, etc on mongodb

Whenever there are many records like in millions the search query becomes expensive and takes a lot of time to process. So there is concpet of index which can be attached to the schema and it makes query faster. read more about this on mongoose.
There is a concept of compound indexes as well for queries where there is or/and , etc operations. read about it on mongodb 
like for user schema if we want to put index on first name we can do it like -- userSchema.index({firstName:1})
if we want to query firstName and lastName of a user together then its called compound indexes -- userSchema.index({firstName:1, lastName:1})
Creating indexes unnecessarily also comes with a cost.. so make indexes optimally for required fields only. 

ref and populate in mongoose. Read the docs. (to make connection btw two collections)

Read about $nin, $ne and other querie operators

Add pagination
/feed?page=1&limit=10 => 1-10 first 10 users
/feed?page=2&limit=10 => 11-20
/feed?page=3&limit=10 => 21-30 

In mongoDB two important functions .skip() and .limit()


/feed?page=1&limit=10 => 1-10   ==> .skip(0) & .limit(10)
/feed?page=2&limit=10 => 11-20  ==> .skip(10) & .limit(10)
/feed?page=3&limit=10 => 21-30  ==> .skip(20) & .limit(10)
