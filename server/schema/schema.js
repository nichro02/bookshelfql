//Purpose of schema file:
//1. Define types 
//2. Define relationships between types
//3. Define root queries (how a user can jump into graph to grab data)

const graphql = require('graphql')
//install lodash to help query database
const _=require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql

// dummy book data
let books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
]

//dummy author data
let authors = [
        { name: 'Patrick Rothfuss', age: 44, id: '1' },
        { name: 'Brandon Sanderson', age: 42, id: '2' },
        { name: 'Terry Pratchett', age: 66, id: '3' }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
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
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})