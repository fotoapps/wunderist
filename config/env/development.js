// Required in /app/config/config.js
// Express app environment config for development

var port = process.env.PORT || 4000;

module.exports = {
  port: port,
  db: 'mongodb://localhost:27017/todoist-app'
};