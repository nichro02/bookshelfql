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

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull 
} = graphql

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
                return Book.findById(args.id)
            }

        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //code to get data from database
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return all books
                return Book.find({})
            } 
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                //return all authors
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
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: GraphQLString},
                plot: {type: GraphQLString},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
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