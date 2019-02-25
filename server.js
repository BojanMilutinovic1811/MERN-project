const express = require('express')
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI

const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const usersAuth = require('./routes/api/usersAuth');


mongoose.connect(db, {
    useNewUrlParser: true
}, () => console.log('data base connected'))


const app = express();


app.use('/api/usersAuth', usersAuth);
app.use('/api/profile', profile);
app.use('/api/posts', posts)



app.get('/', (req, res) => {
    res.send('hello')
})



const port = 3000 || process.env.PORT;

app.listen(port, () => `server running on port ${port}`)