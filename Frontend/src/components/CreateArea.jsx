import React,{useState} from "react";
import axios from 'axios';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom  from "@material-ui/core/Zoom";
function CreateArea(props) {

  const[input ,setinput]= useState({
    title:"",
    content:""

  });
  function handleclicked(event){
    const {name,value}=event.target;
    setinput(prevNote =>{
        return{
          ...prevNote,
          [name]:value
        };
    });
    
 
  }
  function submit(event){
    
    event.preventDefault();
    const Note =input;
    fetch('http://localhost:3000/notes',{
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(Note)
    }).then(()=>{console.log('new note added');})
    setinput({title:"",content:""});
  }
 
  

  return (
    <div>
      <form onSubmit={props.onAdd()} className="create-note">
        <input onChange={handleclicked} name="title" value={input.title} placeholder="Title" />
        <textarea name="content" onChange={handleclicked}
        value={input.content} placeholder="Take a note..." rows="3" />
       <Zoom in={true}><Fab onClick={submit}><AddIcon/></Fab></Zoom> 
      </form>
    </div>
  );
}

export default CreateArea;
