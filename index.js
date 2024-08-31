const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const app = express();
let jokeTypes = [];
const port = process.env.PORT;

app.use(express.json());
const jokesFilePath = path.join(__dirname, 'jokes.json');

// get random joke
app.get('/random', (req, res) => {
  fs.readFile(jokesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({message: 'Error reading jokes file.'});
    }
    const jokes = JSON.parse(data);
    let randomId = Math.floor(Math.random() * jokes.length) + 1;
    res.json(jokes[randomId]);
  });
});

// get a specific joke
app.get('/jokes/:id', (req, res) => {
  fs.readFile(jokesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({message: 'Error reading jokes file.'});
    }
    const jokes = JSON.parse(data);
    const {id} = req.params;
    if (id < 1 || id > jokes.length)
      return res.json({message: `Enter Id between 1 to ${jokes.length}.`});
    res.json(jokes[id - 1]);
  });
});

// get a filter joke by joke type
app.get('/filter', (req, res) => {
  const {type} = req.body;

  fs.readFile(jokesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({message: 'Error reading jokes file.'});
    }
    const jokes = JSON.parse(data);
    jokeTypes = jokes.map((item) => {
      return item.jokeType;
    });
    jokeTypes = [...new Set(jokeTypes)];
    if (!jokeTypes.includes(type))
      return res.json({message: 'Sorry! this type of joke is not present.'});
    const filteredJokes = jokes.filter((item) => {
      return item.jokeType === type;
    });
    res.json(filteredJokes);
  });
});

// post a new joke
app.post('/jokes', (req, res) => {
  const {jokeText, jokeType} = req.body;
  if (!jokeText || !jokeType)
    return res.json({message: 'All fields are required.'});
  let jokes = [];
  fs.readFile(jokesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({message: 'Error reading jokes file.'});
    }
    jokes = JSON.parse(data);

    jokes = [
      ...jokes,
      {
        id: jokes.length + 1,
        jokeText: jokeText,
        jokeType: jokeType,
      },
    ];

    fs.writeFile(
      jokesFilePath,
      JSON.stringify(jokes, null, 2),
      'utf8',
      (err) => {
        if (err) {
          res.status(500).send('Error writing jokes file.');
          return;
        }
        res.status(201).json({message: 'Joke added successfully.'});
      }
    );
  });
});

// put replace a joke
app.put('/jokes/:id', (req, res) => {
  let jokes = [];
  fs.readFile(jokesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({message: 'Error reading jokes file.'});
    }
    if (!req.body.jokeText || !req.body.jokeType)
      return res.json({message: 'Missing fields.'});
    const {jokeText, jokeType} = req.body;
    const id = parseInt(req.params.id, 10);
    jokes = JSON.parse(data);
    if (id < 1 || id > jokes.length)
      return res.json({message: `Enter Id between 1 to ${jokes.length}.`});
    jokes = jokes.map((item) => {
      if (item.id === id) {
        return {
          id: item.id,
          jokeText: jokeText ? jokeText : item.jokeText,
          jokeType: jokeType ? jokeType : item.jokeType,
        };
      } else return item;
    });

    fs.writeFile(
      jokesFilePath,
      JSON.stringify(jokes, null, 2),
      'utf8',
      (err) => {
        if (err) {
          res.status(500).send('Error writing jokes file.');
          return;
        }
        res.status(201).json({message: 'Joke updated successfully.'});
      }
    );
  });
});

// delete all jokes
app.delete('/jokes/all', (req, res) => {
  fs.writeFile(jokesFilePath, JSON.stringify([], null, 2), 'utf8', (err) => {
    if (err) {
      res.status(500).send('Error writing jokes file.');
      return;
    }
    res.status(201).json({message: 'All jokes deleted successfully.'});
  });
});

// delete a specific joke
app.delete('/jokes/:id', (req, res) => {
  let jokes = [];
  fs.readFile(jokesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({message: 'Error reading jokes file.'});
    }

    const id = parseInt(req.params.id, 10);
    jokes = JSON.parse(data);
    if (id < 1 || id > jokes.length)
      return res.json({message: `Enter Id between 1 to ${jokes.length}.`});
    let filteredJokes = jokes.filter((item) => item.id !== id);

    // Reindex the remaining items starting from 1
    filteredJokes = filteredJokes.map((item, index) => ({
      id: index + 1,
      jokeText: item.jokeText,
      jokeType: item.jokeType,
    }));

    fs.writeFile(
      jokesFilePath,
      JSON.stringify(filteredJokes, null, 2),
      'utf8',
      (err) => {
        if (err) {
          res.status(500).send('Error writing jokes file.');
          return;
        }
        res.status(201).json({message: 'Joke deleted successfully.'});
      }
    );
  });
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server on : ${port}`);
});
