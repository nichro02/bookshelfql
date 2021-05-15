const express = require('express')
const cors = require('cors')
//set up middleware: https://www.npmjs.com/package/express-graphql
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const app = express()
require('dotenv').config()
app.use(cors())

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
    //define graph
    schema: schema,
    graphiql:true
}))

app.listen(4000,() => {
    console.log('listening on port 4000')
})