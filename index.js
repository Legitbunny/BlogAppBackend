const express = require('express')
const app = express()

require('dotenv').config();

const PORT = process.env.PORT || 3000

//middleware
app.use(express.json());

const blog = require('./routes/blog')

//mount 
app.use('/api/v1', blog)

const connectWithDB = require('./config/database');
connectWithDB();

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})

app.get('/', (req, res) => {
    console.log('this is homepage')
    res.send(`<h1>This is Home Page</h1>`)
})