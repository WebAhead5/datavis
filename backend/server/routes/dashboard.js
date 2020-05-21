const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("<h1>sending dashboard data.....</h1>")
})


module.exports = router