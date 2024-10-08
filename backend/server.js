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
        let query = `
            INSERT INTO users (name, email, password, level) 
            VALUES ('${name}', '${email}', '${hashedPassword}', '${level}')
        `;
        await pool.request().query(query);

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
        let query = `SELECT * FROM users WHERE email = '${email}'`;
        let result = await pool.request().query(query);

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

// POST route for admin login 
app.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;   
    const AdminEmail = 'admin@mail.com';
    const AdminPassword = '1234'; 

    try {
        if (email === AdminEmail && password === AdminPassword) {
            res.json({ status: 'Success', message: 'Admin login successful' });
        } else {
            res.json({ status: 'error', message: 'Invalid admin credentials' });
        }
    } catch (err) {
        console.error('Error during admin login:', err);
        res.status(500).send({ status: 'error', message: 'Admin login failed' });
    }
});


// POST route for creating survey
app.post('/admin/create-survey', async (req, res) => {
    const { level, questions } = req.body;

    try {
        let pool = await connectToDB();
        for (let question of questions) {
            let query = `INSERT INTO surveys (level, question) VALUES ('${level}', '${question}')`;
            await pool.request().query(query);
        }
        res.json({ status: 'Success', message: 'Survey created successfully' });
    } catch (err) {
        console.error('Error creating survey:', err);
        res.status(500).send({ status: 'error', message: 'Error creating survey' });
    }
});

// GET route for viewing responses
app.get('/admin/view-responses', async (req, res) => {
    try {
        let pool = await connectToDB();
        let query = 'SELECT question, answer FROM surveys WHERE answer IS NOT NULL';
        let result = await pool.request().query(query);

        if (result.recordset.length > 0) {
            res.json({ status: 'Success', data: result.recordset });
        } else {
            res.json({ status: 'error', message: 'No responses found' });
        }
    } catch (err) {
        console.error('Error fetching responses:', err);
        res.status(500).send({ status: 'error', message: 'Error fetching responses' });
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
