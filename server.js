require('dotenv').config()
const app = require('./src/app')
const connectDB = require('./src/configs/database')
const PORT = process.env.PORT

connectDB()

app.listen(PORT, () => {
    console.clear()
    console.log("--------------------------")
    console.log("| Server running on", PORT, "|")
    console.log("--------------------------")
})