const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GET request from the database
router.get('/', (req, res) => {
  const sqlQuery= `SELECT * FROM genres ORDER BY "name" ASC`;
  pool.query(sqlQuery).then(result =>{
    res.send(result.rows);
  })
  .catch(err =>{
    console.log('error in getting all genres', err)
    res.sendStatus(500);
  })
});


module.exports = router;