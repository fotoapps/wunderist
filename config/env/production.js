// Required in /app/config/config.js
// Express app environment config for production

var port = process.env.PORT || 5000;

module.exports = {
  port: port,
  db: 'mongodb+srv://hung:Hung12345@cluster0-xynzd.mongodb.net/admin'
};