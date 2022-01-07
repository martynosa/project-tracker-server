const express = require('express')
const cookieParser = require('cookie-parser');
const initMongoose = require('./config/mongoose-config')
const middlewares = require('./services/middlewares')
const router = require('./router')

const PORT = 5000;

const app = express();

app.use(express.json());
//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, token')
    next()
})
app.use(cookieParser())
app.use(middlewares.auth)
app.use(router)

initMongoose()
    .then(() => app.listen(PORT, () => console.log(`listening on ${PORT}...`)))
    .catch(error => console.log('mongoose failed:' + error))

