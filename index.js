const express = require('express');
const { connection } = require('./config/db');
const { authentication } = require('./middileware/authentication');
const { todoController } = require('./routes/todo.routes');
const { userController } = require('./routes/user.routes');
require("dotenv").config();

// const PORT = process.env.PORT
const PORT = 8080
const app = express();

app.use(express.json());

app.get("/", (req,res) => {
    res.send('hello, welcome to homepage')
})

app.use("/user", userController);

app.use(authentication)

app.use("/todos", todoController)

app.listen(PORT,async () => {
    try{
        await connection
        console.log('connected to db')
    }
    catch(err){
        console.log('error connecting to db')
        console.log(err)
    }
    console.log(`localhost ${PORT} started`)
})