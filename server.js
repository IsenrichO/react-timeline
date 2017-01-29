'use strict';

const App = require('./server/router.jsx'),
      PORT = 3000;  // process.env.PORT || 3000

App.listen(PORT, () => {
  console.log(`\
    Server is up and running on LocalHost at Port ${PORT}:\n\
    < http://localhost:${PORT}/ >`
  );
});
