import axios from "axios"
import { useEffect, useState } from "react"

const baseUrl = 'http://localhost:4000/notes'
export default function Notes() {
    const [desc, setDesc] = useState('')
    const [notes, setNotes] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [targetNote, setTargetNote] = useState({})
    const [showAll, setShowAll] = useState(true)



    useEffect(() => {
        axios.get(baseUrl)
            .then(response => {
                console.log(response)
                setNotes(response.data)
            })
    }, [])

    const filteredNotes = showAll
        ? notes
        : notes.filter(n => n.important === true)

    const handleChange = (event) => {
        console.log(event.target.value)
        setDesc(event.target.value)
    }

    const handleAdd = (event) => {
        event.preventDefault()
        const newNote = {
            desc: desc,
            important: Math.random() < 0.5
        }

        axios.post(baseUrl, newNote)
            .then(response => {
                console.log(response.data)
                setNotes(notes.concat(response.data))
            })
        setDesc('')
    }

    const handleDelete = (noteId) => {
        if (window.confirm(`Are you sure to delete note with id ${noteId}`)) {
            axios.delete(`${baseUrl}/${noteId}`)
                .then(response => {
                    console.log(response)
                    setNotes(notes.filter(n => n.id !== noteId))
                })
        }
    }
    const handleEdit = (noteId) => {
        const targetNote = notes.find(n => n.id === noteId)
        setDesc(targetNote.desc)
        setIsEdit(true)
        setTargetNote(targetNote)
    }

    const handleSave = (event) => {
        event.preventDefault()
        axios.put(`${baseUrl}/${targetNote.id}`,
            { ...targetNote, desc: desc })
            .then(response => {
                console.log(response.data)
                const updatedNotes = notes.map(n => n.id === targetNote.id ?
                    { ...targetNote, desc: desc }
                    : n)
                setNotes(updatedNotes)
            })
        setIsEdit(false)
        setDesc('')
    }
    const handleImportant = () => {
        setShowAll(!showAll)
    }
    return (
        <>
            <h1>Notes App</h1>
            <button onClick={handleImportant}>
                show {showAll ? 'important' : 'all'}
            </button>
            <ul>
                {
                    filteredNotes.map(note =>
                        <li key={note.id}>
                            {note.desc}
                            {' '}
                            <button onClick={() => handleDelete(note.id)}>delete</button>
                            <button onClick={() => handleEdit(note.id)}>edit</button>
                        </li>)
                }
            </ul>
            <br />
            <form>
                <input
                    type="text"
                    value={desc}
                    onChange={handleChange}
                />
                {' '}
                {
                    isEdit ?
                        <button onClick={handleSave}>Save</button>
                        : <button onClick={handleAdd}>Add</button>
                }

            </form>
        </>
    )
}