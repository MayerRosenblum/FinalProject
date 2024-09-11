import express from 'express';
import cors from 'cors'
import pgPromise from 'pg-promise';

const pgp = pgPromise()
const db = pgp({
    host: 'ep-tiny-block-a6zl9gf2.us-west-2.retooldb.com',
    port: 5432,
    database:'retool',
    user: 'retool',
    password:'toYZbK0lFg7C',
    ssl: true,
    schema:'public'
})

const app = express();

app.use(cors());
app.use(express.json());




app.post('/login/Register', async (req, res) => {
  const {email,password} = req.body;

  if (!password || !email) {
    return res.status(400).json({ error: 'Username and email are required.' });
  }

  try {
    const result = await db.one(
      'INSERT INTO "Budgeting".users(email,password) VALUES ($1, $2) RETURNING *',
      [email,password]
    );
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { password } = req.body;
  try {
    const users = await db.one('SELECT * FROM "Budgeting".users WHERE password = $1',
        [password]);
        res.status(200).json(users);
        console.log(users)
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
});

app.get('/login', async (req, res) => {

  try {
    let users;
    if (password) {
      console.log(`Querying with password: ${password}`);
      users = await db.any(
        'SELECT * FROM "Budgeting".users WHERE password = $1',
        [password]
      );
    } else {
      users = await db.any('SELECT * FROM "Budgeting".users');
    }
    console.log('Fetched users:', users);
    res.status(200).json(users);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: err.message });
  }
});


  app.post('/budget', async (req, res) => {
    const { grocery, extraExpenses, user_id } = req.body;
  
    if (!grocery || !extraExpenses || !user_id) {
      return res.status(400).json({ error: 'All fields (grocery, extraExpenses, user_id) are required.' });
    }
  
    try {
      const result = await db.one(
        'INSERT INTO "Budgeting".budget (grocery, extraExpenses, user_id) VALUES ($1, $2, $3) RETURNING *',
        [grocery, extraExpenses, user_id]
      );
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/budget', async (req, res) => {
    try {
      const budgets = await db.one('select * from "Budgeting".budget where user_id = 2');
      res.json(budgets);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  app.post('/expenses', async (req, res) => {
    const { category, amount, comment, expense_date, user_id } = req.body;
  
    if (!category || !amount || !comment || !expense_date || !user_id) {
      return res.status(400).json({ error: 'All fields (category, amount, "comment", expense_date, user_id) are required.' });
    }
  
    try {
      const expense = await db.one(
        'INSERT INTO "Budgeting".expenses (category, amount, comment, expense_date, user_id) VALUES ($1, $2, $3,$4,$5) RETURNING *',
        [category, amount, comment, expense_date, user_id]
      );
      res.status(201).json(expense);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/totalSpent', async (req, res) => {
    const { user_id, category } = req.body;
  
    if (!user_id || !category) {
      return res.status(400).json({ error: 'All fields (category, amount, "comment", expense_date, user_id) are required.' });
    }
  
    try {
      const total = await db.one(
        'SELECT SUM(amount) FROM "Budgeting".expenses WHERE user_id = $1  and category = $2',
        [user_id , category]
      );
      res.status(201).json(total);
      console.log(total)
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });




  app.get('/expenses', async (req, res) => {
    try {
      const expense = await db.manyOrNone('select * from "Budgeting".expenses where user_id = 1 RETURNING *');
      res.json(expense);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

   
app.listen(3000, ()=>{
    console.log(`the server is running on port`)
});