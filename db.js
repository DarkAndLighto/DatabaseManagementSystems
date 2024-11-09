/* const express = require('express')
const router = express.Router()
const {pool} = require('./db-connection')

router.get('/', (req, res) => {
  res.send('db file')
})

router.get('/users', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM users`);
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
  })

module.exports = router */