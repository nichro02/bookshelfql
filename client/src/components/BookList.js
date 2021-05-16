import { useQuery } from '@apollo/client'

import {getAllBooksQuery} from '../queries/queries'

function GetBooks(){
    const { loading, error, data } = useQuery(getAllBooksQuery)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>
    console.log(data.books)
    return (
        data.books.map(book => {
            return(
                <li key={book.id}>{book.name}</li>
            )
        })
    )
}


function BookList() {
    return (
      <div>
        {/* <ul id='book-list'>
            <li>Book name placeholder</li>
        </ul> */}
        <GetBooks />
      </div>
    );
  }
  
  export default BookList;