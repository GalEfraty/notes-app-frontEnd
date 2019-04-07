import {initializeEditPage, getLastEditedText} from './views'
import {updateNote, removeNote} from './notes'

const titleElement = document.querySelector('#note-title')
const dateElement = document.querySelector('#last-edited')
//const removeElement = document.querySelector('#remove-note')
const bodyElement = document.querySelector('#note-body')

const noteId = location.hash.substring(1) //the uuv4id without the '#'


initializeEditPage(noteId)

titleElement.addEventListener('input', (event) =>
{
    const updatedNote = updateNote(noteId, 
        {
            m_Title: event.target.value,
        }
    )

    dateElement.textContent = getLastEditedText(updatedNote.m_UpdatedAt)
})

bodyElement.addEventListener('input', (event) =>
{
    const updatedNote = updateNote(noteId, 
        {
            m_Body: event.target.value
        })

    dateElement.textContent = getLastEditedText(updatedNote.m_UpdatedAt)
})

document.querySelector('#remove-note').addEventListener('click', () =>
{
    removeNote(noteId)
    location.assign('/index.html')
})

//when 2 tabs of the same note are open and one is update the local storage, the other tab will be updated
window.addEventListener('storage', (event) => 
{
    if(event.key === 'notes') //to make sure the changed key is notes and not another data
    {
        initializeEditPage(noteId)
    }
})