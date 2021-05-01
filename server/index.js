const express = require('express')
//set up middleware: https://www.npmjs.com/package/express-graphql
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()
require('dotenv').config()

//connect to MongoDB database
mongoose.connect(`${process.env.MONGODB_URI}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
mongoose.connection.once('open', () => {
    console.log('connected to database')
})

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql:true
}))

app.listen(4000,() => {
    console.log('listening on port 4000')
})