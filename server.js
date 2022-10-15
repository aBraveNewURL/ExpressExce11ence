const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
);

// browser address localhost:3000/notes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
);

// browser address localhost:3000/anything else
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
);

//? res.sendFile correct...?
app.get('/api/notes', (req, res) => {
    // res.sendFile(path.join(__dirname, '/Develop/db/db.json'))
    // get the notes from db.json
    return res.json(notes)
}
);

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.post('/api/notes', (req, res) => {
    // create a copy of the db.json
    // push the new request body into that array
    // use fs to resave the updated array as db.json
})

app.listen(3000, () =>
    console.log(`Listening at http://localhost:${PORT}`)
);



