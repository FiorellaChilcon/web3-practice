const express = require('express');
const router = express.Router();

const ethereumNode = require('../controller/ethereumNode');

router.post('/:address', async (req, res) => {
  try {
    const data = await ethereumNode.addressBalance(req.params.address);
    return res.json(data);
  } catch (error) {
    return res.json({ error });
  }
});

module.exports = router;
