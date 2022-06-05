const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}



const app = express();
app.use(cors(corsOptions));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/keepDB",{useNewUrlParser:true});
const noteSchema={
    title: String,
    content: String
};
const Note =mongoose.model("Note",noteSchema);
app.get("/notes",function(req,res){
    Note.find(function(err,results){
        if(!err){
            
        res.send(JSON.stringify(results));}
        else{res.send(err);}
    });
});
app.post("/notes",function(req,res){
   
   
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content 
    });
    newNote.save(function(err){
        if(!err){
            res.send("successfully added");
        }
        else{
            res.send(err);
        }
    });
});
app.delete("/notes/delete/:id",function(req,res){
   Note.deleteOne({_id: req.params.id },(err,result)=>{if(err){throw err;}res.send(result)});

});
app.listen(3000,function(){
console.log("server started on port 3000");
});