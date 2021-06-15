const express = require('express');
const router = express.Router();

const ethereumNode = require('../controller/ethereumNode');

router.get('/last-block', async function(req, res) {
  const data = await ethereumNode.getTransactions();
  return res.json(data);
});

router.post('/perform', async function(req, res) {
  try {
    const data = await ethereumNode.sendMoney(req.body);
    return res.json(data);
  } catch (error) {
    return res.json({ error });
  }
});

module.exports = router;
