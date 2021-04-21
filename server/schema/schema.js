const { graphqlHTTP } = require('express-graphql')

//Describe object types
const { GraphQLObjectType, GraphQLString } = graphql

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})