const express = require('express');
const knex = require('knex')(require('../knexfile'));
const router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const db = knex(knexConfig[environment]);

// GET all candidates
router.get('/', async (req, res) => {
  try {
    const localLists = await db('LOCAL_LISTS')
      .select('*')
      .join('USERS', 'LOCAL_LISTS.NATIONAL_ID', 'USERS.NATIONAL_ID');

    const partyCandidates = await db('PARTY_CANDIDATE')
      .select('*')
      .join('USERS', 'PARTY_CANDIDATE.NATIONAL_ID', 'USERS.NATIONAL_ID')
      .join('PARTY_LISTS', 'PARTY_CANDIDATE.LIST_ID', 'PARTY_LISTS.LIST_ID');

    res.json({ localLists, partyCandidates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new local list candidate
router.post('/local', async (req, res) => {
  try {
    const [id] = await knex('LOCAL_LISTS').insert(req.body);
    const newCandidate = await knex('LOCAL_LISTS')
      .select('*')
      .join('USERS', 'LOCAL_LISTS.NATIONAL_ID', 'USERS.NATIONAL_ID')
      .where('LOCAL_LISTS.id', id)
      .first();
    res.status(201).json(newCandidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new party candidate
router.post('/party', async (req, res) => {
  try {
    const [id] = await knex('PARTY_CANDIDATE').insert(req.body);
    const newCandidate = await knex('PARTY_CANDIDATE')
      .select('*')
      .join('USERS', 'PARTY_CANDIDATE.NATIONAL_ID', 'USERS.NATIONAL_ID')
      .join('PARTY_LISTS', 'PARTY_CANDIDATE.LIST_ID', 'PARTY_LISTS.LIST_ID')
      .where('PARTY_CANDIDATE.id', id)
      .first();
    res.status(201).json(newCandidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE local list candidate
router.delete('/local/:id', async (req, res) => {
  try {
    await knex('LOCAL_LISTS').where('id', req.params.id).del();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE party candidate
router.delete('/party/:id', async (req, res) => {
  try {
    await knex('PARTY_CANDIDATE').where('id', req.params.id).del();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;