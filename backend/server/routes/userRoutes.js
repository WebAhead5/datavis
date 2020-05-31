const router = require('express').Router();



//default route
router.get('/', (req, res) => {
    res.send(`<h1>User Route</h1>`)
})


//User Data Requests 

router.get('/:name', (req, res) => {
    const { name } = req.params;
    res.send(`<h1>sending user data on ${name}.....</h1>`)
})

router.post('/:name', (req, res) => {
    const { name } = req.params;
    res.send("<h1>adding user data.....</h1>")
})

module.exports = router
