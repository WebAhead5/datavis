const router = require('express').Router();

//default route

router.get('/', (req, res) => {
    res.send(`<h1>Chart Route</h1>`)
})

//id routes

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`<h1>sending chart data on ID: ${id}.....</h1>`)
})

router.post('/:id', (req, res) => {
    const { id } = req.params;
    res.send("<h1>adding table data.....</h1>")
})

module.exports = router