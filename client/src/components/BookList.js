import { gql, useQuery } from '@apollo/client'

//construct query
const getAllBooksQuery = gql`
    query getAllBooksQuery {
        books{
            id
            name
            genre
            plot
            author {
                name
                country
            }
        }
    }
`
function GetBooks(){
    const { loading, error, data } = useQuery(getAllBooksQuery)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>
    console.log(data)
    return (
        <h1>Books go here</h1>
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