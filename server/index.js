const express = require('express')

//set up middleware: https://www.npmjs.com/package/express-graphql
const { graphqlHTTP } = require('express-graphql')

const app = express()

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    //schema:schema,
    //graphiql:true
}))

app.listen(4000,() => {
    console.log('listening on port 4000')
})