//Purpose of schema file:
//1. Define types 
//2. Define relationships between types
//3. Define root queries (how a user can jump into graph to grab data)

const graphql = require('graphql')
//install lodash to help query database
const _=require('lodash')
//require mongoose models
const Book = require('../models/book')
const Author = require('../models/author')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql

// dummy book data
/*
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
        { name: 'Patrick Rothfuss', born: 1982, id: '1', country: 'United States' },
        { name: 'Brandon Sanderson', born: 1980, id: '2', country: 'United States' },
        { name: 'Terry Pratchett', born: 1960, id: '3', country: 'England' }
]
*/
const BookType = new GraphQLObjectType({
    name: 'Book',
    //fields need to be wrapped in a function so that file runs before function executes, allowing time for AuthorType to be defined
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        plot: {type: GraphQLString},
        author: {
            type:AuthorType,
            resolve(parent, args){
                console.log('PARENT',parent)
                //test return with dummy data
                //return _.find(authors, {id: parent.authorId})
                return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        born: {type: GraphQLInt},
        country: {type: GraphQLString},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                //search through books array for any book where authorId = author ID being searched on
                //test return with dummy data
                //return _.filter(books,{authorId: parent.id})
                return Book.find({authorId: parent.id})
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
                //test return with dummy data
                //return _.find(books, {id: args.id})
                return Book.findById(args.id)
            }

        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //code to get data from database
                //test return with dummy data
                //return _.find(authors, {id: args.id})
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //test return with dummy data
                //return books
                return Book.find({})
            } 
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                //test return with dummy data
                //return authors
                return Author.find({})
            }
        }
    }
})

//need to explicitly define mutations so that we can add to/change data in database and give app CRUD functionality
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor: {
            type:AuthorType,
            args:{
                name: {type: GraphQLString},
                born: {type: GraphQLInt},
                country: {type: GraphQLString}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    born: args.born,
                    country: args.country
                })
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                plot: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    plot: args.plot,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})