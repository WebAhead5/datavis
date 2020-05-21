const router = require('express').Router();

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`<h1>sending chart data on ID: ${id}.....</h1>`)
})

router.post('/:id', (req, res) => {
    const { id } = req.params;
    res.send("<h1>adding table data.....</h1>")
})

module.exports = router