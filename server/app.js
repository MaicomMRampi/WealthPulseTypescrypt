const express = require('express')
const app = express()
const cors = require('cors')
const port = 3333
const router = require('./routes/userRoutes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
module.exports = app