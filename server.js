const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
const port = 3000;
const stripe = require('stripe')('sk_test_51OmdxzSAIkOmTQmpVGW4wJy24nwJm78Yuz7WNc1aoJuLTa3JLlZor0KIIrfju7J6pajwn0I8or7vxSoGYlzQiklz00Wht32gPh');

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
app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency, paymentMethod } = req.body;

  try {
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethod,
      confirm: true,
    });

  
    await savePaymentToDatabase(paymentIntent);

    
    res.json({ clientSecret: paymentIntent.client_secret, paymentId: paymentIntent.id });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Error creating payment intent' });
  }
});

async function savePaymentToDatabase(paymentIntent) {
  const { id, amount, created, status } = paymentIntent;

  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'INSERT INTO payments (payment_id, amount, created_at, status) VALUES (?, ?, ?, ?)',
      [id, amount, new Date(created * 1000), status]
    );
    connection.release();
  } catch (error) {
    console.error('Error saving payment to database:', error);
  }
}


app.post('/create-payment-intent', (req, res) => {
  const paymentData = req.body;

  
  const sql = 'INSERT INTO payment_details (name, card_number, expiration_month, expiration_year, cvc, amount) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [
    paymentData.name,
    paymentData.card_number,
    paymentData.expiration_month,
    paymentData.expiration_year,
    paymentData.cvc,
    paymentData.amount
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error saving payment details:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Payment details saved successfully');
      res.status(200).json({ clientSecret: 'your_client_secret_key' });
    }
  });
});

app.get('/get-payment-details', (req, res) => {

  const sql = 'SELECT * FROM payment_details';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving payment details:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Payment details retrieved successfully');
      res.status(200).json(results);
    }
  });
});



app.post('/create-payment-intent', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099, 
    currency: 'usd',
  });

  res.json({ client_secret: paymentIntent.client_secret });
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
      const deleteQuery = 'DELETE FROM Library WHERE BookCount < 0';
      
      db.query(deleteQuery, (deleteErr, deleteResult) => {
        if (deleteErr) {
          console.error('Error deleting books with count less than 0:', deleteErr);
        }
      });

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




