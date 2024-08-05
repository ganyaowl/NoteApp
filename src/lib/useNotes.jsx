import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useNotes = create(persist(set => ({
    notes: [], 

    addNote(note){
        set(state => ({
            notes: [...state.notes, note]
        })) 
    },

    setNote(index, note){
        set(state => {
            const notes = [...state.notes]
            notes[index] = note
            return { notes }
        })
    },

    removeNote(index){
        set(state => {
            const notes = [...state.notes]
            notes.splice(index, 1)
            return { notes }
        })
    },

    getNote(index){
        return this.notes[index]
    },

    getNoteCount(){
        return this.notes.length
    }
}),{
    name:"notes-storage"
}))

addEventListener("storage", () => {
    useNotes.persist.rehydrate()
})

setInterval(() => {
    const { notes, setNote } = useNotes.getState();
    for(const index in notes){
        const note = notes[index];
        console.log(note)
        if(!note.time){
            continue
        }

        const time = new Date(note.time);
        if(time <= new Date()){
            new Notification(note.content);
            setNote(index, {...note, time: ""})
        }
    }
}, 1000)