import React,{useState,useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  
  const[notes,setNotes]=useState([]);
  
function addNote(){
 
  fetch("http://localhost:3000/notes").then(response=>{
    return response.json()
  }).then(data=>{setNotes(data)})

}
useEffect(()=>{
  addNote()
 
},[])

function deleteNote(id){
  fetch("http://localhost:3000/notes/delete/"+id,{method:'DELETE',header:{'Accept':'application/json','Content-Type':'application/json'}}).then((result)=> {result.json().then((resp)=>{console.log(resp)})})
 addNote()
}
  return (
    <div>
      <Header />
      <CreateArea
      onAdd={addNote} />
      {notes.map((noteItem)=>{
        return <Note key={noteItem._id} id={noteItem._id} title={noteItem.title} content={noteItem.content} onDelete={deleteNote}/>
      })}
     
      <Footer />
    </div>
  );
}

export default App;
