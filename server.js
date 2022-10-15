const fs = require('fs');
const path = require('path');
const express = require('express');
const util = require('util');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
);

// browser address localhost:3000/notes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
);

//? res.sendFile correct...?
app.get('/api/notes', (req, res) => {
    readFileAsync('/Develop/db/db.json').then(function (data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })}
);

app.post('/api/notes', (req, res) => {
    const note = req.body;
    readFileAsync("./Develop/db/db.json").then(function (data) {
        notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1;
        notes.push(note);
        return notes
    }).then(function (notes) {
        writeFileAsync('./Develop/db/db.json', JSON.stringify(notes))
        res.json(note);
    })}
);

// browser address localhost:3000/anything else
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`)
);

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

