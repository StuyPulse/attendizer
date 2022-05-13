const { isValid, getOsis } = require('../utils/idHandler');
const express = require('express');
const router = express.Router();

router.post('/id/:id', (req, res) => {
  const id = req.params.id;

  if (isValid(id)) {
    const osis = getOsis(id);

    res.send(osis);
  }

  // TODO: implement error handling if invalid id
});

module.exports = router;
