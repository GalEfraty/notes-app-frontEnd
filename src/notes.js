import uuidv4 from 'uuid/v4'
import moment from 'moment'

let notes = []

//Read existing notes from local storage
const loadNotes = () =>
{
    const notesJSON = localStorage.getItem('notes')
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (error) {
        window.alert('there was a problem with the website DATA')
        return []
    }
}

//Save notes to local storage
const saveNotes = (i_Notes) => 
{
    localStorage.setItem('notes', JSON.stringify(notes))
}

//expose notes from modules
const getNotes = () => notes

const createNote = ()=>
{
    const id = uuidv4()
    const timeStamp = moment().valueOf()
    notes.push(
        {
            m_Id: id,
            m_Title: '',
            m_Body: '',
            m_CreatedAt: timeStamp,
            m_UpdatedAt: timeStamp
        }
    )
    
    saveNotes()
    return id
}

const removeNote = (i_NoteID) =>
{
    const noteIndex = notes.findIndex((currentNote) => currentNote.m_Id === i_NoteID)
    
    if(noteIndex > -1)
    {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}

const sortNotes = (i_SortBy) =>
{
    if(i_SortBy === 'byEdited')
    {
        return notes.sort((a, b) =>
        {
            if(a.m_UpdatedAt > b.m_UpdatedAt){return -1} //then a updeted more recent - will be on top
            else if(a.m_UpdatedAt < b.m_UpdatedAt){return 1}
            else {return 0}
        })
    }
    else if (i_SortBy === 'byCreated')
    {
        return notes.sort((a, b) =>
        {
            if(a.m_CreatedAt > b.m_CreatedAt){return -1} //then a created more recent - will be on top
            else if(a.m_CreatedAt < b.m_CreatedAt){return 1}
            else {return 0}
        })
    }
    else if(i_SortBy === 'byAlphabetical')
    {
        return notes.sort((a, b) =>
        {
            if(a.m_Title.toLowerCase() > b.m_Title.toLowerCase()){return 1}
            else if(a.m_Title.toLowerCase() < b.m_Title.toLowerCase()) {return -1}
            else{return 0}
        })
    }
    else{
        return notes
    }
}

const updateNote = (i_NoteId, i_Updates) =>
{
    const note = notes.find((currentNote) => currentNote.m_Id === i_NoteId)
    if(!note) {return }
    if(typeof i_Updates.m_Title === 'string')
    {
        note.m_Title = i_Updates.m_Title
        note.m_UpdatedAt = moment().valueOf()
    }
    if(typeof i_Updates.m_Body === 'string')
    {
        note.m_Body = i_Updates.m_Body
        note.m_UpdatedAt = moment().valueOf()
    }

    saveNotes()
    return note
}

notes = loadNotes()

export {getNotes, createNote, removeNote, sortNotes, updateNote}