'use strict';
const App = require('./server/app.js'),
      PORT = (process.env.PORT || 3000);


App.listen(PORT, () => {
  console.log(`
============================================================
  Server is up and running on LocalHost at Port ${PORT}:
            < http://localhost:${PORT}/ >
============================================================`
  );
});
