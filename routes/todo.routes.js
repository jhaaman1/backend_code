const {Router} = require('express');
const { TodoModel } = require('../models/Todo.model');

const todoController = Router();

todoController.get("/",async(req,res,next) => {
    const todos = await TodoModel.find({userId: req.body.userId})
    res.send(todos)
})

todoController.post("/create",async (req,res) => {
    const {taskname, status, tag, userId} = req.body;
    const todo = new TodoModel({
        taskname,
        status,
        tag,
        userId
    })
    try{
        await todo.save();
        res.send("todos created")
    }
    catch (err){
        console.log("err find")
        console.log(err);
    }
})

todoController.delete("/delete/:todoId", async (req,res) => {
    const {todoId} = req.params;
    const deleteNote = await TodoModel.findByIdAndDelete({_id: todoId, userId: req.body.todoId})
    if(deleteNote){
        res.send("delted")
    }
    else{
        res.send('cant delete')
    }
})


todoController.patch("/edit/:todoId", async (req,res) => {
    const {todoId} = req.params
    const updatedNote = await TodoModel.findOneAndUpdate({_id: todoId, userId: req.body.todoId}, {...req.body});
    if(updatedNote){
        res.send("updated")
    }
    else{
        res.send("unable to update")
    }
})




module.exports = {todoController};