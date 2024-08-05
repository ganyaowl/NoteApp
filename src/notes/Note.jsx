import { useNotes } from "../lib/useNotes";

export function Note({ noteId, selected, setSelected }) {
  const note = useNotes((state) => state.getNote(noteId));
  const removeNote = useNotes((state) => state.removeNote);
  const setNote = useNotes((state) => state.setNote);
  return (
    <li key={noteId}>
      <details>
        <summary>
            <input type="checkbox" checked={selected} onChange={event => setSelected(event.target.checked)}/>
        </summary>
        <textarea value={note.content} onChange={event => {
            setNote(noteId, {...note, content: event.target.value})
        }}/>
        <button onClick={() => {
            removeNote(noteId)
        }}>Delete</button>
        <input type="datetime-local" value={note.time} onChange={event => {
          setNote(noteId, {...note, time: event.target.value});
        }}/>
      </details>
    </li>
  );
}
