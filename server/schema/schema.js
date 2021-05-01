//Purpose of schema file:
//1. Define types 
//2. Define relationships between types
//3. Define root queries (how a user can jump into graph to grab data)

const graphql = require('graphql')
//install lodash to help query database
const _=require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql

// dummy book data
let books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId:'1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId:'2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId:'3' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' }

]

//dummy author data
let authors = [
        { name: 'Patrick Rothfuss', age: 44, id: '1', country: 'United States' },
        { name: 'Brandon Sanderson', age: 42, id: '2', country: 'United States' },
        { name: 'Terry Pratchett', age: 66, id: '3', country: 'England' }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    //fields need to be wrapped in a function so that file runs before function executes, allowing time for AuthorType to be defined
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type:AuthorType,
            resolve(parent, args){
                console.log('PARENT',parent)
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        country: {type: GraphQLString},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                //search through books array for any book where authorId = author ID being searched on
                return _.filter(books,{authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //query for particular book
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //code to get data from database
                return _.find(books, {id: args.id})
            }

        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //code to get data from database
                return _.find(authors, {id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            } 
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})