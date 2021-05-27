const express = require('express');
const loaders = require('./loaders')
const routes = require('./routes')


async function startServer() {
  const app = express()

  await loaders({ app })

  routes({ app })

  app.listen(process.env.PORT || 3101, () => {
    // eslint-disable-next-line no-console
    console.log(`App running on port - ${process.env.port || 3101}`)
  })
}

startServer();
