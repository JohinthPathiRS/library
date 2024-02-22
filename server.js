const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'Library',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running. Use /books to get the list of books.');
});
app.post('/add-book', (req, res) => {
  const { title, genre, author, subject, publishDate, bookCount } = req.body;

  if (!title || !genre || !author || !subject || !publishDate || !bookCount) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  const query = 'INSERT INTO Library (Title, Genre, Author, Subject, PublishDate, BookCount) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [title, genre, author, subject, publishDate, bookCount], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json({ message: 'Book added successfully' });
    }
  });
});


app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  const values = [username, email, password];

  db.query(insertQuery, values, (err, results) => {
    if (err) {
      console.error('Error during registration:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      console.log('Registration successful');
      res.status(200).json({ message: 'Registration successful' });
    }
  });
});



app.get('/books', (req, res) => {
  const query = 'SELECT * FROM Library';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const selectQuery = 'SELECT * FROM users WHERE username = ? AND password = ?';
  const values = [username, password];

  db.query(selectQuery, values, (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else if (results.length > 0) {
      console.log('Login successful');
      res.status(200).json({ message: 'Login successful' });
    } else {
      console.log('Invalid username or password');
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;

  const deleteQuery = 'DELETE FROM Library WHERE id = ?';

  db.query(deleteQuery, [bookId], (err, result) => {
    if (err) {
      console.error('Error deleting book:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Book deleted successfully.');
      res.sendStatus(204);  
    }
  });
});




app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const selectQuery = 'SELECT * FROM users WHERE username = ? AND password = ?';
  const values = [username, password];

  db.query(selectQuery, values, (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else if (results.length > 0) {
      console.log('Login successful');
      res.status(200).json({ message: 'Login successful' });
    } else {
      console.log('Invalid username or password');
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});



app.post('/decrement-book/:id', (req, res) => {
  const bookId = req.params.id;

  const decrementQuery = 'UPDATE Library SET BookCount = BookCount - 1 WHERE id = ?';

  db.query(decrementQuery, [bookId], (err, results) => {
    if (err) {
      console.error('Error decrementing book count:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json({ message: 'Book count decremented successfully' });
    }
  });
});
app.get('/admin/show-table', (req, res) => {
  const query = 'SELECT * FROM Library';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Results:', results); 
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




