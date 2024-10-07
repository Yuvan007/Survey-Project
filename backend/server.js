const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SQL Server configuration
const config = {
    user: 'user_new',
    password: '1234',
    server: 'localhost',
    database: 'SurveyDB',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
};

// Function to connect to the database
async function connectToDB() {
    try {
        let pool = await sql.connect(config);
        return pool;
    } catch (err) {
        console.error('Database connection error:', err);
    }
}

// GET route to display all users
app.get('/users', async (req, res) => {
    try {
        let pool = await connectToDB();
        let result = await pool.request().query('SELECT * FROM users');
        
        if (result.recordset.length > 0) {
            res.json({data: result.recordset });
        } else {
            res.json({ status: 'error', message: 'No users found' });
        }
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send({ status: 'error', message: 'Error fetching user data' });
    }
});


// POST route for user registration
app.post('/register', async (req, res) => {
    const { name, email, password, level } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        let pool = await connectToDB();
        await pool.request()
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword)
            .input('level', sql.VarChar, level)
            .query('INSERT INTO users (name, email, password, level) VALUES (@name, @email, @password, @level)');

        res.json({ status: 'Success', message: 'User registered successfully' });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send({ status: 'error', message: 'Error registering user' });
    }
});

// POST route for user login
app.post('/login', async (req, res) => {
    const { email, password, level } = req.body;

    try {
        let pool = await connectToDB();
        let result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM users WHERE email = @email');

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch && user.level === level) {
                res.json({ status: 'Success', message: 'Login successful', redirectTo: `${level}-survey` });
            } else {
                res.json({ status: 'error', message: 'Invalid credentials or level' });
            }
        } else {
            res.json({ status: 'error', message: 'User not found' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send({ status: 'error', message: 'Login failed' });
    }
});

// Connect to SQL Server and start the server
sql.connect(config)
    .then(() => {
        console.log('Connected to SQL Server');
        app.listen(3000, () => {
            console.log('Server is running on port 3000...');
        });
    })
    .catch(err => console.error('Database connection error:', err));
