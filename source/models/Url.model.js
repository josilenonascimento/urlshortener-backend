const monk = require('monk');

const db = monk(process.env.MONGODB_URI);

db.then(test => {
  console.log('DB connected');
});

const urls = db.get('urls');

module.exports = urls;