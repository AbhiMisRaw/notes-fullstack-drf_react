import { useState, useEffect } from 'react'
import api from '../api'

import Note from '../components/Note'
import "../styles/Home.css"

function Home(){
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api.get("/api/notes/")
            .then((res) => res.data)
            .then((data)=>{
                setNotes(data);
                console.log(data);
            })
            .catch((err)=> alert(err));
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res)=>{
            if(res.status === 204){
                alert("Note deleted");
                getNotes();
            }
            else{
                alert("Failed to delete note");
            }
        }).catch((err)=>alert(err));
        getNotes();
    }

    const createNote = (e) => {
        e.preventDefault();
        api.post("/api/notes/", {content, title}).then((res)=>{
            if(res.status=== 201){
                alert("Note Created");
                getNotes();
            }else{
                alert("Failed to create a note");
            }
        }).catch((err)=> alert(err));
        
    }

    return <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note)=><Note note={note} onDelete={deleteNote} key={note.id} />)}
            <hr />
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor='title'>Title</label>
                <input 
                    type='text'
                    id="title"
                    name="title"
                    onChange={(e)=> setTitle(e.target.value)} required
                    value={title}
                    />

                    <label htmlFor='content'>Content</label>
                <textarea 
                    type='text'
                    id="content"
                    name="content"
                    onChange={(e)=> setContent(e.target.value)} required
                    value={content}
                    />
                    <br />
                    <input type='submit' value="Submit"></input>
            </form>
        </div>
    </div>
}

export default Home