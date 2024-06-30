require('dotenv').config();
const express = require('express');
const pool = require('./db');
const port = 3000;

const app = express();
app.use(express.json());

// Get all records
app.get('/', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM schools');
        res.status(200).send(data.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Add a new record
app.post('/', async (req, res) => {
    const { name, location } = req.body;
    try {
        await pool.query('INSERT INTO schools(name, address) VALUES($1, $2)', [name, location]);
        res.status(200).send({ message: 'Successfully added student!' });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Update a record by ID
app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, location } = req.body;

    // Validate request
    if (!name || !location) {
        return res.status(400).send('Name and location are required');
    }

    try {
        const result = await pool.query(
            'UPDATE schools SET name = $1, address = $2 WHERE id = $3 RETURNING *',
            [name, location, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).send({ message: 'Record not found' });
        }

        res.status(200).send({ message: 'Record updated successfully', data: result.rows[0] });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete a record by ID
app.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM schools WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).send({ message: 'Record not found' });
        }

        res.status(200).send({ message: 'Record deleted successfully', data: result.rows[0] });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Create table (only needed once)
app.get('/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS schools(id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))');
        res.status(200).send({ message: 'Table successfully created or already exists!' });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(port, () => console.log(`Server has Started on port: ${port}`));
