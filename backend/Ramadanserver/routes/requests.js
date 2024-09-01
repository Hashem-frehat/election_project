const express = require('express');
const knex = require('knex')(require('../knexfile').development);
const router = express.Router();

// Get all election advertisements
router.get('/ads', async (req, res) => {
  try {
    const ads = await knex('ELECTION_ADVERTISEMENTS').select('*');
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching advertisements' });
  }
});

// Update advertisement approval status
router.put('/ads/:id/approve', async (req, res) => {
  try {
    await knex('ELECTION_ADVERTISEMENTS')
      .where({ ID: req.params.id })
      .update({ STATUS: 'APPROVED' });
    res.json({ message: 'Advertisement approved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error approving advertisement' });
  }
});

module.exports = router;