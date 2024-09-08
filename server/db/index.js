
const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGODB_URI,
	{ 
		useNewUrlParser: true,
		useUnifiedTopology: true
 	})
	.then(console.log())
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
