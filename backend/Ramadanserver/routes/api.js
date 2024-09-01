const express = require('express');
const router = express.Router();
const knex = require('../knexfile'); // Adjust the path as needed

router.get('/overview-stats', async (req, res) => {
  try {
    const [totalVoters, totalLocalLists, totalPartyLists] = await Promise.all([
      knex('USERS').count('* as count').first(),
      knex('LOCAL_LISTS').count('* as count').first(),
      knex('PARTY_LISTS').count('* as count').first(),
    ]);

    const [sumLocalVotes, sumPartyVotes] = await Promise.all([
      knex('LOCAL_LISTS').sum('COUNT_OF_VOTES as total').first(),
      knex('PARTY_LISTS').sum('COUNT_OF_VOTES as total').first(),
    ]);

    res.json({
      totalVoters: totalVoters.count,
      totalLocalLists: totalLocalLists.count,
      totalPartyLists: totalPartyLists.count,
      totalLocalVotes: sumLocalVotes.total || 0,
      totalPartyVotes: sumPartyVotes.total || 0,
    });
  } catch (error) {
    console.error('Error fetching overview stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;