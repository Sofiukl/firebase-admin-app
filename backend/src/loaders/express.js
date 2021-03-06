const bodyParser = require('body-parser');
const helmet = require('helmet')
const nocache = require('nocache')
const cookieParser = require('cookie-parser')
const express = require('express')
const path = require("path");

const f = async ({ app }) => {
  const allowCrossDomain = (req, res, next) => {
    const allowedMethods = ['GET', 'POST']
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', allowedMethods.toString())
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    if (req.method === 'OPTIONS') {
      res.sendStatus(200)
    } else if (!allowedMethods.includes(req.method)) {
      res.status(405).send({ isSuccess: false, message: 'Method not allowed' })
    } else {
      next()
    }
  }
  app.use(allowCrossDomain)
  app.use(helmet())
  app.use(nocache())
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.get('/', (req, res) => {
    console.log(path.join(__dirname, "..", "..", "build", "index.html"))
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
  })

  // have to keep all 4 parameters to work as an error handler
  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    console.log(error)
    res.send({
      isSuccess: false,
      message: 'Something went wrong'
    })
  })
}

module.exports = f