const express = require('express')
const mongoose = require('mongoose')
const database = require('./config/keys').mongoURI
const passport = require('passport')


// routes 
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const usersAuth = require('./routes/api/usersAuth');


mongoose.connect(database, {
    useNewUrlParser: true
}, () => console.log('data base connected'))


const app = express();



// body parser middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))


// passport middleware
app.use(passport.initialize())

// passport config 
require('./config/passport')(passport)

app.use('/api/users', usersAuth);
app.use('/api/profile', profile);
app.use('/api/posts', posts)



app.get('/', (req, res) => {
    res.send('hello')
})



const port = 3000 || process.env.PORT;

app.listen(port, () => `server running on port ${port}`)