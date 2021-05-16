import { gql } from '@apollo/client'

//retrieve all books
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
//retrieve all authors
const getAllAuthorsQuery = gql`
    query getAllAuthorsQuery{
        authors{
            name
            id
        }
    }
`

export {getAllBooksQuery,getAllAuthorsQuery}