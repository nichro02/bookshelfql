import { useState } from 'react'
import { useQuery } from '@apollo/client'
import {getAllAuthorsQuery} from '../queries/queries'


function GetAuthors(){
    const { loading, error, data } = useQuery(getAllAuthorsQuery)

    if (loading) return <option disabled>Loading authors</option>
    if (error) return <option disabled>Error loading authors</option>
    console.log(data)
    return (
        data.authors.map(author => {
            return(<option key={author.id} value={author.id}>{author.name}</option>)
        })
    )
}

function AddBook(){
    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [plot, setPlot] = useState('')
    const [authorId, setAuthorId] = useState('')

    const data = {
        title: title,
        genre: genre,
        plot: plot,
        authorId: authorId
    }

    //update title
    const updateTitle = e => {
        setTitle(e.target.value)
        console.log('TITLE',e.target.value)
    }
    //update genre
    const updateGenre = e => {
        setGenre(e.target.value)
        console.log('GENRE',e.target.value)
    }
    //update genre
    const updatePlot = e => {
        setPlot(e.target.value)
        console.log('PLOT',e.target.value)
    }
    //update author
    const updateAuthorId = e => {
        setAuthorId(e.target.value)
        console.log('AUTHOR',e.target.value)
    }
    
    //send book info to database
    const handleBook = e => {
        e.preventDefault()
        console.log(data)
    }
    
    return(
        <form id='addBook' onSubmit={handleBook}>
            <div className='field'>
                <label>Book Title:</label>
                <input 
                    type='text'
                    value={title}
                    onChange={updateTitle}
                />
            </div>
            <div className='field'>
                <label>Genre:</label>
                <input
                    type='text'
                    value={genre}
                    onChange={updateGenre}
                />
            </div>
            <div className='field'>
                <label>Plot:</label>
                <input
                    type='text'
                    value={plot}
                    onChange={updatePlot}
                />
            </div>
            <div className='field'>
                <label>Author:</label>
                <select
                    value={authorId}
                    onChange={updateAuthorId}
                >
                    <option>Select author</option>
                    {GetAuthors()}
                </select>
            </div>

            <button type='submit'>+</button>

        </form> 
    )
}

export default AddBook