const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 8080;

const pool = new Pool({
    host: 'dbserver-test.eastus.cloudapp.azure.com',
    database: 'nodeapi-dev',
    user: 'nodeapi-user',
    password: 'Bitzen@2020',
    port: 5432
});

app.use(express.json());

async function createAlbumsTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS albums (
                id serial primary key,
                title varchar(200) not null,
                artist varchar(200) not null,
                price numeric(10,2)
            )
        `;

        await pool.query(query);
        console.log('Albums table created');

    } catch (err) {
        console.log(err);
        console.log('Albums table creation failed');
    }
}

createAlbumsTable();

// routes
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/albums', async (req, res) => {
    const { title, artist, price } = req.body;

    if (!title || !artist || !price) {
        return res.status(400).send('One of the title, or artist, or price is missing in the data');
    }

    try {
        const query = `insert into albums (title, artist, price) values ($1, $2, $3) returning id`;
        const values = [title, artist, price];
        const result = await pool.query(query, values);

        if (result.rows.length == 0)
            return res.status(400).send('General error. No rows affected');

        res.status(201).send({ 'message': 'New Album Created', 'album_id': result.rows[0].id });
    } catch (error) {
        console.log(error);
        res.status(500).send('General error. Please contact support');
    }
})

app.get('/albums', async (req, res) => {
    try {
        const query = 'SELECT * FROM albums;';
        const { rows } = await pool.query(query);

        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send('General error.');
    }
})

app.get('/albums/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM albums WHERE id = $1;';
        const { rows } = await pool.query(query, [id]);

        if (rows.length === 0) {
            return res.status(404).send('this album is not in the database');
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('failed');
    }
});

app.put('/albums/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, artist, price } = req.body;

        if (!title && !artist && !price) {
            return res.status(400).send('provide a field (title, artist, or price)');
        }

        const query = `
        UPDATE albums
        SET title = COALESCE($1, title),
            artist = COALESCE($2, artist),
            price = COALESCE($3, price)
        WHERE id = $4
        RETURNING *;
      `;
        const { rows } = await pool.query(query, [title, artist, price, id]);

        if (rows.length === 0) {
            return res.status(404).send('Cannot find anything');
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Some error has occured failed');
    }
});

app.delete('/albums/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM albums WHERE id = $1 RETURNING *;';
        const { rows } = await pool.query(query, [id]);

        if (rows.length === 0) {
            return res.status(404).send('we have not found the album');
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('some error has occured');
    }
});
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})