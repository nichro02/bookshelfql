//Purpose of schema file:
//1. Define types 
//2. Define relationships between types
//3. Define root queries (how a user can jump into graph to grab data)

const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //query for particular book
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                
                //code to get data from database
            }

        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})