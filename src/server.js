import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import * as db from './db'
import config from './config'
import api from './api'
import babel from 'babel-polyfill'

let app = express()
app.use(morgan('dev'))

app.use(bodyParser.json({
  limit: '5mb'
}))

db.init()
.then(db => {
  app.use('/api', api({ config, db }))
  app.listen(process.env.PORT || 3000)
  console.log('Server started on ' + (process.env.PORT || 3000))
})

export default app
