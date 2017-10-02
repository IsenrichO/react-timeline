const dedent = require('dedent');
const dotenv = require('dotenv').config();
const Cloudinary = require('cloudinary').v2;
const App = require('./server/app.js');

Cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
});

App.get('*', (req, res) => {
  res.redirect('/');
});

const Server = App.listen(process.env.PORT || 3000, () => {
  const serverPort = Server.address().port;
  console.info(dedent(`
    ============================================================
    Server is up and running on LocalHost at Port ${serverPort}:
                < http://localhost:${serverPort}/ >
    ============================================================
    \\n
  `));
});
