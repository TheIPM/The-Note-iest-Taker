const fs = require('fs');
const router = require('express').Router();
let db = require('../db/db.json');

router.get('/', (req, res) => {
    res.json(db);
});

router.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = Math.floor(Math.random() * 1000000);
  db.push(newNote);
  fs.writeFile('./db/db.json', JSON.stringify(db), err => {
    if (err) throw err;
    res.json(newNote);
  });
});

router.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.findIndex(note => note.id === id);
  if (index >= 0) {
    db.splice(index, 1);
    fs.writeFile('./db/db.json', JSON.stringify(db), err => {
      if (err) throw err;
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
