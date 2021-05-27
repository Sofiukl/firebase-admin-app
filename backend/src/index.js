const express = require('express');
const loaders = require('./loaders')
const routes = require('./routes')
const path = require("path");

async function startServer() {
  const app = express()

  await loaders({ app })

  routes({ app })

  app.use(express.static(path.join(__dirname, "..", "build/static")));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  app.listen(process.env.PORT || 3101, () => {
    // eslint-disable-next-line no-console
    console.log(`App running on port - ${process.env.port || 3101}`)
  })
}

startServer();
