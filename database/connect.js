const mongoose = require('mongoose')

module.exports = function connect() {
    const db = process.env.DB
    mongoose.connect(
        db, 
        { useUnifiedTopology: true, useNewUrlParser: true },
        () => console.log('Connected with database')
    )
}
