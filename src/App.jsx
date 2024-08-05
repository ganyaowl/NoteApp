import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useNotes } from "./lib/useNotes";
import { Note } from "./notes/Note";
import { Time } from "./time/Time";
import { create } from "zustand";

function App() {
  const noteCount = useNotes((state) => state.getNoteCount());
  const addNote = useNotes((state) => state.addNote);
  const removeNote = useNotes((state) => state.removeNote);
  const [mode, setMode] = useState("none");
  const [content, setContent] = useState("");
  const [selectedNotes, setSelectedNotes] = useState([])
  useEffect(() => {setSelectedNotes([])}, [noteCount])

  function setModeOrReset(value){
    setMode(state => state != value ? value : "none")
  }

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <h1>NoteApp</h1>
            </li>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <button class="glow-on-hover" onClick={() => {
                setModeOrReset("create")
              }}>Create</button>
            </li>
            <li>
              <button class="glow-on-hover" onClick={() =>{
                for(const index of selectedNotes){
                  removeNote(index)
                }  
              }}>Delete</button>
            </li>
            <li>
              <button onClick={() =>{
                Notification.requestPermission();
              }}>Notification</button>
            </li>
            <li>
              <Time />
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>Notes:</h2>
        <article>
          <ul>
            {[...Array(noteCount)].map((_,index) => <Note noteId={index} selected={selectedNotes.includes(index)} setSelected={value => {
              if(value){
                setSelectedNotes([...selectedNotes, index])
              } else {
                const notes = [...selectedNotes]
                notes.splice(notes.indexOf(index), 1)
                setSelectedNotes(notes)
              }
            }}/>)}
          </ul>
        </article>
        {mode == "create" && <aside>
          <h3>Create New Note</h3>
          <input value={content} onChange={event => {setContent(event.target.value)}} type="text" />
          <button disabled={content.length == 0} onClick={() => {
            addNote({
              content
            })
            setContent("")
          }}>Submit</button>
        </aside>}
      </main>
      <div className="grow" />
      <footer>
        <p>&copy; 2024 NoteApp - Created by Ganijon Tashmatov</p>
      </footer>
    </>
  );
}

export default App;
