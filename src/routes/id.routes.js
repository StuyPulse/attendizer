const { isValid, getOsis } = require('../utils/idHandler');

module.exports = function (app) {
  app.post('/id/:id', (req, res) => {
    const id = req.params.id;

    if (isValid(id)) {
      const osis = getOsis(id);

      res.send(osis);
    }

    // TODO: implement error handling if invalid id
  });
};
