const fs = require('fs');
const router = require('express').Router();
let db = require('../db/db.json');

router.get('/notes', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(db);
});

router.post('/notes', (req, res) => {
    console.log(req.body);
    const newNote = req.body;
    newNote.id = Math.floor(Math.random() * 1000000);
    db.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(db), err => {
      if (err) throw err;
      res.setHeader('Access-Control-Allow-Origin', '*');
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
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.sendStatus(200);
    });
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendStatus(404);
  }
});

module.exports = router;