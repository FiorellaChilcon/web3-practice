const express = require('express');
const router = express.Router();

const ethereumNode = require('../controller/ethereumNode');

router.post('/:address', async function(req, res) {
  const data = await ethereumNode.adressBalance(req.params.address);
  return res.json(data);
});

module.exports = router;
