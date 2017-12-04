const Tag = require('../../db/models/EventTag');

const fetchAllTags = (req, res, next) => {
  Tag
    .find({})
    .sort({ name: 'asc' })
    .limit(700)
    .then((tags) => res.json && res.json(tags))
    .catch((err) => {
      res.status(400).send('Failed to fetch requested events!');
      next();
    });
};

module.exports = {
  fetchAllTags,
};
