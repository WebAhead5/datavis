const express = require('express');
const { route404, route500 } = require('./routes/errorRoutes');
const cors = require("cors");

// require('dotenv').config();

//set app
const app = express();

//set port
app.set('port', process.env.PORT || 4000);


//middleware
const checkJWT = require("./middleware/checkJWT");
app.use(cors());
app.use(express.json({limit: '10MB'}));


//set API routes (for example /auth/login or /table/43)
app.use('/dashboard', checkJWT, require('./routes/dashboardRoutes'));
app.use('/table', checkJWT, require('./routes/tableRoutes'));
app.use('/chart', checkJWT, require('./routes/chartRoute'));
app.use('/user', checkJWT, require('./routes/userRoutes'));
app.use('/auth', require('./routes/authRoutes'));;


app.get('/', (req, res) => {
    res.send('API Home, please query /dashboard, /table, /chart, /user');
});

app.use(route404);
app.use(route500);

module.exports = app;