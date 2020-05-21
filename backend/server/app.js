const express = require('express');
const dashboardRouter = require('./routes/dashboard');
const tablesRouter = require('./routes/tables');
const chartsRouter = require('./routes/charts');
const userRouter = require('./routes/user');
const { route404, route500 } = require('./routes/error');


// require('dotenv').config();

//set app
const app = express();

//set port
app.set('port', process.env.PORT || 4000);

//set routers
app.use('/dashboard', dashboardRouter);
app.use('/tables', tablesRouter);
app.use('/charts', chartsRouter);
app.use('/user', userRouter);


app.get('/', (req, res) => {
    res.send('API Home, please query /dashboard, /tables, /charts, /user');
});

app.use(route404);
app.use(route500);

module.exports = app;