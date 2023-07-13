//* Imports *//
const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();
const { Pool } = require('pg');
const cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

/* creating a new instance of the Pool object from the pg library. 
The Pool object is a connection pool that manages a set of database connections for efficient and scalable interaction with the PostgreSQL database.*/
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'postgres',
  password: 'charanpostgres',
  port: 5432, // Default PostgreSQL port is 5432
});

//* Regular middlewares *//
/* 
express.json(): is a built-in middleware function in Express. 
It parses incoming requests with JSON payloads and is based on body-parser.
Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option. 
This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
*/
app.use(express.json());
app.use(cors(corsOptions));

/* ROUTES */
// Define a route for proxying the Sreality API request
app.get('/api/sreality', async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.sreality.cz/api/cs/v2/estates',
      {
        params: {
          category_main_cb: 1,
          category_type_cb: 1,
          per_page: 500,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(response);

    if (response.status === 200) {
      console.log('status: ' + response.status);

      /* Insert the scrapedItems into the PostgreSQL database */
      // Check if table exists
      const tableExists = await pool.query(
        `SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_name = 'scraped_items'
        )`
      );

      if (tableExists.rows[0].exists === false) {
        // Create table if it doesn't exist
        await pool.query(`
          CREATE TABLE scraped_items (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            image_url VARCHAR(10485760) NOT NULL
          )
        `);
      }

      await pool.query('BEGIN');
      for (const item of response.data._embedded.estates) {
        const result = await pool.query(
          'SELECT 1 FROM scraped_items WHERE title = $1 LIMIT 1',
          [item.name]
        );

        if (result.rows.length === 0) {
          const insertResult = await pool.query(
            'INSERT INTO scraped_items (title, image_url) VALUES ($1, $2) RETURNING *',
            [item.name, item._links.images]
          );

          if (insertResult.rowCount > 0) {
            // Data was successfully inserted
            console.log('Data inserted:', insertResult.rows[0]);
          } else {
            // Failed to insert data
            console.log('Failed to insert data');
          }
        }
      }
      await pool.query('COMMIT');

      return res.json(response.data); // Send the scraped items to the client
    } else {
      return res.json({
        status: 401,
        error: 'Error fetching data. Please try again later.',
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Error fetching data. Please try again later.' });
  }
});

//export app js
module.exports = app;
