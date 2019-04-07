import moment from 'moment'
import {getFilters} from './filters'
import {sortNotes, getNotes} from './notes'

const generateNoteDom = (i_Note) =>
{
    const noteElement = document.createElement('a')
    const textElement = document.createElement('p')
    const statusElement = document.createElement('p')

    //setup the note text
    if(i_Note.m_Title.length > 0)
    {
        textElement.textContent = i_Note.m_Title
    }
    else
    {
        textElement.textContent = 'Unnamed Note'
    }
    textElement.classList.add('list-item__title')
    noteElement.appendChild(textElement)

    //setup the link
    noteElement.setAttribute('href', `/edit.html#${i_Note.m_Id}`)
    noteElement.classList.add('list-item')

    //setup the status message
    statusElement.textContent = getLastEditedText(i_Note.m_UpdatedAt)
    statusElement.classList.add('list-item__subtitle')
    noteElement.appendChild(statusElement)
    return noteElement
}

const renderNotes = () =>
 {
    const notesEl = document.querySelector('#notes')

     const filters = getFilters()
     const notes = sortNotes(filters.m_SortBy)

     //if hide-completed = true: hide completed!
     const filteredNotes = notes.filter((currentNote) => currentNote.m_Title.toLowerCase().includes(filters.m_SearchText.toLowerCase()))

     notesEl.innerHTML = ''

     if(filteredNotes.length > 0)
     {
        filteredNotes.forEach((currentNote) =>
        {
            const newNoteElement = generateNoteDom(currentNote)
            notesEl.appendChild(newNoteElement)
        })
     }
     else
     {
         const emptyMessage = document.createElement('p')
         emptyMessage.textContent = 'No notes to show'
         emptyMessage.classList.add('empty-message')
         notesEl.appendChild(emptyMessage)
     }

}

const initializeEditPage = (i_NoteID) =>
{
    const titleElement = document.querySelector('#note-title')
    const dateElement = document.querySelector('#last-edited')
    const bodyElement = document.querySelector('#note-body')

    const notes = getNotes()
    const note = notes.find((currentNote) => i_NoteID === currentNote.m_Id)

    if(!note)
    {
        //if there is no note (undefined)
        location.assign('/index.html')
    }

    titleElement.value = note.m_Title
    bodyElement.value = note.m_Body
    dateElement.textContent = getLastEditedText(note.m_UpdatedAt)
}

let getLastEditedText = (i_TimeStamp) =>
{
    let lastEditedfromNow = moment(i_TimeStamp).fromNow()
    return `last edited ${lastEditedfromNow}`
}

export{generateNoteDom, renderNotes, getLastEditedText, initializeEditPage}