const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.get('/:id', (req, res) => { //made a change here, fix later

  console.log('get all details', req.params.id);
  const sqlText = // to_json converts it into a string and array_agg divides and adds them.
  `SELECT 
  movies.*, array_agg(to_json(genres)) AS genres FROM movies
JOIN movies_genres ON movies_genres.movie_id = movies.id
JOIN genres ON movies_genres.genre_id = genres.id
WHERE movies.id = $1 GROUP BY movies.id;
`;

  const sqlParms= [req.params.id]
  pool.query(sqlText, sqlParms)
  .then((dbRes) => {
    console.log('dbRes.rows[0]', dbRes.rows[0]);

    if (dbRes.rows.length === 0) {
      console.log(`No movies matching id ${req.params.id}`);
      res.sendStatus(404);
      return;
    }

    res.send(dbRes.rows[0]);
  })
  .catch(error => {
    console.error(`GET /movie/:id failed ${error}`, );
    res.sendStatus(500);
  });

});




router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;