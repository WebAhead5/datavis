exports.route404 = (req, res) => {
    res.status(404).send("404 page Not found")
}

exports.route500 = function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Error with Server')
}