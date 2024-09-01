const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);// Assuming you have set up your Knex connection

router.post('/debates', async (req, res) => {
  try {
    const newDebate = await knex('DEBATES').insert(req.body).returning('ID');
    res.status(201).json({ message: 'Debate added successfully', id: newDebate[0] });
  } catch (error) {
    console.error('Error adding debate',error);
    res.status(500).json({ message: 'Error adding debate' });
  }
});

module.exports = router;