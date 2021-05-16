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
    return(
        <form id='addBook'>
            <div className='field'>
                <label>Book Name:</label>
                <input type='text' />
            </div>
            <div className='field'>
                <label>Genre:</label>
                <input type='text' />
            </div>
            <div className='field'>
                <label>Plot:</label>
                <input type='text' />
            </div>
            <div className='field'>
                <label>Author:</label>
                <select>
                    <option>Select author</option>
                    {GetAuthors()}
                </select>
            </div>

            <button>+</button>

        </form> 
    )
}

export default AddBook