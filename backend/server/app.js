const express = require('express');
const { route404, route500 } = require('./routes/errorRoutes');
const cors = require("cors");
const { createProxyMiddleware } = require('http-proxy-middleware');
// require('dotenv').config();

//set app
const app = express();

//set port
app.set('port', process.env.PORT || 4000);


const options = { target: 'https://datavisbackend.herokuapp.com/', changeOrigin: true }


const createProxy =  createProxyMiddleware(options)


//middleware
const checkJWT = require("./middleware/checkJWT");
app.use(cors());

app.use(express.json({limit: '10MB'}));

//set API routes (for example /auth/login or /table/43)
app.use('/dashboard', checkJWT, createProxy, require('./routes/dashboardRoutes'));
app.use('/table', checkJWT,createProxy, require('./routes/tableRoutes'));
app.use('/chart', checkJWT,createProxy, require('./routes/chartRoute'));
app.use('/user', checkJWT,createProxy, require('./routes/userRoutes'));
app.use('/auth',createProxy, require('./routes/authRoutes'));;


app.get('/', (req, res) => {
    res.send('API Home, please query /dashboard, /table, /chart, /user');
});

app.use(route404);
app.use(route500);

module.exports = app;