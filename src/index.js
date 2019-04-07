import {createNote} from './notes'
import {setFilters} from './filters'
import {renderNotes} from './views'

renderNotes()

document.querySelector('#create-note').addEventListener('click' ,(event) =>
{
    const id = createNote()
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (event) =>
{
    setFilters(
        {
            m_SearchText: event.target.value
        }
    )
    renderNotes()
})

document.querySelector('#filter-by').addEventListener('change', (event) =>
{
    setFilters(
        {
            m_SortBy: event.target.value
        }
    )
    renderNotes()
})

window.addEventListener('storage', (event) =>
{
    if(event.key === 'notes') //to make sure the changed key is notes and not another data
    {
        renderNotes()
    }
})

